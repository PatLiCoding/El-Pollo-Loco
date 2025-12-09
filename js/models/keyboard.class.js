/**
 * Handles keyboard and touch input for the game.
 * Tracks which keys are pressed and manages on-screen button touches.
 */
class Keyboard {
  /** Left arrow key pressed. @type {boolean} */
  LEFT = false;

  /** Right arrow key pressed. @type {boolean} */
  RIGHT = false;

  /** Up arrow key pressed. @type {boolean} */
  UP = false;

  /** Down arrow key pressed. @type {boolean} */
  DOWN = false;

  /** Space key pressed. @type {boolean} */
  SPACE = false;

  /** "D" key pressed (used for throwing objects). @type {boolean} */
  D = false;

  /** Tracks last state of D key for toggle behavior. @type {boolean} */
  lastKeyD = false;

  /**
   * Initializes keyboard input and binds touch buttons.
   */
  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  /**
   * Binds keydown and keyup events for the keyboard.
   */
  bindKeyPressEvents() {
    this.keydown();
    this.keyup();
  }

  /**
   * Sets up the keydown event listener for arrow keys, space, and "D".
   */
  keydown() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) keyboard.RIGHT = true;
      if (event.keyCode == 37) keyboard.LEFT = true;
      if (event.keyCode == 38) keyboard.UP = true;
      if (event.keyCode == 40) keyboard.DOWN = true;
      if (event.keyCode == 32) keyboard.SPACE = true;
      if (event.keyCode == 68) keyboard.D = true;
    });
  }

  /**
   * Sets up the keyup event listener to reset key states.
   */
  keyup() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) keyboard.RIGHT = false;
      if (event.keyCode == 37) keyboard.LEFT = false;
      if (event.keyCode == 38) keyboard.UP = false;
      if (event.keyCode == 40) keyboard.DOWN = false;
      if (event.keyCode == 32) keyboard.SPACE = false;
      if (event.keyCode == 68) keyboard.D = false;
    });
  }

  /**
   * Binds on-screen touch button events for mobile devices.
   */
  bindBtsPressEvents() {
    this.pressLeftBtn();
    this.pressRightBtn();
    this.pressJumpBtn();
    this.pressThrowBtn();
  }

  /**
   * Handles left button touch events.
   */
  pressLeftBtn() {
    document
      .getElementById("btnLeft")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.LEFT = true;
      });

    document.getElementById("btnLeft").addEventListener("touchend", (event) => {
      event.preventDefault();
      this.LEFT = false;
    });
  }

  /**
   * Handles right button touch events.
   */
  pressRightBtn() {
    document
      .getElementById("btnRight")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.RIGHT = true;
      });

    document
      .getElementById("btnRight")
      .addEventListener("touchend", (event) => {
        event.preventDefault();
        this.RIGHT = false;
      });
  }

  /**
   * Handles jump button touch events.
   */
  pressJumpBtn() {
    document
      .getElementById("btnJump")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.UP = true;
      });

    document.getElementById("btnJump").addEventListener("touchend", (event) => {
      event.preventDefault();
      this.UP = false;
    });
  }

  /**
   * Handles throw button touch events with toggle logic.
   */
  pressThrowBtn() {
    document
      .getElementById("btnThrow")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.checkLastKeyD();
      });

    document
      .getElementById("btnThrow")
      .addEventListener("touchend", (event) => {
        event.preventDefault();
        this.checkLastKeyD();
      });
  }

  /**
   * Toggles the D key state for throwing objects.
   * Ensures only one throw per button press.
   */
  checkLastKeyD() {
    if (!this.lastKeyD) {
      this.D = true;
      this.lastKeyD = true;
    } else {
      this.D = false;
      this.lastKeyD = false;
    }
  }
}
