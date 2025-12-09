/**
 * Represents a static background image that scrolls with the game world.
 * Inherits movement and image-loading functionality from `MoveableObject`.
 *
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new background object at a specific horizontal position.
   *
   * @param {string} imagePath - The path to the background image file.
   * @param {number} x - The horizontal position of the background layer.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // Aligns background to the bottom edge of the canvas
  }
}
