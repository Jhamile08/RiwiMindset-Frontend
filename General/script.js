import { estudiantes } from "./Data/bd.js"

// Selectors
const container = document.getElementById('container')
const registerBtn = document.getElementById('registrer');
const loginBtn = document.getElementById('login');
let buttonRegistrer = document.querySelector('#buttonRegistrer')
let buttonLogin = document.querySelector('#buttonLogin')

//Script animation Login

registerBtn.addEventListener('click',()=>{
    container.classList.add('active');
})

loginBtn.addEventListener('click',()=>{
    container.classList.remove('active');
})
buttonRegistrer.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log("hola");
    validateFormRegistrer()
})

buttonLogin.addEventListener('click', (e)=>{
    e.preventDefault()
    validateFormLogin()
    console.log("holalogin");
})


// Validate function
// function validateFormRegistrer() {
//     let name = document.querySelector("#name").value
//     let cedula = document.querySelector("#cedula").value
//     let email = document.querySelector("#email").value
//     let password = document.querySelector("#password").value
//     for (let i = 0; i < estudiantes.length; i++) {
//         if (estudiantes[i].cedula === cedula && estudiantes[i].admin === true) {
//             alert("profesor")
//             console.log("hola")
//             break
//         } if (estudiantes[i].cedula == cedula && estudiantes[i].admin === false) {
//             alert("es")
//             console.log("hola2")
//             break
//         } 
//     }
// }

function validateFormLogin(){
    let cedula = document.querySelector("#cedulaIniciar").value
    let password = document.querySelector("#passwordIniciar").value
    console.log(cedula)
    if(cedula == 1 && password == 1){
        setTimeout(function() {
            // Cambia la URL a la que quieres redirigirte
            window.location.href = "/Teachers/HomeTeachers/indexTeachersHome.html"
          }, 100); // 10000 milisegundos = 10 segundos
        }else if(cedula == 2 && password == 2){
            setTimeout(function() {
                // Cambia la URL a la que quieres redirigirte
                window.location.href = "/Students/HomeStudents/indexHomeEstudents.html"
              }, 100); // 10000 milisegundos = 10 segundos
            }
        
    }

    // for (let i = 0; i < estudiantes.length; i++) {
    //     if (estudiantes[i].cedula == cedula && estudiantes[i].contrasena == password) {
    //         if(estudiantes[i].admin == false ){
    //             alert("estudent")
    //             console.log("hola")
    //             break
    //         }
    //     }else if (estudiantes[i].admin == true) {
    //         if(estudiantes[i].cedula == cedula && estudiantes[i].contrasena == password){
    //             alert("profesor")
    //             console.log("hola")
    //             break
    //         }
    //     } 
    // }}
    /* for (let i = 0; i < estudiantes.length; i++){
        if (estudiantes[i].admin == true && Number(estudiantes[i].cedula) == Number(cedula) && Number(estudiantes[i].password) == Number(password)){
            alert("Profe")
            break
        }else if(Number(estudiantes[i].cedula) == Number(cedula) && Number(estudiantes[i].password) == Number(password)){
            alert("Estudent")
            break
        }else {
            alert("Este usuario no está registrado")
            break
        }
    } */



// Realizar la injeccion de los usuarios