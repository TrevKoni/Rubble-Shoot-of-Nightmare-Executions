import p5 from "p5";
import { score } from "../player/player";

const gameOverScene = (p: p5, screenWidth: number, screenHeight: number) => {
  p.background(0);
  p.fill("red");
  p.textSize(70);
  p.text("YOU DEER", screenWidth / 5, screenHeight / 2);

  p.fill("white");
  p.textSize(30);
  p.text("Score: " + score + "", screenWidth / 4, screenHeight / 2 + 100);
};

export default gameOverScene;
