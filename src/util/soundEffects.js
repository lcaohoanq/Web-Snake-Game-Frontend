const eatSound = new Audio("/public/eating.wav");
const introSound = new Audio("/public/intro.wav");
const gameoverSound = new Audio("/public/gameover.wav");

export async function playEatSound() {
  await eatSound.play();
}
export async function playIntroSound() {
  await introSound.play();
}
export async function playGameoverSound() {
  await gameoverSound.play();
}
