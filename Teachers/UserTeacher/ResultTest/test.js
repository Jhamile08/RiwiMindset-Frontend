// Generamos una url base
import { get, post, update } from "./../../../General/apiConnection/apiConnection.js";

const url = "http://localhost:8080/api/v1/result";
const urlBase = "http://localhost:4002/";
// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("selectedStudentId");

async function getStudent(studentId) {
    const response = await fetch(`${urlBase}students/${studentId}`);
    const data = await response.json();
    return data;
};

//Inyeccion del perfil del menu
async function inyect() {
  const student = await getStudent(selectedStudentId);
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

document.addEventListener("DOMContentLoaded",()=>{
    inyect(), inyectarResultado();
})
// Inyeccion de resultados 

async function inyectarResultado(){
    let contentResult = document.querySelector(".content-result")
    let contentResultEnglish = document.querySelector(".result-english")
    let contentResultLogic = document.querySelector(".result-logic")
    let contentResultMental = document.querySelector(".result-mental")
    let data = await get(url);
    let hasEnglishResult = false;
    let hasLogicResult = false;
    let hasMentalResult = false;

    data["content"].forEach(resultado => {
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

    data["content"].forEach(resultado => {

        if (resultado.typeTest == "ENGLISH") {
            contentResultEnglish.innerHTML += `
                <ul>
                    <li>Puntaje : ${resultado.result}</li>
                </ul>
            `;
        }else if (resultado.typeTest == "LOGIC") {
            contentResultLogic.innerHTML += `
            <ul>
                <li>Puntaje : ${resultado.result}</li>
            </ul>
        `;
        }else{
            contentResultMental.innerHTML += `
            <ul>
                <li>Puntaje : ${resultado.result}</li>
            </ul>
        `;
        }
    });
}



