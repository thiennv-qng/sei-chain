import { useCallback, useEffect, useRef, useState } from "react";
import Phaser, { GameObjects } from "phaser";
import { htmlToImageURL } from "./utils/screenshot";
import { deepClone } from "./utils";
import clsx from "clsx";

export default function Game() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Phaser.Scene | null>(null);
  const [range, setRange] = useState(12);
  const [homeCardUrls, setHomeCardUrls] = useState<string[]>([]);
  const [wayCardUrls, setWayCardUrls] = useState<string[]>([]);
  const [loadingHomeUrl, setLoadingHomeUrl] = useState(false);
  const [loadingWayUrl, setLoadingWayUrl] = useState(false);
  const [target, setTarget] = useState({ h: 0, w: 0 });

  const genCardHomeUrl = useCallback(async () => {
    try {
      setLoadingHomeUrl(true);
      const elms = document.querySelectorAll(".card_ref_home");

      for (const elm of elms) {
        const _elm = elm as HTMLDivElement;
        const url = await htmlToImageURL(_elm);
        setHomeCardUrls((prev) => {
          const clnCardUrls = deepClone(prev);
          if (!clnCardUrls.includes(url)) clnCardUrls.push(url);
          return clnCardUrls;
        });
      }
    } catch (er: any) {
      // errors
    } finally {
      setLoadingHomeUrl(false);
    }
  }, []);

  const genCardWayUrl = useCallback(async () => {
    try {
      setLoadingWayUrl(true);
      const elms = document.querySelectorAll(".card_ref_way");

      for (const elm of elms) {
        const _elm = elm as HTMLDivElement;
        const url = await htmlToImageURL(_elm);
        setWayCardUrls((prev) => {
          const clnCardUrls = deepClone(prev);
          if (!clnCardUrls.includes(url)) clnCardUrls.push(url);
          return clnCardUrls;
        });
      }
    } catch (er: any) {
      // errors
    } finally {
      setLoadingWayUrl(false);
    }
  }, []);

  useEffect(() => {
    genCardHomeUrl();
    genCardWayUrl();
  }, [genCardHomeUrl, genCardWayUrl]);

  const renderCards = useCallback(
    (scene: Phaser.Scene, homeCardUrls: string[], wayCardUrls: string[]) => {
      if (!scene) return;
      const { width, height } = scene.scale;

      const cardRatio = 192 / 268;
      const cardWidth = width / 8 - 16;
      const cardHeight = cardWidth / cardRatio;
      const cardHomeLength = homeCardUrls.length;
      const cardWayLength = wayCardUrls.length;
      const totalLength = cardHomeLength + cardWayLength;
      const startPointX = width / 2;
      const startPointY = height / 2;
      let startOffset = 0;

      // card home
      let home_idx = 0;
      const homeOffset =
        ((8 - cardHomeLength) / 2) * cardWidth +
        cardWidth / (8 - cardHomeLength);
      for (const _ of homeCardUrls) {
        const cardHome = scene.add.image(
          startPointX - startOffset - totalLength,
          startPointY - startOffset - totalLength,
          `card_home_${home_idx}`
        );
        cardHome.setDisplaySize(cardWidth, cardHeight);
        const positionX = home_idx * cardWidth + cardWidth / 2;
        const offsetX = 16 * home_idx + homeOffset;

        scene.tweens.add({
          targets: cardHome,
          x: positionX + offsetX,
          y: cardHeight / 2 + 16,
          duration: 800,
          ease: "Power2",
          delay: home_idx * 200,
          onComplete: () => scene.events.emit("card_home_tweens_completed"),
        });
        home_idx++;
        startOffset += 2;
      }

      // card way
      let way_idx = 0;
      let way_tween_idx = 0;
      const wayCards: GameObjects.Image[] = [];

      const wayOffset =
        ((8 - cardWayLength) / 2) * cardWidth +
        cardWidth / (8 - cardHomeLength);
      for (const _ of wayCardUrls) {
        const cardWay = scene.add.image(
          startPointX - startOffset - totalLength,
          startPointY - startOffset - totalLength,
          `card_way_${way_idx}`
        );
        cardWay.setDisplaySize(cardWidth, cardHeight);
        if (!wayCards.includes(cardWay)) wayCards.push(cardWay);

        way_idx++;
        startOffset += 2;
      }

      scene.events.once("card_home_tweens_completed", () => {
        for (const wayCard of wayCards) {
          const positionX = way_tween_idx * cardWidth + cardWidth / 2;
          const offsetX = 16 * way_tween_idx + wayOffset;

          scene.tweens.add({
            targets: wayCard,
            x: positionX + offsetX,
            y: height - cardHeight / 2 - 16,
            duration: 800,
            ease: "Power2",
            delay: way_tween_idx * 200,
          });
          way_tween_idx++;
        }
      });
    },
    []
  );

  const onAttack = useCallback(
    (boss: "home" | "way", target: { h: number; w: number }) => {
      if (!sceneRef.current) return;
      const { h: hTarget, w: wTarget } = target;
      const scene = sceneRef.current;

      const { width } = scene.scale;
      const cardWidth = width / 8 - 16;
      const cardHeight = (cardWidth * 268) / 192;

      const cardHome = scene.children.list.find(
        (child) =>
          child instanceof Phaser.GameObjects.Image &&
          child.texture.key === `card_home_${hTarget}`
      ) as Phaser.GameObjects.Image | undefined;

      const cardWay = scene.children.list.find(
        (child) =>
          child instanceof Phaser.GameObjects.Image &&
          child.texture.key === `card_way_${wTarget}`
      ) as Phaser.GameObjects.Image | undefined;

      if (cardHome && cardWay) {
        const cardBoss = boss === "home" ? cardHome : cardWay;
        const cardTarget = boss === "home" ? cardWay : cardHome;
        const indicator = boss === "home" ? -1 : 1;

        const oldPx = cardBoss.x;
        const oldPy = cardBoss.y;
        const targetX = cardTarget.x;
        const targetY = cardTarget.y + (cardHeight + 4) * indicator;

        scene.tweens.add({
          targets: cardBoss,
          x: targetX,
          y: targetY,
          duration: 500,
          ease: "Power3",
          onComplete: () => {
            scene.tweens.add({
              targets: cardBoss,
              x: oldPx,
              y: oldPy,
              duration: 300,
              ease: "Power2",
            });
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      parent: canvasRef.current,
      scene: {
        preload,
        create,
      },
      render: {
        preserveDrawingBuffer: true,
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.image("arena", "/imgs/background.png");
      this.load.spritesheet("frame", "/imgs/frame.png", {
        frameWidth: 3168 / 6,
        frameHeight: 867,
      });
    }

    function create(this: Phaser.Scene) {
      sceneRef.current = this; // Lưu Scene để cập nhật khi có dữ liệu mới

      const { width, height } = this.scale;
      const cardWidth = width / 8 - 16;
      const cardHeight = (cardWidth * 268) / 192;

      // Background
      const background = this.add.image(width / 2, height / 2, "arena");
      background.setDisplaySize(width, width);

      // Bear
      const bear = this.add.sprite(cardWidth / 2 + 16, height / 2, "frame");
      bear.setDisplaySize(cardWidth, cardHeight);
      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("frame", { start: 0, end: 5 }),
        frameRate: 12,
        repeat: -1,
      });

      this.input.keyboard?.on("keydown-D", () => {
        if (bear.anims.isPaused) return bear.anims.resume();
        if (!bear.anims.isPlaying) bear.play("walk");
      });

      this.input.keyboard?.on("keyup-D", () => {
        bear.anims.pause();
      });
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  // controller
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    const bear = scene.data.get("bear") as GameObjects.Sprite;
    if (bear && bear.anims.currentAnim) {
      bear.anims.msPerFrame = 1000 / range;
    }
  }, [range]);

  // load home card
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    homeCardUrls.forEach((url, idx) =>
      scene.load.image(`card_home_${idx}`, url)
    );
    scene.load.start();
  }, [homeCardUrls]);

  // load way card
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    wayCardUrls.forEach((url, idx) => scene.load.image(`card_way_${idx}`, url));
    scene.load.start();
  }, [wayCardUrls]);

  // render card when loading completed
  useEffect(() => {
    if (!sceneRef.current || loadingHomeUrl || loadingWayUrl) return;
    const scene = sceneRef.current;

    scene.load.once("complete", () => {
      if (sceneRef.current) {
        renderCards(sceneRef.current, homeCardUrls, wayCardUrls);
        scene.load.off("complete");
      }
    });
  }, [homeCardUrls, loadingHomeUrl, loadingWayUrl, renderCards, wayCardUrls]);

  return (
    <div className="flex flex-col gap-4 w-screen bg-slate-200 p-6">
      <div className="flex flex-row gap-4">
        <h2>Game</h2>

        <input
          type="range"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          min={1}
          max={120}
        />
        <span>{range}</span>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <p>Home</p>
        </div>
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            className="card_ref_home flex flex-col gap-4 p-4 rounded-xl border border-black bg-white"
            key={item}
          >
            <div className="flex flex-col gap-1">
              <img
                src="/vite.svg"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <p className="text-sm font-bold">Home Card {item}</p>
              <span className="text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <p>Way</p>
        </div>
        {[6, 7, 8, 9].map((item) => (
          <div
            className="card_ref_way flex flex-col gap-4 p-4 rounded-xl border border-black bg-white"
            key={item}
          >
            <div className="flex flex-col gap-1">
              <img
                src="/vite.svg"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <p className="text-sm font-bold">Way Card {item}</p>
              <span className="text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[55rem] aspect-video bg-lime-100 border border-black"> */}
      <div className="w-full aspect-video border border-black">
        <div ref={canvasRef} className="w-full h-full" />
      </div>

      {/* controller */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {homeCardUrls.map((item, idx) => (
            <div
              className={clsx(
                "px-4 py-2 rounded-lg border bg-cyan-300 cursor-pointer text-white font-bold",
                {
                  "bg-cyan-700 ": target.h === idx,
                }
              )}
              key={item}
              onClick={() =>
                setTarget((prev) => {
                  const clnTarget = deepClone(prev);
                  clnTarget.h = idx;
                  onAttack("home", clnTarget);
                  return clnTarget;
                })
              }
            >
              card-{idx + 1}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          {wayCardUrls.map((item, idx) => (
            <div
              className={clsx(
                "px-4 py-2 rounded-lg border bg-red-300 cursor-pointer text-white font-bold",
                {
                  "bg-red-700 ": target.w === idx,
                }
              )}
              key={item}
              onClick={() =>
                setTarget((prev) => {
                  const clnTarget = deepClone(prev);
                  clnTarget.w = idx;
                  onAttack("way", clnTarget);
                  return clnTarget;
                })
              }
            >
              card-{idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
