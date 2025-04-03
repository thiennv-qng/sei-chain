import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", "/imgs/game/background.png");
    this.load.spritesheet("frame", "/imgs/game/frame.png", {
      frameWidth: 3168 / 6,
      frameHeight: 867,
    });
    this.load.spritesheet("boom", "/imgs/game/boom.png", {
      frameWidth: 500 / 5,
      frameHeight: 90,
    });
  }

  create() {
    this.scene.start("Preloader");
  }
}
