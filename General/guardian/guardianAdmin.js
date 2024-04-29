(()=>{
    const company = localStorage.getItem("admin");

    if (!company){
        window.location.href = "../index.html"
    }
}
)(); 