import { loadGameOverScreen } from "../../component/gameOver/gameOver.js";
import { collision, wallCollision } from "../../util/collisions.js";
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
const { headImage, dotImage, appleImage, wallImage } = await loadResources();

document.addEventListener("keydown", updateDirection);

async function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    const img = i == 0 ? headImage : dotImage;
    context.drawImage(img, snake[i].x, snake[i].y, box, box);
  }

  context.drawImage(appleImage, food.x, food.y, box, box);

  for (let i = 0; i < canvas.width; i += box) {
    context.drawImage(wallImage, i, 0, box, box);
    context.drawImage(wallImage, i, canvas.height - box, box, box);
  }

  for (let i = 0; i < canvas.height; i += box) {
    context.drawImage(wallImage, 0, i, box, box);
    context.drawImage(wallImage, canvas.width - box, i, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  const direction = getDirection();
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

  let newHead = {
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

let game = setInterval(draw, delay);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
