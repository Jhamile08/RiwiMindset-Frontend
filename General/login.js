import {URL_STUDENTS, URL_PSYCHOLOGISTS, URL_ADMIN} from './apiConnection/URLS.js';
// Selectors
const container = document.getElementById('container')
const inicioProfesor = document.getElementById('inicioProfesor');
const inicioEstudiante = document.getElementById('inicioEstudiante');

/* Select Students */
let buttonLoginStudent = document.querySelector('#buttonLoginStudents');
const cedulaStudent = document.querySelector("#cedulaEstudiante");
const passwordStudent = document.querySelector("#passwordEstudiante");

/* Select Psycologist */
let buttonLoginPyschologist = document.querySelector('#buttonLoginPyschologist');
const cedulaProfesor = document.querySelector("#cedulaProfesor");
const passwordProfesor = document.querySelector("#passwordProfesor");

//Script animation Login
inicioProfesor.addEventListener('click',()=>{
    container.classList.add('active');
});
inicioEstudiante.addEventListener('click',()=>{
    container.classList.remove('active');
});


/* ----------- LOGIN STUDENTS -------- */
buttonLoginStudent.addEventListener('click', (e)=>{
    e.preventDefault()
    validateFormLoginStudents()
})
async function validateFormLoginStudents(){
    const response = await fetch(`${URL_STUDENTS}?id=${cedulaStudent.value}`);
    const data = await response.json();

    if (!data || data.length === 0){
        console.error("Cedula no registrado");
        Swal.fire({
            title: "La Cedula que ingresaste no se encuentra registrada",
            icon: "warning"
          });
        return;
    }

    if(data[0].password != passwordStudent.value){
        console.error("Contrasena incorrecta");
        Swal.fire({
            title: "Contraseña incorrecta",
            icon: "error"
          });
        return;
    }

    localStorage.setItem("student",data[0].id);
    window.location.href = "../Students/HomeStudents/indexHomeEstudents.html"
}

/* ----LOGIN PSICOLOGAS Y ADMIN------- */
buttonLoginPyschologist.addEventListener('click', (e)=>{
    e.preventDefault();
    validateLoginForm();
})

async function validateLoginForm() {
    const responsePsychologists = await fetch(`${URL_PSYCHOLOGISTS}?id=${cedulaProfesor.value}`);
    const dataPsychologists = await responsePsychologists.json();
    
    const responseAdmins = await fetch(`${URL_ADMIN}?id=${cedulaProfesor.value}`);
    const dataAdmins = await responseAdmins.json();
    
    const psychologistsExist = dataPsychologists && dataPsychologists.length > 0;
    const adminsExist = dataAdmins && dataAdmins.length > 0;
    
    if (!psychologistsExist && !adminsExist) {
        console.error("Cedula no registrada");
        Swal.fire({
            title: "La Cedula que ingresaste no se encuentra registrada",
            icon: "warning"
        });
        return;
    }
    
    if (psychologistsExist && dataPsychologists[0].password === passwordProfesor.value) {
        localStorage.setItem("teacher",dataPsychologists[0].id);
        window.location.href = "../Teachers/HomeTeachers/indexTeachersHome.html";
        return;
    }
    
    if (adminsExist && dataAdmins[0].password === passwordProfesor.value) {
        localStorage.setItem("admin", dataAdmins[0].id);
        window.location.href = "./administrador/index.html";
        return;
    }
    
    console.error("Contraseña incorrecta");
    Swal.fire({
        title: "Contraseña incorrecta",
        icon: "error"
    });
}
