class Bottle extends MoveableObject {
  height = 60;
  width = 50;
  y = 360;
  x = 120;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 55, right: 40, bottom: 50, left: 40 };

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 200 + Math.random() * 500;
  }

  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.w + this.offset.left + this.offset.right;
    this.rh = this.h + this.offset.top + this.offset.bottom;
  }
}
