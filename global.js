export class Global {
  static score = 0;
  static maxScore = localStorage.getItem("maxScore") || 0;
  static chosenBird;
  static level = 1;
  static game;
}
