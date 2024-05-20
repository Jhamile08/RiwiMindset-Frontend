import { URL_CODERS } from "../../General/apiConnection/URLS.js";

/* SELECT */
const photoCoder = document.querySelector("#fotoStudent");
const nameStudent = document.querySelector("#nameStudent");
const clanStudent = document.querySelector("#clanStudent");

// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("userId");
console.log(selectedStudentId);

async function getStudent(selectedStudentId) {
  const response = await fetch(`${URL_CODERS}/${selectedStudentId}`);
  const data = await response.json();
  return data;
}

async function inyect() {
  const coder = await getStudent(selectedStudentId);

  photoCoder.src = coder.photo;
  nameStudent.textContent = coder.name;
  clanStudent.textContent = coder.clan;
}

(async () => {
  await inyect();
})();
