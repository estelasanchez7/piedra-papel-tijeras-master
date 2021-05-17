//Carga de app

$(window).load(function () {
  $(".loader").fadeOut("slow");
});

//Ventana principal del juego

document.querySelector("#rock").onclick = rockPlay;
document.querySelector("#paper").onclick = paperPlay;
document.querySelector("#scissors").onclick = scissorsPlay;

let result = document.querySelector("#result");
let playerChoice;
let machineChoice;
let contPlayer = 0;
let contMachine = 0;

//Elección del jugador

function rockPlay() {
  playerChoice = 0
  document.querySelector("#imgPlayer").setAttribute("src", "img/rock.png")
  document.getElementById("rockSound").play()
  randomGame()
}

function paperPlay() {
  playerChoice = 1
  document.querySelector("#imgPlayer").setAttribute("src", "img/paper.png")
  document.getElementById("paperSound").play()
  randomGame()
}

function scissorsPlay() {
  playerChoice = 2
  document.querySelector("#imgPlayer").setAttribute("src", "img/scissor.png")
  document.getElementById("scissorsSound").play()
  randomGame()
}

//Botón play

let play = document.querySelector("#play")

play.onmouseover = () => document.querySelector("#play img").src = "./img/play2.png"
play.onmouseout = () => document.querySelector("#play img").src = "./img/play.png"

play.onclick = gameStart

function gameStart() {
  let namePlayer = document.querySelector("#name-player").value
  document.querySelector("#namePlayer").textContent = namePlayer
  document.querySelector("#namePlayer2").textContent = namePlayer
  document.querySelector(".modal-start").classList.add("hide")

  let player = {
  fecha: new Date(),
  nombre: namePlayer,
  puntuacion: contPlayer
}

localStorage.setItem(namePlayer, JSON.stringify(player))

let partidaGuardada = JSON.parse(localStorage.getItem(namePlayer))
}

const userScore_span= document.getElementById('user-score')
const compScore_span= document.getElementById('comp-score')
const scoreBoard_div= document.querySelector('marcador')
const result_div= document.querySelector('.result p')

//Resto de la jugada

function randomGame() {

  //Limpiar la jugada anterior

  document.querySelector("#imgGame").setAttribute("src", "")

  //Elección de la máquina

  machineChoice = Math.round(Math.random() * 2);

  if (machineChoice == 0) document.querySelector("#imgMachine").setAttribute("src", "img/rock.png")
  else if (machineChoice == 1) document.querySelector("#imgMachine").setAttribute("src", "img/paper.png")
  else document.querySelector("#imgMachine").setAttribute("src", "img/scissor.png")

  //Resultado y ganador

  if (playerChoice == 0 && machineChoice == 2 || playerChoice == 1 && machineChoice == 0 || playerChoice == 2 && machineChoice == 1) {
    result.textContent = "¡Ganaste!"
    contPlayer++
    userScore_span.innerHTML= contPlayer
    document.querySelector("#contPlayer").textContent = contPlayer
    document.querySelector("#imgGame").setAttribute("src", "img/check.png")
  }
  else if (playerChoice == 0 && machineChoice == 1 || playerChoice == 1 && machineChoice == 2 || playerChoice == 2 && machineChoice == 0) {
    result.textContent = "¡Perdiste!"
    contMachine++
    compScore_span.innerHTML= contMachine
    document.querySelector("#contMachine").textContent = contMachine
    document.querySelector("#imgGame").setAttribute("src", "img/cross.png")
  }
  else {
    result.textContent = "Empate"
    document.querySelector("#imgGame").setAttribute("src", "img/tie.png")
  }

  //Animación

  document.querySelector("#imgGame").classList.toggle("animation")
  document.querySelector("#imgGame").classList.toggle("animation2")

  // Ventana modal final - GANADOR/PERDEDOR

  if (contPlayer == 3 || contMachine == 3) {
    document.querySelector(".selectGame").style.visibility = "hidden"
    setTimeout(() => {
      document.querySelector(".modal-end").classList.remove("hide")
      if (contPlayer == 3) {
        document.querySelector("#finalResult").textContent = "¡Eres un crack!"
        document.querySelector("#winnerLosser").src = "https://www.icegif.com/wp-content/uploads/celebrate-icegif-1.gif"
        document.getElementById("winSound").play()
      } else {
        document.querySelector("#finalResult").textContent = "¡Eres un loser!"
        document.querySelector("#winnerLosser").src = "https://i.imgur.com/3fomy1i.gif"
        document.getElementById("loseSound").play()
      }
    }, 1500)
  }
}

//Botón Replay

let replay = document.querySelector("#replay")

replay.onmouseover = () => document.querySelector("#replay img").src = "./img/replay2.png"
replay.onmouseout = () => document.querySelector("#replay img").src = "./img/replay.png"
document.querySelector("#replay").onclick = gameRestart

function gameRestart() {
  document.querySelector(".modal-end").classList.add("hide")
  contPlayer = 0
  contMachine = 0
  document.querySelector(".selectGame").style.visibility = "visible"
  document.querySelector("#contMachine").textContent = contMachine
  document.querySelector("#contPlayer").textContent = contPlayer
  document.querySelector("#imgPlayer").setAttribute("src", "")
  document.querySelector("#imgMachine").setAttribute("src", "")
  document.querySelector("#imgGame").setAttribute("src", "")
  userScore_span.innerHTML= contPlayer
  compScore_span.innerHTML= contMachine
  result.textContent = "Resultado"
}