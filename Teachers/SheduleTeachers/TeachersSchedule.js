/* ------------CALENDAR----------------- */
let calendar;

document.addEventListener("DOMContentLoaded", async function () {

  let calendarEl = document.getElementById("calendar");
  /* inicializacion del calendario con dos argumentos "CalendarEl que es el contenedor y segundo un objeto de opciones para la config del calendario" */
  calendar = new FullCalendar.Calendar(calendarEl, {
    /* idioma del calendario espanol */
    locale: "es",
    /* vista inicial en mes */
    initialView: "timeGridWeek",
    /* la fecha inicial del calendario sera la fecha actual segun la libreria moment */
    initialDate: moment().format('YYYY-MM-DD'),
    /* posicion de botones en el header del calendario */
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    /* Asignar nombre en espanol a los botones del calendar */
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    /* inyectar a events del calendar la extraccion del json-server */
    events: fetchEventsFromServer,
    eventClick: function (info) {
      // Verificar si la vista es de estudiantes
      const isStudentView = document.body.classList.contains('student-view');
      // Si es vista de estudiantes, no realizar la acción de eliminación
      if (isStudentView) {
        return;
      }
      // Si no es vista de estudiantes, realizar la acción de eliminación
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
            // Después de que el usuario interactúa con la segunda alerta, elimina el evento
            deleteEventFromServer(info.event.id);
          });
        }
      });
    }
    , 
  });
  calendar.render();

  /* Ajustar tamaño a la pantalla del calendario view Header y Body */
  const calendarHeader = document.querySelector(".fc-col-header");
  calendarHeader.style.width = "100%";

  const calendarBody = document.querySelector(".fc-scrollgrid-sync-table");
  calendarBody.style.width = "100%";

});

  /* Se selecciona el form */
  const eventFormTeacher = document.getElementById("eventFormTeacher");
  /* un evento que escucha el envio del formulario  */
  eventFormTeacher.addEventListener("submit", async function (e) {
    /* Previene el comportamiento predeterminado del formulario, que es recargar la página cuando se envía. */
    e.preventDefault();
    /* Obtener valores de los inputs del formulario */
    const eventDate = document.getElementById("eventDate").value;
    const startTime = document.getElementById("starTime").value;
    const endTime = document.getElementById("endTime").value;
    /* Formatea la hora para que coincida con el formato esperado en el calendar (añadiendo ":00" al final) */
    const formattedStartTime = `${eventDate}T${startTime}:00`;
    const formattedEndTime = `${eventDate}T${endTime}:00`;


  // Formatea la fecha y hora para comparación
  const currentDateTime = moment();
  const selectedDateTime = moment(`${eventDate} ${startTime}`, "YYYY-MM-DD HH:mm");

  // Verifica si la fecha seleccionada es posterior o igual a la fecha y hora actuales
  if (selectedDateTime.isSameOrAfter(currentDateTime)) {
    try {
      // Obtén todos los eventos en el calendario
      const allEvents = calendar.getEvents();
  
      // Verifica si hay alguna superposición con el nuevo bloque de horario
      const overlapping = allEvents.some(event => {
        const eventStartMoment = moment(event.start);
        const eventEndMoment = moment(event.end);
        return (
          (eventStartMoment.isBefore(moment(formattedEndTime)) && eventEndMoment.isAfter(moment(formattedStartTime))) ||
          (eventStartMoment.isSame(moment(formattedStartTime)) && eventEndMoment.isSame(moment(formattedEndTime)))
        );
      });
  
      if (!overlapping) {
        const newEvent = {
          title: 'Bloqueado',
          start: moment(formattedStartTime).format(),
          end: moment(formattedEndTime).format(),
          reason: 'Bloqueado',
          date: eventDate,
          time: `${startTime} - ${endTime}`,
        };
  
        // Envia el nuevo evento al servidor
        const response = await fetch("http://localhost:4002/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
  
        if (response.ok) {
          calendar.refetchEvents();
          eventFormTeacher.reset();
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
  } else {
    Swal.fire({
      title: "No puedes reservar citas en fechas anteriores a la actual",
      icon: "warning"
    });
  }
  
  });

// iniciamos la funcion con dos parámetros: calendar (la instancia del calendario FullCalendar) y startTime (el momento de inicio del intervalo de tiempo que se va a verificar).
export async function isTimeSlotOccupied(calendar, startTime) {
  // Obtener todos los eventos en el calendario
  const allEvents = calendar.getEvents();
  // Convertir startTime a objeto Moment
  const startMoment = moment(startTime);
  // Calcular el horario de finalización (1 hora después)
  const endMoment = startMoment.clone().add(1, 'hour');
  // Verificar si hay algún evento que coincide exactamente con el nuevo horario
  const exactMatch = allEvents.some(event => {
    const eventStartMoment = moment(event.start);
    const eventEndMoment = moment(event.end);
    return (
      eventStartMoment.isSame(startMoment, 'minute') &&
      eventEndMoment.isSame(endMoment, 'minute')
    );
  });
  // Verificar si hay algún evento que se superpone con el nuevo horario
  const overlapping = allEvents.some(event => {
    const eventStartMoment = moment(event.start);
    const eventEndMoment = moment(event.end);
    return (
      (eventStartMoment.isBefore(endMoment) && eventEndMoment.isAfter(startMoment)) ||
      (eventStartMoment.isSame(startMoment) && eventEndMoment.isSame(endMoment))
    );
  });
  // Devuelve true si hay una coincidencia exacta o superposición, indicando que el intervalo de tiempo está ocupado. Devuelve false si no hay coincidencias y el intervalo de tiempo está disponible.
  return exactMatch || overlapping;
};

// funcion para obtener events de la base de datos data.json que esta guardada en el json-server
export async function fetchEventsFromServer(info, successCallback, failureCallback) {
  try {
     // Determina el tipo de vista
     const isStudentView = document.body.classList.contains('student-view');
    // Realizar una solicitud (fetch) a la URL del servidor que contiene los eventos
    const response = await fetch('http://localhost:4002/events');
    // Verifica si la solicitud fue exitosa (código de estado 200)
    if (response.ok) {
      // Si la respuesta fue exitosa, convierte el cuerpo de la respuesta a formato JSON
      const events = await response.json();

       // Procesa los eventos según el tipo de vista
       const processedEvents = isStudentView
       ? events.map(event => ({ ...event, title: 'Reservado' }))
       : events;

      // Llama a la función de retorno de éxito (successCallback) y pasa los eventos
      successCallback(processedEvents);
    } else {
      // Si la respuesta no es exitosa, imprime un mensaje de error en la consola
      console.error('Error al obtener eventos desde el servidor:', response.status);
      // Llama a la función de retorno de fallo (failureCallback) con un mensaje de error
      failureCallback('Hubo un error al obtener los eventos desde el servidor.');
    }
  } catch (error) {
    // Capturar cualquier error que pueda ocurrir durante el proceso y mostrarlo en la consola
    console.error('Error al obtener eventos desde el servidor:', error);
    Swal.fire({
      title: "Hubo un error al eliminar el evento. Por favor, intenta de nuevo",
      icon: "error"
    });
    failureCallback('Hubo un error al obtener los eventos desde el servidor.');
  }
};

// funcion que se encarga de eliminar un evento del servidor
export async function deleteEventFromServer(eventId) {
  try {
    // Realizar una solicitud (fetch) al servidor para eliminar el evento específico
    const response = await fetch(`http://localhost:4002/events/${eventId}`, {
      method: 'DELETE',
    });
    // Verifica si la solicitud fue exitosa (código de estado 200)
    if (response.ok) {
      // Si la respuesta es exitosa, recarga los eventos en FullCalendar después de eliminar el evento
      calendar.refetchEvents();
    } else {
      // Si la respuesta no es exitosa, imprime un mensaje de error en la consola
      console.error('Error al eliminar evento:', response.status);
      // Mostrar una alerta al usuario sobre el error al eliminar el evento
      Swal.fire({
        title: "Hubo un error al eliminar el evento. Por favor, intenta de nuevo",
        icon: "error"
      });
    }
  } catch (error) {

  }
};

export { calendar };
