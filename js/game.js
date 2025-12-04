let world;
let keyboard = new Keyboard();
let intervalIds = [];
let canvas = document.getElementById("canvas");
let startScreen = document.getElementById("startContainer");
let controllSreen = document.getElementById("controllsContainer");
let loseScreen = document.getElementById("loseContainer");
let winScreen = document.getElementById("winContainer");

function init() {}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "flex";
  initLevel1();
  world = new World(canvas, keyboard);
}

function showControll() {
  startScreen.style.display = "none";
  controllSreen.style.display = "flex";
}

function backToMenu() {
  startScreen.style.display = "flex";
  controllSreen.style.display = "none";
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  world.stopGame();
}

function showLoseScreen() {
  loseScreen.style.display = "flex";
  world.stopGame();
}

function showWinScreen() {
  winScreen.style.display = "flex";
  world.stopGame();
}

function restartGame() {
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  initLevel1();
  world = new World(canvas, keyboard);
}
