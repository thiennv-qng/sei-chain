import clsx from "clsx";
import { useRef, useState } from "react";
import { deepClone } from "./utils";
import { PhaserGame } from "./game/PhaserGame";

export default function Container() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Phaser.Scene | null>(null);
  const [range, setRange] = useState(12);
  const [homeCardUrls, setHomeCardUrls] = useState<string[]>([]);
  const [wayCardUrls, setWayCardUrls] = useState<string[]>([]);
  const [target, setTarget] = useState({ h: 0, w: 0 });

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
        {/* {[1, 2, 3, 4, 5].map((item) => (
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
        ))} */}
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <p>Way</p>
        </div>
        {/* {[6, 7, 8, 9].map((item) => (
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
        ))} */}
      </div>

      {/* <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[55rem] aspect-video bg-lime-100 border border-black"> */}
      <div className="w-full aspect-video border border-black">
        <PhaserGame />
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
                  // onAttack("home", clnTarget);
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
                  // onAttack("way", clnTarget);
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
