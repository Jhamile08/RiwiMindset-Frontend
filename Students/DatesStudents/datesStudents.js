import {URL_APPOINTMENTS } from "../../General/apiConnection/URLS.js"

/* Select NameStudent & Photo */
const nameStudent = document.querySelector("#nameStudent");
const fotoStudent = document.querySelector("#fotoStudent");
const clanStudent = document.querySelector("#clanStudent");
const coderId = localStorage.getItem("userId");

// Crear y configurar el calendario
let studentCalendar;

document.addEventListener("DOMContentLoaded", function () {
  const psychologistSelect = document.getElementById("psychologist");

  if (psychologistSelect) {
    psychologistSelect.addEventListener("change", function () {
      studentCalendar.refetchEvents();
    });

    let calendarEl = document.getElementById("calendar");

    if (calendarEl) {
      studentCalendar = new FullCalendar.Calendar(calendarEl, {
        locale: "es",
        initialView: "timeGridWeek",
        initialDate: moment().format('YYYY-MM-DD'),
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        },
        events: function (info, successCallback, failureCallback) {
          fetchStudentEventsFromServer(info, successCallback, failureCallback, psychologistSelect.value);
        }
      });

      studentCalendar.render();
    }
  }
});

// Función para obtener los eventos del servidor
async function fetchStudentEventsFromServer(info, successCallback, failureCallback, psychologistId) {
  try {
    const response = await fetch(`${URL_APPOINTMENTS}?page=1&size=30`);
    if (response.ok) {
      const data = await response.json();
      const appointments = data.content;
      
      // Filtrar los eventos según el psychologistId seleccionado
      const filteredAppointments = appointments.filter(appointment => appointment.pyschologist._id === psychologistId);

      // Modificar los eventos para que el título sea "Reservado"
      const modifiedAppointments = filteredAppointments.map(appointment => {
        return {
          ...appointment,
          title: "Reservado"
        };
      });

      console.log(modifiedAppointments);
      successCallback(modifiedAppointments);
    } else {
      console.error('Error al obtener eventos desde el servidor:', response.status);
      failureCallback('Hubo un error al obtener los eventos desde el servidor.');
    }
  } catch (error) {
    console.error('Error al obtener eventos desde el servidor:', error);
    Swal.fire({
      title: "Hubo un error al obtener los eventos. Por favor, intenta de nuevo",
      icon: "error"
    });
    failureCallback('Hubo un error al obtener los eventos desde el servidor.');
  }
}




  /* Se selecciona el form */
const eventForm = document.getElementById("eventForm");
/* un evento que escucha el envio del formulario  */
eventForm.addEventListener("submit", async function (e) {
  /* Previene el comportamiento predeterminado del formulario, que es recargar la página cuando se envía. */
  e.preventDefault();
  /* Obtener valores de los inputs del formulario */
  const eventDate = document.getElementById("eventDate").value;
  const eventTime = document.getElementById("eventTime").value;
  const reason = document.getElementById("reason").value;
  const psychologist = document.getElementById("psychologist").value;
  /* Formatea la hora para que coincida con el formato esperado en el calendar (añadiendo ":00" al final) */
  const formattedTime = `${eventTime}:00`;
  // Formatea la fecha y hora para comparación
  const currentDateTime = moment();
  const selectedDateTime = moment(`${eventDate} ${eventTime}`, "YYYY-MM-DD HH:mm");
  // Verificar si la fecha seleccionada es anterior a la fecha y hora actuales
  if (selectedDateTime.isBefore(currentDateTime)) {
    Swal.fire({
      title: "No puedes reservar citas en fechas anteriores a la actual",
      icon: "warning"
    });
    return;
  }
  // Verificar si el horario está disponible - empezamos con un bloque try-catch para manejar posibles errores durante la ejecución del código
  try {
    // verificamos si el horario seleccionado no esta ocupado segun la funcion isTimeSlotOccupied
    if (
      !(await isTimeSlotOccupied(studentCalendar, `${eventDate}T${formattedTime}`))
    ) {
      // creamos el evento con propiedades especificas del calendar
      const newEvent = {
        title: nameStudent.textContent,
        start: moment(`${eventDate}T${formattedTime}`).format(),
        end: moment(`${eventDate}T${formattedTime}`).add(1, "hour").format(),
        reason: reason,
        date: eventDate,
        time: eventTime,
        profileStudent: [fotoStudent.src],
        clanStudent: clanStudent.textContent,
        coderId: coderId,
        pyschologistId: psychologist
      };
      // Enviar el nuevo evento al servidor usando fetch con una solicitud POST al servidor JSON.
      const response = await fetch(URL_APPOINTMENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      // Verifica si la respuesta del servidor indica que la solicitud fue exitosa (estado 200-299). Si es así, recarga los eventos en FullCalendar y limpia el formulario. De lo contrario, muestra un mensaje de error.
      if (response.ok) {
        Swal.fire({
          title: "Cita agendada con exito",
          icon: "success"
        });
        // Recargar los eventos en FullCalendar después de agregar el nuevo evento
        studentCalendar.refetchEvents();
        // Limpiar el formulario
        eventForm.reset();
        // Captura cualquier error que pueda ocurrir durante la ejecución del bloque try y muestra un mensaje de error.
      } else {
        console.error("Error al agregar evento:", response.status);
        Swal.fire({
          title: "Hubo un error al agregar el evento. Por favor, intenta de nuevo",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "¡Este horario ya está reservado! Por favor, elige otro",
        icon: "warning"
      });
    }
  } catch (error) {
    console.error("Error al agregar evento:", error);
    Swal.fire({
      title: "Hubo un error al agregar el evento. Por favor, intenta de nuevo",
      icon: "error"
    });
  }
});


async function isTimeSlotOccupied(calendar, startTime) {
  const allEvents = calendar.getEvents();
  const startMoment = moment(startTime);
  const endMoment = startMoment.clone().add(1, 'hour');
  const exactMatch = allEvents.some(event => {
    const eventStartMoment = moment(event.start);
    const eventEndMoment = moment(event.end);
    return (
      eventStartMoment.isSame(startMoment, 'minute') &&
      eventEndMoment.isSame(endMoment, 'minute')
    );
  });
  const overlapping = allEvents.some(event => {
    const eventStartMoment = moment(event.start);
    const eventEndMoment = moment(event.end);
    return (
      (eventStartMoment.isBefore(endMoment) && eventEndMoment.isAfter(startMoment)) ||
      (eventStartMoment.isSame(startMoment) && eventEndMoment.isSame(endMoment))
    );
  });
  return exactMatch || overlapping;
}
