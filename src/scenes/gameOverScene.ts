import p5 from "p5";

const gameOverScene = (p: p5, screenWidth: number, screenHeight: number) => {
  p.background(0);
  p.fill("red");
  p.textSize(70);
  p.text("YOU DEER", screenWidth / 5, screenHeight / 2);
};

export default gameOverScene;
