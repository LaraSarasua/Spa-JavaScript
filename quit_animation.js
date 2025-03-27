document.addEventListener("DOMContentLoaded", function() {
    let titulo = document.querySelector("h1");
    titulo.addEventListener("animationend", function() {
        titulo.style.borderRight = "none";
    });
});