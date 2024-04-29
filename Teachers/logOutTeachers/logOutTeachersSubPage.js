const btnLogOutSubPage = document.getElementById('btnLogOutSubPage');

btnLogOutSubPage.addEventListener('click', ()=>{
    localStorage.removeItem("teacher");
    window.location.href= "../../../General/indexLogin.html"
})
