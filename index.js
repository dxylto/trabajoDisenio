function acessibilidad(e){
    let Ndiv = document.createElement("div");
    let bLetra = document.createElement("button");
    bLetra.id = "LetraGrande";    
    bLetra.textContent = "Agrandar letra";
    Ndiv.style.backgroundColor = "white"
    Ndiv.appendChild(bLetra);
    document.body.appendChild(Ndiv);
}