class StartGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartGameScene" });
  }

  preload() {
    this.load.image("sky", "./assets/sprites/sky.jpg");

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

    // створюємо пташки і додаємо логіку, щоб при кліку на пташку вона ставала гравцем в грі
    // додаємо анімацію кожній пташці

    // червона пташка
    this.bird = this.physics.add
      .sprite(100, 350, "bird", 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        chosenBird = "bird";
        this.scene.start("GameScene");
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
        chosenBird = "blueBird";
        this.scene.start("GameScene");
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
        chosenBird = "yellowBirdCap";
        this.scene.start("GameScene");
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
        chosenBird = "brownBirdCap";
        this.scene.start("GameScene");
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
        chosenBird = "yellowBird";
        this.scene.start("GameScene");
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
        chosenBird = "brownBirdHair";
        this.scene.start("GameScene");
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
        chosenBird = "pinkBird";
        this.scene.start("GameScene");
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
      600,
      200,
      "Flappy Bird",
      "90px",
      "#317647",
      this
    );

    this.startGameInstructions = new Text(
      610,
      270,
      "Choose your bird to start the game",
      "30px",
      "#EB5F03",
      this
    );

    // перейти до гри

    //   this.input.keyboard.on(
    //     "keyup",
    //     function (event) {
    //       if (event.key == "Enter") {
    //         this.scene.start("GameScene");
    //       }
    //     },
    //     this
    //   );
  }

  update() {
    this.bird.anims.play("fly-bird", true);
    this.blueBird.anims.play("fly-blueBird", true);
    this.yellowBirdCap.anims.play("fly-yellowBirdCap", true);
    this.brownBirdCap.anims.play("fly-brownBirdCap", true);
    this.brownBirdHair.anims.play("fly-brownBirdHair", true);
    this.yellowBird.anims.play("fly-yellowBird", true);
    this.pinkBird.anims.play("fly-pinkBird", true);
  }
}
