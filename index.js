function acessibilidad(e) {
    let Ndiv = document.createElement("div");
    let bLetra = document.createElement("button");
    bLetra.id = "LetraGrande";
    bLetra.textContent = "Agrandar letra";
    Ndiv.style.backgroundColor = "white"
    Ndiv.appendChild(bLetra);
    document.body.appendChild(Ndiv);
}

let DATOS = [];
function verAmigos() {
    let tabla = document.getElementById("amigos");
    if (tabla.style.display == "none") {
        tabla.style.display = "block"
    } else tabla.style.display = "none"
}
function listaDeAmigos(amigos) {
    let table = document.getElementById("amigos");
    let tr = document.createElement("tr");
    let titulo = document.createElement("th");
    titulo.textContent = "Amigos";
    table.appendChild(titulo);
    for (let i = 0; i < amigos.length; i++) {
        let tr2 = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = amigos[i];
        if (i % 2 == 0) {
            td.style.backgroundColor = "gray";
        }
        tr2.appendChild(td);
        table.appendChild(tr2);
    }
    table.style.display = "none";
}
async function datosjson(funcion) {
    try {
        let r = await fetch("./datos.json");
        DATOS = await r.json();
        funcion();
    } catch (error) {
        console.log("no existe")
    }
}
datosjson(usuarios);
function usuarios(datosUsuario = null, lista = true) {
    if (!datosUsuario) {
        datosUsuario = DATOS["usuarios"][0];
    }
    let usuario = document.getElementById("username")
    let nivel = document.getElementById("nivel")
    let ganadas = document.getElementById("ganadas")
    let perdidas = document.getElementById("perdidas")
    usuario.textContent = datosUsuario["username"];
    ganadas.textContent = datosUsuario["ganadas"];
    nivel.textContent = datosUsuario["nivel"]
    perdidas.textContent = datosUsuario["perdidas"]
    if (lista) {
        listaDeAmigos(datosUsuario['amigos']);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let busqueda = document.getElementById("buscar");
    if (busqueda) {
        busqueda.addEventListener("click", function (event) {
            event.preventDefault();
            let h2 = document.getElementById("respuesta");
            let div = document.getElementById("perfil");
            let usu = document.getElementById("usuarioInput").value;
            if (!buscarUsuario(usu)) {
                div.style.display = "none";
                h2.textContent = "El usuario que buscas no existe";
                h2.style.color = "red";
            } else {
                perfil.style.display = "block";
                h2.textContent = "Usuario encontrado";
                h2.style.color = "white";
            }
        });
    }
})
function buscarUsuario(usuario) {
    for (let i = 0; i < DATOS["usuarios"].length; i++) {
        if (DATOS["usuarios"][i]["username"] == usuario) {
            usuarios(DATOS["usuarios"][i], false);
            return true;
        }
    }
    return false;
}
