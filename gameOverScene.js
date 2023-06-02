import { Global } from "./global.js";
import { Text } from "./additionalElements.js";

export class GameOverScene extends Phaser.Scene {
  gameOverMusic;
  constructor() {
    super({ key: "GameOverScene" });
  }
  preload() {
    this.load.image("sky", "./assets/sprites/sky.png");
    this.load.image("results_table", "./assets/sprites/results_table.png");
    this.load.image("replay_button", "./assets/sprites/replay_button.png");
    this.load.image("settings_button", "./assets/sprites/settings_button.png");
    this.load.image("home_button", "./assets/sprites/home_button.png");

    // музика
    this.load.audio("resultsMusic", "./assets/audio/results_music.wav");
  }

  create() {
    this.add.image(400, 300, "sky");
    this.add.image(400, 210, "results_table");

    // кнопки
    this.replayButton = this.add.image(200, 490, "replay_button");
    this.settingsButton = this.add.image(400, 490, "settings_button");
    this.homeButton = this.add.image(600, 490, "home_button");

    this.replayButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
        this.gameOverMusic.stop();
      });

    this.settingsButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("StartGameScene");
        this.gameOverMusic.stop();
      });

    this.homeButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("IntroScene");
        this.gameOverMusic.stop();
      });

    // Надписи в таблиці результатів
    this.currentResult = new Text(
      460,
      270,
      `SCORE: ${Global.score}`,
      "30px",
      "#317647",
      this
    );

    this.currentResult = new Text(
      530,
      330,
      `BEST RESULT: ${Global.maxScore}`,
      "30px",
      "#D03E2A",
      this
    );

    // фонова музика
    this.gameOverMusic = this.sound.add("resultsMusic", { loop: true });
    this.gameOverMusic.play();

    // виключити музику
    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.code == "Space") {
          this.gameOverMusic.stop();
        }
      },
      this
    );
  }
}
