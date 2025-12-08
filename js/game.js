let world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameSectionRef = document.getElementById("gameSection");
let canvas = document.getElementById("canvas");
let startScreen = document.getElementById("startContainer");
let controllSreen = document.getElementById("controllsContainer");
let loseScreen = document.getElementById("loseContainer");
let winScreen = document.getElementById("winContainer");

// window.addEventListener("keydown", (event) => {
//   if (event.keyCode == 39) {
//     keyboard.RIGHT = true;
//   }
//   if (event.keyCode == 37) {
//     keyboard.LEFT = true;
//   }
//   if (event.keyCode == 38) {
//     keyboard.UP = true;
//   }
//   if (event.keyCode == 40) {
//     keyboard.DOWN = true;
//   }
//   if (event.keyCode == 32) {
//     keyboard.SPACE = true;
//   }
//   if (event.keyCode == 68) {
//     keyboard.D = true;
//   }
// });

// window.addEventListener("keyup", (event) => {
//   if (event.keyCode == 39) {
//     keyboard.RIGHT = false;
//   }
//   if (event.keyCode == 37) {
//     keyboard.LEFT = false;
//   }
//   if (event.keyCode == 38) {
//     keyboard.UP = false;
//   }
//   if (event.keyCode == 40) {
//     keyboard.DOWN = false;
//   }
//   if (event.keyCode == 32) {
//     keyboard.SPACE = false;
//   }
//   if (event.keyCode == 68) {
//     keyboard.D = false;
//   }
// });

function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  initLevel1();
  world = new World(canvas, keyboard);
}

function showControll() {
  startScreen.style.display = "none";
  controllSreen.style.display = "block";
}

function gameToMenu() {
  startScreen.style.display = "block";
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  world.stopGame();
}

function controllToMenu() {
  startScreen.style.display = "block";
  controllSreen.style.display = "none";
}

function showLoseScreen() {
  loseScreen.style.display = "block";
  canvas.style.display = "none";
  world.stopGame();
}

function showWinScreen() {
  winScreen.style.display = "block";
  canvas.style.display = "none";
  world.stopGame();
}

function restartGame() {
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  canvas.style.display = "block";
  initLevel1();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
}

function openFullscreen() {
  document.getElementById("openFullscreenIcon").classList.add("displayNone");
  document
    .getElementById("closeFullscreenIcon")
    .classList.remove("displayNone");
  if (gameSectionRef.requestFullscreen) {
    gameSectionRef.requestFullscreen();
  } else if (gameSectionRef.webkitRequestFullscreen) {
    gameSectionRef.webkitRequestFullscreen();
  } else if (gameSectionRef.msRequestFullscreen) {
    gameSectionRef.msRequestFullscreen();
  }
}

function closeFullscreen() {
  document.getElementById("closeFullscreenIcon").classList.add("displayNone");
  document.getElementById("openFullscreenIcon").classList.remove("displayNone");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function mute() {
  AudioHub.stopAll();
  AudioHub.mute();
  document.getElementById("startSound").classList.add("displayNone");
  document.getElementById("stopSound").classList.remove("displayNone");
}

function unmute() {
  AudioHub.unmute();
  document.getElementById("startSound").classList.remove("displayNone");
  document.getElementById("stopSound").classList.add("displayNone");
}
