import { deleteEventFromServer } from "../SheduleTeachers/TeachersSchedule.js";

/* Inyectar citas de la base de datos json */
getDataJsonArray();

function getDataJsonArray() {
  fetch("http://localhost:4002/events")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((dataJsonArray) => {
      dataJsonArray.sort((a, b) => {
        const dateA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm");
        const dateB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm");
        return dateA - dateB;
      });

      // Muestra los eventos ordenados
      dataJsonArray.forEach((element) => {
        showHTMLArray(element);
      });
      // Llama a la función de informe con los datos del evento
      console.log(dataJsonArray);
      generateReport(dataJsonArray);
    })
    .catch((error) => {
      console.error("Error al obtener y parsear el JSON:", error);
    });
}

function showHTMLArray({ id, title, reason, date, time }) {
  const contain = document.querySelector(".cards-home");
  const eventHTML = document.createElement("div");
  eventHTML.classList.add("card-home");
  eventHTML.dataset.eventId = id;
  // Obtener el día de la semana a partir de la fecha
  moment.locale("es");
  const eventDate = moment(date, "YYYY-MM-DD");
  let dayOfWeek = eventDate.format("dddd");
  // Convertir la primera letra en mayúscula
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  // Obtener la fecha actual
  const today = moment().startOf('day');
  // Comparar la fecha del evento con la fecha actual
  if (eventDate.isSame(today, 'day')) {
    dayOfWeek = "Hoy";
  } else if (eventDate.isSame(today.clone().add(1, 'day'), 'day')) {
    dayOfWeek = "Mañana";
  }
  // Convertir la fecha al formato "DD de MMMM"
  const formattedDate = moment(date, "YYYY-MM-DD").format("DD [de] MMMM");
  // Formatear la hora en un formato deseado (hh:mm A - hh:mm A)
  const startTime = moment(time, "HH:mm").format("hh:mma");
  const endTime = moment(time, "HH:mm").add(1, 'hour').format("hh:mma");
  eventHTML.innerHTML = `
        <div class="codersData">
          <img class="profilePhoto" src="https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1714003200&semt=ais">

          <div class="codersData-text">
            <p><b>${title}</b></p>
            <p>Clan</p>
          </div>
        </div>

        <hr class="line">

        <div class="buttons">
          <button class="delete-appointment">Eliminar cita</button>
          <button class="update-appointment">Reagendar cita</button>
        </div>
        
        <hr class="line">

        <div class="eventsData">
          <div class="eventsDate">
            <h3>${dayOfWeek} ${formattedDate}</h3>
            <h4>${startTime} - ${endTime}</h4>
          </div>

          <hr class="line lineEvents">

          <div class="reason">
            <p>Motivo</p>
            <p><b>${reason}</b></p>
          </div>
        </div>
    `;

  contain.appendChild(eventHTML);

  const deleteButton = eventHTML.querySelector(".delete-appointment");
  deleteButton.addEventListener("click", () => {
    const eventId = eventHTML.dataset.eventId;
    deleteAppointment(eventId);
  });
}

function deleteAppointment(eventId) {
  // Confirmar antes de eliminar
  Swal.fire({
    title: "¿Estás segura de que quieres eliminar esta cita?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
    // Configuración para hacer que la alerta sea modal
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    focusConfirm: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // Muestra una segunda alerta como modal
      Swal.fire({
        title: "Borrado",
        text: "La cita ha sido eliminada exitosamente",
        icon: "success",
        // Configuración para hacer que la segunda alerta sea modal
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: true,
      }).then(() => {
        // Eliminar el evento del servidor
        deleteEventFromServer(eventId);
      });
    }
  });
}

// Función para generar el informe
function generateReport(events) {
  // Contadores
  let totalCitas = events.length;
  let motivesCount = {};

  // Iterar sobre los eventos
  events.forEach((event) => {
    const reason = event.reason;

    // Incrementar el contador del motivo actual
    if (motivesCount[reason]) {
      motivesCount[reason]++;
    } else {
      motivesCount[reason] = 1;
    }
  });

  // Determinar la mayor y menor razón
  const motives = Object.keys(motivesCount);
  const counts = Object.values(motivesCount);

  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  const maxReason = motives[counts.indexOf(maxCount)];
  const minReason = motives[counts.indexOf(minCount)];

  // Inyectar datos en la tabla
  const reportTable = document.querySelector(".table-report-home");
  const row = reportTable.insertRow(1); // Asumiendo que la primera fila es para la información total
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);

  cell1.textContent = totalCitas;
  cell2.textContent = maxReason;
  cell3.textContent = minReason;
}

// Llamar a la función con los datos del evento
generateReport(events);
