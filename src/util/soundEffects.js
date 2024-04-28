const eatSound = new Audio("../../resources/eating.wav");
const introSound = new Audio("/src/resources/intro.wav");
const gameoverSound = new Audio("/src/resources/gameover.wav");

export async function playEatSound() {
  await eatSound.play();
}
export async function playIntroSound() {
  await introSound.play();
}
export async function playGameoverSound() {
  await gameoverSound.play();
}
