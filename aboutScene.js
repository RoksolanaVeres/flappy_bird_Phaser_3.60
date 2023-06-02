export class AboutScene extends Phaser.Scene {
  constructor() {
    super({ key: "AboutScene" });
  }

  preload() {
    this.load.image("instructions", "./assets/sprites/instructions.png");
    this.load.image("nextIcon", "./assets/sprites/next_icon.png");
  }

  create() {
    this.add.image(400, 300, "instructions");
    this.nextIcon = this.add.image(650, 450, "nextIcon");

    this.nextIcon
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("StartGameScene");
      });
  }
}
