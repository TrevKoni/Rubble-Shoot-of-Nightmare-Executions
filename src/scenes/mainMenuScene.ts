import p5 from "p5";

const mainMenuScene = (p: p5, screenWidth: number, screenHeight: number) => {
  p.background(0);
  playGameText(p, screenWidth, screenHeight);
  startPlaying(p);
};

const playGameText = (p: p5, screenWidth: number, screenHeight: number) => {
  p.fill("green");
  p.textSize(70);
  p.text("PLAY GAME", screenWidth / 5, screenHeight / 2);

  p.fill("white");
  p.textSize(30);
  p.text("Press [SPACE] to play!", screenWidth / 4, screenHeight / 2 + 100);
};

const startPlaying = (p: p5) => {
  if (p.keyIsDown(32)) {
    sessionStorage.setItem("GameState", "GamePlaying");
  }
};

export default mainMenuScene;
