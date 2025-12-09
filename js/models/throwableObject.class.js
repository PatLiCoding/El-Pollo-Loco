/**
 * Represents a throwable object, such as a bottle.
 * Inherits from MoveableObject and handles movement, gravity, and animations.
 */
class ThrowableObject extends MoveableObject {
  /** Images for the splash animation when the object hits the ground or enemy. @type {string[]} */
  IMAGE_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /** Images for the bottle rotation animation while flying. @type {string[]} */
  IMAGE_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  currentImage = 0;
  isCollidingEnemie = false;
  bottleOnFloor = false;
  isRotation = false;

  /** Offset for collision detection. */
  offset = { top: 10, right: 10, bottom: 10, left: 10 };

  /**
   * Creates a new throwable object at the given position.
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   */
  constructor(x, y) {
    super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGE_SPLASH);
    this.loadImages(this.IMAGE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.getRealFrame();
  }

  /** Initiates the throw, including gravity, movement, and animation. */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    let moveInterval = this.startMoveInterval();
    this.startAnimInterval(moveInterval);
  }

  /** Starts the horizontal movement interval. @returns {number} Interval ID */
  startMoveInterval() {
    return setInterval(() => {
      this.x += 10;
    }, 25);
  }

  /** Starts the animation interval, switching between rotation and splash. */
  startAnimInterval(moveInterval) {
    let animInterval = setInterval(() => {
      if (this.isCollidingEnemie || this.isSplashFloor()) {
        this.playAnimation(this.IMAGE_SPLASH);
        this.speedY = 0;
        this.stopInterval(moveInterval, animInterval);
      } else this.playAnimation(this.IMAGE_ROTATION);
    }, 80);
  }

  /**
   * Stops the movement and animation intervals.
   * @param {number} moveInterval - Interval ID of movement
   * @param {number} animInterval - Interval ID of animation
   */
  stopInterval(moveInterval, animInterval) {
    clearInterval(moveInterval);
    clearInterval(animInterval);
  }
}
