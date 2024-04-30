import { createAlert } from '../util/alert.js';
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
    handleRegister(usernameNode, passwordNode, confirmPasswordNode);
  }
});

async function handleRegister(username, password, confirmPassword) {
  try {
    const response = await register(username, password, confirmPassword);
    if (response) {
      console.log(response);
      createAlert('Register Success');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function register(usernameNode, passwordNode, confirmPasswordNode) {
  try {
    const response = await fetch('https://web-snake-game-backend.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameNode.value,
        password: passwordNode.value,
        confirmPassword: confirmPasswordNode.value
      })
    });

    const status = response.status;

    if (status === 400) {
      throw new Error('Username already exists!');
    } else if (status === 500) {
      throw new Error('Server error!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    createAlert(error.message);
  }
}
