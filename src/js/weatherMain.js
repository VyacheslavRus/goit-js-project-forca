
import Weather5days from './weather5day.js';
import dayTemplate from '../templates/5daysTemplate.hbs';

// import { search } from 'core-js/fn/symbol';


const refs = {
    searchForm: document.querySelector('.inputForm'),
    weather5day:document.querySelector('.weather5day')
}
const weather5days = new Weather5days();
// console.log(weather5days);
refs.searchForm.addEventListener('submit', onSearch);

let search = "";

function onSearch(e) {
    e.preventDefault();
    search = e.currentTarget.elements.query.value;
    fetchWeather();
    console.log(search);
    console.log(weather5days.fetchWeather());
}

function render(data) {
    refs.weather5day.insertAdjacentHTML('beforeend', dayTemplate(data));
}
function fetchWeather() {
    return weather5days.fetchWeather().then(data => {
        render(data);
    })
}
// function pad(value) {
//       return String(value).padStart(2, '0'); // - Добавляет  один ноль
//     }