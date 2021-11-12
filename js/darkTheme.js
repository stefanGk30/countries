import { get } from './utils.js';

const btn = get('.toggle-btn');

btn.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) {
    sessionStorage.setItem('dark', 'on');
  } else {
    sessionStorage.removeItem('dark');
  }
});

function checkDark() {
  let dark = sessionStorage.getItem('dark');
  if (!dark) {
    document.body.classList.remove('dark-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
}

checkDark();
