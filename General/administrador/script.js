import {
  URL_CODERS,
  URL_PSYCHOLOGISTS,
  URL_PREGUNTAS,
} from "../apiConnection/URLS.js";
import {
  post,
  get,
  update,
  deleteHttp,
} from "../apiConnection/apiConnection.js";

/* img */
let profilePicEstudents = document.getElementById("profilePictureEstudents");
let inputFileEstudents = document.getElementById("inputFileEstudents");

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
const containerFormEstudents = document.querySelector(
  "#containerFormEstudents"
);
const containerFormTeachers = document.querySelector("#containerFormTeachers");
const containerFormTest = document.querySelector("#containerFormTest");

const usersList = document.querySelector(".usersList");
const testList = document.querySelector(".testList");
const psychologistList = document.querySelector(".psychologistList");

const buttonStudentAdd = document.querySelector(".buttonStudentAdd");
const buttonTestAdd = document.querySelector(".buttonTestAdd");

/* Event Listener Vistas */

header.addEventListener("click", () => {
  containerForms.style.display = "none";
  buttonStudents.style.display = "block";
  buttonPsicologyst.style.display = "block";
  buttonTest.style.display = "block";
  usersList.style.display = "none";
  psychologistList.style.display = "none";
  testList.style.display = "none";
});

/* BOTON CODER */

buttonStudents.addEventListener("click", () => {
  containerFormEstudents.style.display = "none";
  containerFormTeachers.style.display = "none";
  containerFormTest.style.display = "none";
  buttonStudents.style.display = "none";
  buttonPsicologyst.style.display = "none";
  buttonTest.style.display = "none";
  usersList.style.display = "block";
});

buttonTest.addEventListener("click", () => {
  containerFormEstudents.style.display = "none";
  containerFormTeachers.style.display = "none";
  containerFormTest.style.display = "none";
  buttonStudents.style.display = "none";
  buttonPsicologyst.style.display = "none";
  buttonTest.style.display = "none";
  testList.style.display = "block";
});

buttonStudentAdd.addEventListener("click", () => {
  containerForms.style.display = "block";
  containerFormEstudents.style.display = "block";
  usersList.style.display = "none";
});
buttonTestAdd.addEventListener("click", () => {
  containerForms.style.display = "block";
  containerFormTest.style.display = "block";
  testList.style.display = "none";
});

/* BOTON PSICOLOGA */
buttonPsicologyst.addEventListener("click", () => {
  containerFormEstudents.style.display = "none";
  containerFormTeachers.style.display = "none";
  buttonStudents.style.display = "none";
  buttonPsicologyst.style.display = "none";
  buttonTest.style.display = "none";
  usersList.style.display = "none";
});

/* -------STUDENTS------- */

/* Events */
formStudents.addEventListener("submit", (event) => {
  event.preventDefault();
  registerStudent();
});

let photoUrl;

document
  .getElementById("buttonRegister")
  .addEventListener("click", function () {
    const fileInput = document.getElementById("inputFileEstudents");
    const file = fileInput.files[0];

    if (!file) {
      alert("Porfavor seleccione un archivo");
      return;
    }

    // Replace with your own Cloudinary API endpoint and preset
    const cloudName = "dycsevcp0";
    const uploadPreset = "RiwiMindset-files";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    photoUrl = fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => data.secure_url)
      .catch((error) => {
        console.error("Error uploading the image:", error);
      });
  });

