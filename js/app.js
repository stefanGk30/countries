import './globalFunc.js';
import './darkTheme.js';
import { fetchData, get, formatNumber } from './utils.js';

const allURL = 'https://restcountries.com/v2/all';
const searchURL = 'https://restcountries.com/v2/name/';
const regionURL = 'https://restcountries.com/v2/region/';

//toggle dropdown--------------------------------------------------------------
const regionFilterBtn = get('.open-filters-btn');
const filtersContainer = get('.filters-container');

regionFilterBtn.addEventListener('click', () => {
  filtersContainer.classList.toggle('open');
});

//-------------------------------------------------------------------------------

async function setCountries(url) {
  const data = await fetchData(url);
  display(data);
}

function display(data) {
  const countriesContainer = get('.countries-container');
  if (!data) {
    countriesContainer.innerHTML = `<h2 class="err-msg"> Sorry,no such country exists...</h2>`;
    return;
  }

  countriesContainer.innerHTML = data
    .map((country) => {
      const { name, flag, population, region, capital } = country;

      return `     <article class="card" data-id="${name}">
  <div class="country-img">
    <a href="./country.html" class="flag-link">
      <img src="${flag}" alt="" class="flag-img" />
    </a>
  </div>
  <div class="country-info">
    <h2 class="country-name">${name}</h2>
    <p class="population p-text">
      <span class="bold-info">Population:</span>${formatNumber(population)}
    </p>
    <p class="region p-text"><span class="bold-info">Region:</span>${region}</p>
    <p class="capital p-text">
      <span class="bold-info">Capital:</span>${capital}
    </p>
  </div>
</article>
 `;
    })
    .join('');

  //set to ls
  countriesContainer.addEventListener('click', (e) => {
    // e.preventDefault();
    if (!e.target.classList.contains('countries-container')) {
      const countryName =
        e.target.parentElement.parentElement.parentElement.dataset.id;
      if (countryName) {
        localStorage.setItem('name', countryName);
      }
    }
  });
}

// Search Form------------------------------------
const form = get('.search-form');
const input = get('#search-input');

form.addEventListener('keyup', (e) => {
  e.preventDefault();
  const value = input.value.toLowerCase().trim();
  console.log(value);
  if (value) {
    setCountries(searchURL + value);
  }
});

// Region filter-------------------------------------------------

const regionsSelect = get('.regions');
const regionsText = get('.regions-text');

regionsSelect.addEventListener('click', (e) => {
  if (e.target.classList.contains('region-choice')) {
    const region = e.target.dataset.id;
    if (region === 'all') {
      setCountries(allURL);
      regionsText.textContent = 'All';
    } else {
      setCountries(regionURL + region);
      regionsText.textContent =
        region.charAt(0).toUpperCase() + region.slice(1);
    }
    filtersContainer.classList.remove('open');
  }
});

//---------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
  setCountries(allURL);
});
