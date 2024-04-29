import { deleteEventFromServer } from "../SheduleTeachers/TeachersSchedule.js";

/* Inyectar citas de la base de datos json */
getDataJsonArray();


function getDataJsonArray() {
  fetch("http://localhost:4002/events")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(dataJsonArray => {
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
    .catch(error => {
      console.error("Error al obtener y parsear el JSON:", error);
    });
}

function showHTMLArray({ id, title, reason, date, time }) {
  const contain = document.querySelector(".cards-home");
  const eventHTML = document.createElement("div");
  eventHTML.classList.add("card-home");
  eventHTML.dataset.eventId = id;
  // Obtener el día de la semana a partir de la fecha
  moment.locale('es');
  const dayOfWeek = moment(date, "YYYY-MM-DD").format("dddd");
  eventHTML.innerHTML = `
        <div class="card-home-text">
          <h3>${dayOfWeek}</h3>
          <h3>${date}</h3>
          <h4>${time}</h4>
          <p>${title}</p>
          <p><b>Motivo: </b>${reason}</p>
        </div>
        <div class="buttons">
          <button class="delete-appointment">Eliminar cita</button>
        </div>
    `;

  contain.appendChild(eventHTML);

  const deleteButton = eventHTML.querySelector('.delete-appointment');
  deleteButton.addEventListener('click', () => {
    const eventId = eventHTML.dataset.eventId;
    deleteAppointment(eventId);
  });

};



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
    focusConfirm: false
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
        focusConfirm: true
      }).then(() => {
            // Eliminar el evento del servidor
        deleteEventFromServer(eventId);
      });
    }
  });
};


// Función para generar el informe
function generateReport(events) {
  // Contadores
  let totalCitas = events.length;
  let motivesCount = {};

  // Iterar sobre los eventos
  events.forEach(event => {
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
  const reportTable = document.querySelector('.table-report-home');
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
