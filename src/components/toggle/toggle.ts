import { darkThemePath, lightThemePath } from '../../constants/file.path';

export function changeTheme() {
  const toggle = document.querySelector("#toggle")! as HTMLInputElement;
  let newTheme;
  let bodyId;
  if (toggle.checked) {
    bodyId = "light";
    console.log(lightThemePath);
  } else {
    bodyId = "dark";
    console.log(darkThemePath);
  }
  document.body.id = bodyId;
}

// Set the initial theme based on the current time
function setInitialTheme() {
  const currentTime = new Date().getHours();
  let initialTheme;

  // Check if it's daytime (6:00 to 18:00)
  if (currentTime >= 6 && currentTime < 18) {
    initialTheme = lightThemePath;
  } else {
    initialTheme = darkThemePath;
  }

  document.querySelector("#theme").setAttribute("href", initialTheme);
}

// Call setInitialTheme function when the page loads
window.onload = setInitialTheme;

// Add event listener to the checkbox after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#toggle").addEventListener("change", function () {
    changeTheme();
  });
});