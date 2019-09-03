import { init, GameLoop, initKeys, keyPressed } from "kontra";
import { sequence, sequenceBase, sequenceBase5th, when } from "./src/music";
const { canvas, context } = init();

import { dino } from "./src/createDino";
import { createGround } from "./src/createGround";
import { createEnemy } from "./src/createEnemy";
import { createFuture } from "./src/createFuture";
import { createPast } from "./src/createPast";

let future = createFuture(canvas);
let past = createPast(canvas);
let enemies = [];
function createEnemies() {
  let enemy = createEnemy(context);
  enemies.push(enemy);
}
for (var i = 0; i < 4; i++) {
  createEnemies();
}

let grounds = [];
for (var i = 0; i <= canvas.width; i++) {
  let ground = createGround(context, i);
  grounds.push(ground);
}

let sprites = [];

const VELOCITY = 1.5;

initKeys();

let collideGround = () => {
  if (dino.y >= canvas.height - dino.height) {
    dino.y = canvas.height - dino.height;
    dino.grounded = true;
    dino.jumping = false;
    dino.dy = 0;
  }
};

let loop = GameLoop({
  update: function(dt) {
    let isMoving = false;
    collideGround();

    if (keyPressed("left")) {
      dino.playAnimation("moonwalk");
      isMoving = true;
      if (dino.x >= 5) {
        dino.x -= VELOCITY;
      }

      past.x += 1;
      future.x += 1;
    }
    if (keyPressed("right")) {
      dino.playAnimation("walk");
      dino.x += VELOCITY;
      isMoving = true;

      past.x -= 1;
      future.x -= 1;
    }
    // Determine when to stop jumping if not colliding with anything
    if (dino.lastY - dino.y >= 60) {
      dino.jumping = false;
    }

    // Pull dino down if not jumping and in the air
    if (!dino.grounded && !dino.jumping) {
      dino.dy += 0.15;
      dino.playAnimation("jump");
    }
    if (keyPressed("up") && dino.grounded) {
      dino.dy = -dino.gravity - 2;
      dino.grounded = false;
      dino.jumping = true;
      dino.lastY = dino.y;
      dino.playAnimation("jump");
      isMoving = true;
    }
    if (!isMoving && !dino.jumping) {
      dino.playAnimation("idle");
    }
    enemies.map(enemy => {
      enemy.update();
      // enemy is beyond the left edge
      if (enemy.x < 0 - enemy.radius) {
        enemy.x = canvas.width;
      }
      // enemy is beyond the right edge
      else if (enemy.x > canvas.width + enemy.radius) {
        enemy.x = 0;
      }
      // enemy is beyond the top edge
      if (enemy.y < 0 - enemy.radius) {
        enemy.y = canvas.height;
      }
      // enemy is beyond the bottom edge
      else if (enemy.y > canvas.height + enemy.radius) {
        enemy.y = 0;
      }
    });
    grounds.map(ground => ground.update());
    dino.update();
    future.update();
    past.update();

    if (future.x - dino.x - dino.width + 5 < 1) {
      dino.ttl = 0;
      dino.playAnimation("cry");
      loop.stop();
    }

    if (past.width + past.x - dino.x - dino.width + 20 >= 0) {
      dino.ttl = 0;
      dino.playAnimation("cry");
      loop.stop();
    }

    // collision detection
    for (let i = 0; i < sprites.length; i++) {
      // only check for collision against bullets
      if (sprites[i].type === "bullet") {
        for (let j = 0; j < sprites.length; j++) {
          // don't check bullet vs. bullet collisions
          if (sprites[j].type !== "bullet") {
            let bullet = sprites[i];
            let sprite = sprites[j];
            // circle vs. circle collision detection
            let dx = bullet.x - sprite.x;
            let dy = bullet.y - sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < sprite.width + bullet.radius) {
              if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
                bullet.ttl = 0;
                sprite.ttl = 0;
                loop.stop();
                sprite.playAnimation("cry");

                break;
              }
            }
          }
        }
      }
    }
    sprites = sprites.filter(sprite => {
      return sprite.isAlive();
    });
  },
  render: function() {
    dino.render();
    enemies.map(enemy => enemy.render());
    grounds.map(ground => ground.render());
    future.render();
    past.render();
  },
});

sequence.play(when);
sequenceBase.play(when);
sequenceBase5th.play(when);

setTimeout(() => {
  sprites = [].concat(enemies, dino);
  loop.start();
}, 1000);
