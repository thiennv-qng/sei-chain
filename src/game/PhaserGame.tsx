import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import StartGame from "./main";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface PhaserGameProps {
  currentActiveScene?: string; // or whatever type it should be
}

export const PhaserGame = forwardRef<IRefPhaserGame, PhaserGameProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function PhaserGame(_, ref) {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const game = useRef<Phaser.Game | null>(null);
    const scene = useRef<Phaser.Scene | null>(null);

    useLayoutEffect(() => {
      if (!game.current) {
        game.current = StartGame(canvasRef.current);
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          game.current = null;
        }
        scene.current = null;
      };
    }, []);

    // Expose `game` and `scene` to parent via ref
    useImperativeHandle(ref, () => ({
      game: game.current,
      scene: scene.current,
    }));

    return <div ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
  }
);
