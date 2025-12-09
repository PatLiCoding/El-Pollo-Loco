/**
 * Represents the boss health/status bar in the game.
 * Inherits from DrawableObject and updates based on the boss's health percentage.
 */
class StatusBarBoss extends DrawableObject {
  /** Array of images representing different health levels. @type {string[]} */
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /** Current health percentage of the boss. @type {number} */
  percentage = 100;

  /**
   * Constructs a new StatusBarBoss, loads images and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 5;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }
}
