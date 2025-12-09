/**
 * Centralized audio manager that handles all game sound effects.
 * Provides methods for playing, stopping, muting and unmuting sounds.
 *
 * @class
 */
class AudioHub {
  /**
   * Sound effect played when an enemy gets hurt.
   * @type {HTMLAudioElement}
   */
  static ENEMY_HURT = new Audio("audio/enemy-being-hurt.mp3");

  /**
   * Sound effect for the boss enemy attack.
   * @type {HTMLAudioElement}
   */
  static ENEMY_BOSS_ATTACK = new Audio("audio/boss-attack.mp3");

  /**
   * Sound effect for the boss enemy death.
   * @type {HTMLAudioElement}
   */
  static ENEMY_BOSS_DEAD = new Audio("audio/boss-dead.mp3");

  /**
   * Sound played when the player character (Pepe) gets hurt.
   * @type {HTMLAudioElement}
   */
  static PEPE_HURT = new Audio("audio/pepe-being-hurt.mp3");

  /**
   * Sound played when Pepe is sleeping.
   * @type {HTMLAudioElement}
   */
  static PEPE_SLEEPING = new Audio("audio/pepe-sleeping.mp3");

  /**
   * Jump sound effect.
   * @type {HTMLAudioElement}
   */
  static PEPE_JUMP = new Audio("audio/jump.mp3");

  /**
   * Coin collection sound.
   * @type {HTMLAudioElement}
   */
  static COIN = new Audio("audio/coin.mp3");

  /**
   * Bottle collection sound.
   * @type {HTMLAudioElement}
   */
  static BOTTLE_COLLECT = new Audio("audio/collect-bottle.mp3");

  /**
   * Sound played when a bottle breaks.
   * @type {HTMLAudioElement}
   */
  static BOTTLE_SMASH = new Audio("audio/break-bottle.mp3");

  /**
   * Background game soundtrack.
   * @type {HTMLAudioElement}
   */
  static GAMESOUND = new Audio("audio/gamesound.mp3");

  /**
   * Indicates whether all game audio is currently muted.
   * @type {boolean}
   */
  static isMuted = false;

  /**
   * Collection of all audio objects used in the game.
   * Allows batch actions (stop all, mute all).
   *
   * @type {HTMLAudioElement[]}
   */
  static allSounds = [
    AudioHub.ENEMY_HURT,
    AudioHub.ENEMY_BOSS_ATTACK,
    AudioHub.ENEMY_BOSS_DEAD,
    AudioHub.PEPE_HURT,
    AudioHub.PEPE_SLEEPING,
    AudioHub.PEPE_JUMP,
    AudioHub.COIN,
    AudioHub.BOTTLE_COLLECT,
    AudioHub.BOTTLE_SMASH,
    AudioHub.GAMESOUND,
  ];

  /**
   * Plays a single sound effect if the system is not muted.
   *
   * @param {HTMLAudioElement} sound - The sound effect to play.
   * @returns {void}
   */
  static playOne(sound) {
    if (AudioHub.isMuted) return;
    if (sound.readyState == 4) {
      sound.volume = 0.2;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Stops a single sound effect.
   *
   * @param {HTMLAudioElement} sound - The sound effect to stop.
   * @returns {void}
   */
  static stopOne(sound) {
    sound.pause();
  }

  /**
   * Stops all currently active sounds.
   *
   * @returns {void}
   */
  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause();
    });
  }

  /**
   * Mutes all audio and stops all currently playing sounds.
   *
   * @returns {void}
   */
  static mute() {
    AudioHub.isMuted = true;
    AudioHub.stopAll();
  }

  /**
   * Unmutes all audio.
   *
   * @returns {void}
   */
  static unmute() {
    AudioHub.isMuted = false;
  }
}
