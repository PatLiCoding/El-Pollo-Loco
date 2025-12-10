/**
 * Represents the main player character (Pepe) in the game.
 * Handles movement, animations, gravity, and interaction with the game world.
 *
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  /**
   * Horizontal position of the character in the world.
   * @type {number}
   */
  x = 60;

  /**
   * Vertical position of the character in the world.
   * @type {number}
   */
  y = 140;

  /**
   * Character height in pixels.
   * @type {number}
   */
  height = 300;

  /**
   * Movement speed of the character.
   * @type {number}
   */
  speed = 10;

  /**
   * Walking animation frames.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Jumping animation frames.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Death animation frames.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./assets/img/2_character_pepe/5_dead/D-51.png",
    "./assets/img/2_character_pepe/5_dead/D-52.png",
    "./assets/img/2_character_pepe/5_dead/D-53.png",
    "./assets/img/2_character_pepe/5_dead/D-54.png",
    "./assets/img/2_character_pepe/5_dead/D-55.png",
    "./assets/img/2_character_pepe/5_dead/D-56.png",
    "./assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Hurt animation frames.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./assets/img/2_character_pepe/4_hurt/H-41.png",
    "./assets/img/2_character_pepe/4_hurt/H-42.png",
    "./assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Idle animation frames.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Long idle (sleeping) animation frames.
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Current frame index for animations.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Reference to the game world the character belongs to.
   * @type {World}
   */
  world;

  /**
   * Timestamp of the last action performed by the character.
   * Used for idle/sleep detection.
   * @type {number}
   */
  lastActionTime = new Date().getTime();

  /**
   * Timeout in milliseconds before switching to long idle (sleeping) animation.
   * @type {number}
   */
  idleTimeout = 5000;

  /**
   * Indicates if the character is currently sleeping.
   * @type {boolean}
   */
  sleeping = false;

  isJumpingAnimation = false;

  /**
   * Real hitbox X coordinate.
   * @type {number}
   */
  rx;

  /**
   * Real hitbox Y coordinate.
   * @type {number}
   */
  ry;

  /**
   * Real hitbox width.
   * @type {number}
   */
  rw;

  /**
   * Real hitbox height.
   * @type {number}
   */
  rh;

  /**
   * Collision hitbox offsets.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = { top: 120, right: 28, bottom: 10, left: 20 };

  /**
   * Initializes the character with default image and loads all animations.
   */
  constructor() {
    super();
    this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
    this.applyGravity();
    this.getRealFrame();
  }

  /**
   * Handles character movement and camera updates.
   */
  animate() {
    setInterval(() => {
      if (this.isMoveRight()) this.moveRight();
      if (this.isMoveLeft()) this.moveLeft();
      if (this.isJump()) this.jump();
      this.updateCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation();
    }, 120);
  }

  /**
   * Determines which animation to play based on character state.
   */
  playAnimation() {
    if (this.isJumpingAnimation) {
      super.playAnimation(this.IMAGES_JUMPING);
      this.jumpingAnimation();
      return;
    }
    if (this.isDead()) super.playAnimation(this.IMAGES_DEAD);
    else if (this.isHurt()) super.playAnimation(this.IMAGES_HURT);
    else if (this.isSleeping()) super.playAnimation(this.IMAGES_LONG_IDLE);
    else if (this.isMoving()) super.playAnimation(this.IMAGES_WALKING);
    else super.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Checks if the character is moving horizontally.
   * @returns {boolean}
   */
  isMoving() {
    if (this.isJumpingAnimation) return;
    else return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean}
   */
  isMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right and updates last action time.
   */
  moveRight() {
    super.moveRight();
    this.updateLastActioTime();
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean}
   */
  isMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the left and updates last action time.
   */
  moveLeft() {
    this.otherDirection = true;
    super.moveLeft();
    this.updateLastActioTime();
  }

  /**
   * Checks if the character should jump.
   * @returns {boolean}
   */
  isJump() {
    return (
      (this.world.keyboard.UP || this.world.keyboard.SPACE) &&
      !this.isAboveGround()
    );
  }

  /**
   * Makes the character jump and updates last action time.
   */
  jump() {
    super.jump();
    this.isJumpingAnimation = true;
    this.currentImage = 0;
    this.updateLastActioTime();
  }

  jumpingAnimation() {
    if (this.currentImage >= this.IMAGES_JUMPING.length) {
      this.isJumpingAnimation = false;
      this.currentImage = 0;
    }
  }

  /**
   * Updates the timestamp of the last action.
   */
  updateLastActioTime() {
    this.lastActionTime = new Date().getTime();
  }

  /**
   * Updates the camera position based on the character's X position.
   * @returns {number} The new camera X position
   */
  updateCamera() {
    return (this.world.camera_x = -this.x + 100);
  }
}
