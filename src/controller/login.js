import { clearMsg, isRequired, isValid } from "../util/formValidate.js";

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector("#username");
  let passwordNode = document.querySelector("#password");

  const errorMsg = [
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement,
      controlNode: [usernameNode],
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired],
      parentNode: passwordNode.parentElement,
      controlNode: [passwordNode],
    }),
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm && isAdmin(usernameNode.value, passwordNode.value)) {
    clearMsg();
    alert("Hello " + usernameNode.value);
    window.location.href = "/src/mode/options.html";
  }
});

const isAdmin = (username, password) => {
  return username === "admin" && password === "admin";
};
