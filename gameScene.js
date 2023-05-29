// variables
let gameOver = false;
let score = 0;
let maxScore = localStorage.getItem("maxScore") || 0;
let chosenBird;

class GameScene extends Phaser.Scene {
  bird;
  columns;
  scoreText;
  maxScoreText;
  gap = 150;
  xGap = 400;
  columnPosX;
  columnPosY;
  birdyX = 100;
  birdyY = 150;
  pauseNotification;
  randomBackground = Phaser.Math.Between(1, 13);

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image(
      "background",
      `./assets/sprites/background${this.randomBackground}.jpg`
    );
    this.load.image("base", "./assets/sprites/base.png");
    this.load.image("pipeDown", "./assets/sprites/pipeDown.png");
    this.load.image("pipeUp", "./assets/sprites/pipeUp.png");
    this.load.image("game_over", "./assets/sprites/gameover.png");
  }

  create() {
    this.add.image(400, 300, "background");

    // додаємо пташку, яку саме залежить від змінної chosenBird
    this.bird = this.physics.add.sprite(
      this.birdyX,
      this.birdyY,
      `${chosenBird}`,
      0
    );
    this.bird.setCollideWorldBounds(true);

    // додаємо 2 колони рандомно
    this.columns = this.physics.add.staticGroup();
    this.columnPosX = game.config.width + 10;
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
      .create(game.config.width / 2, game.config.height + 100, "base")
      .setScale(2.5)
      .refreshBody()
      .setDepth(1);

    // вдаряння пташки об землю і колони
    this.physics.add.collider(this.bird, ground, this.hitObject, null, this);
    this.physics.add.collider(
      this.bird,
      this.columns,
      this.hitObject,
      null,
      this
    );

    this.cursor = this.input.keyboard.createCursorKeys();

    // текст для виведення результатів
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    this.maxScoreText = this.add
      .text(500, 16, `Max score: ${maxScore}`, {
        fontSize: "32px",
        fill: "#000",
      })
      .setDepth(1);
  }

  update() {
    this.bird.anims.play(`fly-${chosenBird}`, true);

    // game Over
    if (gameOver) {
      this.bird.anims.play(`fly-${chosenBird}`, false);

      setTimeout(() => {
        this.add.image(400, 300, "game_over");
      }, 700);

      // записуємо максимальний результат в localStorage
      if (score > maxScore) {
        maxScore = score;
        localStorage.setItem("maxScore", maxScore);
      }

      return;
    }

    // логіка для того, щоб пташка махала крильми тільки, якщо натиснута клавіша вгору
    if (!this.cursor.up.isDown) {
      this.bird.anims.play(`fly-${chosenBird}`, false);
      this.bird.setVelocityY(150);
    } else {
      this.bird.setVelocityY(-190);
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
        if (child.x <= game.config.width && !child.drawn) {
          child.drawn = true;
          this.createNewPairOfColumns();
        }
        if (child.x <= -50) {
          child.destroy();
        }

        // логіка для нарахування балів
        if (
          child.x < this.birdyX &&
          !gameOver &&
          child.texture.key == "pipeDown" &&
          !child.scored
        ) {
          child.scored = true;
          score += 10;
          this.scoreText.setText("score: " + score).setDepth(1);
        }
      }
    });

    // ставимо гру на паузу
    // Пробіл - пауза, Shift - відміна паузи
    // !!! не вдалося зробити так, щоб пробілом і ставилась пауза і потім відмінялася
    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.code == "Space") {
          game.loop.sleep();
        }
      },
      this
    );

    this.input.keyboard.on(
      "keyup",
      function (event) {
        if (event.key == "Shift") {
          game.loop.wake();
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
    let max = Math.floor(game.config.height - safePadding - this.gap / 2);
    let randColumnHeight = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomTop = randColumnHeight - (this.gap / 2 + 260);
    let randomBottom = randColumnHeight + (this.gap / 2 + 260);
    return [randomBottom, randomTop];
  }

  // функція для вдаряння пташки об перешкоди
  hitObject(bird, column) {
    this.bird.anims.play(`fly-${chosenBird}`, false);
    this.physics.pause();
    this.bird.setTint(0xff0000);
    gameOver = true;
    let mainCamera = this.cameras.main;
    mainCamera.shake(100);

    setTimeout(() => {
      this.scene.start("GameOverScene");
    }, 2000);
  }

  // функції для генерування нових рандомних колон
  createNewPairOfColumns() {
    this.columnPosY = this.getRandom();
    this.columns
      .create(game.config.width + this.xGap, this.columnPosY[0], "pipeDown")
      .setScale(1)
      .refreshBody();

    this.columns
      .create(game.config.width + this.xGap, this.columnPosY[1], "pipeUp")
      .setScale(1)
      .refreshBody();
  }
}
