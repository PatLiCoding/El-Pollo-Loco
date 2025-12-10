/**
 * Represents the game world, handling all game logic, rendering, and interactions.
 */
class World {
  /** @type {Character} The main player character. */
  character = new Character();

  /** @type {Object} The current level data. */
  level = level1;

  /** @type {HTMLCanvasElement} The canvas element for rendering. */
  canvas;

  /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
  ctx;

  /** @type {number} The ID of the current animation frame. */
  animationId;

  /** @type {number[]} Array of interval IDs to allow stopping all intervals. */
  intervalIds;

  /** @type {Keyboard} The keyboard input handler. */
  keyboard;

  /** @type {number} Camera position on the x-axis for scrolling. */
  camera_x = 0;

  /** @type {Array<StatusBar>} Array of status bars: health, bottles, boss health. */
  statusBar = [new StatusBarHealth(), new StatusBarBottle()];

  /** @type {Array<ThrowableObject>} Array of bottles thrown by the character. */
  throwableObjects = [];

  /** @type {boolean} Tracks whether the throw key was last pressed. */
  lastKeyD = false;

  /** @type {HTMLImageElement} Image used for the coin counter. */
  coinImage = new Image();

  /** @type {number} Number of coins collected by the player. */
  coinsCollected = 0;

  /** @type {Array<DrawableObject>} Array of dead enemies to render. */
  deadEnemies = [];

  /** @type {boolean} Indicates if the boss fight has been triggered. */
  bossTriggered = false;

