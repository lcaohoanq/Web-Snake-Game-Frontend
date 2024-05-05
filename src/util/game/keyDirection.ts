import { getDirection, setDirection } from './directionState';

export function updateDirection(event: KeyboardEvent): void {
  const direction = getDirection();
  if (event.keyCode == 37 && direction != 'RIGHT') setDirection('LEFT');
  if (event.keyCode == 38 && direction != 'DOWN') setDirection('UP');
  if (event.keyCode == 39 && direction != 'LEFT') setDirection('RIGHT');
  if (event.keyCode == 40 && direction != 'UP') setDirection('DOWN');
}
