import p5 from "p5";
import enemy from "../mobs/baseEnemy";
import { player } from "../player/player";

const gameScene = (p: p5, screenWidth: number, screenHeight: number) => {
  const enemies = enemy(p, screenWidth, screenHeight);
  player(p, screenWidth, screenHeight, enemies);
};

export default gameScene;
