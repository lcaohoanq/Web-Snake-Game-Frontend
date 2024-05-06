const eatSound = new Audio('../../assets/sounds/eating2.wav');
const introSound = new Audio('../../assets/sounds/intro.wav');
const gameoverSound = new Audio('../../assets/sounds/gameover.wav');

export async function playEatSound(): Promise<void> {
  try {
    await eatSound.play();
  } catch (err) {
    console.log(err);
  }
}
export async function playIntroSound(): Promise<void> {
  try {
    await introSound.play();
  } catch (err) {
    console.log(err);
  }
}
export async function playGameOverSound(): Promise<void> {
  try {
    await gameoverSound.play();
  } catch (err) {
    console.log(err);
  }
}
