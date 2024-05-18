import { renderModal } from "./FunctionsDOM.js";
import { URL_PREGUNTAS, URL_RESPUESTAS } from "./../../General/apiConnection/URLS.js";
import { get, update, post } from "../../../General/apiConnection/apiConnection.js";

// selectors
// selector del boton del modal
let testButton = document.querySelector("#testButton");
let containerDown = document.querySelector(".container-down");
let questionContainer = document.getElementById('question-container');
let containerCards = document.querySelector('.container-cards');
let CardsForEach = document.querySelectorAll('.cards');
let containerTitle = document.querySelector('.title-test');
const btnSiguiente = document.querySelector(".btn-siguiente");

let type;
let cont = 0; //Contador para las respuestas corrrectas
let numeroPreguntas = 5;
document.addEventListener("DOMContentLoaded", () => {
    // función para abrir la página del test
    // botón para realizar test
    CardsForEach.forEach(card => {
        card.addEventListener('click', () => {
            type = card.id;
            renderModal(type);
        });
    });

    testButton.addEventListener("click", reconocerclik);
    function reconocerclik() {
        console.log(type);
        loadQuestion(0, type);
        containerDown.style = "display:flex; justify-content: center; align-items:center;height:100vh";
    }
});

// Función para cargar las preguntas desde la API
async function loadQuestion(index = 0, type) {
    function getRandom() {
        return Math.random() - 0.5;
      }
    try {
        const data = await get(URL_PREGUNTAS);
        let iterator = 0;
        data["content"].forEach(content => {
            let preguntasRandom = content.answers;
            console.log(preguntasRandom.sort(getRandom));
            if (content.typeQuestion == type) {
                if (iterator == index) {
                    questionContainer.innerHTML = `
                        <div class="content-test">
                            <div class="content-test-inside">
                                <div class="container-title">
                                    <h2 class="title-question">question ${iterator + 1}</h2>
                                </div>
                                <p class="question-test content-recomendation">${content.question}</p>
                                <div class="container-label">
                                    <ul class="answers" data-question-id="${content.idQuestion}">
                                        ${preguntasRandom.map((answer, indexa) => `
                                            <li class="next" id_response="${indexa}"><a class="selected" href="#" >${answer}</a></li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                }

                iterator++;
            }
        });

        // Agregar listeners para los botones después de cargar las preguntas
        const next = document.querySelectorAll(".next");
        next.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute("id_response") == 0) {
                    cont++; // Incrementar el contador si id_response es 0
                }
                console.log(cont); // Mostrar el valor del contador

                if (index < iterator - 1) {
                    loadQuestion(index + 1, type);
                } else {
                    // llamar funcion para guardar la calificacion
                    calificacionTest(cont, numeroPreguntas, type)
                }
            });
        });
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
    }
}
function calificacionTest(cont, num, type){
    let resultado = cont/num*100;
    guardarCalificacion(resultado)

    if(resultado < 50 && type == "ENGLISH"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        
        </div>`;
    }else if(resultado > 50 && resultado < 100 && type == "ENGLISH"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        </div>`;
    }

    if(resultado < 50 && type == "LOGIC"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        
        </div>`;
    }else if(resultado > 50 && resultado < 100 && type == "LOGIC"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        </div>`;
    }

    if(resultado < 50 && type == "MENTAL"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        
        </div>`;
    }else if(resultado > 50 && resultado < 100 && type == "MENTAL"){
        // Mostrar contenido de recomendación
        questionContainer.innerHTML = `
        <div class="content-test content-recomendation">
            <h1>RESULTADO: ${resultado}/100</h1>
            <p>No te desanimes; con dedicación y esfuerzo, puedes superar cualquier obstáculo. Cada pequeño paso hacia adelante te acerca más a tu objetivo de dominar el inglés. Mantén una actitud positiva y confía en tu capacidad para aprender y crecer. 
            ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito!</p>
            <h1>Te invitamos a seguir mejorando con estos recursos</h1>
            <p><b>Lecturas interactivas:</b> <a href="https://lingua.com/es/ingles/lectura"> https://lingua.com/es/ingles/lectura</a></p>
            <p><b>Gramatica y vocabulario:</b><a href="https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/"> https://www.lawebdelingles.com/gramatica-nivel-a1-ingles/</a></p>
            <p><b>Peliculas:</b><a href="https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/"> https://talking.cambridge-house.com/cuales-son-las-mejores-series-y-pelis-para-ingles-a1-y-a2/</a></p>
        </div>`;
    }
}
async function guardarCalificacion(resultado){
    const resultTest = {
        result : resultado,
        id_coder: "wwwewe"
      };
      
      const data = await post(URL_PREGUNTAS, resultTest);

}