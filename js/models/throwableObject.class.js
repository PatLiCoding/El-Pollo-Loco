class ThrowableObject extends MoveableObject {
  IMAGE_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  IMAGE_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  currentImage = 0;
  isCollidingEnemie = false;
  bottleOnFloor = false;
  isRotation = false;

  offset = { top: 10, right: 10, bottom: 10, left: 10 };

  constructor(x, y) {
    super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGE_SPLASH);
    this.loadImages(this.IMAGE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.getRealFrame();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();

    let moveInterval = setInterval(() => {
      this.x += 10;
    }, 25);

    let animInterval = setInterval(() => {
      if (this.isCollidingEnemie || this.isSplashFloor()) {
        this.playAnimation(this.IMAGE_SPLASH);
        this.speedY = 0;
        clearInterval(moveInterval);
        clearInterval(animInterval);
      } else {
        this.playAnimation(this.IMAGE_ROTATION);
      }
    }, 80);
  }
}
