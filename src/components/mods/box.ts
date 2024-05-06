import { collision } from '../../util/game/checkCollision';
import { getDirection } from '../../util/game/directionState';
import { loadResources } from '../../util/game/imagesLoader';
import { updateDirection } from '../../util/game/keyDirection';
import { initBox, initFood, initSnake, setDelay } from '../../util/game/settings';
import { playEatSound, playGameOverSound } from '../../util/game/soundEffects';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#box')! as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const screenWidth = canvas.width;
  const screenHeight = canvas.height;

  const minX = 30;
  const minY = 30;
  const maxX = screenWidth - 30;
  const maxY = screenHeight - 30;

  const context = canvas.getContext('2d')!;
  const box = initBox(10);
  const delay = setDelay(50);
  const snake = initSnake(box);
  let food = initFood(box);
  let score = 0;

  document.addEventListener('keydown', updateDirection);

  async function draw(): Promise<void> {
    const { headImage, dotImage, appleImage, wallImage } = await loadResources();
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      const img = i == 0 ? headImage : dotImage;
      context.drawImage(img, snake[i].x, snake[i].y, box, box);
    }

    context.drawImage(appleImage, food.x, food.y, box, box);

    // draw the top and bottom walls
    for (let i = 0; i < canvas.width; i += box) {
      context.drawImage(wallImage, i, 0, box, box);
      context.drawImage(wallImage, i, canvas.height - box, box, box);
    }

    // draw the second layer of top and bottom walls
    for (let i = 0; i < canvas.width; i += box) {
      context.drawImage(wallImage, i, box, box, box);
      context.drawImage(wallImage, i, canvas.height - 2 * box, box, box);
    }

    // draw the third layer of top and bottom walls
    for (let i = 0; i < canvas.width; i += box) {
      context.drawImage(wallImage, i, 2 * box, box, box);
      context.drawImage(wallImage, i, canvas.height - 3 * box, box, box);
    }

    // draw the left and right walls
    for (let i = 0; i < canvas.height; i += box) {
      context.drawImage(wallImage, 0, i, box, box);
      context.drawImage(wallImage, canvas.width - box, i, box, box);
    }

    // draw the second layer of left and right walls
    for (let i = 0; i < canvas.height; i += box) {
      context.drawImage(wallImage, box, i, box, box);
      context.drawImage(wallImage, canvas.width - 2 * box, i, box, box);
    }

    // draw the third layer of left and right walls
    for (let i = 0; i < canvas.height; i += box) {
      context.drawImage(wallImage, 2 * box, i, box, box);
      context.drawImage(wallImage, canvas.width - 3 * box, i, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    const direction = getDirection();
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
      // Play the eating sound
      playEatSound().catch((error) => {
        console.error('Error playing eating sound:', error);
      });
      score++;
      food = {
        x: Math.floor(Math.random() * ((maxX - minX) / box)) * box + minX,
        y: Math.floor(Math.random() * ((maxY - minY) / box)) * box + minY
      };
    } else {
      snake.pop();
    }

    const newHead = {
      x: snakeX,
      y: snakeY
    };

    if (
      snakeX <= 20 ||
      snakeX >= screenWidth - 30 ||
      snakeY <= 20 ||
      snakeY >= screenHeight - 30 ||
      collision(newHead, snake)
    ) {
      clearInterval(game);

      playGameOverSound()
        .then(() => {
          return setTimeout(() => {
            console.log('Game over sound played');
            // Store the score in Local Storage
            localStorage.setItem('score', score.toString());
            window.location.href = '../../templates/gameover.html';
          }, 5000);
        })
        .catch((error) => {
          console.error('Error playing gameover sound:', error);
        });
    }

    snake.unshift(newHead);
  }

  const game = setInterval(draw, delay);

  // window.addEventListener('resize', function () {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });
});
