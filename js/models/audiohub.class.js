class AudioHub {
  static ENEMY_HURT = new Audio("audio/enemy-being-hurt.mp3");
  static ENEMY_BOSS_ATTACK = new Audio("audio/boss-attack.mp3");
  static ENEMY_BOSS_DEAD = new Audio("audio/boss-dead.mp3");
  static PEPE_HURT = new Audio("audio/pepe-being-hurt.mp3");
  static PEPE_SLEEPING = new Audio("audio/pepe-sleeping.mp3");
  static PEPE_JUMP = new Audio("audio/jump.mp3");
  static COIN = new Audio("audio/coin.mp3");
  static BOTTLE_COLLECT = new Audio("audio/collect-bottle.mp3");
  static BOTTLE_SMASH = new Audio("audio/break-bottle.mp3");
  static GAMESOUND = new Audio("audio/gamesound.mp3");

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

  static playOne(sound) {
    if (sound.readyState == 4) {
      sound.volume = 0.2;
      sound.currentTime = 0;
      sound.play();
    } else {
      return;
    }
  }

  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause();
    });
    document.getElementById("volume").value = 0.2;
  }

  static stopOne(sound) {
    sound.pause();
  }

  //   static objSetVolume(volumeSliderID) {
  //     let currentVolumeValue = document.getElementById(volumeSliderID).value; // Holt den aktuellen Lautstärkewert aus dem Inputfeld
  //     AudioHub.allSounds.forEach((sound) => {
  //       sound.volume = currentVolumeValue; // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
  //     });
  //   }
}
