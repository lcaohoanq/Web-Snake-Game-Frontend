import { playGameoverSound } from "../../util/soundEffects.js";

var canvas = document.getElementById("game-board");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");

var box = 10;
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
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

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < snake.length; i++) {
    context.fillStyle = i == 0 ? "green" : "white";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
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
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (var i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      playGameoverSound();
      return true;
    }
  }
  return false;
}

var game = setInterval(draw, 100);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
