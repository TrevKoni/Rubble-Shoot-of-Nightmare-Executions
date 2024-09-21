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

const screenWidth = 600;
const screenHeight = 900;
const totalBossArea = screenWidth - 50;

// Access the specific boss using the correct key
let bossId = 0;
let bossKey = Object.keys(bosses.bosses)[bossId]; // Get the boss key by index
let selectedBoss = bosses.bosses[bossKey]; // Access the boss object

// Now you can safely access the properties
let bossVelocity = selectedBoss.speed;
let maxBossHealth = selectedBoss.health;
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

let blasts: { x: number; y: number }[] = [];
let blastXes: number[] = [];
const blastY = bossCoordinates.y + bossSize.height;
let shoots = 0;
let goingRight = true;

const boss = (
  p: p5,
): {
  bossX: number;
  bossY: number;
  bossHealth: number;
  bossWidth: number;
  bossHeight: number;
  blastDamage: number;
  blasts: { x: number; y: number }[];
} => {
  bossBody(p, bossCoordinates.x, bossCoordinates.y);

  bossMovement();

  bossHealthbar(p);

  if (blastXes.length < blastNumber - 1) {
    calculateBlastDropSpots();
  }

  handleBlasts();
  bossShoot(p);
  handleShoots();

  return {
    bossX: bossCoordinates.x,
    bossY: bossCoordinates.y,
    bossHealth,
    bossWidth: bossSize.width,
    bossHeight: bossSize.height,
    blastDamage,
    blasts,
  };
};

const bossHealthbar = (p: p5) => {
  const barWidth = totalBossArea * (bossHealth / maxBossHealth);

  let red = p.color("#FF0000");
  p.fill(red);
  p.noStroke();
  p.rect(25, 25, barWidth, 20);
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

const blastBody = (p: p5, blastX: number, blastY: number) => {
  let red = p.color("#FF00FF");
  p.fill(red);
  p.noStroke();
  p.ellipse(blastX, blastY, 20, 20);
};

const handleBlasts = () => {
  let currentBlastX = bossCoordinates.x + bossSize.width / 2;

  if (goingRight && currentBlastX >= blastXes[shoots]) {
    blasts.push({ x: Math.floor(currentBlastX), y: blastY });
    shoots++;
  }
  if (!goingRight && currentBlastX <= blastXes[blastNumber - 1 - shoots]) {
    blasts.push({ x: Math.floor(currentBlastX), y: blastY });
    shoots++;
  }
};

const bossShoot = (p: p5) => {
  blasts.forEach((blast) => {
    let blastX = blast.x;
    let blastY = blast.y;
    blastBody(p, blastX, blastY);
    blast.y += blastSpeed;

    if (blast.y > screenHeight) {
      blasts.splice(blasts.indexOf(blast), 1);
    }
  });
};

const handleShoots = () => {
  if (shoots >= blastNumber) {
    shoots = 0;
    goingRight = !goingRight;
  }
};

// Calculate the positions of the blasts
const calculateBlastDropSpots = () => {
  for (let i = 1; i <= blastNumber; i++) {
    let blastX = i * (totalBossArea / (blastNumber + 1));
    blastXes.push(Math.floor(blastX + 25));
  }
};

const removeBlast = (i: number) => {
  blasts.splice(i, 1);
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
  maxBossHealth = selectedBoss.health;
  bossHealth = selectedBoss.health;
  blastNumber = selectedBoss.blasts;
  blastSpeed = selectedBoss.blastSpeed;
  blastDamage = selectedBoss.damage;
  blastXes = [];
  blasts = [];
  shoots = 0;
  goingRight = true;
};

export { boss, damageBoss, bossDied, removeBlast };
