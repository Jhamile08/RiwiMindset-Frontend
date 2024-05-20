import { URL_CODERS } from '../../General/apiConnection/URLS.js';

/* -----------LISTA DE ESTUDIANTES--------- */
const listCoders = document.querySelector("#students");

async function getCoder() {
  const response = await fetch(URL_CODERS);
  const data = await response.json();
  return data.content;
};

async function renderCoders() {
  const coders = await getCoder();
  listCoders.innerHTML = '';
  coders.forEach(coder => {
    listCoders.innerHTML += `
        <a href="/Teachers/UserTeacher/Registrer/IndexTeachersUsers-register.html" type="submit" id="${coder.id}" class="redirect">${coder.name}</a>
        `
  });
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("redirect")) {
    const coderId = e.target.getAttribute("id");
    localStorage.setItem("coderSelectedId", coderId); // Almacenar ID del estudiante seleccionado
  }
});

renderCoders();


const search = document.getElementById("search");
const coders = document.getElementById("students");

search.addEventListener("keyup", () => {
  const filter = search.value.toUpperCase();
  const li = coders.getElementsByTagName("a");

  for (let i = 0; i < li.length; i++) {
    if (li[i].textContent.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}); 