import getWeather from './getWeather.js';
import dayTemplate from '../templates/5daysTemplate.hbs';

import Siema from './siema.js';

const refs = {
  contentBox: document.querySelector('#conBox'),
  fiveDays: document.querySelector('[data-action="fiveDays"]'),
  scrollBtnR: document.querySelector('[data-action="right"]'),
  scrollBtnL: document.querySelector('[data-action="left"]'),
  weBox: document.querySelector('.weatherBox'),
};

refs.fiveDays.addEventListener('click', showWeather);
const tyest = {
  city: 'Kiev',
  latitude: 50.4333,
  longitude: 30.5167,
};
//  let search = "";
function showWeather() {
  // e.preventDefault();
  // const inputValue = e.target.value;
  //  getWeather.getWeather(inputValue).then(data => {
  //     render(data)});
  // getWeather.query = e.currentTarget.elements.query.value;
  fetchWeather();
}

function render(data) {
  refs.contentBox.classList.add('contentBox');
  refs.weBox.style.flexDirection = 'column';
  refs.contentBox.innerHTML = dayTemplate(data.everyDay);
  document.querySelector('.additionalInfo').innerHTML = '';
  console.log(data);
  const mySiema = new Siema({
    // selector: '.contentBox-cont-box',
    // perPage: { 300: 3, 768: 5, 1280: 5, },

    onInit: onInitCallback,
    onChange: onChangeCallback,
  });

  document
    .querySelector('[data-action="right"]')
    .addEventListener('click', () => mySiema.prev());
  document
    .querySelector('[data-action="left"]')
    .addEventListener('click', () => mySiema.next());
}
function fetchWeather() {
  return getWeather
    .getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => {
      render(data);
    });
}

function onInitCallback() {
  console.log('Siema initialised bro :)');
}

function onChangeCallback() {
  console.log(`The index of current slide is: ${this.currentSlide}`);
}
