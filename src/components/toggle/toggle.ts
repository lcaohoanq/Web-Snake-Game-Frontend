import { changeTheme, setInitialTheme } from '../../util/theme.util';

// Call setInitialTheme function when the page loads

// Add event listener to the checkbox after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  window.onload = setInitialTheme;
  document.querySelector('#toggle')!.addEventListener('change', () => {
    changeTheme();
  });
});
