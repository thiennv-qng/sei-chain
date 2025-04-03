import { AUTO, Game } from "phaser";
import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: "100%",
  height: "100%",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Boot, Preloader, MainGame],
};

const StartGame = (parent: Phaser.Types.Core.GameConfig["parent"]) => {
  const game = new Game({ ...config, parent });
  return game;
};

export default StartGame;
