import { URL_PSYCHOLOGISTS } from "../../General/apiConnection/URLS.js";

/* SELECT */
const photoPsychologist = document.querySelector("#fotoTeacher");
const nameTeacher = document.querySelector("#nameTeacher");

// Obtener el ID del estudiante del localStorage
const selectedTeacherId = localStorage.getItem("userId");

async function getTeacher(TeacherId) {
  const response = await fetch(`${URL_PSYCHOLOGISTS}/${selectedTeacherId}`);
  const data = await response.json();
  return data;
}

async function inyect() {
  const teacher = await getTeacher(selectedTeacherId);

  photoPsychologist.src = teacher.photo;
  nameTeacher.textContent = teacher.name;
}

(async () => {
  await inyect();
})();
