//animate the scene

function animate() {
  //animate the scene again
  window.requestAnimationFrame(animate);

  //clear the canvas
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //updates
  bg.update();
  shop.update();
  player.update();
  enemy.update();

  //player,enemy initial speed
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.switchSprite("run");
    player.velocity.x = 5;
  } else {
    player.switchSprite("idle");
  }

  //player jump
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  //enemy jump
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  //detect for collision

  // collision player
  if (
    rectangularCollision(player, enemy) &&
    player.isAttacking & gameContinued
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    enemy.health -= 10;
    barStyle("#enemy .notfilled", `${enemy.health}%`);
    enemyEL.style.backgroundColor = "#333892";
  }

  //missing hit
  missingHit(player);
  missingHit(enemy);

  //collision enemy
  if (
    rectangularCollision(enemy, player) &&
    enemy.isAttacking &&
    gameContinued
  ) {
    enemy.isAttacking = false;
    player.takeHit();
    player.health -= 10;
    barStyle("#player .notfilled", `${player.health}%`);
    playerEL.style.backgroundColor = "#5c3444";
  }
}

animate();
