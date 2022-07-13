//count down function - used for the timer and ending the game
async function decreaseTime() {
  if (timer == 0 || player.health <= 0 || enemy.health <= 0) {
    counterEL.innerHTML = timer;
    statusEL.style.display = "flex";

    let result = `Game over! ${
      player.health > enemy.health
        ? "player one wins!"
        : enemy.health > player.health
        ? "player two wins!"
        : "it's a draw!"
    }`;
    statusEL.innerHTML = result;
    await new Promise((resolve) =>
      setTimeout(function () {
        clearInterval(time);
        location.reload();
      }, 3000)
    );
  } else {
    timer--;
    counterEL.innerHTML = timer;
  }
}

//detect collisions between the players
function rectangularCollision(rect1, rect2) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >=
      rect2.attackBox.position.x &&
    rect1.attackBox.position.x <=
      rect2.attackBox.position.x + rect2.attackBox.width &&
    rect1.attackBox.position.y <=
      rect2.attackBox.position.y + rect2.attackBox.height &&
    rect1.attackBox.position.y + rect1.attackBox.height >=
      rect2.attackBox.position.y
  );
}

//players health bar style
function barStyle(element, percent) {
  gsap.to(element, {
    width: percent,
  });
  document.querySelector(element).parentElement.style.border = "3px solid #fcf";
  document.querySelector(element).parentElement.style.backgroundColor =
    "#61536d";
}

//missing the hit
function missingHit(user) {
  if (user.isAttacking && user.frameCurrent == (user == player ? 4 : 2)) {
    user.isAttacking = false;
  }
}
