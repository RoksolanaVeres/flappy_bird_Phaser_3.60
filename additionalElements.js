export class Text {
  constructor(x, y, label, fontSize, fontColor, scene) {
    scene.add.text(x, y, label).setOrigin(1).setStyle({
      fontSize: fontSize,
      fontFamily: "Comic Sans MS",
      color: fontColor,
    });
  }
}
