// sidebar toggle
const btnToggle = document.querySelector('.toggle-btn');

const btnButtonLogOut = document.getElementById('btnLogOut');

btnButtonLogOut.addEventListener('click', ()=>{
    localStorage.removeItem("student");
    window.location.href= "../../General/index.html"
});

btnToggle.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('active');
});

const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        removeActiveClasses();
        panel.classList.add("active");
    });
});

function removeActiveClasses() {
    panels.forEach((panel) => {
        panel.classList.remove("active");
    })
}
