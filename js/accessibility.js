
let fontSize = localStorage.getItem("fontSize") ? parseInt(localStorage.getItem("fontSize")) : 16;
document.body.style.fontSize = fontSize + "px";

let altoContraste = localStorage.getItem("altoContraste") === "true";
if (altoContraste) {
    document.body.classList.add("alto-contraste");
}
console.log(localStorage.getItem("altoContraste")); // Para verificar que el valor se lee correctamente

function aumentarTexto() {
    if (fontSize < 30) { 
        fontSize += 2;
        document.body.style.fontSize = fontSize + "px";
        localStorage.setItem("fontSize", fontSize); // Guardar en localStorage
    }
}

function disminuirTexto() {
    if (fontSize > 10) { 
        fontSize -= 2;
        document.body.style.fontSize = fontSize + "px";
        localStorage.setItem("fontSize", fontSize); // Guardar en localStorage
    }
}

// function modoAltoContraste() {
//     document.body.classList.toggle("alto-contraste");
//     localStorage.setItem("altoContraste", document.body.classList.contains("alto-contraste"));
// }

function modoAltoContraste() {
    if (document.body.classList.contains("alto-contraste")) {
        document.body.classList.remove("alto-contraste");
    } else {
        document.body.classList.add("alto-contraste");
    }
    localStorage.setItem("altoContraste", document.body.classList.contains("alto-contraste"));
}

