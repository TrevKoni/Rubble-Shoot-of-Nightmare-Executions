import p5 from "p5";
import bossesData from "../mobs/bosses.json";

// Define the TypeScript interface for the bosses data
interface Boss {
  name: string;
  streamUrl: string;
  image: string;
  blastImage: string;
  bossMusic: string;
  health: number;
  damage: number;
  speed: number;
  blasts: number;
  blastSpeed: number;
}

interface Bosses {
  [key: string]: Boss; // Removed the nested 'bosses' key
}

// Cast the imported JSON to the correct type
const bosses = bossesData as { bosses: Bosses }; // Correctly access bosses

// Access the specific boss using the correct key
let bossId = 0;
let bossKey = Object.keys(bosses.bosses)[bossId]; // Get the boss key by index
let selectedBoss = bosses.bosses[bossKey]; // Access the boss object

// Now you can safely access the properties
let bossVelocity = selectedBoss.speed;
let bossHealth = selectedBoss.health;
let blastNumber = selectedBoss.blasts;
let blastSpeed = selectedBoss.blastSpeed;
let blastDamage = selectedBoss.damage;

let bossCoordinates = {
  x: 20,
  y: 50,
};

const bossSize = {
  width: 100,
  height: 200,
};

const boss = (
  p: p5,
): {
  bossX: number;
  bossY: number;
  bossHealth: number;
  bossWidth: number;
  bossHeight: number;
} => {
  bossBody(p, bossCoordinates.x, bossCoordinates.y);

  bossMovement();

  return {
    bossX: bossCoordinates.x,
    bossY: bossCoordinates.y,
    bossHealth: bossHealth,
    bossWidth: bossSize.width,
    bossHeight: bossSize.height,
  };
};

const bossMovement = () => {
  bossCoordinates.x += bossVelocity;

  if (bossCoordinates.x <= 20 || bossCoordinates.x >= 480) {
    bossVelocity *= -1;
  }
};

const bossBody = (p: p5, bossX: number, bossY: number) => {
  let color = p.color("#FF0000");
  p.fill(color);
  p.noStroke();
  p.rect(bossX, bossY, bossSize.width, bossSize.height);
};

const damageBoss = (damage: number) => {
  bossHealth -= damage;
};

const bossDied = () => {
  bossId += 1;
  bossCoordinates.x = 20;
  bossCoordinates.y = 50;

  if (bossId >= Object.keys(bosses.bosses).length) {
    bossId = 0; // Reset or handle this in a different way
  }

  bossKey = Object.keys(bosses.bosses)[bossId]; // Get the new boss key
  selectedBoss = bosses.bosses[bossKey]; // Update the selected boss

  // Update boss stats to match the new boss
  bossVelocity = selectedBoss.speed;
  bossHealth = selectedBoss.health;
  blastNumber = selectedBoss.blasts;
  blastSpeed = selectedBoss.blastSpeed;
  blastDamage = selectedBoss.damage;
};

export { boss, damageBoss, bossDied };
