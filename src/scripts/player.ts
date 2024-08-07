import p5 from "p5";

// Player Stuff
const playerWidth = 50;
const playerHeight = 100;
const speed = 20;
const damage = 25;

let maxHealth = 50;
let currentHealth = 50;
let armor = 0;
let lives = 3;

let playerCoordinates = {
  x: 275,
  y: 750,
};

// Player Bonuses

let speedBonus = 1;
let damageBonus = 1;

let hasShield = false;
let hasChainAttack = false;

let granadeNumber = 0;

// Bullet Stuff
let playerBullets: any = [];
const bulletWidth = 6;
const bulletHeight = 10;

// Player Function

const player = (p: p5, screenWidth: number, screenHeight: number) => {
  playerBody(p);
  playerMovement(p, screenWidth, screenHeight);
  shoot(p);
  //granadeThrown();
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
      console.log(playerBullets.length);
    }
  }
};

const bulletBody = (p: p5, bulletX: number, bulletY: number) => {
  let red = p.color("#FF0000");
  p.fill(red);
  p.noStroke();
  p.rect(bulletX, bulletY, bulletWidth, bulletHeight);
};

/*
const granadeThrown = () => {
  document.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "f" || event.key === "F") {
      console.log("F has been released!")
    }
  });
};
*/

export default player;
