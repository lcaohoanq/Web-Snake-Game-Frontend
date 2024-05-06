document.addEventListener('DOMContentLoaded', () => {
  const scoreDiv = document.querySelector('.Score')!;
  const score = localStorage.getItem('score');
  scoreDiv.innerHTML = `Your score: ${score}`;
});
