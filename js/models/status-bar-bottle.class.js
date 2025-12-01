class StatusBarBottle extends DrawableObject {
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];
  percentage = 100;

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
