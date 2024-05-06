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
): boolean {
  for (const element of array) {
    if (head.x == element.x && head.y == element.y) {
      return true;
    }
  }
  return false;
}
