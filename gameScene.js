import { Global } from "./global.js";

export class GameScene extends Phaser.Scene {
  bird;
  columns;
  scoreText;
  maxScoreText;
  levelText;
  gap;
  xGap;
  columnPosX;
  columnPosY;
  birdyX = 100;
  birdyY = 150;
  gameOver;
  background;
  hitSound;
  getPointSound;
  flapSound;
  velosityUpwards;
  velosityDownwards;
  scoreIncrease;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // всі можливі фони
    this.load.image(`background1`, `./assets/sprites/background1.jpg`);
    this.load.image(`background2`, `./assets/sprites/background2.jpg`);
    this.load.image(`background3`, `./assets/sprites/background3.jpg`);
    this.load.image(`background4`, `./assets/sprites/background4.jpg`);
    this.load.image(`background5`, `./assets/sprites/background5.jpg`);
    this.load.image(`background6`, `./assets/sprites/background6.jpg`);
    this.load.image(`background7`, `./assets/sprites/background7.jpg`);
    this.load.image(`background8`, `./assets/sprites/background8.jpg`);
    this.load.image(`background9`, `./assets/sprites/background9.jpg`);
    this.load.image(`background10`, `./assets/sprites/background10.jpg`);
    this.load.image(`background11`, `./assets/sprites/background11.jpg`);
    this.load.image(`background12`, `./assets/sprites/background12.jpg`);

    // звуки
    this.load.audio("hit", "./assets/audio/hit.ogg");
    this.load.audio("point", "./assets/audio/point.ogg");
    this.load.audio("flap", "./assets/audio/flap.ogg");

