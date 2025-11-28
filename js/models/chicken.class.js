class Chicken extends MoveableObject {
  x = 120;
  y = 360;
  h = 60;
  w = 60;
  img;
  height = 60;
  width = 40;
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImage = 0;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 55, right: 40, bottom: 55, left: 40 };

  constructor() {
    super();
    this.loadImage(
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.getRealFrame();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  getRealFrame() {
    this.rx = this.x + this.offset.left;
    this.ry = this.y + this.offset.top;
    this.rw = this.w + this.offset.left + this.offset.right;
    this.rh = this.h + this.offset.top + this.offset.bottom;
  }
}
