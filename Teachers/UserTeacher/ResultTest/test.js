// Generamos una url base
import { get } from "./../../../General/apiConnection/apiConnection.js";
import {
    URL_CODERS,
    URL_RESULT,
  } from "../../../General/apiConnection/URLS.js";
// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("selectedStudentId");

document.addEventListener("DOMContentLoaded",()=>{
     inyectarResultado();
})
// Inyeccion de resultados 

async function inyectarResultado() {
    const selectedStudentId = localStorage.getItem("selectedStudentId");
    let contentResultEnglish = document.querySelector(".result-english");
    let contentResultLogic = document.querySelector(".result-logic");
    let contentResultMental = document.querySelector(".result-mental");
    let data = await get(URL_RESULT);

    let hasEnglishResult = false;
    let hasLogicResult = false;
    let hasMentalResult = false;

    // Filtrar los resultados del estudiante seleccionado
    let resultadosEstudiante = data["content"].filter(resultado => resultado.id_coder === selectedStudentId);

    resultadosEstudiante.forEach(resultado => {
        if (resultado.typeTest === "ENGLISH") {
            hasEnglishResult = true;
        } else if (resultado.typeTest === "LOGIC") {
            hasLogicResult = true;
        } else if (resultado.typeTest === "MENTAL") {
            hasMentalResult = true;
        }
    });

    // Mostrar mensajes si no hay resultados de algún tipo
    if (!hasEnglishResult) {
        contentResultEnglish.innerHTML += `
            <ul>
                <li>Aun no hay resultados disponibles</li>
            </ul>
        `;
    }

    if (!hasLogicResult) {
        contentResultLogic.innerHTML += `
            <ul>
                <li>Aun no hay resultados disponibles</li>
            </ul>
        `;
    }

    if (!hasMentalResult) {
        contentResultMental.innerHTML += `
            <ul>
                <li>Aun no hay resultados disponibles</li>
            </ul>
        `;
    }

    // Mostrar resultados del estudiante filtrado
    resultadosEstudiante.forEach(resultado => {
        if (resultado.typeTest == "ENGLISH") {
            contentResultEnglish.innerHTML += `
                <ul>
                    <li>Puntaje: ${resultado.result}</li>
                </ul>
            `;
        } else if (resultado.typeTest == "LOGIC") {
            contentResultLogic.innerHTML += `
                <ul>
                    <li>Puntaje: ${resultado.result}</li>
                </ul>
            `;
        } else if (resultado.typeTest == "MENTAL") {
            contentResultMental.innerHTML += `
                <ul>
                    <li>Puntaje: ${resultado.result}</li>
                </ul>
            `;
        }
    });
}


// Llamar a la función para mostrar resultados
inyectarResultado();



