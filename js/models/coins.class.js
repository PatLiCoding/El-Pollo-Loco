class Coins extends MoveableObject {
  height = 80;
  width = 80;
  y = 300;
  x = 120;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 55, right: 55, bottom: 55, left: 55 };

  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];
  currentImage = 0;

  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 200 + Math.random() * 500;
    this.y = 40 + Math.random() * 320;
    this.animate();
    this.getRealFrame();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }

  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.w + this.offset.left + this.offset.right;
    this.rh = this.h + this.offset.top + this.offset.bottom;
  }
}
