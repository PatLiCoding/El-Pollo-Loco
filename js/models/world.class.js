class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = [new StatusBarHealth(), new StatusBarBottle()];
  throwableObjects = [];
  lastKeyD = false;
  coinImage = new Image();
  coinsCollected = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coinImage.src = "assets/img/8_coin/coin_2.png";
    this.draw();
    this.setWorld();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectToMap(this.statusBar);

    this.ctx.font = "26px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.drawImage(this.coinImage, 5, 75, 75, 75);
    this.ctx.fillText("x " + this.coinsCollected, 65, 120);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.bottle);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => self.draw());
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.character.getRealFrame();

    this.level.enemies.forEach((enemy) => {
      enemy.getRealFrame();

      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.statusBar[0].percentage - 20);
      }
    });

    this.level.bottle.forEach((bottle) => {
      bottle.getRealFrame();

      if (this.character.isColliding(bottle)) {
        if (this.statusBar[1].percentage < 100) {
          this.statusBar[1].setPercentage(this.statusBar[1].percentage + 20);
        }
      }
    });

    this.level.coins.forEach((coins) => {
      coins.getRealFrame();

      if (this.character.isColliding(coins)) {
        this.coinsCollected++;
      }
    });
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      !this.lastKeyD &&
      this.statusBar[1].percentage >= 20
    ) {
      this.lastKeyD = true;
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 120
      );
      this.throwableObjects.push(bottle);
      this.statusBar[1].setPercentage(this.statusBar[1].percentage - 20);
    }
    if (!this.keyboard.D) {
      this.lastKeyD = false;
    }
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
