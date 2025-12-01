class Bottle extends MoveableObject {
  height = 60;
  width = 50;
  y = 360;
  x = 120;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 10, right: 15, bottom: 5, left: 18 };

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 200 + Math.random() * 1500;
    this.getRealFrame();
  }
}
