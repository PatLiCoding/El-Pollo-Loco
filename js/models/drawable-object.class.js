/**
 * Base class for all drawable objects in the game.
 * Handles image loading, drawing, hitboxes, and image caching.
 */
class DrawableObject {
  /**
   * Horizontal position of the object in the world.
   * @type {number}
   */
  x = 120;

  /**
   * Vertical position of the object in the world.
   * @type {number}
   */
  y = 280;

  /**
   * Image element representing the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Height of the object in pixels.
   * @type {number}
   */
  height = 150;

  /**
   * Width of the object in pixels.
   * @type {number}
   */
  width = 100;

  /**
   * Cache of loaded images to improve performance.
   * Keys are image paths, values are HTMLImageElement objects.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Loads a single image from a path and assigns it to this.img.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log("Error loading image ", e);
      console.log("Could not load image", this.img.src);
    }
  }

  /**
   * Draws a blue frame around the object's real hitbox (for debugging).
   * Only applies to Character, Chicken, Endboss, Bottle, Coins, and SmallChicken.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coins ||
      this instanceof SmallChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.rx, this.ry, this.rw, this.rh);
      ctx.stroke();
    }
  }

  /**
   * Sets the current percentage of the object (e.g., health or progress)
   * and updates the displayed image accordingly.
   * @param {number} percentage - Percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Determines which image index corresponds to the current percentage.
   * @returns {number} Index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage == 90) return 4;
    else if (this.percentage == 80) return 4;
    else if (this.percentage == 70) return 3;
    else if (this.percentage == 60) return 3;
    else if (this.percentage == 50) return 2;
    else if (this.percentage == 40) return 2;
    else if (this.percentage == 30) return 1;
    else if (this.percentage == 20) return 1;
    else if (this.percentage == 10) return 0;
    else return 0;
  }
}
