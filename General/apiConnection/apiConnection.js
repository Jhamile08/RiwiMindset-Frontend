// METODO POST - para subir algo al json recibe la url donde se va a subir y la info de lo que se va a subir
export async function post(url,info){
    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(info)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// READ - OBTENER DATOS DEL JSON
export async function get(url){
    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// METODO UPDATE - para actualizar datos de la base de datos json
export async function update (url,info){
    try {
        const response = await  fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(info),
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


// METODO DELETE - REcibe la URL de lo que se va a borrar, concatendad con el id
export async function deleteHttp(url){
    try {
        await fetch(url,{
            method: "DELETE",
        });
        console.log("eliminado");
        window.location.href = window.location.href;
    } catch (error) {
        console.error(error);
    }
};