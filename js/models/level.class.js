class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottle;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObjects, bottle) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottle = bottle;
  }
}
