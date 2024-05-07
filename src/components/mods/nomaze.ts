import { collision } from '../../util/game/checkCollision';
import { getDirection } from '../../util/game/directionState';
import { loadResources } from '../../util/game/imagesLoader';
import { updateDirection } from '../../util/game/keyDirection';
import { initBox, initFood, initSnake } from '../../util/game/settings';
import { playEatSound, playGameOverSound } from '../../util/game/soundEffects';
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#nomaze')! as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const screenWidth = canvas.width;
  const screenHeight = canvas.height;
  let score = 0;
  const context = canvas.getContext('2d')!;
  const box = initBox(10);
  const snake = initSnake(box);
  let food = initFood(box);
  let gameOver = false;
  let frameCount = 0;
  const framesPerUpdate = 3; // Adjust this value to change the speed

  document.addEventListener('keydown', updateDirection);

  async function draw(): Promise<void> {
    if (gameOver) return;

    frameCount++;

    if (frameCount < framesPerUpdate) {
      requestAnimationFrame(draw);
      return;
    }

    frameCount = 0;

    const { headImage, dotImage, appleImage } = await loadResources();
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      const img = i == 0 ? headImage : dotImage;
      context.drawImage(img, snake[i].x, snake[i].y, box, box);
    }

    context.drawImage(appleImage, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    const direction = getDirection();
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    // Handle wall collisions
    if (snakeX >= screenWidth) snakeX = 0;
    if (snakeX < 0) snakeX = screenWidth - box;
    if (snakeY >= screenHeight) snakeY = 0;
    if (snakeY < 0) snakeY = screenHeight - box;

    if (snakeX == food.x && snakeY == food.y) {
      playEatSound().catch(() => {
        throw new Error('Error playing eat sound');
      });
      score++;
      food = {
        x: Math.floor(Math.random() * (screenWidth / box)) * box,
        y: Math.floor(Math.random() * (screenHeight / box)) * box
      };
    } else {
      snake.pop();
    }
    if (snakeX < 0) {
      snakeX = screenWidth;
    } else if (snakeX > screenWidth) {
      snakeX = 0;
    }

    if (snakeY < 0) {
      snakeY = screenHeight;
    } else if (snakeY > screenHeight) {
      snakeY = 0;
    }

    const newHead = {
      x: snakeX,
      y: snakeY
    };

    if (collision(newHead, snake)) {
      gameOver = true;
      playGameOverSound()
        .then(() => {
          return setTimeout(() => {
            // Store the score in Local Storage
            localStorage.setItem('score', score.toString());
            window.location.href = '../../templates/gameover.html';
          }, 5000);
        })
        .catch((error) => {
          console.error('Error playing game over sound:', error);
        });
    }

    snake.unshift(newHead);
    if (!gameOver) requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
});
