/**
 * Represents a basic enemy chicken in the game.
 * Moves automatically to the left and has walking animations.
 *
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
  /**
   * Horizontal position of the chicken in the world.
   * @type {number}
   */
  x = 120;

  /**
   * Vertical position of the chicken in the world.
   * @type {number}
   */
  y = 360;

  /**
   * Image object for the chicken sprite.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Chicken height in pixels.
   * @type {number}
   */
  height = 60;

  /**
   * Chicken width in pixels.
   * @type {number}
   */
  width = 40;

  /**
   * Walking animation frames for the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Current frame index for walking animation.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Real hitbox X coordinate.
   * @type {number}
   */
  rx;

  /**
   * Real hitbox Y coordinate.
   * @type {number}
   */
  ry;

  /**
   * Real hitbox width.
   * @type {number}
   */
  rw;

  /**
   * Real hitbox height.
   * @type {number}
   */
  rh;

  /**
   * Collision hitbox offsets.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = { top: 10, right: 5, bottom: 10, left: 5 };

  /**
   * Initializes a new Chicken with random position and speed, loads images, and starts animation.
   */
  constructor() {
    super();
    this.loadImage(
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 2000; // random starting X position
    this.speed = 0.15 + Math.random() * 0.25; // random walking speed
    this.animate();
    this.getRealFrame(); // calculate hitbox
  }

  /**
   * Handles the chicken's movement and animation intervals.
   */
  animate() {
    // Move chicken to the left every frame
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // Play walking animation every 100ms
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
