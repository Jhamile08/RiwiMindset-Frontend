import { URL_CODERS } from "../../General/apiConnection/URLS.js";

// Seleccionamos el contenedor principal donde vamos a inyectars los coders
let inyeccionCoders = document.querySelector("#container-users");
//Funcion que obtiene los datos desde el archivo json
async function getCoder() {
  const response = await fetch(URL_CODERS);
  const data = response.json();
  return data;
};

let studentsInjected = [];

async function renderCoders() {
  const coders = await getCoder();
  inyeccionCoders.innerHTML = '';
  coders.content.forEach(coder => {
    inyeccionCoders.innerHTML += `
        <div class="estudents actualizar">
            <p id="">${coder.name} </p>
            <p class="borrar" id="nombre">${coder.name} ${coder.clan}</p> 
            <p id="">${coder.clan} </p>
            <a href="/Teachers/UserTeacher/Registrer/IndexTeachersUsers-register.html" type="submit" id="${coder._id}" class= "actualizar">ver perfil</a>
            <img src="${coder.photo}" alt="" id="foto"></img>
        </div>
        `
  });

  coders.content.forEach((coder) => {

    const {
      id,
      clan,
      photo,
      name,
      dateborn,
    } = coder;

    const data = {
      clan,
      id,
      photo,
      name,
      dateborn,
    };

    studentsInjected.push(data);
  });
};

/* -------BUSCADOR------- */
document.addEventListener("input", (e) => {
  let apellido = e.target.value;
  nombre(apellido);
});

function nombre(apellido) {
  const name = document.querySelectorAll("#nombre");
  name.forEach((e) => {
    if (
      e.textContent.toLocaleLowerCase().includes(apellido.toLocaleLowerCase())
    ) {
      e.parentElement.classList.remove("buscador");
    } else {
      e.parentNode.classList.add("buscador");
    }
  });
};

/* -----GUARDAR EN EL LOCALSTORAGE EL ID SEGUN EL CLICK */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("actualizar")) {
    const studentId = e.target.getAttribute("id");
    console.log(studentId);
    localStorage.setItem("selectedStudentId", studentId); // Almacenar ID del estudiante seleccionado
  }
});

renderCoders();