/* -----------LISTA DE ESTUDIANTES--------- */

const urlBase = "http://localhost:4002/";
const listStudents = document.querySelector("#students");

async function getStudent() {
  const response = await fetch(`${urlBase}students`);
  const data = response.json();
  return data;
};

async function renderStudents() {
  const students = await getStudent();
  listStudents.innerHTML = '';
  students.forEach(student => {
    listStudents.innerHTML += `
        <a href="/Teachers/UserTeacher/Registrer/IndexTeachersUsers-register.html" type="submit" id="${student.id}" class="redirect">${student.nombre}</a>
        `
  });
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("redirect")) {
    const studentId = e.target.getAttribute("id");
    localStorage.setItem("selectedStudentId", studentId); // Almacenar ID del estudiante seleccionado
  }
});

renderStudents();


const search = document.getElementById("search");
const students = document.getElementById("students");

search.addEventListener("keyup", () => {
  const filter = search.value.toUpperCase();
  const li = students.getElementsByTagName("a");

  for (let i = 0; i < li.length; i++) {
    if (li[i].textContent.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}); 