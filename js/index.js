//data elements
const playerEL = document.querySelector("#player .notfilled");
const enemyEL = document.querySelector("#enemy .notfilled");
const counterEL = document.querySelector("#counter");
const statusEL = document.getElementById("status");

//canvas prepared
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0, 0, canvas.width, canvas.height);

let gameContinued = true;
const gravity = 0.7;
let timer = 60;
let time = setInterval(decreaseTime, 1000);

//keys
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

//canvas elements
const bg = new BackGround();
const shop = new sprite({
  position: {
    x: 1075,
    y: 0,
  },
  imgSrc: "../assets/shop.png",
  scale: 6,
  framesMax: 6,
});

//players
const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  imgSrc: "../assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 3,
  offset: { x: 210, y: 210 },
  sprites: {
    idle: {
      imgSrc: "../assets/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imgSrc: "../assets/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: { imgSrc: "../assets/samuraiMack/Jump.png", framesMax: 2 },
    fall: { imgSrc: "../assets/samuraiMack/Fall.png", framesMax: 2 },
    attack1: { imgSrc: "../assets/samuraiMack/Attack1.png", framesMax: 6 },
    takeHit: {
      imgSrc: "../assets/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: { imgSrc: "../assets/samuraiMack/Death.png", framesMax: 6 },
  },
  attackBoxParams: {
    offset: { x: 80, y: 0 },
    width: 200,
    height: 50,
  },
});
const enemy = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  imgSrc: "../assets/kenji/Idle.png",
  framesMax: 4,
  scale: 3,
  offset: { x: -300, y: 230 },
  sprites: {
    idle: {
      imgSrc: "../assets/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imgSrc: "../assets/kenji/Run.png",
      framesMax: 8,
    },
    jump: { imgSrc: "../assets/kenji/Jump.png", framesMax: 2 },
    fall: { imgSrc: "../assets/kenji/Fall.png", framesMax: 2 },
    attack1: { imgSrc: "../assets/kenji/Attack1.png", framesMax: 4 },
    takeHit: { imgSrc: "../assets/kenji/Take hit.png", framesMax: 3 },
    death: { imgSrc: "../assets/kenji/Death.png", framesMax: 7 },
  },
  attackBoxParams: {
    offset: { x: 400, y: 0 },
    width: 200,
    height: 50,
  },
});
