class Character extends MovableObject {
  y = 140;
  height = 300;

  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
