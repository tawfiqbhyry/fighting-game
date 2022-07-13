//keys down event listener
window.addEventListener("keydown", (e) => {
  if (!player.dead) {
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
    }
  }
  if (!enemy.dead) {
    switch (e.key) {
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
  }
});

//keys up event listener
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

//window resize event listener
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
