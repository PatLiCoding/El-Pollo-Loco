/**
 * Represents a game level with all its components.
 */
class Level {
  /** Array of enemy objects in the level. @type {Array<MoveableObject>} */
  enemies;

  /** Array of cloud objects in the level. @type {Array<MoveableObject>} */
  clouds;

  /** Array of background objects in the level. @type {Array<BackgroundObject>} */
  backgroundObjects;

  /** Array of bottle objects in the level. @type {Array<Bottle>} */
  bottle;

  /** Array of coin objects in the level. @type {Array<Coins>} */
  coins;

  /** X coordinate marking the end of the level. @type {number} */
  level_end_x = 4000;

  /**
   * Creates a new Level instance.
   * @param {Array<MoveableObject>} enemies - The enemies in this level.
   * @param {Array<MoveableObject>} clouds - The clouds in this level.
   * @param {Array<BackgroundObject>} backgroundObjects - Background objects for parallax.
   * @param {Array<Bottle>} bottle - Bottles collectible in the level.
   * @param {Array<Coins>} coins - Coins collectible in the level.
   */
  constructor(enemies, clouds, backgroundObjects, bottle, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottle = bottle;
    this.coins = coins;
  }
}
