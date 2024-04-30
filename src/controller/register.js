import { clearMsg, isRequired, isSame, isValid, max, min } from '../util/formValidate.js';

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector('#username');
  let passwordNode = document.querySelector('#password');
  let confirmPasswordNode = document.querySelector('#confirmPassword');
  let tickBoxNode = document.querySelector('#tickBox');

  const errorMsg = [
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement,
      controlNode: [usernameNode]
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement,
      controlNode: [passwordNode]
    }),
    isValid({
      value: confirmPasswordNode.value,
      funcs: [
        isRequired,
        min(8),
        max(30),
        isSame(passwordNode.value, 'password', 'confirmed-password')
      ],
      parentNode: confirmPasswordNode.parentElement,
      controlNode: [confirmPasswordNode]
    }),
    // Add a new validation for the checkbox
    isValid({
      value: tickBoxNode.checked,
      funcs: [isRequired],
      parentNode: tickBoxNode.parentElement,
      controlNode: [tickBoxNode]
    })
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    register(usernameNode, passwordNode, confirmPasswordNode);
  }
});

async function register(usernameNode, passwordNode, confirmPasswordNode) {
  await fetch('https://web-snake-game-backend.onrender.com/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: usernameNode.value,
      password: passwordNode.value,
      confirmPassword: confirmPasswordNode.value
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message === 'Account already exists') {
        alert(data.message);
      } else {
        alert('Register successfully!');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message);
    });
}
