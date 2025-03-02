
let fontSize = 16; 

function aumentarTexto() {
    if (fontSize < 30) { 
fontSize += 2;
document.body.style.fontSize = fontSize + "px";
}
}

function disminuirTexto() {
if (fontSize > 10) { 
fontSize -= 2;
document.body.style.fontSize = fontSize + "px";
}
}

function modoAltoContraste() {
document.body.classList.toggle("alto-contraste");
}
