import { loadGameOverScreen } from "../../component/gameOver/gameOver.js";
import { collision, wallCollision } from "../../util/collisions.js";
import { loadResources } from "../../util/imagesLoader.js";
import { playEatSound } from "../../util/soundEffects.js";

var canvas = document.getElementById("game-board");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");

var box = 10;
var snake = [];
snake[0] = { x: 14 * box, y: 10 * box };
snake[1] = { x: 13 * box, y: 10 * box };
snake[2] = { x: 12 * box, y: 10 * box };
snake[3] = { x: 11 * box, y: 10 * box };
snake[4] = { x: 10 * box, y: 10 * box };

var direction = "RIGHT";

var food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  if (event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
  if (event.keyCode == 38 && direction != "DOWN") direction = "UP";
  if (event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
  if (event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

async function draw() {
  const { headImage, dotImage, appleImage, wallImage } = await loadResources();

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < snake.length; i++) {
    const img = i == 0 ? headImage : dotImage;
    context.drawImage(img, snake[i].x, snake[i].y, box, box);
  }

  context.drawImage(appleImage, food.x, food.y, box, box);

  for (var i = 0; i < canvas.width; i += box) {
    context.drawImage(wallImage, i, 0, box, box);
    context.drawImage(wallImage, i, canvas.height - box, box, box);
  }

  for (var i = 0; i < canvas.height; i += box) {
    context.drawImage(wallImage, 0, i, box, box);
    context.drawImage(wallImage, canvas.width - box, i, box, box);
  }

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    playEatSound();
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
  } else {
    snake.pop();
  }

  var newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeX > canvas.width ||
    snakeY < 0 ||
    snakeY > canvas.height ||
    collision(newHead, snake) ||
    wallCollision(newHead, canvas)
  ) {
    clearInterval(game);
    loadGameOverScreen();
  }

  snake.unshift(newHead);
}

var game = setInterval(draw, 100);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
