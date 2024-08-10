import p5 from "p5";

let enemies: { x: number; y: number }[] = [];
const enemyWidth = 30;
const enemyHeight = 50;
const enemySpeed = 5;

const setupEnemies = (p: p5, screenWidth: number, maxEnemies: number) => {
  for (let i = 0; i < maxEnemies; i++) {
    let enemy = {
      x: p.random(50, screenWidth - 50),
      y: p.random(-100, -50), // Start above the screen so they can fall down
    };
    enemies.push(enemy);
  }
};

const updateEnemies = (
  p: p5,
  screenWidth: number,
  screenHeight: number,
  maxEnemies: number,
) => {
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
  let black = p.color("#000000");
  p.fill(black);
  p.noStroke();
  p.rect(enemyX, enemyY, enemyWidth, enemyHeight);
};

const enemy = (
  p: p5,
  screenWidth: number,
  screenHeight: number,
  maxEnemies: number,
) => {
  if (enemies.length === 0) {
    setupEnemies(p, screenWidth, maxEnemies);
  }
  updateEnemies(p, screenWidth, screenHeight, maxEnemies);
};

export default enemy;
