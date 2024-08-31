import p5 from "p5";
import { score } from "../player/player";

const dropsNames: string[] = [
  "HealingPotion",
  "SpeedBoost",
  "ExtraMaxHealth",
  "DamageBoost",
  "Exodia",
];

let dropSpawn = {
  x: 300,
  y: 50,
};

const dropSpeed = 0.05;

const drop = (p: p5, playerX: number, playerY: number) => {
  let deltaY = dropSpeed * p.deltaTime;

  if (score >= 100) {
    dropSpawn.y += deltaY;
  }

  healingPotionBody(p, dropSpawn.x, dropSpawn.y);
};

const healingPotionBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF");
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const speedBoostBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF");
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};
const extreaMaxHealthBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF");
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const damageBoostBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF");
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

const exodiaBody = (p: p5, x: number, y: number) => {
  let color = p.color("#FFFFFF");
  p.fill(color);
  p.noStroke();
  p.ellipse(x, y, 15, 15);
};

export default drop;
