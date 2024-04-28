const eatSound = new Audio("/public/eating.wav");
const introSound = new Audio("/public/intro.wav");
const gameoverSound = new Audio("/public/gameover.wav");

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
  } catch (err) {
    console.log(err);
  }
}
