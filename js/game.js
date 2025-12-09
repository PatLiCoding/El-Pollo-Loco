/**
 * The active game world instance.
 * @type {World}
 */
let world;

/**
 * Global keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Stores interval IDs so they can be cleared when stopping the game.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Reference to the game section DOM element.
 * @type {HTMLElement}
 */
let gameSectionRef = document.getElementById("gameSection");

/**
 * Reference to the game canvas.
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("canvas");

/**
 * Start screen DOM element.
 * @type {HTMLElement}
 */
let startScreen = document.getElementById("startContainer");

/**
 * Controls screen DOM element.
 * @type {HTMLElement}
 */
let controllSreen = document.getElementById("controllsContainer");

/**
 * Impressum (legal info) screen DOM element.
 * @type {HTMLElement}
 */
let impressumScreen = document.getElementById("impressumCotainer");

/**
 * Lose screen DOM element.
 * @type {HTMLElement}
 */
let loseScreen = document.getElementById("loseContainer");

/**
 * Win screen DOM element.
 * @type {HTMLElement}
 */
let winScreen = document.getElementById("winContainer");

/**
 * Starts the game by hiding the start screen, displaying the canvas,
 * initializing the level, and creating a new World instance.
 *
 * @function
 * @returns {void}
 */
function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  initLevel1();
  world = new World(canvas, keyboard);
}

/**
 * Shows the controls information screen.
 * @function
 * @returns {void}
 */
function showControll() {
  startScreen.style.display = "none";
  controllSreen.style.display = "block";
}

/**
 * Shows the impressum (legal info) screen.
 * @function
 * @returns {void}
 */
function showImpressum() {
  startScreen.style.display = "none";
  impressumScreen.style.display = "block";
}

/**
 * Returns from any game state back to the main menu.
 * Stops the game world and hides win/lose screens.
 *
 * @function
 * @returns {void}
 */
function gameToMenu() {
  startScreen.style.display = "block";
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  world.stopGame();
}

/**
 * Returns from the controls screen to the main menu.
 * @function
 * @returns {void}
 */
function controllToMenu() {
  startScreen.style.display = "block";
  controllSreen.style.display = "none";
}

/**
 * Returns from the impressum screen to the main menu.
 * @function
 * @returns {void}
 */
function impressumToMenu() {
  startScreen.style.display = "block";
  impressumScreen.style.display = "none";
}

/**
 * Shows the lose screen and stops the game.
 * @function
 * @returns {void}
 */
function showLoseScreen() {
  loseScreen.style.display = "block";
  canvas.style.display = "none";
  world.stopGame();
}

/**
 * Shows the win screen and stops the game.
 * @function
 * @returns {void}
 */
function showWinScreen() {
  winScreen.style.display = "block";
  canvas.style.display = "none";
  world.stopGame();
}

/**
 * Restarts the game by resetting screens, reinitializing the level,
 * and creating a fresh keyboard + world instance.
 *
 * @function
 * @returns {void}
 */
function restartGame() {
  loseScreen.style.display = "none";
  winScreen.style.display = "none";
  canvas.style.display = "block";
  initLevel1();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
}

/**
 * Activates fullscreen mode for the game section.
 *
 * @function
 * @returns {void}
 */
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

/**
 * Exits fullscreen mode.
 *
 * @function
 * @returns {void}
 */
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

/**
 * Mutes all game audio and updates the UI icons.
 *
 * @function
 * @returns {void}
 */
function mute() {
  AudioHub.stopAll();
  AudioHub.mute();
  document.getElementById("startSound").classList.add("displayNone");
  document.getElementById("stopSound").classList.remove("displayNone");
}

/**
 * Unmutes the game audio and updates the UI icons.
 *
 * @function
 * @returns {void}
 */
function unmute() {
  AudioHub.unmute();
  document.getElementById("startSound").classList.remove("displayNone");
  document.getElementById("stopSound").classList.add("displayNone");
}