async function registerStudent() {
  /* Select */
  const formStudents = document.querySelector("#formStudents").value;
  const nameStudent = document.querySelector("#nameStudent").value;
  const documentCoder = document.querySelector("#idStudent").value;
  const emailStudent = document.querySelector("#emailStudent").value;
  const celStudent = document.querySelector("#celStudent").value;
  const bornDateStudent = document.querySelector("#bornDateStudent").value;
  const clan = document.querySelector("#clan").value;
  const studentId = document.querySelector("#studentId").value;
  const password = document.querySelector("#password").value;
  const rol = document.querySelector("#role").value;

  newStudent = {
    name: nameStudent,
    photo: await photoUrl, // Asigna la URL base64 del objeto newStudent
    email: emailStudent,
    password: password,
    phone: celStudent,
    document: documentCoder,
    dateBirth: bornDateStudent,
    role: rol,
    clan: clan,
  };

console.log(newStudent);
  console.log(typeof nameStudent);
  console.log(typeof documentCoder);
  console.log(typeof emailStudent);
  console.log(typeof celStudent);
  console.log(typeof bornDateStudent);
  console.log(typeof clan);
  console.log(typeof password);
  console.log(typeof rol);

  if (studentId) {
    try {
      await updateCoder(studentId.value, newStudent);
      alert("coder actualizado correctamente");
    } catch (error) {
      console.log("Error el actualizar el coder", error);
      alert("Error al actualizar.");
    }
  } else {
    try {
      const response = await fetch(URL_CODERS);
      if (!response.ok) {
        throw new Error("Error al obtener el coder");
      }
      const data = await response.json();

      const documentExists = data.content.some(
        (coder) => coder.document === document
      );
      if (documentExists) {
        alert("el documento ya se encuentra registrado");
        return;
      }
      await post("http://localhost:3000/v1/api/students/register", newStudent);
      alert("Coder registrado correctamente");
    } catch (error) {
      console.error("error al realizar la operacion:", error);
      alert("Error al procesar la operaciom.");
    }
  }
}
async function updateCoder(studentId, updatedTest) {
  const url = `${URL_CODERS}/${studentId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTest),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el coder");
  }
}

/* INYECTAR USUARIOS */

async function getStudentId(id) {
  const response = await fetch(`${URL_CODERS}/${id}`);
  const data = await response.json();
  return data;
}

async function fillStudent(id) {
  const coder = await getStudentId(id);

  document.querySelector("#formStudents");
  document.querySelector("#nameStudent").value = coder.nombre;
  document.querySelector("#lastNameStudent").value = coder.nombre;
  document.querySelector("#idStudent").value = coder.id;
  document.querySelector("#emailStudent").value = coder.email;
  document.querySelector("#celStudent").value = coder.phone;
  document.querySelector("#bornDateStudent").value = coder.bornDateStudent;
  document.querySelector("#clan").value = coder.clan;

  // profilePicEstudents.src = coder.foto

  containerForms.style.display = "block";
  containerFormTest.style.display = "block";
  formStudents.style.display = "none";
}

async function renderCoders() {
  const coders = await get(URL_CODERS);
  console.log(coders);
  tbody.innerHTML = "";
  coders.content.forEach((coder) => {
    tbody.innerHTML += `
      <tr>
          <td><img src="${coder.photo}" width="50px" height="50px" style="border-radius: 50%;"></td>
          <td>${coder.document}</td>
          <td>${coder.name}</td>
          <td>${coder.clan}</td>
          <td>
              <button class="btn btn-info btn-info" studentId="${coder._id}">EDITAR</button>
              <button class="btn btn-danger btn-delete" studentId="${coder._id}">Delete</button>
          </td>
      </tr>
      `;
    /*       <button class="btn btn-dark btn-edit" studentId="${student.id}">Edit</button> */
  });
}

renderCoders();

// Event listener para edición y eliminación de tests
document.body.addEventListener("click", (event) => {
  const id = event.target.getAttribute("studentId");
  console.log(id);
  if (id) {
    const studentToAction = `${URL_PREGUNTAS}/${id}`;
    if (event.target.classList.contains("btn-delete")) {
      deleteHttp(studentToAction);
      renderTest(); // Vuelve a renderizar los tests para reflejar los cambios
    } else if (event.target.classList.contains("btn-edit")) {
      fillStudent(id);
    }
  }
});

// Inicializar la renderización de los tests
renderCoders();

/* ---------PSYCHOLOGISTS--------- */

let profilePicturePsychologists = document.getElementById(
  "profilePicturepsychologists"
);
let inputFileTeachers = document.getElementById("inputFilePsychologists");

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
const formPsychologists = document.querySelector("#formPsychologists");
const namePsychologists = document.querySelector("#namePsychologists");
const lastNamePsychologists = document.querySelector("#lastNamePsychologists");
const emailPsychologists = document.querySelector("#emailPsychologists");
const cedulaPsychologist = document.querySelector("#idPsychologist");
const passwordPsychologists = document.querySelector("#passwordPsychologists");
const confirmPasswordPsychologists = document.querySelector(
  "#confirmPasswordPsychologists"
);

/* Events */
formPsychologists.addEventListener("submit", (event) => {
  event.preventDefault();

  registerPsychologists();
});

/* Funcion que verifica que todos los datos sean correctos y no se encuentren en la base de datos actual */
async function registerPsychologists() {
  const response = await fetch(URL_PSYCHOLOGISTS);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === cedulaPsychologist.value) {
      alert("Cedula ya se encuentra registrada");
      return;
    }

    if (data[i].email === emailPsychologists.value) {
      alert("Email ya se encuentra registrado");
      return;
    }
  }

  if (
    passwordPsychologists.value !== confirmPasswordPsychologists.value ||
    confirmPasswordPsychologists.value !== passwordPsychologists.value
  ) {
    alert("Ambas contrasenas deben ser iguales");
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
  alert("Registrado exitosamente");
}

/* -------TEST------- */
/* Select from create form */
const formTest = document.querySelector("#formTest");
const question = document.querySelector("#Question");
const correctAnswer = document.querySelector("#correctAnswer");
const answerOne = document.querySelector("#AnswerOne");
const answerTwo = document.querySelector("#AnswerTwo");
const answerThree = document.querySelector("#AnswerThree");
const type = document.querySelector("#type");
const testId = document.querySelector("#testId");

formTest.addEventListener("submit", (event) => {
  event.preventDefault();

  createTest();
});
let newTest = {};

async function createTest() {
  const testId = document.getElementById("testId").value;
  const question = document.getElementById("question").value;
  const correctAnswer = document.getElementById("correctAnswer").value;
  const answerOne = document.getElementById("answerOne").value;
  const answerTwo = document.getElementById("answerTwo").value;
  const answerThree = document.getElementById("answerThree").value;
  const type = document.getElementById("type").value;

  let newTest = {
    idQuestion: testId,
    typeQuestion: type,
    question: question,
    answers: [correctAnswer, answerOne, answerTwo, answerThree],
  };

  if (testId) {
    // Si testId tiene un valor, se está editando un test existente
    try {
      await updateCoder(testId, newTest);
      alert("Test actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el test:", error);
      alert(
        "Error al actualizar el test. Verifica la consola para más detalles."
      );
    }
  } else {
    // Verificar si la pregunta ya existe antes de crearla
    try {
      const response = await fetch(URL_PREGUNTAS);
      if (!response.ok) {
        throw new Error("Error al obtener las preguntas");
      }
      const data = await response.json();

      // Verificar si la pregunta ya existe en los datos obtenidos
      const questionExists = data.content.some(
        (test) => test.question === question
      );
      if (questionExists) {
        alert("La pregunta ya se encuentra registrada");
        return;
      }

      // Si no existe, crear la nueva pregunta
      await postTest(newTest);
      alert("Pregunta registrada exitosamente");
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      alert(
        "Error al procesar la operación. Verifica la consola para más detalles."
      );
    }
  }
}

async function updateTest(testId, updatedTest) {
  const url = `${URL_PREGUNTAS}/${testId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTest),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el test");
  }
}

