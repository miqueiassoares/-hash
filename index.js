"use strict";

const selecionado = document.querySelector("#bolinha-x");
const map = document.querySelector("#map");
const jogosPossiveis = [
    // horizontais
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // verticais
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // cruzadas
    [1, 5, 9],
    [3, 5, 7]
];

function estaContido(elemento, lista) {
    return lista.indexOf(elemento) !== -1;
}

function ganhouVerificar(listaDoJogador) {
    let jogada = [];
    let ganhou = false;
    for (jogada of jogosPossiveis) {
        ganhou = jogada.every(function(elemento) {
            return estaContido(elemento, listaDoJogador);
        });
        if(ganhou) {
            return ganhou;
        }
    }
}

function mudarVez(vez, start) {
    if (start === 1) {
        vez.classList.remove = "vez-x";
        vez.classList = "vez-o";
    } else {
        vez.classList.remove = "vez-o";
        vez.classList = "vez-x";
    }
    vez.textContent = start === 2 ? "X" : "O";
}

function subirModal(ganhou, start, index) {
    document.querySelector(".modal-container").style.display = "flex";
    if (ganhou) {
        const vitoria = document.querySelector(".ganhou");
        vitoria.style.display = "block";
        const ganhador = document.querySelector(".ganhador");
        ganhador.textContent = start === 1 ? "X" : "O";
        ganhador.style.color = start === 1 ? "#00ec3b" : "aqua";
        document.querySelector(".ganhou>span").style.color = start === 1 ? "#00ec3b" : "aqua";
    } else if (index === 9) {
        document.querySelector(".empate").style.display = "block";
    }

}

function game(start, vez) {
    const jogadas = {
        "X": [],
        "O": []
    }
    let index = 1;
    let ganhou = false;
    map.addEventListener("click", function(event) {
        const celula = event.target;
        if (celula !== map) {
            if (!(celula.classList.contains("marcada"))){
                celula.classList.add("marcada");
                celula.textContent = start === 1 ? "X" : "O";
                celula.classList.add(start === 1 ? "cell-X": "cell-O");
    
                jogadas[start===1 ? "X" : "O"].push(Number(celula.id));
                ganhou = ganhouVerificar(start === 1 ? jogadas["X"] : jogadas["O"]);

                if (ganhou || index === 9) {
                    subirModal(ganhou, start, index);
                }
                mudarVez(vez, start);
                start = start === 1 ? 2 : 1;
                index++;
            }
        }
        
    });
}

function startGame(event) {
    const x = document.querySelector("#x");
    const bolinha = document.querySelector("#bolinha");
    const vez = document.querySelector("#vez");
    let start = null;
    if(event.target === x) {
        start = 1;
    } else if(event.target === bolinha) {
        start = 2;
    }
    vez.textContent = "";
    vez.textContent = start === 1 ? "X" : "O";
    if (start === 1) {
        vez.classList = "vez-x";
    } else {
        vez.classList = "vez-o";
    }
    game(start, vez);
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