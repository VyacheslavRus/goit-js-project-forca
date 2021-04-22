import getWeather from './getWeather.js';
import dayTemplate from '../templates/5daysTemplate.hbs';

import Siema from './siema.js';

const refs = {
  contentBox: document.querySelector('#conBox'),
  fiveDays: document.querySelector('[data-action="fiveDays"]'),
  scrollBtnR: document.querySelector('[data-action="right"]'),
  scrollBtnL: document.querySelector('[data-action="left"]'),
  weBox: document.querySelector('.weatherBox'),
  form: document.querySelector('.inputForm'),
  positionBtn:document.querySelector('.positionBtn'),
};

refs.fiveDays.addEventListener('click', showWeather);
refs.form.addEventListener('submit', showWeather);
function showWeather(e) {
  // e.preventDefault();
  // const inputValue = e.target.value;
  //  getWeather.getWeather(inputValue).then(data => {
  //    render(data)
  //  });
  // console.log(inputValue);
  // getWeather.query = e.currentTarget.elements.query.value;
  fetchWeather();
}

function render(data) {
  refs.contentBox.classList.add('contentBox');
  refs.weBox.style.flexDirection = 'column';
  refs.contentBox.innerHTML = dayTemplate(data.everyDay);
  document.querySelector('.contentBox-location').textContent = `${data.cityName} ${data.countryName}`;
  // refs.positionBtn.classList.add('positionBtn');
  document.querySelector('.additionalInfo').innerHTML = '';


  // if ($(window).width() < 768) {
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
  // }
}
function fetchWeather() {
  return getWeather
    .getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => {
      render(data);
    });
}

function onInitCallback() {
  
}

function onChangeCallback() {
  console.log(`The index of current slide is: ${this.currentSlide}`);
}
