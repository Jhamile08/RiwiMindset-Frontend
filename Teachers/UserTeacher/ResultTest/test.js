// Generamos una url base
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

/* TEST */

let tabla = document.querySelector('.slide tbody')

tabla.innerHTML += `
    <tr>
    <td>1</td>
    <td>18/02/2024</td>
    <td>10%</td>
    </tr>
`

document.addEventListener("DOMContentLoaded",()=>{
    inyect();
})
