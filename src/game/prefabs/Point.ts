import { GameObjects, Scene } from "phaser";
import { ScreenConfigs } from "../constant";

class Point extends GameObjects.Text {
  duration = 500;
  tween?: Phaser.Tweens.Tween;
  fontSize = 18;
  offset = 0;
  zIndex = 10;

  constructor(scene: Scene) {
    super(scene, 0, 0, "", {
      fontSize: "18px",
      color: "red",
      align: "center",
      fixedWidth: ScreenConfigs.CardBaseWidth,
    });

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0.5);
    this.setVisible(false);

    const width =
      this.scene.scale.width / ScreenConfigs.Cols - ScreenConfigs.Gap;
    const height =
      (width * ScreenConfigs.CardBaseWidth) / ScreenConfigs.CardBaseHeight;
    this.offset = height * 0.5;
  }

  play(
    x: number,
    y: number,
    value: string,
    callback = () => {
      /** callback func */
    }
  ) {
    this.setText(value);
    this.setPosition(x, y);
    this.setAlpha(1);
    this.setVisible(true);

    this.tween = this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0.7 },
      y: this.y - this.offset,
      duration: this.duration,
      ease: "Power2",
      depth: this.zIndex,
      onComplete: () => {
        this.setVisible(false);
        callback();
      },
    });
  }
}

export default Point;
