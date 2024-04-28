function showGameOver() {
  document.getElementById("play-again").addEventListener("click", function () {
    location.reload();
  });

  document.getElementById("quit").addEventListener("click", function () {
    location.href = "/index.html";
  });
}

export function loadGameOverScreen() {
  fetch("/src/component/gameOver/gameOver.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML += html;
      showGameOver();
    })
    .catch((error) => {
      console.warn("Something went wrong.", error);
    });
}
