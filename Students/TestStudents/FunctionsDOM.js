// selectors
let contentInfo = document.querySelector(".contentInfoTest");
let containerInfo = document.querySelector(".modal-body");
// cards selectors
let modalTitle = document.querySelector(".modal-title")


export async function renderModal(type){
    // const data = await get(URL_TEST)
    modalTitle.textContent = `${type}`
    contentInfo.innerHTML = `
            <p>Duracion aprox: ${"quemado"}</p>
            <p>Cantidad de preguntas: ${"cantidad"}</p>
    `;

    containerInfo.appendChild(contentInfo);
        
    };