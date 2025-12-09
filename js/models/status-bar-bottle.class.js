/**
 * Represents the bottle status bar in the game.
 * Inherits from DrawableObject and updates based on the number of collected bottles.
 */
class StatusBarBottle extends DrawableObject {
  /** Array of images representing different fill levels of the bottle bar. @type {string[]} */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /** Current fill percentage of the bottle bar. @type {number} */
  percentage = 0;

  /**
   * Constructs a new StatusBarBottle, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 40;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
  }
}
