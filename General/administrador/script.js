import { URL_CODERS, URL_PSYCHOLOGISTS } from '../apiConnection/URLS.js';
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

/* Vista Botonoes */
const header = document.querySelector(".header");

const buttonStudents = document.querySelector(".buttonStudent");
const buttonPsicologyst = document.querySelector(".buttonPsicologyst");
const buttonTest = document.querySelector(".buttonTest");

const containerForms = document.querySelector(".containerForms");
const containerFormEstudents = document.querySelector("#containerFormEstudents");
const containerFormTeachers = document.querySelector("#containerFormTeachers");

const usersList = document.querySelector(".usersList");

const buttonStudentAdd = document.querySelector(".buttonStudentAdd")

/* Event Listener Vistas */

header.addEventListener('click',()=>{
  containerForms.style.display="none";
  buttonStudents.style.display="block";
  buttonPsicologyst.style.display="block";
  buttonTest.style.display="block";
  usersList.style.display="none";
})

/* BOTON CODER */

buttonStudents.addEventListener('click',()=>{
  containerFormEstudents.style.display="none";
  containerFormTeachers.style.display="none";
  buttonStudents.style.display="none";
  buttonPsicologyst.style.display="none";
  buttonTest.style.display="none";
  usersList.style.display="block";
})

buttonStudentAdd.addEventListener('click',()=>{
  containerForms.style.display="block"
  containerFormEstudents.style.display="block";
  usersList.style.display="none";
})

/* BOTON PSICOLOGA */
buttonPsicologyst.addEventListener('click',()=>{
  containerFormEstudents.style.display="none";
  containerFormTeachers.style.display="none";
  buttonStudents.style.display="none";
  buttonPsicologyst.style.display="none";
  buttonTest.style.display="none";
  usersList.style.display="none";
})

/* -------STUDENTS------- */
/* Select */
const formStudents = document.querySelector('#formStudents');
const nameStudent = document.querySelector('#nameStudent');
const lastNameStudent = document.querySelector('#lastNameStudent');
const cedulaStudent = document.querySelector("#idStudent")
const emailStudent = document.querySelector('#emailStudent');
const celStudent = document.querySelector('#celStudent');
const bornDateStudent = document.querySelector('#bornDateStudent');
const clan = document.querySelector('#clan');
const studentId = document.querySelector("#studentId");


/* Events */
formStudents.addEventListener('submit', event => {
  event.preventDefault();
  console.log(typeof(inputFileEstudents.value));
  console.log(typeof(cedulaStudent.value));
  registerStudent();
});

let photoUrl;

document.getElementById('buttonRegister').addEventListener('click', function () {
  const fileInput = document.getElementById('inputFileEstudents');
  const file = fileInput.files[0];

  if (!file) {
      alert("Porfavor seleccione un archivo");
      return;
  }

  // Replace with your own Cloudinary API endpoint and preset
  const cloudName = 'dycsevcp0';
  const uploadPreset = 'RiwiMindset-files';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  photoUrl = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => data.secure_url)
  .catch(error => {
      console.error('Error uploading the image:', error);
  });
  
})

async function registerStudent() {

  const cedulaConvertida = parseInt(cedulaStudent.value);

  newStudent = {
    name: `${nameStudent.value} ${lastNameStudent.value}`,
    clan: clan.value,
    phone: celStudent.value,
    email: emailStudent.value,
    dateborn: bornDateStudent.value,
    photo: await photoUrl, // Asigna la URL base64 del objeto newStudent
    cc: cedulaConvertida,
  };

  if (studentId.value) {
    await update(studentId.value, newStudent);

  } else {

    const response = await fetch(URL_CODERS);
    const data = await response.json();

    for (let i = 0; i < data.content.length; i++) {
      if (data.content[i].id === cedulaStudent.value) {
        alert('Cedula ya se encuentra registrada');
        return;
      }

      if (data.content[i].email === emailStudent.value) {
        alert('Email ya se encuentra registrado');
        return;
      }
    }

    console.log(newStudent);
    post(URL_CODERS, newStudent);
    
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
  return data.content;
};

async function fillStudent(id) {
  const coder = await getStudentId(id);

  profilePicEstudents.src = coder.foto
  nameStudent.value = coder.nombre;
  lastNameStudent.value = coder.nombre;
  cedulaStudent.value = coder.id;
  emailStudent.value = coder.email;
  celStudent.value = coder.phone;
  bornDateStudent.value = bornDateStudent.value;
  clan.value = coder.clan

}

async function renderCoders() {
  const coders = await get(URL_CODERS);
  tbody.innerHTML = '';
  coders.content.forEach(coder => {
    tbody.innerHTML += `
      <tr>
          <td><img src="${coder.photo}" width="50px" height="50px" style="border-radius: 50%;"></td>
          <td>${coder.cc}</td>
          <td>${coder.name}</td>
          <td>${coder.clan}</td>
          <td>
              <button class="btn btn-info btn-info" studentId="${coder.id}">EDITAR</button>
              <button class="btn btn-danger btn-delete" studentId="${coder.id}">Delete</button>
          </td>
      </tr>
      `
/*       <button class="btn btn-dark btn-edit" studentId="${student.id}">Edit</button> */
  });
};



renderCoders();


document.body.addEventListener('click', event => {
  const id = event.target.getAttribute("studentId");
  const studentToAction = `${URL_CODERS}/${id}`
  if (event.target.classList.contains("btn-delete")) {
    deleteHttp(studentToAction);
  } if (event.target.classList.contains("btn-edit")) {
    fillStudent(studentToAction);
  }
})
