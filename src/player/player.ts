import p5 from "p5";

// Player Stuff
const playerWidth = 50;
const playerHeight = 100;
const speed = 20;

let maxHealth = 50;
let currentHealth = 50;

let score = 0;

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
const player = (
  p: p5,
  screenWidth: number,
  screenHeight: number,
  enemies: any[],
) => {
  playerBody(p);
  healthbar(p);
  playerMovement(p, screenWidth, screenHeight);
  shoot(p, enemies);

  if (playerCollision(enemies)) {
    currentHealth -= 2;
  }

  if (currentHealth <= 0) {
    sessionStorage.setItem("GameState", "Dead");
  }

  scorePlace(p);
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

const playerCollision = (enemies: any[]): boolean => {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (
      playerCoordinates.x < enemy.x + 30 && // Assuming 30 is the enemy width
      playerCoordinates.x + playerWidth > enemy.x &&
      playerCoordinates.y < enemy.y + 50 && // Assuming 50 is the enemy height
      playerCoordinates.y + playerHeight > enemy.y
    ) {
      enemies.splice(i, 1); // Remove the enemy before returning true
      return true; // Collision detected
    }
  }
  return false; // No collision
};

const shoot = (p: p5, enemies: any[]) => {
  if (p.keyIsDown(32)) {
    let playerBullet = {
      x: playerCoordinates.x + 25 - bulletWidth / 2,
      y: playerCoordinates.y - 15,
    };
    playerBullets.push(playerBullet);
  }

  // Iterate through the bullets
  for (let i = playerBullets.length - 1; i >= 0; i--) {
    let playerBullet = playerBullets[i];
    bulletBody(p, playerBullet.x, playerBullet.y);
    playerBullet.y -= speed * speedBonus + 5;

    // Remove bullet if it goes off-screen
    if (playerBullet.y < -10) {
      playerBullets.splice(i, 1);
      continue;
    }

    // Check for collision with enemies
    for (let j = enemies.length - 1; j >= 0; j--) {
      let enemy = enemies[j];
      if (
        playerBullet.x < enemy.x + 30 && // Assuming 30 is the enemy width
        playerBullet.x + bulletWidth > enemy.x &&
        playerBullet.y < enemy.y + 50 && // Assuming 50 is the enemy height
        playerBullet.y + bulletHeight > enemy.y
      ) {
        // Collision detected, remove both bullet and enemy
        playerBullets.splice(i, 1); // Remove bullet
        enemies.splice(j, 1); // Remove enemy
        score += 1;
        break; // Exit loop since this bullet is now removed
      }
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

const scorePlace = (p: p5) => {
  p.fill("white");
  p.textSize(30);
  p.text("SCORE: " + score, 400, 875);
};

export default player;
