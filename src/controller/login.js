import swal from 'sweetalert';
import { createAlert } from '../util/alert.js';
import { clearMsg, isRequired, isValid } from '../util/formValidate.js';

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  clearMsg();

  let usernameNode = document.querySelector('#username');
  let passwordNode = document.querySelector('#password');

  const errorMsg = [
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement,
      controlNode: [usernameNode]
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired],
      parentNode: passwordNode.parentElement,
      controlNode: [passwordNode]
    })
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    // handleLogin(usernameNode, passwordNode);
    if (isAdmin(usernameNode.value, passwordNode.value)) {
      swal({
        title: 'Login success!',
        text: `Hello ${usernameNode.value}!`,
        icon: 'success',
        button: 'OK'
      });
    }
  }
});

const isAdmin = (username, password) => {
  return username === 'admin' && password === 'admin';
};

async function handleLogin(username, password) {
  try {
    const response = await login(username, password);
    if (response) {
      console.log(response);
      createAlert(`\nLogin success, Hello ${username.value}!`);
      // swal({
      //   title: 'Login success!',
      //   text: `Hello ${username.value}!`,
      //   icon: 'success',
      //   button: 'OK'
      // }).then(() => {
      //   window.location.href = '/src/mode/options.html';
      // });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function login(usernameNode, passwordNode) {
  try {
    const response = await fetch('https://web-snake-game-backend.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameNode.value,
        password: passwordNode.value
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
    createAlert(error.message);
  }
}
