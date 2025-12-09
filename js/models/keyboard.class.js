class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  lastKeyD = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  bindKeyPressEvents() {
    this.keydown();
    this.keyup();
  }

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

  bindBtsPressEvents() {
    this.pressLeftBtn();
    this.pressRightBtn();
    this.pressJumpBtn();
    this.pressThrowBtn();
  }

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
