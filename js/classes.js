//shop and others classs
class sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }
  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold == 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  update() {
    this.animateFrame();
    this.draw();
  }
}

//background class
class BackGround {
  constructor() {
    this.image = new Image();
    this.image.src = "../assets/background.png";
  }
  draw() {
    c.drawImage(this.image, 0, 0, window.innerWidth, window.innerHeight);
  }
  update() {
    this.draw();
  }
}

//fighter class
class Fighter extends sprite {
  constructor({
    velocity,
    position,
    imgSrc,
    sprites,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    attackBoxParams = {
      offset: { x: 0, y: 0 },
      width: 0,
      height: 0,
    },
  }) {
    super({
      imgSrc,
      scale,
      framesMax,
      position,
      offset,
    });
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.dead = false;

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
      offset: attackBoxParams.offset,
      width: attackBoxParams.width,
      height: attackBoxParams.height,
    };

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }
  update() {
    this.draw();

    if (!this.dead) this.animateFrame();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // draw the attack box
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 157
    ) {
      this.velocity.y = 0;
      this.position.y = 619.3;
    } else {
      this.velocity.y += gravity;
    }
  }
  switchSprite(sprite) {
    if (this.image == this.sprites.death.image) {
      if (this.frameCurrent == this.sprites.death.framesMax - 1) {
        this.dead = true;
        gameContinued = false;
      }
      return;
    }

    if (
      this.image == this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.framesMax - 1
    )
      return;
    if (
      this.image == this.sprites.takeHit.image &&
      this.frameCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;
    if (this.image != this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.framesMax = this.sprites[sprite].framesMax;
      this.frameCurrent = 0;
    }
  }

  takeHit() {
    //player death
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  attack() {
    if (gameContinued) {
      this.switchSprite("attack1");
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
  }
}
