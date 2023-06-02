import { IntroScene } from "./introScene.js";
import { AboutScene } from "./aboutScene.js";
import { StartGameScene } from "./startGameScene.js";
import { GameScene } from "./gameScene.js";
import { GameOverScene } from "./gameOverScene.js";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [IntroScene, AboutScene, StartGameScene, GameScene, GameOverScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
};
