import { loadResources } from "../../util/imagesLoader.js";
import { playEatSound, playGameoverSound } from "../../util/soundEffects.js";

var canvas = document.getElementById("game-board");
let screenWidth = (canvas.width = window.innerWidth);
let screenHeight = (canvas.height = window.innerHeight);
var context = canvas.getContext("2d");

var box = 10;
var snake = [];
snake[0] = { x: 12 * box, y: 10 * box };
snake[1] = { x: 11 * box, y: 10 * box };
snake[2] = { x: 10 * box, y: 10 * box };
var direction = "RIGHT";

var applesEaten = 0;
var bigAppleSpawnTime = null;
var bigApple = null;
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
  const { headImage, dotImage, appleImage } = await loadResources();

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < snake.length; i++) {
    const img = i == 0 ? headImage : dotImage;
    context.drawImage(img, snake[i].x, snake[i].y, box, box);
  }

  context.drawImage(appleImage, food.x, food.y, box, box);

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  // Handle wall collisions
  if (snakeX >= screenWidth) snakeX = 0;
  if (snakeX < 0) snakeX = screenWidth - box;
  if (snakeY >= screenHeight) snakeY = 0;
  if (snakeY < 0) snakeY = screenHeight - box;

  if (snakeX == food.x && snakeY == food.y) {
    // Play the eating sound
    playEatSound();
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
  } else {
    snake.pop();
  }

  if (applesEaten >= 4 && bigApple === null) {
    bigApple = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
    bigAppleSpawnTime = Date.now();
    gameSpeed = 80; // Increase the speed of the snake
    resetGameInterval();
  }

  // if (bigApple !== null) {
  //   context.fillStyle = "blue";
  //   context.fillRect(bigApple.x, bigApple.y, box, box);

  //   if (snakeX == bigApple.x && snakeY == bigApple.y) {
  //     applesEaten = 0;
  //     bigApple = null;
  //     gameSpeed = 100; // Reset the speed of the snake
  //     resetGameInterval();
  //   }

  //   if (Date.now() - bigAppleSpawnTime >= 10000) {
  //     bigApple = null;
  //     gameSpeed = 100; // Reset the speed of the snake
  //     resetGameInterval();
  //   }
  // }

  var newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeX > screenWidth ||
    snakeY < 0 ||
    snakeY > screenHeight ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}
function resetGameInterval() {
  clearInterval(game);
  game = setInterval(draw, gameSpeed);
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
