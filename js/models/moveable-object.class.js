/**
 * Represents a moveable object in the game, extending DrawableObject.
 * Handles gravity, movement, collisions, energy, and animations.
 */
class MoveableObject extends DrawableObject {
  /** Horizontal movement speed. @type {number} */
  speed = 0.15;

  /** Indicates if the object is facing the opposite direction. @type {boolean} */
  otherDirection = false;

  /** Vertical speed for jumping and gravity. @type {number} */
  speedY = 0;

  /** Gravity acceleration. @type {number} */
  acceleration = 2.5;

  /** Health or energy of the object. @type {number} */
  energy = 100;

  /** Timestamp of last hit received. @type {number} */
  lastHit = 0;

  /** Last bottom position for jump detection. @type {number} */
  lastBottom = 0;

  /**
   * Applies gravity to the object continuously.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < 120;
  }

  /**
   * Checks if this object is colliding with another moveable object.
   * @param {MoveableObject} mo
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.rx + this.rw > mo.rx &&
      this.ry + this.rh > mo.ry &&
      this.rx < mo.rx + mo.rw &&
      this.ry < mo.ry + mo.rh
    );
  }

  /**
   * Updates the real frame for collision detection based on offsets.
   */
  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.width - this.offset.left - this.offset.right;
    this.rh = this.height - this.offset.top - this.offset.bottom;
  }

  /**
   * Reduces energy when hit and plays hurt sound.
   * Ends the game if energy reaches 0.
   */
  hit() {
    this.energy -= 20;
    AudioHub.playOne(AudioHub.PEPE_HURT);
    if (this.energy <= 0) {
      this.energy = 0;
      showLoseScreen();
    } else {
      this.lastHit = new Date().getTime();
      this.lastActionTime = new Date().getTime();
    }
  }

  /**
   * Checks if the object is recently hurt.
   * @returns {boolean}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 2000;
    return timepassed < 1.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is idle and sleeping.
   * @returns {boolean}
   */
  isSleeping() {
    return Date.now() - this.lastActionTime > this.idleTimeout;
  }

  /**
   * Plays an animation from a set of images.
   * @param {Array<string>} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump and plays jump sound.
   * @returns {number} The vertical speed applied.
   */
  jump() {
    AudioHub.playOne(AudioHub.PEPE_JUMP);
    return (this.speedY = 30);
  }

  /**
   * Updates the last bottom coordinate for jump detection.
   */
  updateLastBottom() {
    this.lastBottom = this.ry + this.rh;
  }

  /**
   * Checks if the object is jumping on another object.
   * @param {MoveableObject} mo
   * @returns {boolean}
   */
  isJumpOn(mo) {
    const touching = this.isColliding(mo);
    const charBottom = this.ry + this.rh;
    const moTop = mo.ry;
    const fromAbove = this.lastBottom <= moTop && charBottom >= moTop;
    return touching && fromAbove;
  }

  /**
   * Checks if the object has reached the floor for bottle splash detection.
   * @returns {boolean}
   */
  isSplashFloor() {
    return this.ry + this.height >= 380;
  }
}
