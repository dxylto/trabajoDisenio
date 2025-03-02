const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10,
  paddleHeight = 100;
const ballRadius = 10;
let player1Score = 0,
  player2Score = 0;
const winningScore = 10;

const player1 = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0,
};
const player2 = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0,
};
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: ballRadius,
  dx: 0,
  dy: 0,
};

function drawPaddle(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "32px Arial";
  context.fillText(text, x, y);
}

function movePaddle(paddle) {
  paddle.y += paddle.dy;
  if (paddle.y < 0) paddle.y = 0;
  if (paddle.y + paddle.height > canvas.height)
    paddle.y = canvas.height - paddle.height;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  let player = ball.x < canvas.width / 2 ? player1 : player2;

  if (collision(ball, player)) {
    ball.dx *= -1;
  }

  if (ball.x - ball.radius < 0) {
    player2Score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player1Score++;
    resetBall();
  }

  if (player1Score === winningScore || player2Score === winningScore) {
    alert(`Player ${player1Score === winningScore ? 1 : 2} wins!`);
    player1Score = 0;
    player2Score = 0;
    resetBall();
  }
}

function collision(ball, paddle) {
  return (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y < paddle.y + paddle.height &&
    ball.y + ball.radius > paddle.y
  );
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 0;
  ball.dy = 0;
  player1.y = canvas.height / 2 - paddleHeight / 2;
  player2.y = canvas.height / 2 - paddleHeight / 2;
  setTimeout(() => {
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 2;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * 2;
  }, 1000);
}

function update() {
  movePaddle(player1);
  movePaddle(player2);
  moveBall();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(player1.x, player1.y, player1.width, player1.height, "#FFF");
  drawPaddle(player2.x, player2.y, player2.width, player2.height, "#FFF");
  drawCircle(ball.x, ball.y, ball.radius, "#FFF");
  drawText(player1Score, canvas.width / 4, canvas.height / 5, "#FFF");
  drawText(player2Score, (3 * canvas.width) / 4, canvas.height / 5, "#FFF");
}

function gameLoop() {
  update();
  render();
}

const keysPressed = {};

document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  updatePaddleMovement();
});

document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
  updatePaddleMovement();
});

function updatePaddleMovement() {
  if (keysPressed["w"] || keysPressed["W"]) {
    player1.dy = -5;
  } else if (keysPressed["s"] || keysPressed["S"]) {
    player1.dy = 5;
  } else {
    player1.dy = 0;
  }

  if (keysPressed["ArrowUp"]) {
    player2.dy = -5;
  } else if (keysPressed["ArrowDown"]) {
    player2.dy = 5;
  } else {
    player2.dy = 0;
  }
}

document.getElementById("startGame").addEventListener("click", () => {
  resetBall();
  setInterval(gameLoop, 1000 / 60);
});

// Initial render to draw everything before the game starts
render();
