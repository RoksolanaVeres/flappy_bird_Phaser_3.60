class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }
  preload() {
    this.load.image("sky", "./assets/sprites/sky.png");
    this.load.image("results_table", "./assets/sprites/results_table.png");
    this.load.image("replay_button", "./assets/sprites/replay_button.png");
    this.load.image("home_button", "./assets/sprites/home_button.png");
  }

  create() {
    this.add.image(400, 300, "sky");
    this.add.image(400, 210, "results_table");

    this.replayButton = this.add.image(200, 490, "replay_button");
    this.homeButton = this.add.image(600, 490, "home_button");

    this.replayButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
        gameOver = false;
        score = 0;
      });

    this.homeButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("StartGameScene");
        gameOver = false;
        score = 0;
      });

    // Надписи в таблиці результатів
    this.currentResult = new Text(
      460,
      270,
      `SCORE: ${score}`,
      "30px",
      "#317647",
      this
    );

    this.currentResult = new Text(
      530,
      330,
      `BEST RESULT: ${maxScore}`,
      "30px",
      "#D03E2A",
      this
    );
  }
}
