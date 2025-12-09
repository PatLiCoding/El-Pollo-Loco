/**
 * Represents a small chicken enemy in the game.
 * Inherits from MoveableObject and handles its own animation and movement.
 */
class SmallChicken extends MoveableObject {
  /** Initial horizontal position. @type {number} */
  x = 120;

  /** Initial vertical position. @type {number} */
  y = 380;

  /** Image object for drawing. @type {HTMLImageElement} */
  img;

  /** Height of the small chicken. @type {number} */
  height = 40;

  /** Width of the small chicken. @type {number} */
  width = 25;

  /** Array of walking animation image paths. @type {string[]} */
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** Current frame index for animation. @type {number} */
  currentImage = 0;

  /** Indicates that this is a small chicken. @type {boolean} */
  isSmallChicken = true;

  /** Real collision frame x-coordinate. @type {number} */
  rx;

  /** Real collision frame y-coordinate. @type {number} */
  ry;

  /** Real collision frame width. @type {number} */
  rw;

  /** Real collision frame height. @type {number} */
  rh;

  /** Offsets for collision detection. @type {{top: number, right: number, bottom: number, left: number}} */
  offset = { top: 10, right: 5, bottom: 10, left: 5 };

  /**
   * Constructs a new small chicken, sets random position and speed,
   * loads images and starts animation.
   */
  constructor() {
    super();
    this.loadImage(
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.getRealFrame();
  }

  /**
   * Starts movement and walking animation intervals.
   */
  animate() {
    // Move continuously to the left
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // Animate walking images
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
