import { FoodType, SnakeType } from '../../models/game.models';

export function setDelay(time: number): number {
  return time;
}

export function initBox(): number {
  return 10;
}

export function initFood(box: number): FoodType {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
  };
}

export function initSnake(box: number): SnakeType {
  return [
    { x: 14 * box, y: 10 * box },
    { x: 13 * box, y: 10 * box },
    { x: 12 * box, y: 10 * box },
    { x: 11 * box, y: 10 * box },
    { x: 10 * box, y: 10 * box }
  ];
}
