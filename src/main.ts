import p5 from "p5";
import player from "./scripts/player";
import enemy from "./scripts/enemy";

const screenWidth = 600;
const screenHeight = 900;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screenWidth, screenHeight);
  };

  p.draw = () => {
    p.background(200);

    player(p, screenWidth, screenHeight);
    enemy(p, screenWidth, screenHeight);
  };
};

new p5(sketch);
