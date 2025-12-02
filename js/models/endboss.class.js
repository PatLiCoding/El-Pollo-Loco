class Endboss extends MoveableObject {
  y = 95;
  width = 350;
  height = 350;
  isBoss = true;
  isHurt = false;
  isDead = false;
  isAttack = false;
  speed = 2;

  IMAGES_WALKING = [
    "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  currentImage = 0;

  rx;
  ry;
  rw;
  rh;

  offset = { top: 120, right: 35, bottom: 80, left: 35 };

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 2000;
    this.animate();
    this.getRealFrame();
    this.energy = 100;
  }

  animate() {
    setInterval(() => {
      if (this.isDead) {
        if (this.currentImage < this.IMAGES_DEAD.length) {
          this.playAnimation(this.IMAGES_DEAD);
        }
      } else if (this.isAttack) {
        if (this.currentImage < this.IMAGES_ATTACK.length) {
          this.playAnimation(this.IMAGES_ATTACK);
        } else {
          this.isAttack = false;
          this.currentImage = 0;
        }
      } else if (this.isHurt) {
        if (this.currentImage < this.IMAGES_HURT.length) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.isHurt = false;
          this.currentImage = 0;
        }
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
