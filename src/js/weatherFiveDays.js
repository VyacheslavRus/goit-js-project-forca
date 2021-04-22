import getWeather from './getWeather.js';
import dayTemplate from '../templates/5daysTemplate.hbs';
import hourTemplate from '../templates/hourTemplate.hbs';
import Siema from './siema.js';

const refs = {
  contentBox: document.querySelector('#conBox'),
  fiveDays: document.querySelector('[data-action="fiveDays"]'),
  scrollBtnR: document.querySelector('[data-action="right"]'),
  scrollBtnL: document.querySelector('[data-action="left"]'),
  weBox: document.querySelector('.weatherBox'),
  form: document.querySelector('.inputForm'),
  buttonBox:document.querySelector('.buttonBox'),
  positionBtn: document.querySelector('.positionBtn'),
  moreinfo:document.querySelector('.contentBox-cont-box-moreInfo'),
};

refs.fiveDays.addEventListener('click', fetchWeather);

function render(data) {
  refs.contentBox.classList.add('contentBox');
  refs.weBox.style.flexDirection = 'column';
  refs.contentBox.innerHTML = dayTemplate(data.everyDay);
  
  
  document.querySelector('.contentBox-location').textContent = `${data.cityName} ${data.countryName}`;
  refs.buttonBox.classList.add('positionBtn');
  

  document.querySelector('.contentBox-cont-box-moreInfo').addEventListener('click', () => { refs.contentBox.insertAdjacentHTML('beforeend', hourTemplate(data.eachDayEveryThreeHours[0]));} );
  
  
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

//  refs.moreinfo.addEventListener('click',fetchWeather)
   
  // document.querySelector('.contentBox-cont-box-moreInfo').insertAdjacentHTML('afterbegin', hourTemplate(data.eachDayEveryThreeHours));
}
function render2(data) {
  document.querySelector('.contentBox-cont').insertAdjacentHTML('beforeend', hourTemplate(data.eachDayEveryThreeHours));
  // console.log(123);
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
