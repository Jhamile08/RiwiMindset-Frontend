    const btnButtonLogOut = document.getElementById('btnLogOut');

    btnButtonLogOut.addEventListener('click', ()=>{
        localStorage.removeItem("teacher");
        window.location.href= "../../General/index.html"
    });
//id="btnLogOut"