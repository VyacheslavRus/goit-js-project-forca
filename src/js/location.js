import dataObject from './getWeather.js';
import back from './setBackground.js';
import liTempl from '../templates/favCountry.hbs'

JSON.parse(localStorage.getItem('currentPos')) === null
  ? localStorage.setItem('currentPos', JSON.stringify({ city: 'Kiev' }))
  : '';

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





let getlocalSorArr = JSON.parse(localStorage.getItem('favPos'))

function addLiTempl() {

    if (getlocalSorArr !== null) {
    setfavArrTolocalStorage = getlocalSorArr.favPos
      document.querySelector('.city_list').insertAdjacentHTML('beforeend', liTempl(getlocalSorArr))
      
      
  }

}

let inputCityName
let setfavArrTolocalStorage = [];

function getLocationOnStar() {
  if (setfavArrTolocalStorage.includes(inputCityName)){
    alert('Етот город добавлен в избранное!')
  } else { 
    if (inputCityName === undefined ||inputCityName === " " ) {
      alert('Вы ничего не ввели!')
    } else {
      setfavArrTolocalStorage.push(inputCityName)
      localStorage.setItem('favPos', JSON.stringify({ favPos: setfavArrTolocalStorage }))
      document.querySelector('.city_list').insertAdjacentHTML('beforeend',`<li class="list_item">
    <p class="list_item_name">${inputCityName}</p> <button class="close"> <svg class="svg">
            <use href="./images/symbol-defs.svg#icon-close"></use></svg> </button></li>`)
    }
  };
}



const list = document.querySelector(".city_list")
list.addEventListener('click',deliteCauntry)
function deliteCauntry(e) {
  let dellCountry = []
  let btn = e.target;
  while (btn && (btn.tagName != "BUTTON")) {
    btn = btn.parentNode;
    if (btn === this) {
      btn = null;
    }
  }
  if (btn) {
    this.removeChild(btn.parentNode);
    console.log(btn.parentNode.textContent);
  }
}





function getLocationOnInput(e) {
  inputCityName = e.currentTarget.value;
  localStorage.setItem('currentPos', JSON.stringify({ city: inputCityName }));
  setTimeout(() => {
    getFetch();
  }, 100);
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
  });
  setTimeout(() => {
    getFetch();
  }, 100);
  console.log('location-fetch');
}
document.addEventListener('DOMContentLoaded', addLiTempl);
ref.input.addEventListener('change', getLocationOnInput);
ref.locBtn.addEventListener('click', getLocationOnClick);
ref.checkbox.addEventListener('click', getLocationOnStar);
ref.inputForm.addEventListener('submit', e => {
  e.preventDefault();
});
