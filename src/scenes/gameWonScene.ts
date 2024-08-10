import p5 from "p5";

const gameWonScene = (p: p5, screenWidth: number, screenHeight: number) => {
  p.background(0);
  p.fill("green");
  p.textSize(70);
  p.text("YOU WON", screenWidth / 5, screenHeight / 2);
};

export default gameWonScene;
