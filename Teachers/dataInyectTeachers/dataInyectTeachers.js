import { URL_PSYCHOLOGISTS } from "../../General/apiConnection/URLS.js";

/* SELECT */
const fotoTeacher = document.querySelector("#fotoTeacher");
const nameTeacher = document.querySelector("#nameTeacher");

// Obtener el ID del estudiante del localStorage
const selectedTeacherId = localStorage.getItem("teacher");

async function getTeacher(TeacherId) {
    const response = await fetch(`${URL_PSYCHOLOGISTS}/${TeacherId}`);
    const data = await response.json();
    return data;
};

async function inyect() {
    const teacher = await getTeacher(selectedTeacherId);

    fotoTeacher.src = teacher.foto;
    nameTeacher.textContent = teacher.nombre;
};

(async () => {
    await inyect();
})();