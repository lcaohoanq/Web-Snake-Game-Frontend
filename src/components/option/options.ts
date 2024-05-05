import { modesList } from '../../models/options.models';
import { playIntroSound } from '../../util/game/soundEffects';

document.addEventListener('DOMContentLoaded', () => {
  playIntroSound().then(() => {
    console.log('Intro sound played');
  });

  const mode = document.querySelectorAll('.input')!;

  mode.forEach((block) => {
    block.addEventListener('click', () => {
      for (const mode of modesList) {
        if (block.innerHTML === mode.name) {
          window.location.href = mode.direct;
        }
      }
    });
  });
});
