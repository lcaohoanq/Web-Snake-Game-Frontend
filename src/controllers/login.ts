import { FormData } from '../util/validForm';
import { clearMsg, isRequired, isValid } from './formValidate';

const form = document.querySelector('form')!;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector('#username-login')! as HTMLInputElement;
  let passwordNode = document.querySelector('#password-login')! as HTMLInputElement;

  const errorMsg = [
    isValid(
      new FormData(usernameNode.value, [isRequired], usernameNode.parentElement!, [usernameNode])
    ),
    isValid(
      new FormData(passwordNode.value, [isRequired], passwordNode.parentElement!, [passwordNode])
    )
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    // handleLogin(usernameNode, passwordNode);
    // if (
    //   isAdmin(usernameNode.value, passwordNode.value) ||
    //   handleLogin(usernameNode, passwordNode)
    // ) {
    //   createAlert(`\nLogin success, Hello ${usernameNode.value}!`);
    // }
  }
});

const isAdmin = (username: string, password: string) => {
  return username === 'admin' && password === 'admin';
};

async function handleLogin(username: string, password: string) {
  try {
    const response = await login(username, password);
    if (response) {
      console.log(response);
      alert(`\nLogin success, Hello ${username}!`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function login(username: string, password: string) {
  try {
    const response = await fetch('https://web-snake-game-backend.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const status = response.status;

    if (status === 400) {
      throw new Error('Username already exists!');
    } else if (status == 500) {
      throw new Error('Server error!');
    }

    // reach here we receive a status 200
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  }
}
