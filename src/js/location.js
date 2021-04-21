import dataObject from './getWeather.js';
import back from './setBackground.js';

function getFetch() {
  return dataObject
    .getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => {
      back.setBackground();
      return data;
    })
    .catch(error => alert(error, 'Ah Shit, Here We Go Again'));
}
export default { getFetch };

const ref = {
  inputForm: document.querySelector('.inputForm'),
  locBtn: document.querySelector('.locationBtn'),
  input: document.querySelector('.search-box'),
  checkbox: document.querySelector('.star'),
};
// function getLocationOnStar(e) {

// }
function getLocationOnInput(e) {
  let inputCityName = e.currentTarget.value;
  localStorage.setItem('currentPos', JSON.stringify({ city: inputCityName }));
  setTimeout(() => {
    getFetch();
  }, 100);
  console.log('city-fetch');
}

function getLocationOnClick(e) {
  navigator.geolocation.getCurrentPosition(function (position) {
    localStorage.setItem(
      'currentPos',
      JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    );
    // localStorage.setItem('longitude', position.coords.longitude)
  });
  setTimeout(() => {
    getFetch();
  }, 100);
  console.log('location-fetch');
}

// document.addEventListener('DOMContentLoaded', getFetch);

ref.input.addEventListener('change', getLocationOnInput);
ref.locBtn.addEventListener('click', getLocationOnClick);
// ref.checkbox.addEventListener('click', getLocationOnStar);
ref.inputForm.addEventListener('submit', e => {
  e.preventDefault();
});