  /**
   * Creates the game world and initializes rendering and game logic.
   * @param {HTMLCanvasElement} canvas - The canvas to render on.
   * @param {Keyboard} keyboard - Keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coinImage.src = "assets/img/8_coin/coin_2.png";
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Draws the entire world including background, objects, status bars, and coins.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStatusBar();
    this.drawCoinCounter();
    this.drawLevelObjects();
    this.animationId = requestAnimationFrame(() => this.draw());
    this.setWorld();
  }

  /**
   * Draws background objects and clouds with camera offset.
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
  }

  /**
   * Draws all status bars.
   */
  drawStatusBar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectToMap(this.statusBar);
  }

  /**
   * Draws the coin counter in the UI.
   */
  drawCoinCounter() {
    this.ctx.font = "26px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.drawImage(this.coinImage, 5, 75, 75, 75);
    this.ctx.fillText("x " + this.coinsCollected, 65, 120);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws all level objects including enemies, coins, bottles, and dead enemies.
   */
  drawLevelObjects() {
    this.addObjectToMap(this.deadEnemies);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.bottle);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Links the world to the character for reference.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts game intervals for collisions, boss fights, and music.
   */
  run() {
    this.setStoppableInterval(() => this.checkIsSleeping(), 200);
    this.setStoppableInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkBottle();
    }, 100);
    this.setStoppableInterval(() => this.checkStartBossFight(), 1000 / 60);
    AudioHub.playOne(AudioHub.GAMESOUND);
  }

  /**
   * Checks if the character is sleeping and triggers corresponding audio.
   */
  checkIsSleeping() {
    if (this.character.isSleeping()) {
      if (!this.character.sleeping) this.startSleeping();
    } else {
      if (this.character.sleeping) this.stopSleeping();
    }
  }

  /**
   * Starts sleeping state and plays sleeping audio.
   */
  startSleeping() {
    if (!this.character.gameEnd) {
      AudioHub.playOne(AudioHub.PEPE_SLEEPING);
      this.character.sleeping = true;
    } else return;
  }

  /**
   * Stops sleeping state and stops sleeping audio.
   */
  stopSleeping() {
    AudioHub.stopOne(AudioHub.PEPE_SLEEPING);
    this.character.sleeping = false;
  }

  /**
   * Checks if the boss should start moving based on character position.
   */
  checkStartBossFight() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isBoss) {
        if (this.checkCharacterIsNear()) this.bossIsTriggered(enemy);
        if (this.bossTriggered) this.bossMoving(enemy);
      }
    });
  }

  /**
   * Determines if the character is near enough to trigger the boss fight.
   * @returns {boolean} True if the boss fight should be triggered.
   */
  checkCharacterIsNear() {
    return !this.bossTriggered && this.character.x >= 3300;
  }

  /**
   * Activates the boss and sets it walking.
   * @param {Enemy} enemy - The boss enemy.
   */
  bossIsTriggered(enemy) {
    enemy.isWalking = true;
    this.bossTriggered = true;
    this.statusBar.push(new StatusBarBoss());
  }

  /**
   * Moves the boss toward the character.
   * @param {Enemy} enemy - The boss enemy.
   */
  bossMoving(enemy) {
    const distance = this.character.x - enemy.x;
    const moveSpeed = 2;
    if (Math.abs(distance) > moveSpeed) {
      if (distance > 0) {
        enemy.moveRight();
        enemy.otherDirection = true;
      } else {
        enemy.moveLeft();
        enemy.otherDirection = false;
      }
    }
  }

  /**
   * Creates a stoppable interval and stores its ID for later clearing.
   * @param {Function} fm - The function to execute.
   * @param {number} time - Interval duration in milliseconds.
   */
  setStoppableInterval(fm, time) {
    let id = setInterval(fm, time);
    intervalIds.push(id);
  }

  /**
   * Stops the game by canceling animations and clearing all intervals.
   */
  stopGame() {
    cancelAnimationFrame(this.animationId);
    intervalIds.forEach(clearInterval);
    this.keyboard = [];
    this.character.gameEnd = true;
    AudioHub.stopOne(AudioHub.GAMESOUND);
  }

  /**
   * Checks all collisions in the game world.
   */
  checkCollisions() {
    this.character.getRealFrame();
    this.checkCollisionEnemies();
    this.checkCollisionBottle();
    this.checkCollisionCoins();
    this.character.updateLastBottom();
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkCollisionEnemies() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      enemy.getRealFrame();
      if (this.character.isJumpOn(enemy)) {
        if (!enemy.isBoss) {
          this.killedEnemies(enemy);
          this.spliceDeadChicken(enemy, enemyIndex);
        }
      }
      if (!this.character.isHurt()) {
        if (
          !this.character.isJumpOn(enemy) &&
          this.character.isColliding(enemy)
        ) {
          if (enemy.isBoss) this.isAttackByBoss(enemy);
          else this.EnemieHurtCharacter();
        }
      }
    });
  }

  /**
   * Removes a dead chicken and applies bounce effect.
   * @param {number} index - Index of the dead enemy in the array.
   */
  spliceDeadChicken(enemy, enemyIndex) {
    if (enemy.isBoss) return;
    if (!enemy.isBoss) this.level.enemies.splice(enemyIndex, 1);
    if (this.character.isJumpOn(enemy)) this.character.speedY = 25;
    AudioHub.playOne(AudioHub.ENEMY_HURT);
  }

  /**
   * Triggers boss attack animation and sound.
   * @param {Enemy} enemy - The boss enemy.
   */
  isAttackByBoss(enemy) {
    enemy.isAttack = true;
    enemy.currentImage = 0;
    AudioHub.playOne(AudioHub.ENEMY_BOSS_ATTACK);
    this.EnemieHurtCharacter();
  }

  /**
   * Reduces character health and updates health bar.
   */
  EnemieHurtCharacter() {
    this.character.hit();
    this.statusBar[0].setPercentage(this.statusBar[0].percentage - 20);
  }

  /**
   * Checks if the character collides with any bottles on the ground and collects them if possible.
   */
  checkCollisionBottle() {
    this.level.bottle.forEach((bottle, index) => {
      bottle.getRealFrame();
      if (this.character.isColliding(bottle)) {
        if (this.statusBar[1].percentage < 100) this.addBottle(index);
      }
    });
  }

  /**
   * Collects a bottle, plays sound, increases bottle status bar, and removes it from the level.
   * @param {number} index - The index of the bottle in the level's bottle array.
   */
  addBottle(index) {
    AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
    this.statusBar[1].setPercentage(this.statusBar[1].percentage + 20);
    this.level.bottle.splice(index, 1);
  }

  /**
   * Checks if the character collides with any coins and collects them.
   */
  checkCollisionCoins() {
    this.level.coins.forEach((coins, index) => {
      coins.getRealFrame();
      if (this.character.isColliding(coins)) {
        this.coinsCollected++;
        AudioHub.playOne(AudioHub.COIN);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Handles throwing objects if the throw key is pressed.
   */
  checkThrowObjects() {
    if (this.checkPossibleThrow()) {
      this.lastKeyD = true;
      if (this.character.otherDirection) this.flipCharacterForThrow();
      this.throwBottle();
    }
    if (!this.keyboard.D) this.lastKeyD = false;
  }

  /**
   * Determines whether the character can throw a bottle.
   * @returns {boolean} True if throw key is pressed and enough bottles are available.
   */
  checkPossibleThrow() {
    return (
      this.keyboard.D && !this.lastKeyD && this.statusBar[1].percentage >= 20
    );
  }

  /**
   * Flips the character visually when throwing a bottle in the opposite direction.
   */
  flipCharacterForThrow() {
    this.character.x - 50;
    this.character.otherDirection = !this.character.otherDirection;
  }

  /**
   * Throws a bottle from the character's position and updates the bottle status bar.
   */
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 120
    );
    this.throwableObjects.push(bottle);
    this.statusBar[1].setPercentage(this.statusBar[1].percentage - 20);
  }

  /**
   * Checks thrown bottles for collisions with enemies and the floor.
   */
  checkBottle() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      bottle.getRealFrame();
      if (bottle.hasHit) return;
      if (this.checkSplashFloor(bottle) && !bottle.bottleOnFloor)
        this.isSplashFloor(bottle);
      this.checkBottleEnemies(bottle, bottleIndex);
    });
  }

  /**
   * Checks if a bottle hits the floor.
   * @returns {boolean} True if the bottle reaches floor height.
   */
  checkSplashFloor(bottle) {
    return bottle.y + bottle.height >= 340;
  }

  /**
   * Handles a bottle hitting the floor: sets the state and plays smash sound.
   */
  isSplashFloor(bottle) {
    bottle.bottleOnFloor = true;
    AudioHub.playOne(AudioHub.BOTTLE_SMASH);
  }

  /**
   * Checks collisions between a thrown bottle and all enemies.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {number} bottleIndex - Index of the bottle in the throwableObjects array.
   */
  checkBottleEnemies(bottle, bottleIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      enemy.getRealFrame();
      if (!bottle.hasHit && this.isBottleHitEnemy(bottle, enemy)) {
        this.bottleSplash(bottle);
        if (enemy.isBoss) this.bossIsHit(enemy);
        else this.chickenIsHit(enemy, bottle, enemyIndex);
        this.spliceBottle(bottle, bottleIndex);
      }
    });
  }

  /**
   * Determines if a bottle hits an enemy.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {Enemy} enemy - The enemy to check collision with.
   * @returns {boolean} True if the bottle collides with the enemy.
   */
  isBottleHitEnemy(bottle, enemy) {
    return (
      bottle.rx + bottle.rw > enemy.rx &&
      bottle.rx < enemy.rx + enemy.rw &&
      bottle.ry + bottle.rh > enemy.ry &&
      bottle.ry < enemy.ry + enemy.rh
    );
  }

  /**
   * Handles bottle collision with enemy: marks it as hit and plays smash animation/sound.
   * @param {ThrowableObject} bottle - The bottle that hit the enemy.
   */
  bottleSplash(bottle) {
    bottle.hasHit = true;
    bottle.isCollidingEnemie = true;
    bottle.currentImage = 0;
    AudioHub.playOne(AudioHub.BOTTLE_SMASH);
  }

  /**
   * Applies damage to the boss when hit by a bottle.
   * @param {Enemy} enemy - The boss enemy.
   */
  bossIsHit(enemy) {
    enemy.energy -= 10;
    this.statusBar[2].setPercentage(enemy.energy);
    if (enemy.energy > 10) {
      enemy.isHurt = true;
      enemy.currentImage = 0;
      AudioHub.playOne(AudioHub.ENEMY_BOSS_ATTACK);
    } else this.gameWin(enemy);
  }

  /**
   * Applies bottle hit effect to chickens.
   * @param {Enemy} enemy - The enemy chicken.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {number} enemyIndex - Index of the enemy in the level enemies array.
   */
  chickenIsHit(enemy, bottle, enemyIndex) {
    this.spliceDeadChicken(enemy, enemyIndex);
    this.killedEnemies(enemy);
    this.isSplashEnemy(bottle, enemyIndex);
  }

  /**
   * Removes enemy after bottle splash animation.
   * @param {ThrowableObject} bottle - The bottle that caused the splash.
   * @param {number} enemyIndex - Index of the enemy in the level enemies array.
   */
  isSplashEnemy(bottle, enemyIndex) {
    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, bottle.IMAGE_SPLASH.length * 80);
  }

  /**
   * Handles game win when boss is defeated.
   * @param {Enemy} enemy - The defeated boss enemy.
   */
  gameWin(enemy) {
    enemy.isDead = true;
    enemy.currentImage = 0;
    AudioHub.playOne(AudioHub.ENEMY_BOSS_DEAD);
  }

  /**
   * Removes a bottle from the throwableObjects array after splash animation.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {number} bottleIndex - Index of the bottle in the throwableObjects array.
   */
  spliceBottle(bottle, bottleIndex) {
    setTimeout(() => {
      this.throwableObjects.splice(bottleIndex, 1);
    }, bottle.IMAGE_SPLASH.length * 40);
  }

  /**
   * Adds multiple objects to the map for rendering.
   * @param {Array<DrawableObject>} objects - Array of drawable objects.
   */
  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map and handles flipping if necessary.
   * @param {DrawableObject} mo - Object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips an object horizontally.
   * @param {DrawableObject} mo - Object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores flipped object back to original orientation.
   * @param {DrawableObject} mo - Object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Pushes a dead enemy to the deadEnemies array for rendering.
   * @param {DrawableObject} dead - The dead enemy object.
   * @param {Enemy} enemy - The original enemy.
   */
  pushToDeadEnemyArray(dead, enemy) {
    dead.x = enemy.x;
    dead.y = enemy.y;
    dead.width = enemy.width;
    dead.height = enemy.height;
    this.deadEnemies.push(dead);
  }

  /**
   * Adds a dead enemy sprite to the deadEnemies array for rendering
   * after its death animation.
   *
   * @param {DrawableObject} dead - The drawable dead enemy object (e.g. corpse sprite).
   * @param {Enemy} enemy - The original enemy that died.
   */
  killedEnemies(enemy) {
    const dead = new DrawableObject();
    if (enemy.isBoss)
      dead.loadImage("assets/img/4_enemie_boss_chicken/5_dead/G26.png");
    if (enemy.isSmallChicken)
      dead.loadImage(
        "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
      );
    else
      dead.loadImage(
        "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
      );
    this.pushToDeadEnemyArray(dead, enemy);
  }
}
