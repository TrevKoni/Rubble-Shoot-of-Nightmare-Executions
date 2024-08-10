import p5 from "p5";
import player from "../player/player";
import enemy from "../mobs/baseEnemy";

const gameScene = (p: p5, screenWidth: number, screenHeight: number) => {
  player(p, screenWidth, screenHeight);
  enemy(p, screenWidth, screenHeight, 10);
};

export default gameScene;
