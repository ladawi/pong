// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// canvas.height = canvas.width * 2;

// var canvas = document.getElementById("Game");
// var heightRatio = 0.5;
// canvas.height = canvas.width * heightRatio;

const canvas = document.querySelector("#Game");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

console.log(canvas.width);
console.log(canvas.height);

let score_1 = 0;
let score_2 = 0;

let gameState = "Off";

let message = document.querySelector("#message");

console.log();

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/SpaceBackground.png",
  width: canvas.width,
  height: canvas.height,
});

const paddle1 = new paddle({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  width: parseInt(canvas.width / 34, 10),
  height: parseInt(canvas.height / 3.5, 10),
  imageSrc: "./assets/Paddle1.png",
  GoalSoundSrc: "./assets/Siuu.mp3",
  GoalAnimSrc: "./assets/nyancat-removebg-preview.png",
  GoalAnimFrame: 9,
});

const paddle2 = new paddle({
  position: {
    x: canvas.width - parseInt(canvas.width / 34, 10),
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  width: parseInt(canvas.width / 34, 10),
  height: parseInt(canvas.height / 3.5, 10),
  imageSrc: "./assets/Paddle2.png",
  GoalSoundSrc: "./assets/Marex.wav",
  GoalAnimSrc: "./assets/horny-jail-bonk.png",
  GoalAnimFrame: 6,
});

const ballon = new ball({
  position: {
    x: (canvas.width - parseInt(canvas.height / 19.2, 10)) / 2,
    y: (canvas.height - parseInt(canvas.height / 19.2, 10)) / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  coord: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  width: parseInt(canvas.height / 19.2, 10),
  height: parseInt(canvas.height / 19.2, 10),
  imageSrc: "./assets/Balls.png",
  speed: 4,
  framesMax: 10,
});

ballon.image.tr;

const keys = {
  z: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
};

(function animate() {
  window.requestAnimationFrame(animate);

  if (gameState === "Off") {
    message.style.display = "flex";
  } else {
    message.style.display = "none";
  }

  background.update(ctx);
  paddle1.update(ctx);
  paddle2.update(ctx);
  ballon.update(paddle1, paddle2, ctx);
  if (paddle1.GoalAnim.display === true) paddle1.GoalAnim.update();
  if (paddle2.GoalAnim.display === true) paddle2.GoalAnim.update();

  // paddle1 movement
  if (keys.z.pressed && paddle1.lastKey === "z") {
    paddle1.velocity.y = -paddle1.speed;
  } else if (keys.s.pressed && paddle1.lastKey === "s") {
    paddle1.velocity.y = paddle1.speed;
  }

  // paddle2 movement
  if (keys.ArrowUp.pressed && paddle2.lastKey === "ArrowUp") {
    paddle2.velocity.y = -paddle2.speed;
  } else if (keys.ArrowDown.pressed && paddle2.lastKey === "ArrowDown") {
    paddle2.velocity.y = paddle2.speed;
  }
})();

window.addEventListener("keydown", (event) => {
  // paddle1
  switch (event.key) {
    case "z":
      keys.z.pressed = true;
      paddle1.lastKey = "z";
      break;
    case "s":
      keys.s.pressed = true;
      paddle1.lastKey = "s";
      break;
  }

  // paddle2
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      paddle2.lastKey = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      paddle2.lastKey = "ArrowDown";
      break;
  }

  switch (event.key) {
    case " ":
      if (gameState === "Off") {
        gameState = "On";
        ballon.getCoord();
        ballon.velocity.x = 7;
        ballon.velocity.y = 0;
      }
      break;
    case "i":
      console.log("Ball pos X --> ", ballon.position.x);
      console.log("Ball pos Y --> ", ballon.position.y);
      break;
  }
});

window.addEventListener("keyup", (event) => {
  // paddle1
  switch (event.key) {
    case "z":
      keys.z.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }

  // paddle2
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
  }
});

let timer = 99;
(function decreaseTimer() {
  setTimeout(decreaseTimer, 1000);
  if (gameState === "On" && timer >= 0) {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").innerHTML = timer;
    } else checkWinner();
  }
})();

function checkWinner() {
  if (score_1 > score_2) {
    message.innerHTML = "Player 1 Win";
  } else if (score_2 > score_1) {
    message.innerHTML = "Player 2 Win";
  } else {
    message.innerHTML = "Tie";
  }
  gameState = "Off";
  ballon.reset();
  ballon.velocity.x = 0;
  ballon.velocity.y = 0;
}
