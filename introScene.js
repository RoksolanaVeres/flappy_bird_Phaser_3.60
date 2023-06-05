import { Text } from "./additionalElements.js";

export class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: "IntroScene" });
  }

  preload() {
    this.load.image(
      "introBackground",
      "./assets/sprites/intro_background_larger.jpg"
    );

    // кнопки
    this.load.image("about_button", "./assets/sprites/about_button.png");
    this.load.image("next_button", "./assets/sprites/next_button.png");
  }

  create() {
    this.add.image(400, 350, "introBackground");

    // кнопки
    this.aboutButton = this.add.image(300, 550, "about_button");
    this.nextButton = this.add.image(480, 550, "next_button");

    this.aboutButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("AboutScene");
      });

    this.nextButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("StartGameScene");
      });

    // текст
    this.flappyBirdHeader = new Text(
      600,
      100,
      "Flappy Bird",
      "70px",
      "#DD0580",
      this
    );
  }

  update() {}
}
