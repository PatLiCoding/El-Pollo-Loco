/**
 * Represents a collectible or throwable bottle in the game.
 * Extends `MoveableObject` to inherit movement and physics behavior.
 *
 * @extends MoveableObject
 */
class Bottle extends MoveableObject {
  /**
   * Bottle height in pixels.
   * @type {number}
   */
  height = 60;

  /**
   * Bottle width in pixels.
   * @type {number}
   */
  width = 50;

  /**
   * Vertical position of the bottle in the world.
   * Default value near the ground.
   * @type {number}
   */
  y = 360;

  /**
   * Horizontal position of the bottle in the world.
   * Initial value is overwritten in the constructor.
   * @type {number}
   */
  x = 120;

  /**
   * Flag to indicate whether the bottle has collided with something.
   * @type {boolean}
   */
  hasHit = false;

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
  offset = { top: 10, right: 15, bottom: 5, left: 18 };

  /**
   * Creates a new bottle object with a random horizontal position.
   *
   * @param {string} imagePath - Path to the bottle image.
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 100 + Math.random() * 1500; // random x position in the world
    this.getRealFrame(); // calculate real hitbox dimensions
  }
}
