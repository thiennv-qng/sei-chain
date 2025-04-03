import { Scene } from "phaser";

import Card from "../prefabs/Card";

export class Game extends Scene {
  background!: Phaser.GameObjects.Image;
  homeCards: Card[] = [];
  wayCards: Card[] = [];

  constructor() {
    super("Game");
  }

  create() {
    // set background centered
    this.background = this.add.image(
      this.game.scale.width / 2,
      this.game.scale.height / 2,
      "background"
    );
    this.background.setSize(
      +this.sys.game.config.width,
      +this.sys.game.config.height
    );

    this.start();

    this.input.keyboard?.on("keydown-A", () => this.onAttack(0, 0), this);
    this.input.keyboard?.on("keydown-S", () => this.onAttack(1, 0), this);
    this.input.keyboard?.on("keydown-D", () => this.onAttack(2, 1), this);
    this.input.keyboard?.on("keydown-F", () => this.onAttack(3, 2), this);
    this.input.keyboard?.on("keydown-G", () => this.onAttack(4, 2), this);

    this.input.keyboard?.on(
      "keydown-Z",
      () => this.onAttack(0, 0, "home"),
      this
    );
    this.input.keyboard?.on(
      "keydown-X",
      () => this.onAttack(1, 0, "home"),
      this
    );
    this.input.keyboard?.on(
      "keydown-C",
      () => this.onAttack(2, 0, "home"),
      this
    );
    this.input.keyboard?.on(
      "keydown-V",
      () => this.onAttack(3, 0, "home"),
      this
    );
    this.input.keyboard?.on(
      "keydown-B",
      () => this.onAttack(4, 0, "home"),
      this
    );
  }

  createCards() {
    // create home card
    for (let i = 0; i < 5; i++) {
      this.homeCards.push(new Card(this));
    }
    // create way card
    for (let i = 0; i < 5; i++) {
      this.wayCards.push(new Card(this));
    }
  }

  initCards() {
    // home card
    this.homeCards.forEach((card, index) => {
      card.init(-card.width, -card.height, index * 200);
    });
    // way card
    this.wayCards.forEach((card, index) => {
      card.init(
        this.game.scale.width + card.width,
        this.game.scale.height + card.height,
        index * 200
      );
    });
  }

  dealCards() {
    // dealing
    this.homeCards.forEach((card, index) => {
      card.move({ index, length: this.homeCards.length, type: "home" });
    });
    this.wayCards.forEach((card, index) => {
      card.move({ index, length: this.wayCards.length, type: "way" });
    });
  }

  start() {
    this.createCards();
    this.initCards();
    this.dealCards();
  }

  onAttack(c: number, t: number, targetType: "home" | "way" = "way") {
    if (targetType === "way") this.homeCards[c].attack(this.wayCards[t]);
    else this.wayCards[c].attack(this.homeCards[t], "way");
  }
}
