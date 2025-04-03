import { GameObjects } from "phaser";
import { ScreenConfigs } from "../constant";
import AtkEffect from "./AtkEffect";
import Point from "./Point";

class Card extends GameObjects.Sprite {
  background!: GameObjects.Image;
  x = 0;
  y = 0;
  delay = 0;
  scaleX = 0;
  scaleY = 0;
  width: number;
  height: number;
  atkEffect = new AtkEffect(this.scene);
  pointEffect = new Point(this.scene);
  index = 0;
  zIndex = 1;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.width =
      this.scene.scale.width / ScreenConfigs.Cols - ScreenConfigs.Gap;
    this.height =
      (this.width * ScreenConfigs.CardBaseWidth) / ScreenConfigs.CardBaseHeight;
  }

  init(x: number, y: number, delay: number) {
    this.x = x;
    this.y = y;
    this.delay = delay;
    this.background = this.scene.add
      .image(x, y, "background")
      .setDisplaySize(this.width, this.height)
      .setOrigin(0.5, 0.5)
      .setDepth(this.zIndex)
      .setVisible(true);
  }

  move({
    index,
    length,
    type = "home",
    callback = () => {
      /** callback fnc */
    },
  }: {
    length: number;
    index: number;
    type?: "home" | "way";
    callback?: () => void;
  }) {
    this.index = index;
    const offset =
      ((ScreenConfigs.Cols - length) / 2) * this.width +
      this.width / (ScreenConfigs.Cols - length);
    const offsetX = ScreenConfigs.Gap * index + offset;

    const x = index * this.width + this.width / 2 + offsetX;
    const y =
      type === "home"
        ? this.height / 2 + ScreenConfigs.Gap
        : this.scene.scale.height - this.height / 2 - ScreenConfigs.Gap;

    this.x = x;
    this.y = y;
    this.scene.tweens.add({
      targets: this.background,
      x,
      y,
      duration: 500,
      ease: "Power2",
      delay: index * 200,
      onUpdate: () => this.background.setOrigin(0.5, 0.5),
      onComplete: callback,
    });
  }

  attack(target: Card, targetType: "home" | "way" = "home") {
    const { x, y, height } = target;
    const offsetY = targetType === "home" ? -1 : 1;
    const pY = y + height * 0.75 * offsetY;

    const currScaleX = this.background.scaleX;
    const currScaleY = this.background.scaleY;

    const targetScaleX = target.background.scaleX;
    const targetScaleY = target.background.scaleY;

    this.scene.tweens.add({
      targets: this.background,
      scaleX: currScaleX + currScaleX / 10,
      scaleY: currScaleY + currScaleY / 10,
      duration: 300,
      ease: "Power2",
      depth: 2 + this.index,
      onComplete: () => {
        this.scene.tweens.add({
          targets: this.background,
          scaleX: currScaleX,
          scaleY: currScaleY,
          x: x,
          y: pY,
          duration: 200,
          ease: "Power3",
          depth: 2 + this.index,
          onComplete: () => {
            this.scene.tweens.add({
              targets: target.background,
              scaleX: targetScaleX - targetScaleX / 10,
              scaleY: targetScaleY - targetScaleY / 10,
              duration: 100,
              ease: "Power3",
              onComplete: () => {
                this.scene.tweens.add({
                  targets: target.background,
                  scaleX: targetScaleX,
                  scaleY: targetScaleY,
                  duration: 100,
                  ease: "Power3",
                });
              },
            });
            this.atkEffect.start(x, y, () => {
              this.scene.tweens.add({
                targets: this.background,
                x: this.x,
                y: this.y,
                duration: 300,
                ease: "Power2",
                depth: 1,
              });
            });
            this.pointEffect.play(x, y + this.height / 3, "-199");
          },
        });
      },
    });
  }
}

export default Card;
