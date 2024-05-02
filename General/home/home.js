const url = "http://localhost:3000";

//Interaccion de botones 

function cambiarContenido(opcion) {
    let brainHome = document.querySelector(".contenedor-img");
    switch (opcion) {
      case "Mindset":
        brainHome.innerHTML = ` <div class="Mindset">
        <h2>Que es MindSet</h2>
        <img src="/img/logo.png" alt="Logo MindSet">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa id deleniti molestiae quos mollitia debitis officiis esse necessitatibus, sequi animi modi corrupti consequatur at provident fugiat obcaecati quo quis autem!</p>
        </div>`;
        break;

      case "Ayuda-Inmediata":
        brainHome.innerHTML = ` 
        <div class="help">
        <h2>AYUDA INMEDIATA</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nihil nulla saepe. Itaque officia similique commodi natus. Cum ullam asperiores ipsum voluptates voluptas a molestias atque, similique explicabo eos aliquam!</p>
        </div>`;
        break;
  
      case "Especialistas":
        brainHome.innerHTML = ` 
        <div class="specialist">
        <h2>ESPECIALISTAS</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nihil nulla saepe. Itaque officia similique commodi natus. Cum ullam asperiores ipsum voluptates voluptas a molestias atque, similique explicabo eos aliquam!</p>
        <img src="/img/lalili.png" alt="lili">
        </div>`;
        break;
  
      case "Espacios":
        brainHome.innerHTML = ` 
        <div class="spaces">
        <h2>ESPACIOS</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nihil nulla saepe. Itaque officia similique commodi natus. Cum ullam asperiores ipsum voluptates voluptas a molestias atque, similique explicabo eos aliquam!</p>
        </div>`;
  
        break;
  
      default:
        break;
    }
};