import p5 from "p5";
import currentScene from "./utils/sceneManager";

const screenWidth = 600;
const screenHeight = 900;

sessionStorage.setItem("GameState", "MainMenu");

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(screenWidth, screenHeight);
  };

  p.draw = () => {
    p.background(200);

    currentScene(p, screenWidth, screenHeight);
  };
};

new p5(sketch);
