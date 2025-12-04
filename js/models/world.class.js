class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  animationId;
  keyboard;
  camera_x = 0;
  statusBar = [
    new StatusBarHealth(),
    new StatusBarBottle(),
    new StatusBarBoss(),
  ];
  throwableObjects = [];
  lastKeyD = false;
  coinImage = new Image();
  coinsCollected = 0;
  deadEnemies = [];
  bossTriggered = false;

  constructor(canvas, keyboard, gamesound) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coinImage.src = "assets/img/8_coin/coin_2.png";
    this.draw();
    this.setWorld();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectToMap(this.statusBar);

    this.ctx.font = "26px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.drawImage(this.coinImage, 5, 75, 75, 75);
    this.ctx.fillText("x " + this.coinsCollected, 65, 120);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.deadEnemies);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.bottle);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    this.animationId = requestAnimationFrame(() => this.draw());
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottle();
    }, 200);
    this.setStoppableInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isBoss && !enemy.isDead) {
          if (!this.bossTriggered && this.character.x >= 1500) {
            this.bossTriggered = true;
          }
          if (this.bossTriggered) {
            if (enemy.x > 0) {
              enemy.moveLeft();
            }
          }
        }
      });
    }, 1000 / 60);
    setInterval(() => {
      setTimeout(() => {
        AudioHub.GAMESOUND.loop = true;
        AudioHub.playOne(AudioHub.GAMESOUND);
      }, 50);
    }, 7000);
  }

  setStoppableInterval(fm, time) {
    let id = setInterval(fm, time);
    intervalIds.push(id);
  }

  stopGame() {
    cancelAnimationFrame(this.animationId);
    intervalIds.forEach(clearInterval);
  }

  checkCollisions() {
    this.character.getRealFrame();

    this.level.enemies.forEach((enemy, index) => {
      enemy.getRealFrame();

      if (this.character.isJumpOn(enemy)) {
        this.isKilled(enemy);
        this.level.enemies.splice(index, 1);
        this.character.speedY = 25;
        AudioHub.playOne(AudioHub.ENEMY_HURT);
      } else if (this.character.isColliding(enemy) && enemy.isBoss) {
        enemy.isAttack = true;
        enemy.currentImage = 0;
        AudioHub.playOne(AudioHub.ENEMY_BOSS_ATTACK);
        this.character.hit();
        this.statusBar[0].setPercentage(this.statusBar[0].percentage - 20);
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.statusBar[0].percentage - 20);
      }
    });

    this.level.bottle.forEach((bottle, index) => {
      bottle.getRealFrame();

      if (this.character.isColliding(bottle)) {
        if (this.statusBar[1].percentage < 100) {
          AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
          this.statusBar[1].setPercentage(this.statusBar[1].percentage + 20);
          this.level.bottle.splice(index, 1);
        }
      }
    });

    this.level.coins.forEach((coins, index) => {
      coins.getRealFrame();

      if (this.character.isColliding(coins)) {
        this.coinsCollected++;
        AudioHub.playOne(AudioHub.COIN);
        this.level.coins.splice(index, 1);
      }
    });

    this.character.updateLastBottom();
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      !this.lastKeyD &&
      this.statusBar[1].percentage >= 20
    ) {
      this.lastKeyD = true;
      if (this.character.otherDirection) {
        this.character.x - 50;
        this.character.otherDirection = !this.character.otherDirection;
      }
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 120
      );
      this.throwableObjects.push(bottle);
      this.statusBar[1].setPercentage(this.statusBar[1].percentage - 20);
    }
    if (!this.keyboard.D) {
      this.lastKeyD = false;
    }
  }

  checkBottle() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      bottle.getRealFrame();

      this.level.enemies.forEach((enemy, enemyIndex) => {
        enemy.getRealFrame();

        if (this.isBottleHitEnemy(bottle, enemy)) {
          AudioHub.playOne(AudioHub.BOTTLE_SMASH);
          AudioHub.playOne(AudioHub.ENEMY_HURT);

          if (enemy.isBoss) {
            AudioHub.playOne(AudioHub.BOTTLE_SMASH);
            enemy.energy -= 20;
            this.statusBar[2].setPercentage(enemy.energy);

            if (enemy.energy > 0) {
              enemy.isHurt = true;
              enemy.currentImage = 0;
              AudioHub.playOne(AudioHub.ENEMY_BOSS_ATTACK);
            } else {
              enemy.isDead = true;
              enemy.currentImage = 0;
              AudioHub.playOne(AudioHub.ENEMY_BOSS_DEAD);
              setTimeout(() => {
                this.killedBoss(enemy);
                this.level.enemies.splice(enemyIndex, 1);
              }, enemy.IMAGES_DEAD.length * 200);
              showWinScreen();
            }
          } else {
            this.isKilled(enemy);
            this.level.enemies.splice(enemyIndex, 1);
          }
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  isKilled(enemy) {
    const dead = new DrawableObject();
    dead.loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
    dead.x = enemy.x;
    dead.y = enemy.y;
    dead.width = enemy.width;
    dead.height = enemy.height;
    this.deadEnemies.push(dead);
  }

  killedBoss(enemy) {
    const dead = new DrawableObject();
    dead.loadImage("assets/img/4_enemie_boss_chicken/5_dead/G26.png");
    dead.x = enemy.x;
    dead.y = enemy.y;
    dead.width = enemy.width;
    dead.height = enemy.height;
    this.deadEnemies.push(dead);
  }

  isBottleHitEnemy(bottle, enemy) {
    return (
      bottle.rx + bottle.width > enemy.rx &&
      bottle.rx < enemy.rx + enemy.width &&
      bottle.ry + bottle.height > enemy.ry &&
      bottle.ry < enemy.ry + enemy.height
    );
  }
}
