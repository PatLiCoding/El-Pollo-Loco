class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  lastBottom = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  isColliding(mo) {
    return (
      this.rx + this.rw > mo.rx &&
      this.ry + this.rh > mo.ry &&
      this.rx < mo.rx + mo.rw &&
      this.ry < mo.ry + mo.rh
    );
  }

  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.width - this.offset.left - this.offset.right;
    this.rh = this.height - this.offset.top - this.offset.bottom;
  }

  hit() {
    this.energy -= 20;
    AudioHub.playOne(AudioHub.PEPE_HURT);
    if (this.energy < 0) {
      this.energy = 0;
      showLoseScreen();
    } else {
      this.lastHit = new Date().getTime();
      this.lastActionTime = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 2000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isSleeping() {
    return Date.now() - this.lastActionTime > this.idleTimeout;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
    AudioHub.playOne(AudioHub.PEPE_JUMP);
  }

  updateLastBottom() {
    this.lastBottom = this.ry + this.rh;
  }

  isJumpOn(mo) {
    const touching = this.isColliding(mo);
    const charBottom = this.ry + this.rh;
    const moTop = mo.ry;
    const fromAbove = this.lastBottom <= moTop && charBottom >= moTop;

    return touching && fromAbove;
  }

  isSplashFloor() {
    return this.ry + this.height >= 380;
  }
}
