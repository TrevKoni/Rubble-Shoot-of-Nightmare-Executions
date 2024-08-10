import p5 from "p5";
import player from "../player/player";
import enemy from "../mobs/baseEnemy";

const gameScene = (p: p5, screenWidth: number, screenHeight: number) => {
  const enemies = enemy(p, screenWidth, screenHeight);
  player(p, screenWidth, screenHeight, enemies);
};

export default gameScene;
