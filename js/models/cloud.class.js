/**
 * Represents a cloud in the background of the game.
 * Moves slowly to the left to create a parallax effect.
 *
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
  /**
   * Vertical position of the cloud in the world.
   * @type {number}
   */
  y = 20;

  /**
   * Width of the cloud image in pixels.
   * @type {number}
   */
  width = 500;

  /**
   * Height of the cloud image in pixels.
   * @type {number}
   */
  height = 250;

  /**
   * Creates a new cloud with a random horizontal position and starts its animation.
   */
  constructor() {
    super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 3000; // random starting X position
    this.animate();
  }

  /**
   * Animates the cloud by moving it slowly to the left.
   * Creates a continuous scrolling effect.
   */
  animate() {
    this.moveLeft(); // initial movement (optional depending on parent method)
    setInterval(() => {
      this.x -= 0.15; // slow left movement
    }, 1000 / 60);
  }
}
