class Chicken extends MovableObject {
  x = 120;
  y = 370;
  img;
  height = 60;
  width = 40;

  constructor() {
    super().loadImage(
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );

    this.x = 200 + Math.random() * 500;
  }
}
