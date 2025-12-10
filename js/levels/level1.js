/**
 * Global variable holding the first game level.
 * @type {Level}
 */
let level1;

/**
 * Initializes the first level of the game.
 * Creates all enemies, clouds, parallax background layers,
 * bottles, and coins, and assigns them to the Level instance.
 *
 * @function
 * @returns {void}
 */
function initLevel1() {
  level1 = new Level(
    /**
     * Enemies appearing in this level.
     * @type {MoveableObject[]}
     */
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],

    /**
     * Cloud objects used in the level.
     * @type {Cloud[]}
     */
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],

    /**
     * Parallax background objects.
     * Order determines the depth and scrolling speed.
     * @type {BackgroundObject[]}
     */
    [
      new BackgroundObject("./assets/img/5_background/layers/air.png", -720),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        -720
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        -720
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        -720
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/1.png",
        0
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/1.png",
        0
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 720),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        720
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        720
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        720
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 720 * 2),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/1.png",
        720 * 2
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/1.png",
        720 * 2
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/1.png",
        720 * 2
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 720 * 3),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        720 * 3
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        720 * 3
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        720 * 3
      ),
      new BackgroundObject("./assets/img/5_background/layers/air.png", 720 * 4),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        720 * 4
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        720 * 4
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        720 * 4
      ),
    ],

    /**
     * Collectible bottles placed in the level.
     * @type {Bottle[]}
     */
    [
      new Bottle("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
    ],

    /**
     * Collectible coins scattered throughout the level.
     * @type {Coins[]}
     */
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ]
  );
}
