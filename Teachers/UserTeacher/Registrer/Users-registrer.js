import { URL_STUDENTS } from "../../../General/apiConnection/URLS.js";
import { get, update, post } from "../../../General/apiConnection/apiConnection.js";

document.addEventListener('DOMContentLoaded',()=>{
    // Generamos una url base
// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("selectedStudentId");

get(`${URL_STUDENTS}/${selectedStudentId}`);

//Inyeccion del perfil del menu
async function inyect() {
    const student = await get(`${URL_STUDENTS}/${selectedStudentId}`);
    // Inyectar foto y card 
    const user = document.querySelector('#data-user');
    const coderUser = document.createElement('div');

    coderUser.innerHTML = `
        <img src="${student.foto}" alt="" id="foto"></img>
        <p id="nombre">${student.nombre}</p>
        <p id="nombre">  edad: ${student.edad}</p>
    `;

    user.appendChild(coderUser);
};

async function inyectHistoria() {
    const student = await get(`${URL_STUDENTS}/${selectedStudentId}`);
    const historial = document.querySelector("#registro");

    // Iterar sobre el array de fechas (puede ser cualquier otro array)
    for (let i = 0; i < student.fecha.length; i++) {
        const register = document.createElement('div');
        register.classList.add("registroEspecifico");
        register.innerHTML = `
            <p class="fechaEntrevista">
                <b> fecha: </b> ${student.fecha[i]}
            </p>
            <p class="registroInfo">
                ${student.recomendaciones[i]}
            </p>
            <button id="btnfuera btn" class="btnVerMas" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>
        `;
        // Pasar la función mostrarVerMas como manejador de eventos
        register.querySelector('.btnVerMas').addEventListener('click', () => mostrarVerMas(i));
        historial.appendChild(register);
    }
};

// MODAL VER MAS
async function mostrarVerMas(i) {
    const student = await get(`${URL_STUDENTS}/${selectedStudentId}`);

    const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
    parrafoRecomendaciones.innerHTML = `
            <textarea style="width: 100%" id="textAreaRecomendaciones">${student.recomendaciones[i]}</textarea>
            <hr>
            <p>${student.fecha[i]}</p>
            `;

    const parrafoObservaciones = document.querySelector('.pObservaciones');
    parrafoObservaciones.innerHTML = `
            <textarea style="width: 100%" id="textAreaObservaciones">${student.observaciones[i]}</textarea>
            <hr>
            <p>${student.fecha[i]}</p>
            `;

    document.querySelector('#editarRecomendaciones').addEventListener('click', () => guardar(i));
    document.querySelector('#editarObservaciones').addEventListener('click', () => guardar(i));
};



async function guardar(i) {
    console.log("Datos guardados");

    // Obtener el contenido de los textarea modificados
    const nuevaRecomendacion = document.getElementById('textAreaRecomendaciones').value;
    const nuevaObservacion = document.getElementById('textAreaObservaciones').value;

    try {
        // Obtener el objeto estudiante del servidor
        let student = await get(`${URL_STUDENTS}/${selectedStudentId}`);

        // Actualizar las recomendaciones y observaciones en el objeto estudiante
        student.recomendaciones[i] = nuevaRecomendacion;
        student.observaciones[i] = nuevaObservacion;

        // Enviar los datos actualizados al servidor utilizando el método update
        const response = await update(`${URL_STUDENTS}/${selectedStudentId}`, student);

        // Si la solicitud es exitosa, mostrar el mensaje de éxito
        console.log("Datos actualizados exitosamente:", response);
    } catch (error) {
        // Si hay algún error, manejarlo adecuadamente
        console.error("Error al guardar los datos:", error);
    }
}




/* CREAR REGISTRO */

const btnCrearRegistro = document.getElementById("btnCrearRegistro")

btnCrearRegistro.addEventListener('click', crearRegistro)

function crearRegistro() {
    console.log("Crear");
    const parrafoCrearObservaciones = document.querySelector('.pCrearObservaciones');
    parrafoCrearObservaciones.innerHTML = `
        <textarea placeholder="Observación" minlength=5 style="width: 90%; height: 110px;" id="textAreaCrearObservaciones"></textarea>
        <textarea placeholder="Recomendación" minlength=5 style="width: 90%; height: 110px;" id="textAreaCrearRecomendaciones"></textarea>
        <br>
        <button type="button" class="btn btnClose" aria-label="Close">Cerrar</button>
        <button style="background-color: #8626ff; color: #ffff" class="btn btnGuardar ">Guardar</button>
        <br>
    `;

    const btnCerrarModal = document.querySelector('.btnClose');
    btnCerrarModal.addEventListener('click', cerrarModal);

    const btnGuardar = document.querySelector('.btnGuardar');
    btnGuardar.addEventListener('click', guardarDatos);

    parrafoCrearObservaciones.style.display = 'block';
}

function cerrarModal() {
    console.log("cerrar");
    const parrafoCrearObservaciones = document.querySelector('.pCrearObservaciones');
    parrafoCrearObservaciones.style.display = 'none'
}

async function guardarDatos() {
    console.log("Guardar datos");

    const observacion = document.getElementById('textAreaCrearObservaciones').value;
    const recomendacion = document.getElementById('textAreaCrearRecomendaciones').value;

    try {
        let student = await get(`${URL_STUDENTS}/${selectedStudentId}`);

        let date = new Date();
        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() % 100;
        // Formateo la fecha al formato "dd/mm/yy"
        let formattedDate = `${day}/${month}/${year}`;

        student.fecha.push(formattedDate);
        student.observaciones.push(observacion);
        student.recomendaciones.push(recomendacion);

        const response = await update(`${URL_STUDENTS}/${selectedStudentId}`, student);

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
})