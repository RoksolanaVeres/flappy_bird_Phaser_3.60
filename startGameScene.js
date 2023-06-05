import { Global } from "./global.js";
import { Text } from "./additionalElements.js";

export class StartGameScene extends Phaser.Scene {
  backgroundMusic;
  constructor() {
    super({ key: "StartGameScene" });
  }

  preload() {
    this.load.image("sky", "./assets/sprites/sky.jpg");

    // кнопки для рівнів
    this.load.image("level1_button", "./assets/sprites/level1_button.png");
    this.load.image("level2_button", "./assets/sprites/level2_button.png");
    this.load.image("level3_button", "./assets/sprites/level3_button.png");

    // музика
    this.load.audio("music", "./assets/audio/background_music_1.wav");

    // додаємо всі пташки

    // червона пташка
    this.load.spritesheet("bird", "./assets/sprites/redBird.png", {
      frameWidth: 81,
      frameHeight: 81,
    });

    // синя пташка
    this.load.spritesheet("blueBird", "./assets/sprites/blueBird.png", {
      frameWidth: 85,
      frameHeight: 72,
    });

    // жовта пташка з кепкою
    this.load.spritesheet(
      "yellowBirdCap",
      "./assets/sprites/yellowBirdCap.png",
      {
        frameWidth: 87.5,
        frameHeight: 68,
      }
    );

    // коричнева пташка з кепкою
    this.load.spritesheet("brownBirdCap", "./assets/sprites/brownBirdCap.png", {
      frameWidth: 85,
      frameHeight: 67,
    });

    // жовта пташка
    this.load.spritesheet("yellowBird", "./assets/sprites/yellowBird.png", {
      frameWidth: 85,
      frameHeight: 75,
    });

    // коричнева пташка з ірокезом
    this.load.spritesheet(
      "brownBirdHair",
      "./assets/sprites/brownBirdHair.png",
      {
        frameWidth: 85,
        frameHeight: 76,
      }
    );

    // рожева пташка
    this.load.spritesheet("pinkBird", "./assets/sprites/pinkBird.png", {
      frameWidth: 85,
      frameHeight: 63,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    // вибір рівня
    this.levelOneButton = this.add.image(280, 150, "level1_button");
    this.levelTwoButton = this.add.image(380, 150, "level2_button");
    this.levelThreeButton = this.add.image(480, 150, "level3_button");

    this.levelOneButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.level = 1;
        this.levelOneButton.setTint(0x74ffac);
        this.levelTwoButton.clearTint();
        this.levelThreeButton.clearTint();
      });

    this.levelTwoButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.level = 2;
        this.levelTwoButton.setTint(0x74ffac);
        this.levelOneButton.clearTint();
        this.levelThreeButton.clearTint();
      });

    this.levelThreeButton
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.level = 3;
        this.levelThreeButton.setTint(0x74ffac);
        this.levelOneButton.clearTint();
        this.levelTwoButton.clearTint();
      });

    // фонова музика
    this.backgroundMusic = this.sound.add("music", {
      loop: true,
      volume: 0.2,
    });
    this.backgroundMusic.play();

    // створюємо пташки і додаємо логіку, щоб при кліку на пташку вона ставала гравцем в грі
    // додаємо анімацію кожній пташці

    // червона пташка
    this.bird = this.physics.add
      .sprite(100, 350, "bird", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "bird";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-bird",
      frames: this.anims.generateFrameNumbers("bird", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    // синя пташка
    this.blueBird = this.physics.add
      .sprite(250, 350, "blueBird", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "blueBird";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-blueBird",
      frames: this.anims.generateFrameNumbers("blueBird", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    // жовта пташка з кепкою
    this.yellowBirdCap = this.physics.add
      .sprite(430, 350, "yellowBirdCap", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "yellowBirdCap";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-yellowBirdCap",
      frames: this.anims.generateFrameNumbers("yellowBirdCap", {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    // коричнева пташка з кепкою
    this.brownBirdCap = this.physics.add
      .sprite(620, 350, "brownBirdCap", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "brownBirdCap";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-brownBirdCap",
      frames: this.anims.generateFrameNumbers("brownBirdCap", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    // жовта пташка
    this.yellowBird = this.physics.add
      .sprite(150, 460, "yellowBird", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "yellowBird";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-yellowBird",
      frames: this.anims.generateFrameNumbers("yellowBird", {
        start: 0,
        end: 1,
      }),
      frameRate: 12,
      repeat: -1,
    });

    // коричнева пташка з ірокезом
    this.brownBirdHair = this.physics.add
      .sprite(350, 460, "brownBirdHair", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "brownBirdHair";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-brownBirdHair",
      frames: this.anims.generateFrameNumbers("brownBirdHair", {
        start: 0,
        end: 1,
      }),
      frameRate: 12,
      repeat: -1,
    });

    // рожева пташка
    this.pinkBird = this.physics.add
      .sprite(530, 460, "pinkBird", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        Global.chosenBird = "pinkBird";
        this.scene.start("GameScene");
        this.backgroundMusic.stop();
      });

    this.anims.create({
      key: "fly-pinkBird",
      frames: this.anims.generateFrameNumbers("pinkBird", {
        start: 0,
        end: 1,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.physics.pause();

    // текст
    this.flappyBirdHeader = new Text(
      550,
      90,
      "Choose your level:",
      "40px",
      "#2B5A3E",
      this
    );

    this.startGameInstructions = new Text(
      550,
      270,
      "Choose your bird:",
      "40px",
      "#EB5F03",
      this
    );
  }

  update() {
    this.bird.anims.play("fly-bird", true);
    this.blueBird.anims.play("fly-blueBird", true);
    this.yellowBirdCap.anims.play("fly-yellowBirdCap", true);
    this.brownBirdCap.anims.play("fly-brownBirdCap", true);
    this.brownBirdHair.anims.play("fly-brownBirdHair", true);
    this.yellowBird.anims.play("fly-yellowBird", true);
    this.pinkBird.anims.play("fly-pinkBird", true);

    // виключити музику
    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.code == "Space") {
          this.backgroundMusic.stop();
        }
      },
      this
    );
  }
}
