class Bottle extends MoveableObject {
  height = 60;
  width = 50;
  y = 360;
  x = 120;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 55, right: 38, bottom: 50, left: 38 };

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 200 + Math.random() * 1500;
    this.getRealFrame();
  }
}
