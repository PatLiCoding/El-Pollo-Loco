/**
 * Represents the final boss enemy in the game.
 * Handles animations for alert, walking, hurt, attack, and death states.
 *
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
  /** Vertical position of the boss in the world. @type {number} */
  y = 95;

  /** Width of the boss in pixels. @type {number} */
  width = 350;

  /** Height of the boss in pixels. @type {number} */
  height = 350;

  /** Whether this object is the boss. @type {boolean} */
  isBoss = true;

  /** Whether the boss is currently walking. @type {boolean} */
  isWalking = false;

  /** Whether the boss is currently hurt. @type {boolean} */
  isHurt = false;

  /** Whether the boss is dead. @type {boolean} */
  isDead = false;

  /** Whether the boss is attacking. @type {boolean} */
  isAttack = false;

  /** Direction the boss is facing. @type {boolean} */
  otherDirection = false;

  /** Speed of the boss movement. @type {number} */
  speed = 4.5;

  /** Animation frames for alert state. @type {string[]} */
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

  /** Animation frames for walking. @type {string[]} */
  IMAGES_WALKING = [
    "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** Animation frames for hurt state. @type {string[]} */
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** Animation frames for dead state. @type {string[]} */
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /** Animation frames for attack state. @type {string[]} */
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

  /** Current frame index. @type {number} */
  currentImage = 0;

  /** Real hitbox X coordinate. @type {number} */
  rx;

  /** Real hitbox Y coordinate. @type {number} */
  ry;

  /** Real hitbox width. @type {number} */
  rw;

  /** Real hitbox height. @type {number} */
  rh;

  /** Hitbox offsets. @type {{top: number, right: number, bottom: number, left: number}} */
  offset = { top: 120, right: 35, bottom: 80, left: 35 };

  /**
   * Initializes the endboss, loads all images, sets starting position and energy,
   * and starts animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 3800;
    this.animate();
    this.getRealFrame();
    this.energy = 100;
  }

  /**
   * Handles the animation state of the boss based on current flags.
   */
  animate() {
    setInterval(() => {
      if (this.isDead) this.playDeadAnimation();
      else if (this.isAttack) this.playAttackAnimation();
      else if (this.isHurt) this.playHurtAnimation();
      else if (this.isWalking) this.playWalkAnimation();
      else this.playAnimation(this.IMAGES_ALERT);
    }, 200);
  }

  /** Plays walking animation. */
  playWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /** Plays dead animation and triggers win screen if finished. */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    if (this.checkCurrentDeadImages() - 1) this.winGame();
  }

  /** Plays attack animation and resets attack state when finished. */
  playAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.checkCurrentAttackImages()) this.isNotMoreAttack();
  }

  /** Plays hurt animation and resets hurt state when finished. */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    if (this.checkCurrentHurtImages()) this.isNotMoreHurt();
  }

  /** Checks if dead animation has reached the last frame. @returns {boolean} */
  checkCurrentDeadImages() {
    return this.currentImage >= this.IMAGES_DEAD.length;
  }

  /** Checks if attack animation has reached the last frame. @returns {boolean} */
  checkCurrentAttackImages() {
    return this.currentImage >= this.IMAGES_ATTACK.length;
  }

  /** Resets attack state. */
  isNotMoreAttack() {
    this.isAttack = false;
    this.currentImage = 0;
  }

  /** Checks if hurt animation has reached the last frame. @returns {boolean} */
  checkCurrentHurtImages() {
    return this.currentImage >= this.IMAGES_HURT.length;
  }

  /** Resets hurt state. */
  isNotMoreHurt() {
    this.isHurt = false;
    this.currentImage = 0;
  }

  /** Triggers the win screen after a short delay. */
  winGame() {
    setTimeout(() => {
      showWinScreen();
    }, 300);
  }
}
