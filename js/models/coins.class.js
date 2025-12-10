/**
 * Represents collectible coins in the game.
 * Coins animate continuously and have a hitbox for collision detection.
 *
 * @extends MoveableObject
 */
class Coins extends MoveableObject {
  /**
   * Coin height in pixels.
   * @type {number}
   */
  height = 80;

  /**
   * Coin width in pixels.
   * @type {number}
   */
  width = 80;

  /**
   * Vertical position of the coin in the world.
   * @type {number}
   */
  y = 300;

  /**
   * Horizontal position of the coin in the world.
   * @type {number}
   */
  x = 120;

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
   * Hitbox offsets to adjust collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = { top: 30, right: 30, bottom: 30, left: 30 };

  /**
   * Animation frames for the coin.
   * @type {string[]}
   */
  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  /**
   * Current frame index for animation.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Initializes a new coin with random position, loads images, and starts animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 300 + Math.random() * 3500; // random horizontal position
    this.y = 80 + Math.random() * 240; // random vertical position
    this.animate();
    this.getRealFrame(); // calculate hitbox
  }

  /**
   * Animates the coin by cycling through its frames.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200); // switch frames every 200ms
  }
}
