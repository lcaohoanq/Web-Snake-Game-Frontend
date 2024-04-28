import { collision } from "../../util/collisions.js";
import { getDirection } from "../../util/directionState.js";
import { loadResources } from "../../util/imagesLoader.js";
import { updateDirection } from "../../util/keyDirection.js";
import { initBox, initFood, initSnake, setDelay } from "../../util/settings.js";
import { playEatSound } from "../../util/soundEffects.js";

let canvas = document.getElementById("game-board");
let screenWidth = (canvas.width = window.innerWidth);
let screenHeight = (canvas.height = window.innerHeight);
let context = canvas.getContext("2d");
let box = initBox();
let delay = setDelay(50);
let snake = initSnake(box);
let food = initFood(box);
const { headImage, dotImage, appleImage } = await loadResources();

document.addEventListener("keydown", updateDirection);

async function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    const img = i == 0 ? headImage : dotImage;
    context.drawImage(img, snake[i].x, snake[i].y, box, box);
  }

  context.drawImage(appleImage, food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  const direction = getDirection();
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

  let newHead = {
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

let game = setInterval(draw, delay);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
