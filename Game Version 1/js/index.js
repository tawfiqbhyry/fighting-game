const canvas = document.querySelector("canvas");
const playerEL = document.querySelector("#player .notfilled");
const enemyEL = document.querySelector("#enemy .notfilled");
const counterEL = document.querySelector("#counter");
const statusEL = document.getElementById("status");
const c = canvas.getContext("2d");
let gameContinued = true;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};
let timer = 60;

async function decreaseTime() {
  if (timer == 0 || player.health <= 0 || enemy.health <= 0) {
    gameContinued = false;
    counterEL.innerHTML = timer;
    statusEL.style.display = "flex";
    let result = `Game over! ${
      player.health > enemy.health
        ? "player one win!"
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
let time = setInterval(decreaseTime, 1000);

function rectangularCollision(rect1, rect2) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
  );
}

function barStyle(element, percent) {
  element.style.width = percent;
  element.parentElement.style.border = "3px solid #fcf";
  element.parentElement.style.backgroundColor = "yellow";
}

class sprite {
  constructor({ velocity, position, color = "red", offset }) {
    this.position = position;
    this.width = 50;
    this.velocity = velocity;
    this.height = 150;
    this.isAttacking = false;
    this.lastKey = "";
    this.health = 100;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }
  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    if (gameContinued) {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
  }
}

const player = new sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
});
const enemy = new sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  color: "blue",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.velocity.x = 5;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //detect for collision
  if (rectangularCollision(player, enemy) && player.isAttacking) {
    player.isAttacking = false;
    enemy.health -= 2;
    barStyle(enemyEL, `${enemy.health}%`);
  } else if (rectangularCollision(enemy, player) && enemy.isAttacking) {
    enemy.isAttacking = false;
    player.health -= 2;
    barStyle(playerEL, `${player.health}%`);
  }
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      player.lastKey = "d";
      keys.d.pressed = true;
      break;
    case "a":
      player.lastKey = "a";
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    //enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
