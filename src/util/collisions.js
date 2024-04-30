import { playGameoverSound } from "./soundEffects.js";

//collision for the top, left, bottom, right walls
export function wallCollision(head, canvas) {
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > canvas.width - 10 ||
    head.y > canvas.height - 10
  ) {
    playGameoverSound();
    return true;
  }
  return false;
}

//collision for the snake itself
export function collision(head, array) {
  for (var i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      playGameoverSound();
      return true;
    }
  }
  return false;
}
