class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => self.draw());
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      if (!this.character) return;
      this.character.getRealFrame && this.character.getRealFrame();

      if (!this.level || !Array.isArray(this.level.enemies)) return;
      this.level.enemies.forEach((enemy) => {
        enemy.getRealFrame && enemy.getRealFrame();

        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 200);
  }

  // checkCollisions() {
  //   setInterval(() => {
  //     this.level.enemies.forEach((enemy) => {
  //       if (this.character.isColliding(enemy)) {
  //         console.log("Collision with enemy!", enemy);
  //         this.character.hit();
  //       }
  //     });
  //   }, 200);
  // }

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
