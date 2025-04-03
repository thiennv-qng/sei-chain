import { GameObjects, Scene } from "phaser";
import { ScreenConfigs } from "../constant";

class AtkEffect extends GameObjects.Sprite {
  width: number;
  height: number;
  frameRate = 12;
  repeat = 0;
  startFrame = 0;
  endFrame = 4;
  animKey = "hitting";
  zIndex = 9;
  constructor(scene: Scene) {
    super(scene, 0, 0, "boom");
    this.scene = scene;
    this.width =
      this.scene.scale.width / ScreenConfigs.Cols - ScreenConfigs.Gap;
    this.height =
      (this.width * ScreenConfigs.CardBaseWidth) / ScreenConfigs.CardBaseHeight;
  }

  initBoom(x: number, y: number) {
    const boom = this.scene.add.sprite(x, y, "boom");
    boom.setDepth(this.zIndex);

    return boom;
  }

  start(
    x: number,
    y: number,
    callback = () => {
      /** callback fnc */
    }
  ) {
    const boom = this.initBoom(x, y);

    if (!this.scene.anims.exists(this.animKey))
      this.scene.anims.create({
        key: this.animKey,
        frames: this.scene.anims.generateFrameNumbers("boom", {
          start: this.startFrame,
          end: this.endFrame,
        }),
        frameRate: this.frameRate,
        repeat: this.repeat,
        hideOnComplete: true,
      });

    boom.play(this.animKey);
    boom.on("animationcomplete", callback);
  }

  destroy() {
    this.removeAllListeners();
    super.destroy(true);
  }
}

export default AtkEffect;
