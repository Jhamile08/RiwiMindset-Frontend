const url = "http://localhost:3000";

//Interaccion de botones 

function cambiarContenido(opcion) {
    let brainHome = document.querySelector(".contenedor-img");
    switch (opcion) {
      case "Mindset":
        brainHome.innerHTML = ` <div class="Mindset">
        <h2>Que es MindSet</h2>
        <img src="./img/logo.png" alt="Logo MindSet">
        <p>Somo una pagina web enfocada en la salud de nuestros coders, un espacio en donde podras recibir ayuda de confianza!</p>
        </div>`;
        break;

      case "Ayuda-Inmediata":
        brainHome.innerHTML = ` 
        <div class="help">
        <h2>AYUDA INMEDIATA</h2>
        <p>Si estas pasando por un mal momento no dudes en buscar ayuda inmediata, recuerda que puedes nivelar tus conocimientos atraves de nuestros test </p>
        </div>`;
        break;
  
      case "Especialistas":
        brainHome.innerHTML = ` 
        <div class="specialist">
        <h2>ESPECIALISTAS</h2>
        <p>Contamos con un equipo de profesionales altamente capacitados que están listos para ayudarte en tu proceso personal.Agendar una cita con nosotros es el primer paso hacia una vida más equilibrada y feliz. Entendemos que cada persona es única y, por eso, nos enfocamos en brindarte un servicio personalizado que se adapte a tus necesidades específicas.</p>
        </div>`;
        break;
  
      case "Espacios":
        brainHome.innerHTML = ` 
        <div class="spaces">
        <h2>ESPACIOS</h2>
        <p>
        Contamos con espacios flexibles y adaptados a tus necesidades, diseñados para brindarte un ambiente cómodo y seguro. Nuestras instalaciones están equipadas para ofrecerte la máxima privacidad y tranquilidad durante tus sesiones.Queremos que te sientas cómodo y seguro mientras trabajamos juntos en tu bienestar mental. </p>
        </div>`;
  
        break;
  
      default:
        break;
    }
};