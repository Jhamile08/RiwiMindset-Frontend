import { calendar, isTimeSlotOccupied } from "../../Teachers/SheduleTeachers/TeachersSchedule.js";

/* Select NameStudent  */
const nameStudent = document.querySelector("#nameStudent");

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
      !(await isTimeSlotOccupied(calendar, `${eventDate}T${formattedTime}`))
    ) {
      // creamos el evento con propiedades especificas del calendar
      const newEvent = {
        title: nameStudent.textContent,
        start: moment(`${eventDate}T${formattedTime}`).format(),
        end: moment(`${eventDate}T${formattedTime}`).add(1, "hour").format(),
        reason: reason,
        date: eventDate,
        time: eventTime,
      };
      // Enviar el nuevo evento al servidor usando fetch con una solicitud POST al servidor JSON.
      const response = await fetch("http://localhost:4002/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      // Verifica si la respuesta del servidor indica que la solicitud fue exitosa (estado 200-299). Si es así, recarga los eventos en FullCalendar y limpia el formulario. De lo contrario, muestra un mensaje de error.
      if (response.ok) {
        // Recargar los eventos en FullCalendar después de agregar el nuevo evento
        calendar.refetchEvents();
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

/* const calendarStudents = document.querySelector('#calendar');
calendarStudents.style.display = "none"; */

