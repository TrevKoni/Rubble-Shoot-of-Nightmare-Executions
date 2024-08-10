import p5 from "p5";

let enemies: { x: number; y: number }[] = [];
const enemySpeed = 5;
const maxEnemies = 15;

const setupEnemies = (p: p5, screenWidth: number) => {
  for (let i = 0; i < maxEnemies; i++) {
    let enemy = {
      x: p.random(50, screenWidth - 50),
      y: p.random(-100, -50), // Start above the screen so they can fall down
    };
    enemies.push(enemy);
  }
};

const updateEnemies = (p: p5, screenWidth: number, screenHeight: number) => {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    enemy.y += enemySpeed;
    enemyBody(p, enemy.x, enemy.y);

    // Remove the enemy if it goes off-screen
    if (enemy.y > screenHeight) {
      enemies.splice(i, 1);
    }
  }

  // If there are fewer than maxEnemies, spawn new ones
  if (enemies.length < maxEnemies) {
    let newEnemy = {
      x: p.random(50, screenWidth - 50),
      y: p.random(-100, -50),
    };
    enemies.push(newEnemy);
  }
};

const enemyBody = (p: p5, enemyX: number, enemyY: number) => {
  let color = p.color("#000000");
  p.fill(color);
  p.noStroke();
  p.rect(enemyX, enemyY, 30, 50);
};

const enemy = (p: p5, screenWidth: number, screenHeight: number) => {
  if (enemies.length === 0) {
    setupEnemies(p, screenWidth);
  }
  updateEnemies(p, screenWidth, screenHeight);

  // Return the list of enemies for collision detection
  return enemies;
};

export default enemy;
