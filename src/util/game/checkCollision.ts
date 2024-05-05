import { playGameoverSound } from './soundEffects';

// collision for the top, left, bottom, right walls
export function wallCollision(
  head: {
    x: number;
    y: number;
  },
  canvas: HTMLCanvasElement
) {
  if (head.x < 0 || head.y < 0 || head.x > canvas.width - 10 || head.y > canvas.height - 10) {
    playGameoverSound();
    return true;
  }
  return false;
}

// collision for the snake itself
export function collision(
  head: {
    x: number;
    y: number;
  },
  array: {
    x: number;
    y: number;
  }[]
) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      playGameoverSound();
      return true;
    }
  }
  return false;
}
