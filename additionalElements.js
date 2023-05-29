class Text {
  constructor(x, y, label, fontSize, fontColor, scene) {
    scene.add.text(x, y, label).setOrigin(1).setStyle({
      fontSize: fontSize,
      fontFamily: "Comic Sans MS",
      color: fontColor,
    });
  }
}

// це пробувала робити кастомні кнопки, але поки їх мені не треба

// class Button {
//   constructor(x, y, label, scene, callback) {
//     const button = scene.add
//       .text(x, y, label)
//       .setOrigin(1)
//       .setPadding(40, 20)
//       .setStyle({ backgroundColor: "#316147", fontSize: "30px" })
//       .setInteractive({ useHandCursor: true })
//       .on("pointerdown", () => callback())
//       .on("pointerover", () => button.setStyle({ fill: "#f39c12" }))
//       .on("pointerout", () => button.setStyle({ fill: "#FFF" }));
//   }
// }
