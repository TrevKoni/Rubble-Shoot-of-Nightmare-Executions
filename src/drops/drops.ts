import p5 from "p5";
import { score } from "../player/player";

// Array of drop names
const dropsNames: string[] = [
  "HealingPotion",
  "SpeedBoost",
  "ExtraMaxHealth",
  "DamageBoost",
  "Exodia",
];

// Initial drop spawn position
let dropSpawn = {
  x: 300,
  y: 50,
};

const dropSpeed = 0.05;

let dropType = "";

// Function to handle drop
const drop = (
  p: p5,
): { dropType: string; dropNumber: number; dropX: number; dropY: number } => {
  let deltaY = dropSpeed * p.deltaTime;

  if (score >= 100) {
    dropSpawn.y += deltaY;
  }

  let dropNumber: number = 0;

  // Select drop type dynamically
  if (dropType === "") {
    dropType = selectDropType();
  }

  // Draw the appropriate drop based on its type
  switch (dropType) {
    case "HealingPotion":
      healingPotionBody(p, dropSpawn.x, dropSpawn.y);
      dropNumber = 30;
      break;
    case "SpeedBoost":
      speedBoostBody(p, dropSpawn.x, dropSpawn.y);
      dropNumber = 0.2;
      break;
    case "ExtraMaxHealth":
      extraMaxHealthBody(p, dropSpawn.x, dropSpawn.y);
      dropNumber = 10;
      break;
    case "DamageBoost":
      damageBoostBody(p, dropSpawn.x, dropSpawn.y);
      dropNumber = 1.2;
      break;
    case "Exodia":
      exodiaBody(p, dropSpawn.x, dropSpawn.y);
      dropNumber = 1;
      break;
  }

  return {
    dropType: dropType,
    dropNumber: dropNumber,
    dropX: dropSpawn.x,
    dropY: dropSpawn.y,
  };
};

const resetDrop = () => {
  dropType = "";
  dropSpawn = {
    x: 300,
    y: 50,
  };
};

// Function to randomly select a drop type
const selectDropType = (): string => {
  return dropsNames[Math.floor(Math.random() * dropsNames.length)];
};

// Functions to draw each drop type
const healingPotionBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FF0000"); // Red for healing potion
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const speedBoostBody = (p: p5, x: number, y: number) => {
  let color = p.color("#00FF00"); // Green for speed boost
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const extraMaxHealthBody = (p: p5, x: number, y: number) => {
  let color = p.color("#0000FF"); // Blue for extra max health
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const damageBoostBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFF00"); // Yellow for damage boost
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const exodiaBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF"); // White for Exodia
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

export { drop, resetDrop };
