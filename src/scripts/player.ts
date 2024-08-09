import p5 from "p5";

// TODO: Add Colliders, Add healthbar, Add lives, Add damage, Add Basic Enemy

// Player Stuff
const playerWidth = 50;
const playerHeight = 100;
const speed = 20;

let maxHealth = 50;
let currentHealth = 50;

let playerCoordinates = {
  x: 275,
  y: 750,
};

// Player Bonuses

let speedBonus = 1;

// Bullet Stuff
let playerBullets: any = [];
const bulletWidth = 6;
const bulletHeight = 10;

// Player Function

const player = (p: p5, screenWidth: number, screenHeight: number) => {
  playerBody(p);
  healthbar(p);
  playerMovement(p, screenWidth, screenHeight);
  shoot(p);
};

// Player Function Components

const playerBody = (p: p5) => {
  let green = p.color("#008000");
  p.fill(green);
  p.noStroke();
  p.rect(playerCoordinates.x, playerCoordinates.y, playerWidth, playerHeight);
};

const playerMovement = (p: p5, screenWidth: number, screenHeight: number) => {
  // W Key
  if (p.keyIsDown(87) && playerCoordinates.y >= 25) {
    playerCoordinates.y -= speed * speedBonus;
  }
  // S Key
  if (
    p.keyIsDown(83) &&
    playerCoordinates.y <= screenHeight - (playerHeight + 25)
  ) {
    playerCoordinates.y += speed * speedBonus;
  }
  // A Key
  if (p.keyIsDown(65) && playerCoordinates.x >= 25) {
    playerCoordinates.x -= speed * speedBonus;
  }
  // D Key
  if (
    p.keyIsDown(68) &&
    playerCoordinates.x <= screenWidth - (playerWidth + 25)
  ) {
    playerCoordinates.x += speed * speedBonus;
  }
};

const shoot = (p: p5) => {
  if (p.keyIsDown(32)) {
    let playerBullet = {
      x: playerCoordinates.x + 25 - bulletWidth / 2,
      y: playerCoordinates.y - 15,
    };
    playerBullets.push(playerBullet);
  }
  for (let playerBullet of playerBullets) {
    bulletBody(p, playerBullet.x, playerBullet.y);
    playerBullet.y -= speed * speedBonus + 5;
    if (playerBullet.y < -10) {
      playerBullets.splice(playerBullets.indexOf(playerBullet), 1);
    }
  }
};

const bulletBody = (p: p5, bulletX: number, bulletY: number) => {
  let red = p.color("#FF0000");
  p.fill(red);
  p.noStroke();
  p.rect(bulletX, bulletY, bulletWidth, bulletHeight);
};

const healthbar = (p: p5) => {
  // Max Health Block
  let white = p.color("#FFFFFF");
  p.fill(white);
  p.noStroke();
  p.rect(25, 850, maxHealth, 25);

  // Current Health Block
  let red = p.color("#FF0000");
  p.fill(red);
  p.noStroke();
  p.rect(25, 850, currentHealth, 25);
};

export default player;
