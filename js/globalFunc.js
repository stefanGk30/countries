import { get } from './utils.js';

//toggle dark theme
const toggleBtn = get('.toggle-btn');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
