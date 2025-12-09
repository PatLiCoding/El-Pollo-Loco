/**
 * Represents the health status bar in the game.
 * Inherits from DrawableObject and updates based on the character's health.
 */
class StatusBarHealth extends DrawableObject {
  /** Array of images representing different health levels. @type {string[]} */
  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /** Current health percentage. @type {number} */
  percentage = 100;

  /**
   * Constructs a new StatusBarHealth, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }
}
