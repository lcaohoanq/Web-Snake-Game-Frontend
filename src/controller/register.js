import {
  clearMsg,
  isRequired,
  isSame,
  isValid,
  max,
  min,
} from "../util/formValidate.js";

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector("#username");
  let passwordNode = document.querySelector("#password");
  let confirmPasswordNode = document.querySelector("#confirmPassword");

  const errorMsg = [
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement,
      controlNode: [usernameNode],
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement,
      controlNode: [passwordNode],
    }),
    isValid({
      value: confirmPasswordNode.value,
      funcs: [
        isRequired,
        min(8),
        max(30),
        isSame(passwordNode.value, "password", "confirmed-password"),
      ],
      parentNode: confirmPasswordNode.parentElement,
      controlNode: [confirmPasswordNode],
    }),
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    registerNewAccount(usernameNode, passwordNode, confirmPasswordNode);
  }
});

function registerNewAccount(usernameNode, passwordNode, confirmPasswordNode) {
  fetch("https://web-snake-game-backend.onrender.com/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameNode.value,
      password: passwordNode.value,
      confirmPassword: confirmPasswordNode.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}
