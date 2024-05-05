const eatSound = new Audio('../../assets/sounds/eating2.wav');
const introSound = new Audio('../../assets/sounds/intro.wav');
const gameoverSound = new Audio('../../assets/sounds/gameover.wav');

export async function playEatSound() {
  try {
    await eatSound.play();
  } catch (err) {
    console.log(err);
  }
}
export async function playIntroSound() {
  try {
    await introSound.play();
  } catch (err) {
    console.log(err);
  }
}
export async function playGameoverSound() {
  try {
    await gameoverSound.play();
    window.location.href = '../../templates/gameover.html';
  } catch (err) {
    console.log(err);
  }
}
