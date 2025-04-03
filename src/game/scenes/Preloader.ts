import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(this.scale.width / 2, this.scale.height / 2, "background");
  }

  create() {
    this.scene.start("Game");
  }
}
