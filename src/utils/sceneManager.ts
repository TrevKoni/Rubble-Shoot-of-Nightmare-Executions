import p5 from "p5";
import mainMenuScene from "../scenes/mainMenuScene";
import gameScene from "../scenes/gameScene";
import gameOverScene from "../scenes/gameOverScene";
import gameWonScene from "../scenes/gameWonScene";

const currentScene = (p: p5, screenWidth: number, screenHeight: number) => {
  let gameState = sessionStorage.getItem("GameState");

  if (gameState === null || gameState === "MainMenu") {
    mainMenuScene(p, screenWidth, screenHeight);
  } else if (gameState === "GamePlaying") {
    gameScene(p, screenWidth, screenHeight);
  } else if (gameState === "Dead") {
    gameOverScene(p, screenWidth, screenHeight);
  } else if (gameState === "GameWon") {
    gameWonScene(p, screenWidth, screenHeight);
  } else {
    mainMenuScene(p, screenWidth, screenHeight);
  }
};

export default currentScene;
