import axios from 'axios';
import { config } from 'dotenv';
import Swal from 'sweetalert2';
import { RegisterFormModel } from '../../models/register.model';
import { FormData } from '../../models/validForm';
import { clearMsg, isRequired, isSame, isValid, max, min } from '../../util/formValidate';

config();

document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.querySelector('#registerForm')! as HTMLFormElement;

  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    clearMsg();

    const usernameNode = document.querySelector('#username-register')! as HTMLInputElement;
    const passwordNode = document.querySelector('#password-register')! as HTMLInputElement;
    const confirmPasswordNode = document.querySelector('#confirmPassword')! as HTMLInputElement;
    const tickBoxNode = document.querySelector('#tickBox')! as HTMLInputElement;

    const errorMsg = [
      isValid(
        new FormData(usernameNode.value, [isRequired], usernameNode.parentElement!, [usernameNode])
      ),
      isValid(
        new FormData(
          passwordNode.value,
          [isRequired, min(8), max(30)],
          passwordNode.parentElement!,
          [passwordNode]
        )
      ),
      isValid(
        new FormData(
          confirmPasswordNode.value,
          [
            isRequired,
            min(8),
            max(30),
            isSame(passwordNode.value, 'password', 'confirmed-password')
          ],
          confirmPasswordNode.parentElement!,
          [confirmPasswordNode]
        )
      ),
      isValid(
        new FormData(tickBoxNode.checked, [isRequired], tickBoxNode.parentElement!, [tickBoxNode])
      )
    ];

    const isValidForm = errorMsg.every((item) => !item);
    console.log(`${process.env.HOST}` + `${process.env.REGISTER}`);

    const user = new RegisterFormModel({
      username: usernameNode.value,
      password: passwordNode.value,
      confirmPassword: confirmPasswordNode.value
    });

    if (isValidForm) {
      clearMsg();
      handleRegister(usernameNode.value, passwordNode.value, confirmPasswordNode.value);
    }
  });
});

async function handleRegister(username: string, password: string, confirmPassword: string) {
  try {
    const response = (await register(username, password, confirmPassword)) as any;
    if (response) {
      console.log(response);
      Swal.fire({
        title: 'Register success!',
        icon: 'success',
        confirmButtonText: 'Continue',
        heightAuto: false, // prevent auto scroll
        scrollbarPadding: false // prevent scrollbar changes
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Register failed!',
      text: error,
      icon: 'error',
      confirmButtonText: 'Try again',
      heightAuto: false,
      scrollbarPadding: false
    });
  }
}

async function register(
  username: string,
  password: string,
  confirmPassword: string
): Promise<void> {
  try {
    const response = await axios.post(`${process.env.HOST}` + `${process.env.REGISTER}`, {
      username,
      password,
      confirmPassword
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
    throw error;
  }
}
