import { renderModal } from "./FunctionsDOM.js";

// selectors
// selector del boton del modal
let testButton = document.querySelector("#testButton");
let containerQuestions = document.querySelector('.container')
let containerCards = document.querySelector('.container-cards')
let CardsForEach = document.querySelectorAll('.cards')
let containerTitle = document.querySelector('.title-test')
const btnSiguiente = document.querySelector(".btn-siguiente");


document.addEventListener("DOMContentLoaded", () => {

// funcion para abrir la pagina del test
// boton para realizar test
  testButton.addEventListener("click", reconocerclik);
  function reconocerclik() {
    containerCards.style.display = "none"
    containerQuestions.style.display = 'flex'
    containerTitle.style.display = "none"
  }
 
}); 

 // recorrer todas las cards para obtener el id y renderizar la info en el modal
 CardsForEach.forEach(card => {
  card.addEventListener('click', ()=>{
    let cardId = card.id
    console.log(cardId);
    renderModal(cardId)
  
   });
 });


