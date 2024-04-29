import { URL_STUDENTS, URL_PSYCHOLOGISTS } from '../apiConnection/URLS.js';
import { post, get, update, deleteHttp } from '../apiConnection/apiConnection.js';

/* img */
let profilePicEstudents = document.getElementById('profilePictureEstudents');
let inputFileEstudents = document.getElementById('inputFileEstudents');

let newStudent = {}; // Objeto para almacenar los datos del nuevo estudiante

inputFileEstudents.onchange = function () {
  const file = inputFileEstudents.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    profilePicEstudents.src = reader.result; // Asigna la imagen al elemento img
    newStudent.foto = reader.result; // Asigna la URL base64 al objeto newStudent
  };
};

/* -------STUDENTS------- */
/* Select */
const formStudents = document.querySelector('#formStudents');
const nameStudent = document.querySelector('#nameStudent');
const lastNameStudent = document.querySelector('#lastNameStudent');
const cedulaStudent = document.querySelector("#idStudent")
const emailStudent = document.querySelector('#emailStudent');
const celStudent = document.querySelector('#celStudent');
const passwordStudent = document.querySelector('#passwordStudent');
const confirmPasswordStudent = document.querySelector('#confirmPasswordStudent');
const bornDateStudent = document.querySelector('#bornDateStudent');
const clan = document.querySelector('#clan');
const studentId = document.querySelector("#studentId");


/* Events */
formStudents.addEventListener('submit', event => {
  event.preventDefault();
  registerStudent();
});

async function registerStudent() {


  const edad = calcularEdad(bornDateStudent.value);

  newStudent = {
    id: cedulaStudent.value,
    nombre: `${nameStudent.value} ${lastNameStudent.value}`,
    email: emailStudent.value,
    phone: celStudent.value,
    password: passwordStudent.value,
    clan: clan.value,
    edad: edad,
    foto: [newStudent.foto], // Asigna la URL base64 del objeto newStudent
    fecha: [],
    recomendaciones: [],
    observaciones: [],
    puntaje: {
      ingles: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
      logicas: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
      mentales: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
    },
  };

  if (studentId.value) {
    console.log("hola");
    await update(studentId.value, newStudent);

  } else {

    const response = await fetch(URL_STUDENTS);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === cedulaStudent.value) {
        alert('Cedula ya se encuentra registrada');
        return;
      }

      if (data[i].email === emailStudent.value) {
        alert('Email ya se encuentra registrado');
        return;
      }
    }

    if (
      passwordStudent.value !== confirmPasswordStudent.value ||
      confirmPasswordStudent.value !== passwordStudent.value
    ) {
      alert('Ambas contrasenas deben ser iguales');
      return;
    }

    post(URL_STUDENTS, newStudent);
    alert('Registrado exitosamente');
  }
}




/* ---------PSYCHOLOGISTS--------- */

let profilePicturePsychologists = document.getElementById('profilePicturepsychologists');
let inputFileTeachers = document.getElementById('inputFilePsychologists');

let newPsychologue = {};

inputFileTeachers.onchange = function () {
  const file = inputFileTeachers.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    profilePicturePsychologists.src = reader.result; // Asigna la imagen al elemento img
    newPsychologue.foto = reader.result; // Asigna la URL base64 al objeto newPsychologue 
  };
};

/* Select */
const formPsychologists = document.querySelector('#formPsychologists');
const namePsychologists = document.querySelector('#namePsychologists');
const lastNamePsychologists = document.querySelector('#lastNamePsychologists');
const emailPsychologists = document.querySelector('#emailPsychologists');
const cedulaPsychologist = document.querySelector('#idPsychologist');
const passwordPsychologists = document.querySelector('#passwordPsychologists');
const confirmPasswordPsychologists = document.querySelector('#confirmPasswordPsychologists');

/* Events */
formPsychologists.addEventListener('submit', event => {
  event.preventDefault();

  registerPsychologists();
});

/* Funcion que verifica que todos los datos sean correctos y no se encuentren en la base de datos actual */
async function registerPsychologists() {
  const response = await fetch(URL_PSYCHOLOGISTS);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === cedulaPsychologist.value) {
      alert('Cedula ya se encuentra registrada');
      return;
    }

    if (data[i].email === emailPsychologists.value) {
      alert('Email ya se encuentra registrado');
      return;
    }

  }

  if (
    passwordPsychologists.value !== confirmPasswordPsychologists.value ||
    confirmPasswordPsychologists.value !== passwordPsychologists.value
  ) {
    alert('Ambas contrasenas deben ser iguales');
    return;
  }

  newPsychologue = {
    id: cedulaPsychologist.value,
    nombre: `${namePsychologists.value} ${lastNamePsychologists.value}`,
    email: emailPsychologists.value,
    password: passwordPsychologists.value,
    foto: [newPsychologue.foto],
  };

  /* Si todos los datos son correctos, se agrega el objeto al json */
  post(URL_PSYCHOLOGISTS, newPsychologue);
  alert('Registrado exitosamente');
}




/* FUNCIONES */

function calcularEdad(fechaNacimiento) {
  const fechaNac = new Date(fechaNacimiento);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
  const mesActual = fechaActual.getMonth();
  const mesNacimiento = fechaNac.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad;
}





/* INYECTAR USUARIOS */


async function getStudentId(id) {
  const response = await fetch(id);
  const data = response.json();
  return data;
};

async function fillStudent(id) {
  const student = await getStudentId(id);

  profilePicEstudents.src = student.foto
  nameStudent.value = student.nombre;
  lastNameStudent.value = student.nombre;
  cedulaStudent.value = student.id;
  emailStudent.value = student.email;
  celStudent.value = student.phone;
  passwordStudent.value = student.password;
  confirmPasswordStudent.value = student.password;
  bornDateStudent.value = bornDateStudent.value;
  clan.value = student.clan

}

async function renderStudents() {
  const students = await get(URL_STUDENTS);
  tbody.innerHTML = '';
  students.forEach(student => {
    tbody.innerHTML += `
      <tr>
          <td><img src="${student.foto}" width="50px" height="50px" style="border-radius: 50%;"></td>
          <td>${student.id}</td>
          <td>${student.nombre}</td>
          <td>${student.edad}</td>
          <td>
              <button class="btn btn-danger btn-delete" studentId="${student.id}">Delete</button>
          </td>
      </tr>
      `
/*       <button class="btn btn-dark btn-edit" studentId="${student.id}">Edit</button> */
  });
};

renderStudents();


document.body.addEventListener('click', event => {
  const id = event.target.getAttribute("studentId");
  const studentToAction = `${URL_STUDENTS}/${id}`
  if (event.target.classList.contains("btn-delete")) {
    deleteHttp(studentToAction);
  } if (event.target.classList.contains("btn-edit")) {
    fillStudent(studentToAction);
  }
})