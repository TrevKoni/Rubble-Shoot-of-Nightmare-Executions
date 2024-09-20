import p5 from "p5";
import { drop, resetDrop } from "../drops/drops";
import { boss, bossDied, damageBoss } from "../mobs/baseBoss";

// Player Stuff
const playerWidth = 50;
const playerHeight = 100;
const speed = 20;

let damage = 1;

let maxHealth = 50;
let currentHealth = 50;

let score = 0;

let exodiaCounter = 0;

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

// Drops Stuff
let dropCurrently = false; // Track if a drop is currently active
let currentDrop: {
  dropType: string;
  dropNumber: number;
  dropX: number;
  dropY: number;
} | null = null;
let dropScores: number[] = [100, 200, 300];

// Boss Stuff
let bossCurrently = false;
let currentBoss: {
  bossX: number;
  bossY: number;
  bossHealth: number;
  bossWidth: number;
  bossHeight: number;
  blastDamage: number;
  blasts: { x: number; y: number }[];
} | null = null;
let bossDropScores: number[] = [500, 1000, 1500];

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

  if (exodiaCounter >= 5) {
    sessionStorage.setItem("GameState", "GameWon");
  }

  // Drop dealing zone
  dealWithDrops(p, screenHeight);
  scorePlace(p);
  clearAndUpdateDropScoresArray();

  // Boss dealing zone
  dealWithBosses(p);
  clearAndUpdateBossDropScoresArray();
  blastCollision();
};

const clearAndUpdateDropScoresArray = () => {
  if (score > dropScores[0]) {
    dropScores.push(dropScores[0] + dropScores[dropScores.length - 1]);
    dropScores.shift();
  }
};

const clearAndUpdateBossDropScoresArray = () => {
  if (score > bossDropScores[0]) {
    bossDropScores.push(
      bossDropScores[0] + bossDropScores[dropScores.length - 1],
    );
    bossDropScores.shift();
  }
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

const blastCollision = () => {
  currentBoss?.blasts.forEach((blast: any) => {
    if (
      playerCoordinates.x < blast.x + 30 && // Assuming 30 is the enemy width
      playerCoordinates.x + playerWidth > blast.x &&
      playerCoordinates.y < blast.y + 50 && // Assuming 50 is the enemy height
      playerCoordinates.y + playerHeight > blast.y
    ) {
      currentHealth -= currentBoss?.blastDamage || 0;
    }
  });
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

    // Check for collision with boss
    if (currentBoss) {
      if (
        playerBullet.x < currentBoss.bossX + currentBoss.bossWidth &&
        playerBullet.x + bulletWidth > currentBoss.bossX &&
        playerBullet.y < currentBoss.bossY + currentBoss.bossHeight &&
        playerBullet.y + bulletHeight > currentBoss.bossY
      ) {
        // Collision detected, remove the bullet
        playerBullets.splice(i, 1); // Remove bullet
        damageBoss(damage);
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

const dealWithDrops = (p: p5, screenHeight: number) => {
  // Function to trigger a drop
  const addDrop = () => {
    dropCurrently = true;
    currentDrop = drop(p); // Initialize the current drop
  };

  // Check if score reaches specific milestones and trigger a drop
  if (dropScores.includes(score) && !dropCurrently) {
    addDrop();
  }

  // Handle the drop if one is active
  if (dropCurrently && currentDrop) {
    // Draw the drop
    currentDrop = drop(p); // Update the drop's position and properties

    if (currentDrop.dropY > screenHeight) {
      dropCurrently = false; // Deactivate the drop
      currentDrop = null; // Clear the current drop
      resetDrop(); // Reset the drop
    } else if (
      currentDrop.dropY > playerCoordinates.y &&
      currentDrop.dropY < playerCoordinates.y + playerHeight &&
      currentDrop.dropX > playerCoordinates.x &&
      currentDrop.dropX < playerCoordinates.x + playerWidth
    ) {
      switch (currentDrop.dropType) {
        case "HealingPotion":
          currentHealth += currentDrop.dropNumber;
          if (currentHealth > maxHealth) {
            currentHealth = maxHealth;
          }
          break;
        case "SpeedBoost":
          speedBonus += currentDrop.dropNumber;
          break;
        case "ExtraMaxHealth":
          maxHealth += currentDrop.dropNumber;
          break;
        case "DamageBoost":
          damage += currentDrop.dropNumber;
          break;
        case "Exodia":
          exodiaCounter += currentDrop.dropNumber;
          break;
      }

      dropCurrently = false; // Deactivate the drop
      currentDrop = null; // Clear the current drop
      resetDrop(); // Reset the drop
    }
  }
};

const dealWithBosses = (p: p5) => {
  // Function to trigger a boss
  const addBoss = () => {
    bossCurrently = true;
    currentBoss = boss(p); // Initialize the current boss
  };

  // Check if score reaches specific milestones and trigger a boss
  if (bossDropScores.includes(score) && !bossCurrently) {
    addBoss();
  }

  // Handle the boss if one is active
  if (bossCurrently && currentBoss) {
    // Draw the boss
    currentBoss = boss(p); // Update the boss's position and properties
  }

  if (currentBoss && currentBoss.bossHealth <= 0) {
    bossCurrently = false; // Deactivate the boss
    currentBoss = null; // Clear the current boss
    bossDied();
  }
};

export { player, score };