async function postTest(newTest) {
  const response = await fetch(URL_PREGUNTAS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTest),
  });

  if (!response.ok) {
    throw new Error("Error al crear la pregunta");
  }
}

/* INYECTAR TEST */

async function getTestId(id) {
  const response = await fetch(`${URL_PREGUNTAS}/${id}`);
  const data = await response.json();
  return data;
}

async function fillTest(id) {
  const test = await getTestId(id);
  // solo adkfjasdlkfj
  document.getElementById("testId").value = test.idQuestion;
  document.getElementById("type").value = test.typeQuestion;
  document.getElementById("question").value = test.question;
  document.getElementById("correctAnswer").value = test.answers[0];
  document.getElementById("answerOne").value = test.answers[1];
  document.getElementById("answerTwo").value = test.answers[2];
  document.getElementById("answerThree").value = test.answers[3];

  // Mostrar el formulario de edición
  containerForms.style.display = "block";
  containerFormTest.style.display = "block";
  testList.style.display = "none";
}

async function renderTest() {
  const tests = await get(URL_PREGUNTAS);
  tbodyTest.innerHTML = "";
  tests.content.forEach((test) => {
    tbodyTest.innerHTML += `
      <tr>
          <td>${test.idQuestion}</td>
          <td>${test.typeQuestion}</td>
          <td>${test.question}</td>
          <td>${test.answers[0]}</td>
          <button class="btn btn-danger btn-delete" testId="${test.idQuestion}">Delete</button>
          <button class="btn btn-info btn-edit" testId="${test.idQuestion}">EDITAR</button>
      </tr>

      `;
  });
}

// Event listener para edición y eliminación de tests
document.body.addEventListener("click", (event) => {
  const id = event.target.getAttribute("testId");
  if (id) {
    const testToAction = `${URL_PREGUNTAS}/${id}`;
    if (event.target.classList.contains("btn-delete")) {
      deleteHttp(testToAction);
      renderTest(); // Vuelve a renderizar los tests para reflejar los cambios
    } else if (event.target.classList.contains("btn-edit")) {
      fillTest(id);
    }
  }
});

// Inicializar la renderización de los tests
renderTest();
