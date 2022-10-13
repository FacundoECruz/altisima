const input = document.querySelector('#name')
const names = document.getElementById('namesForm')
names.addEventListener('submit', (event) => agregarNombre(event))
let listaPlayers = []

class Player {
    constructor(name, score, apuesta, pierde) {
        this.name = name;
        this.score = score;
        this.apuesta = apuesta;
        this.pierde = pierde;
    }
}

function generarTemplate(player) {
    let html = "";
    let i = 0;
    listaPlayers.forEach(function (player) {
        html += `<div class="d-flex">
                    <div class="p-2 flex-grow-1">
                        <li class="fs-4 align-self-center" id="player_${i}"> ${player.name}
                    </div>
                    <div class="p-2 align-self-center" 
                        <label for="apuesta">Apuesta</label>
                        <input type="number" id="apuestaPlayer_${i}">
                     </div>
                    <div class="p-2 align-self-center">
                        <select aria-label="Default select example" name="pierde" id="pierdePlayer_${i}">
                           <option value="0">pierde</option>
                            <option value="-1">-1</option>
                            <option value="-2">-2</option>
                            <option value="-3">-3</option>
                        </select>
                    </div>
                        </li>
                </div>`;
        i++;
    });
    document.getElementById("list").innerHTML = html;
}

function agregarNombre(event) {
    event.preventDefault()
    const player = new Player(`${input.value}`, 0, 0, 0)
    input.value = ''
    listaPlayers.push(player)
    generarTemplate();
}



function guardarData() {
    for (let i = 0; i < listaPlayers.length; i++) {
        const apuesta = document.querySelector(`#apuestaPlayer_${i}`)
        const pierde = document.querySelector(`#pierdePlayer_${i}`)
        if (pierde.value == 0) {
            listaPlayers[i].score = listaPlayers[i].score + 5 + parseInt(apuesta.value);
        } else {
            listaPlayers[i].score = listaPlayers[i].score + parseInt(pierde.value);
        }
        apuesta.value = '';
        pierde.value = 0;
    }
}

function imprimirTabla() {
    let html = "";
    let i = 0;
    listaPlayers.forEach(function (player) {
        html += `<li>${player.name}: ${player.score} pts.</li>`;
        i++;
    });
    document.getElementById("tabla").innerHTML = html;
}

function armarTabla(event) {
    event.preventDefault();
    guardarData();
    imprimirTabla();
}