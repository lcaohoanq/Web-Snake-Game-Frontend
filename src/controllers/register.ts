import { FormData } from '../util/validForm';
import { clearMsg, createMessage, isRequired, isSame, isValid, max, min } from './formValidate';
const form = document.querySelector('form')! as HTMLFormElement;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector('#username-register')! as HTMLInputElement;
  let passwordNode = document.querySelector('#password-register')! as HTMLInputElement;
  let confirmPasswordNode = document.querySelector('#confirmPassword')! as HTMLInputElement;
  let tickBoxNode = document.querySelector('#tickBox')! as HTMLInputElement;

  const errorMsg = [
    isValid(
      new FormData(usernameNode.value, [isRequired], usernameNode.parentElement!, [usernameNode])
    ),
    isValid(
      new FormData(passwordNode.value, [isRequired, min(8), max(30)], passwordNode.parentElement!, [
        passwordNode
      ])
    ),
    isValid(
      new FormData(
        confirmPasswordNode.value,
        [isRequired, min(8), max(30), isSame(passwordNode.value, 'password', 'confirmed-password')],
        confirmPasswordNode.parentElement!,
        [confirmPasswordNode]
      )
    ),
    isValid(
      new FormData(tickBoxNode.checked, [isRequired], tickBoxNode.parentElement!, [tickBoxNode])
    )
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    handleRegister(usernameNode.value, passwordNode.value, confirmPasswordNode.value);
  }
});

async function handleRegister(username: string, password: string, confirmPassword: string) {
  try {
    const response = await register(username, password, confirmPassword);
    if (response) {
      console.log(response);
      alert('Register Success');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function register(username: string, password: string, confirmPassword: string) {
  try {
    const response = await fetch('https://web-snake-game-backend.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        confirmPassword
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
    alert(error.message);
  }
}