    // інші елементи
    this.load.image("base", "./assets/sprites/base.png");
    this.load.image("pipeDown", "./assets/sprites/pipeDown.png");
    this.load.image("pipeUp", "./assets/sprites/pipeUp.png");
    this.load.image("game_over", "./assets/sprites/gameover.png");
  }

  create() {
    // початкові дані
    Global.score = 0;
    this.gameOver = false;

    // відстань і отвір між колонами змінюється залежно від рівня
    if (Global.level === 1) {
      this.gap = 150;
      this.xGap = 500;
    } else if (Global.level === 2) {
      this.gap = 140;
      this.xGap = 380;
    } else {
      this.gap = 130;
      this.xGap = 320;
    }

    // звуки
    this.hitSound = this.sound.add("hit");
    this.getPointSound = this.sound.add("point");
    this.flapSound = this.sound.add("flap");

    // обираємо рандомний фон
    this.add.image(400, 300, `background${Phaser.Math.Between(1, 12)}`);

    // додаємо пташку, яку саме залежить від змінної chosenBird
    this.bird = this.physics.add.sprite(
      this.birdyX,
      this.birdyY,
      `${Global.chosenBird}`,
      0
    );
    this.bird.setCollideWorldBounds(true);

    // додаємо 2 колони рандомно
    this.columns = this.physics.add.staticGroup();
    this.columnPosX = Global.game.config.width + 10;
    this.columnPosY = this.getRandom();
    this.columns
      .create(this.columnPosX, this.columnPosY[0], "pipeDown")
      .setScale(1)
      .refreshBody();
    this.columns
      .create(this.columnPosX, this.columnPosY[1], "pipeUp")
      .setScale(1)
      .refreshBody();

    // додаємо земельку і розтягуємо картинку на всю ширину екрану
    let ground = this.physics.add.staticGroup();
    ground
      .create(
        Global.game.config.width / 2,
        Global.game.config.height + 100,
        "base"
      )
      .setScale(2.5)
      .refreshBody()
      .setDepth(1);

    // задаємо вдаряння пташки об землю і колони
    this.physics.add.collider(this.bird, ground, this.hitObject, null, this);
    this.physics.add.collider(
      this.bird,
      this.columns,
      this.hitObject,
      null,
      this
    );

    // курсор для керування пташкою
    this.cursor = this.input.keyboard.createCursorKeys();

    // текст для виведення результатів і рівня
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    this.levelText = this.add
      .text(250, 16, `level: ${Global.level}`, {
        fontSize: "32px",
        fill: "#000",
      })
      .setDepth(1);

    this.maxScoreText = this.add
      .text(500, 16, `Max score: ${Global.maxScore}`, {
        fontSize: "32px",
        fill: "#000",
      })
      .setDepth(1);
  }

  update() {
    // game Over
    if (this.gameOver) {
      this.bird.anims.play(`fly-${Global.chosenBird}`, false);

      setTimeout(() => {
        this.add.image(400, 300, "game_over");
      }, 700);

      // записуємо максимальний результат в localStorage
      if (Global.score > Global.maxScore) {
        Global.maxScore = Global.score;
        localStorage.setItem("maxScore", Global.maxScore);
      }

      return;
    }

    // швидкість руху пташки вгору і вниз розбита по рівнях
    if (Global.level === 1) {
      this.velosityDownwards = 150;
      this.velosityUpwards = -190;
    } else if (Global.level === 2) {
      this.velosityDownwards = 200;
      this.velosityUpwards = -240;
    } else {
      this.velosityDownwards = 230;
      this.velosityUpwards = -270;
    }

    // логіка для того, щоб пташка махала крильми тільки, якщо натиснута клавіша вгору
    if (!this.cursor.up.isDown) {
      this.bird.anims.play(`fly-${Global.chosenBird}`, false);
      this.bird.setVelocityY(this.velosityDownwards);
    } else {
      this.bird.setVelocityY(this.velosityUpwards);
      this.flapSound.play();
    }

    // Генеруємо нові колони рандомно
    let children = this.columns.getChildren();

    children.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
        child.refreshBody();
        child.x += -3;
      }

      if (
        child instanceof Phaser.GameObjects.Sprite &&
        child.texture.key == "pipeDown"
      ) {
        if (child.x <= Global.game.config.width && !child.drawn) {
          child.drawn = true;
          this.createNewPairOfColumns();
        }
        if (child.x <= -50) {
          child.destroy();
        }

        // логіка для нарахування балів
        // к-сть нарахованих балів залежить від рівня
        if (Global.level === 1) {
          this.scoreIncrease = 10;
        } else if (Global.level === 2) {
          this.scoreIncrease = 20;
        } else {
          this.scoreIncrease = 50;
        }

        if (
          child.x < this.birdyX &&
          !this.gameOver &&
          child.texture.key == "pipeDown" &&
          !child.scored
        ) {
          child.scored = true;
          Global.score += this.scoreIncrease;
          this.scoreText.setText("score: " + Global.score).setDepth(1);
          this.getPointSound.play();
        }
      }
    });

    // ставимо гру на паузу
    // Пробіл - пауза, Shift - відміна паузи
    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.code == "Space") {
          Global.game.loop.sleep();
        }
      },
      this
    );

    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.key == "Shift") {
          Global.game.loop.wake();
        }
      },
      this
    );
  }

  // Інші функції (методи)

  // функція для рандомних позицій колон
  getRandom() {
    let safePadding = 50;
    let min = Math.ceil(safePadding + this.gap / 2);
    let max = Math.floor(
      Global.game.config.height - safePadding - this.gap / 2
    );
    let randColumnHeight = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomTop = randColumnHeight - (this.gap / 2 + 260);
    let randomBottom = randColumnHeight + (this.gap / 2 + 260);
    return [randomBottom, randomTop];
  }

  // функція для вдаряння пташки об перешкоди
  hitObject(bird, column) {
    this.bird.anims.play(`fly-${Global.chosenBird}`, false);
    this.physics.pause();
    this.bird.setTint(0xff0000);
    this.gameOver = true;
    let mainCamera = this.cameras.main;
    mainCamera.shake(100);
    this.hitSound.play();

    setTimeout(() => {
      this.scene.start("GameOverScene");
    }, 2000);
  }

  // функції для генерування нових рандомних колон
  createNewPairOfColumns() {
    this.columnPosY = this.getRandom();
    this.columns
      .create(
        Global.game.config.width + this.xGap,
        this.columnPosY[0],
        "pipeDown"
      )
      .setScale(1)
      .refreshBody();

    this.columns
      .create(
        Global.game.config.width + this.xGap,
        this.columnPosY[1],
        "pipeUp"
      )
      .setScale(1)
      .refreshBody();
  }
}
