(()=>{
    const admin = localStorage.getItem("rol");

    if (!admin){
        window.location.href = "../home/home.html"
    }
}
)(); 