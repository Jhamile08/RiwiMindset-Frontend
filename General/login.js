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
const passwordPsychologist = document.querySelector("#passwordProfesor");

//Script animation Login
inicioProfesor.addEventListener('click', () => {
    container.classList.add('active');
});
inicioEstudiante.addEventListener('click', () => {
    container.classList.remove('active');
});


/* Descifrar Token */
function decodeToken(token) {
    try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub; // Cambia 'id' por el nombre del campo que contiene el ID en tu token
        localStorage.setItem('userId', userId);
    } catch (error) {
        console.error('Error al decodificar el token:', error);
    }
}

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

    try {
        const response = await fetch('http://localhost:3000/v1/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataCoder),
        });

        const accesToken = await response.json()

        const token = accesToken.access_token;

        if (response.ok) {
            decodeToken(token);
            window.location.href = '../Students/HomeStudents/indexHomeEstudents.html'
            localStorage.setItem('token', JSON.stringify(token));
        }
        else {
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
   
    const formDataPsychologist = {
        document: cedulaPsychologist.value,
        password: passwordPsychologist.value,
    }

    console.log(formDataPsychologist);

    try {
        const response = await fetch('http://localhost:3000/v1/api/auth/login/teacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataPsychologist),
        });

        console.log(response);

        const accesToken = await response.json()

        console.log(accesToken);

        const token = accesToken.access_token;

        console.log(token);

        if (response.ok) {
            decodeToken(token);
            window.location.href = '../Teachers/HomeTeachers/indexTeachersHome.html'
            localStorage.setItem('token', JSON.stringify(token));
        }
        else {
            console.error('Error al iniciar sesion');
        }
    } catch (error) {
        console.error('Error al iniciar sesion', error);
    }
}
