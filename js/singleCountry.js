import './globalFunc.js';
import './darkTheme.js';

import { fetchData, formatNumber, get } from './utils.js';

const searchURL = 'https://restcountries.com/v2/name/';
const codeSearchURL = 'https://restcountries.com/v2/alpha/';

async function setSingleCountry() {
  const countryName = localStorage.getItem('name');
  if (!countryName) {
    window.location.replace('index.html');
  } else {
    if (countryName.length > 3) {
      const country = await fetchData(searchURL + countryName);
      displayCountry(country[0]);
    } else {
      const country = await fetchData(codeSearchURL + countryName);
      displayCountry(country);
    }
  }
}

async function displayCountry(country) {
  console.log(country);
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain: domain,
    currencies,
    languages,
    borders,
  } = country;

  let borderCountries;

  if (borders && borders.length > 0) {
    borderCountries = borders
      .map((country) => {
        return `<a href="./country.html" class="single-country-btn">${country}</a>`;
      })
      .join('');
  } else {
    borderCountries = '<p>none</p>';
  }

  document.title = name;

  const container = get('.single-country-section');
  container.innerHTML = `
        <div class="country-container">
        <div class="flag-container">
          <img src="${flag}" alt="flag-img" class="single-country-img" />
        </div>
        <div class="info-container">
          <div class="title-container">
            <h2 class="country-name">${name}</h2>
          </div>
          <div class="text-container">
            <div class="col-1">
              <p class="p-text">
                <span class="bold-info">Native Name:</span>
                ${nativeName}
              </p>
              <p class="p-text">
                <span class="bold-info">Population:</span>
                ${formatNumber(population)}
              </p>
              <p class="p-text">
                <span class="bold-info">Region:</span>
                ${region}
              </p>
              <p class="p-text">
                <span class="bold-info">Sub Region:</span>
                ${subregion}
              </p>
              <p class="p-text">
                <span class="bold-info">Capital:</span>
                ${capital}
              </p>
            </div>
            <div class="col-2">
              <p class="p-text">
                <span class="bold-info">Top Level Domain:</span>
                ${domain}
              </p>
              <p class="p-text">
                <span class="bold-info">Currencies:</span>
                ${currencies[0].name}
              </p>
              <p class="p-text">
                <span class="bold-info">Languages:</span>
                ${languages.map((lang) => lang.name)}
              </p>
            </div>
          </div>
          <div class="borders-container">
            <p class="borders-text">Border Countries:</p>
            <div class="border-countries-container">
            ${borderCountries}

            </div>

          </div>
        </div>
      </div>
  `;

  container.addEventListener('click', (e) => {
    // e.preventDefault();
    if (e.target.classList.contains('single-country-btn')) {
      const name = e.target.textContent;
      localStorage.setItem('name', name);
      setSingleCountry();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setSingleCountry();
});
