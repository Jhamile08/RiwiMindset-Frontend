import { URL_STUDENTS } from "../../General/apiConnection/URLS.js";

/* SELECT */
const fotoStudent = document.querySelector("#fotoStudent");
const nameStudent = document.querySelector("#nameStudent");
const cedulaStudent = document.querySelector("#cedulaStudent");


// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("student");
console.log(selectedStudentId);

async function getStudent(studentId) {
    const response = await fetch(`${URL_STUDENTS}/${studentId}`);
    const data = await response.json();
    return data;
};

async function inyect() {
    const student = await getStudent(selectedStudentId);

    fotoStudent.src = student.foto;
    nameStudent.textContent = student.nombre;
    cedulaStudent.textContent = student.cedula;
};

(async () => {
    await inyect();
})();