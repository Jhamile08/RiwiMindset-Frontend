const btnButtonLogOut = document.getElementById('btnLogOut');

btnButtonLogOut.addEventListener('click', ()=>{
    localStorage.removeItem("student");
    window.location.href= "../../General/index.html"
});