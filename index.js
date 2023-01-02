"use strict";

// classes de marcação de célula:  cell-O e cell-X

const selecionado = document.querySelector("#bolinha-x");
const map = document.querySelector("#map");

function game(start) {
    console.log(start);
}

function startGame(event) {
    const x = document.querySelector("#x");
    const bolinha = document.querySelector("#bolinha");
    let start = null;
    if(event.target === x) {
        start = 1;
    } else if(event.target === bolinha) {
        start = 2;
    }
    game(start);
}

selecionado.addEventListener("click", function(event) {
    if (event.target !== selecionado) {
        const aviso = document.querySelector("#aviso");
        const selecionar = document.querySelector(".selecionar");
        const vez = document.querySelector(".vez");
        vez.classList.add("vez-2-0");
        selecionar.style.display = "none";
        aviso.style.display = "none";
        map.style.display = "grid"
        startGame(event);
    }
});