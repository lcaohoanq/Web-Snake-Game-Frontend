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
    // if (login(usernameNode, passwordNode).message === "Login successfully") {
    //   alert("Hello " + usernameNode.value);
    //   window.location.href = "/src/mode/options.html";
    // }
    login(usernameNode, passwordNode);
  }
});

const isAdmin = (username, password) => {
  return username === 'admin' && password === 'admin';
};

async function login(usernameNode, passwordNode) {
  await fetch('https://web-snake-game-backend.onrender.com/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: usernameNode.value,
      password: passwordNode.value
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      // if (data.message === "Account already exists") {
      //   alert(data.message);
      // } else {
      //   alert("Login successfully!");
      // }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message);
    });
}
