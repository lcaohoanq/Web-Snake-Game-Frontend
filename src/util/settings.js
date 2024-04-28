export function setDelay(time) {
  return time;
}

export function initBox() {
  return 10;
}

export function initFood(box) {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

export function initSnake(box) {
  return [
    { x: 14 * box, y: 10 * box },
    { x: 13 * box, y: 10 * box },
    { x: 12 * box, y: 10 * box },
    { x: 11 * box, y: 10 * box },
    { x: 10 * box, y: 10 * box },
  ];
}
