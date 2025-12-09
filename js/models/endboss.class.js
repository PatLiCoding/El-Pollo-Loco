class Endboss extends MoveableObject {
  y = 95;
  width = 350;
  height = 350;
  isBoss = true;
  isWalking = false;
  isHurt = false;
  isDead = false;
  isAttack = false;
  otherDirection = false;
  speed = 2;

  IMAGES_ALERT = [
    "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
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
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
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
      if (this.isDead) this.playDeadAnimation();
      else if (this.isAttack) this.playAttackAnimation();
      else if (this.isHurt) this.playHurtAnimation();
      else if (this.isWalking) this.playWalkAnimation();
      else this.playAnimation(this.IMAGES_ALERT);
    }, 200);
  }

  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  playAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.checkCurrentAttackImages()) this.isNotMoreAttack();
  }

  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    if (this.checkCurrentHurtImages()) this.isNotMoreHurt();
  }

  checkCurrentDeadImages() {
    return this.currentImage >= this.IMAGES_DEAD.length;
  }

  checkCurrentAttackImages() {
    return this.currentImage >= this.IMAGES_ATTACK.length;
  }

  isNotMoreAttack() {
    this.isAttack = false;
    this.currentImage = 0;
  }

  checkCurrentHurtImages() {
    return this.currentImage >= this.IMAGES_HURT.length;
  }

  isNotMoreHurt() {
    this.isHurt = false;
    this.currentImage = 0;
  }
}
