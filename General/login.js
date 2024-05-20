import { URL_CODERS, URL_PSYCHOLOGISTS } from './apiConnection/URLS.js';

// Selectors
const container = document.getElementById('container')
const inicioProfesor = document.getElementById('inicioProfesor');
const inicioEstudiante = document.getElementById('inicioEstudiante');

/* Select Students */
let buttonLoginStudent = document.querySelector('#buttonLoginStudents');
const cedulaCoder = document.querySelector("#cedulaEstudiante");
const passwordCoder = document.querySelector("#passwordEstudiante");

/* Select Psycologist */
let buttonLoginPyschologist = document.querySelector('#buttonLoginPyschologist');
const cedulaPsychologist = document.querySelector("#cedulaProfesor");
const passwordProfesor = document.querySelector("#passwordProfesor");

//Script animation Login
inicioProfesor.addEventListener('click', () => {
    container.classList.add('active');
});
inicioEstudiante.addEventListener('click', () => {
    container.classList.remove('active');
});


/* ----------- LOGIN STUDENTS -------- */
buttonLoginStudent.addEventListener('click', (e) => {
    e.preventDefault()
    validateFormLoginStudents()
})



async function validateFormLoginStudents() {

    const formDataCoder = {
        document: cedulaCoder.value,
        password: passwordCoder.value,
    }

    console.log(formDataCoder);

    try {
        const response = await fetch('http://localhost:3000/v1/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataCoder),
        });

        const token = await response.json()

        if (response.ok) {
            console.log(JSON.stringify(token));
            /*   window.location.href = '../Students/HomeStudents/indexHomeEstudents.html' */
            localStorage.setItem('token', JSON.stringify(token));
        }
        else {
            /* Swal.fire({
                title: "Contraseña incorrecta",
                icon: "error"
            }); */
            console.error('Error al iniciar sesion');
        }
    } catch (error) {
        console.error('Error al iniciar sesion', error);
    }
};










/* ----LOGIN PSICOLOGAS Y ADMIN------- */
buttonLoginPyschologist.addEventListener('click', (e) => {
    e.preventDefault();
    validateLoginForm();
})

async function validateLoginForm() {
    const responsePsychologists = await fetch(`${URL_PSYCHOLOGISTS}/${cedulaPsychologist.value}`);
    const dataPsychologists = await responsePsychologists.json();

    /*     const responseAdmins = await fetch(`${URL_ADMIN}?id=${cedulaProfesor.value}`);
        const dataAdmins = await responseAdmins.json(); */

    const psychologistsExist = dataPsychologists.content && dataPsychologists.content.length > 0;
    /*     const adminsExist = dataAdmins && dataAdmins.length > 0; */

    if (!psychologistsExist /* && !adminsExist */) {
        console.error("Cedula no registrada");
        Swal.fire({
            title: "La Cedula que ingresaste no se encuentra registrada",
            icon: "warning"
        });
        return;
    }

    if (psychologistsExist && dataPsychologists[0].password === passwordProfesor.value) {
        localStorage.setItem("psychologist", dataPsychologists[0].id);
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
