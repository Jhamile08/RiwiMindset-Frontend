import {
  URL_CODERS,
  URL_RECORDS,
} from "../../../General/apiConnection/URLS.js";
import {
  get,
  update,
  post,
} from "../../../General/apiConnection/apiConnection.js";

document.addEventListener("DOMContentLoaded", () => {
  // Generamos una url base
  // Obtener el ID del estudiante del localStorage
  const selectedStudentId = localStorage.getItem("selectedStudentId");

  //Inyeccion del perfil del menu
  async function inyect() {
    const coder = await get(`${URL_CODERS}/${selectedStudentId}`);
    // Inyectar foto y card
    const user = document.querySelector("#data-user");
    const coderUser = document.createElement("div");
    coderUser.classList.add("container-img-p");

    coderUser.innerHTML = `
        <div>
            <img src="${coder.photo}" alt="" id="foto"></img>
        </div>
        <div>    
            <p id="nombre">${coder.name}</p>
            <p class="perfil-clan" id="nombre">${coder.clan}</p>
        </div>    
    `;

    user.appendChild(coderUser);
  }

  async function inyectHistoria() {
    const record = await get(`${URL_RECORDS}`);
    const historial = document.querySelector("#registro");

    console.log(record.content);
    console.log(record.content[0].dateRecord);
    console.log(record.content[0].registration);

    // Iterar sobre el array de fechas (puede ser cualquier otro array)
    for (let i = 0; i < record.content; i++) {
      const register = document.createElement("div");
      register.classList.add("registroEspecifico");
      register.innerHTML = ` 
            <p class="fechaEntrevista">
                <b> fecha: </b> ${record.content[i].dateRecord}
            </p>
            <p class="registroInfo">
                ${record.content[i].registration}
            </p>
            <button id="btndentro btn" class="btnrecomendacion" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>
        `;
      // Pasar la función mostrarVerMas como manejador de eventos
      register.querySelector(".btnrecomendacion").addEventListener("click", () => ocultarMostrar(i));
      historial.appendChild(register);
    }
  }
  // ocultar y mostrar
  async function ocultarMostrar(i) {
    const containerRegistros = document.querySelector(".registros");
    containerRegistros.style.display = "none";
    const record = await get(`${URL_RECORDS}`);

    const parrafoRecomendaciones = document.querySelector(".pRecomendaciones");
    parrafoRecomendaciones.innerHTML = `
            <div class="container-title">
                <h2>RECOMENDACIONES</h2>
                <div>
                <button id="btnfuera btn" class="btnVerMasRecomendaciones" data-bs-toggle="modal" href="#exampleModalToggle" role="button"><img src="../../../General/Images/ImagesTeachers/SVG/edit.svg" alt=""></button></button>
                    <img src="../../../General/Images/ImagesTeachers/SVG/delete.svg" alt="">
                </div>
            </div>
            <p>${record.content.dateRecord}</p>
            <p>${record.content.registration}</p>
            <hr>
            `;

    const parrafoObservaciones = document.querySelector(".pObservaciones");
    parrafoObservaciones.innerHTML = `
            <div class="container-title">
                <h2>OBSERVACIONES</h2>
                <div>
                <button id="btnfuera btn" class="btnVerMasObservaciones" data-bs-toggle="modal" href="#exampleModalToggle" role="button"><img src="../../../General/Images/ImagesTeachers/SVG/edit.svg" alt=""></button></button>
                    <img src="../../../General/Images/ImagesTeachers/SVG/delete.svg" alt="">
                </div>    
            </div>
            <p>${record.content.dateRecord}</p>
            <p>${record.content.observation}</p>
            
            `;
    document
      .querySelector(".btnVerMasRecomendaciones")
      .addEventListener("click", () => mostrarVerMasRecomendaciones(i));
    document
      .querySelector(".btnVerMasObservaciones")
      .addEventListener("click", () => mostrarVerMasObservaciones(i));
  }
  // MODAL VER MAS
  async function mostrarVerMasRecomendaciones(i) {
    const record = await get(`${URL_RECORDS}`);
    const pObservaciones = document.querySelector(".pObservaciones");
    pObservaciones.style.display = "none";
    const parrafoRecomendaciones = document.querySelector(".pRecomendaciones");
    parrafoRecomendaciones.innerHTML = `
            <h2>RECOMENDACIONES</h2>
            <p>${record.content.dateRecord}</p>
            <textarea style="width: 100%; height: 220px" id="textAreaRecomendaciones">${record.content.registration}</textarea>
            <div class="modal-footer">
            <button class="btn btn-primary" id="editarRecomendaciones" data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal" style="left: 0;">GUARDAR</button>
            </div>
            `;

    document
      .querySelector("#editarRecomendaciones")
      .addEventListener("click", () => guardar(i, "recomendaciones"));
  }
  async function mostrarVerMasObservaciones(i) {
    const pRecomendaciones = document.querySelector(".pRecomendaciones");
    pRecomendaciones.style.display = "none";
    const record = await get(`${URL_RECORDS}`);

    const parrafoObservaciones = document.querySelector(".pObservaciones");
    parrafoObservaciones.innerHTML = `
            <h2>OBSERVACION</h2>
            <p>${record.content.dateRecord}</p>
            <textarea style="width: 100%; height: 220px" id="textAreaObservaciones">${record.content.registration}</textarea>
            <div class="modal-footer">
            <button class="btn btn-primary" id="editarObservaciones" data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal" style="left: 0;">GUARDAR</button>
          </div>
            `;
    document
      .querySelector("#editarObservaciones")
      .addEventListener("click", () => guardar(i, "observaciones"));
  }

  //Guardar las modificaciones

  async function guardar(i, tipo) {
    console.log("Datos guardados");

    let nuevaRecomendacion = "";
    let nuevaObservacion = "";

    if (tipo === "recomendaciones") {
      nuevaRecomendacion = document.getElementById(
        "textAreaRecomendaciones"
      ).value;
    } else if (tipo === "observaciones") {
      nuevaObservacion = document.getElementById("textAreaObservaciones").value;
    }

    try {
      // Obtener el objeto estudiante del servidor
      let record = await get(`${URL_RECORDS}`);

      console.log(record);
      // Actualizar las recomendaciones y observaciones en el objeto estudiante
      if (tipo === "recomendaciones") {
        record.content.registration = nuevaRecomendacion;
      } else if (tipo === "observaciones") {
        record.content.observation = nuevaObservacion;
      }

      // Enviar los datos actualizados al servidor utilizando el método update
      const response = await update(
        `${URL_STUDENTS}/${selectedStudentId}`,
        student
      );

      // Si la solicitud es exitosa, mostrar el mensaje de éxito
      console.log("Datos actualizados exitosamente:", response);
    } catch (error) {
      // Si hay algún error, manejarlo adecuadamente
      console.error("Error al guardar los datos:", error);
    }
  }

  /* CREAR REGISTRO */

  const btnCrearRegistro = document.getElementById("btnCrearRegistro");
  btnCrearRegistro.addEventListener("click", crearRegistro);

  function crearRegistro() {
    console.log("Crear");
    const parrafoCrearObservaciones = document.querySelector(
      ".pCrearObservaciones"
    );
    parrafoCrearObservaciones.innerHTML = `
        <textarea placeholder="Observación" minlength=5 style="width: 90%; height: 110px;" id="textAreaCrearObservaciones"></textarea>
        <textarea placeholder="Recomendación" minlength=5 style="width: 90%; height: 110px;" id="textAreaCrearRecomendaciones"></textarea>
        <br>
        <button type="button" class="btn btnClose" aria-label="Close">Cerrar</button>
        <button style="background-color: #8626ff; color: #ffff" class="btn btnGuardar ">Guardar</button>
        <br>
    `;

    const btnCerrarModal = document.querySelector(".btnClose");
    btnCerrarModal.addEventListener("click", cerrarModal);

    const btnGuardar = document.querySelector(".btnGuardar");
    btnGuardar.addEventListener("click", guardarDatos);

    parrafoCrearObservaciones.style.display = "block";
  }

  function cerrarModal() {
    console.log("cerrar");
    const parrafoCrearObservaciones = document.querySelector(
      ".pCrearObservaciones"
    );
    parrafoCrearObservaciones.style.display = "none";
  }

  async function guardarDatos() {
    console.log("Guardar datos");

    const observacion = document.getElementById(
      "textAreaCrearObservaciones"
    ).value;
    const recomendacion = document.getElementById(
      "textAreaCrearRecomendaciones"
    ).value;

    try {
      let record = await get(`${URL_RECORDS}`);

      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear() % 100;
      // Formateo la fecha al formato "dd/mm/yy"
      let formattedDate = `${day}/${month}/${year}`;

      record.content.dateRecord.push(formattedDate);
      record.content.observation.push(observacion);
      record.content.registration.push(recomendacion);

      const response = await update(
        `${URL_STUDENTS}/${selectedStudentId}`,
        student
      );

      console.log("Datos guardados exitosamente:", response);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  }

  // Llamada a las funciones
  (async () => {
    await inyect();
    await inyectHistoria();
  })();
});
