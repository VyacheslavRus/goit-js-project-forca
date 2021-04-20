
import getWeather from './getWeather.js';
import dayTemplate from '../templates/5daysTemplate.hbs';



const refs = {
    contentBox: document.querySelector('.contentBox'),
    fiveDays:document.querySelector('[data-action="fiveDays"]'),
    scrollBtnR: document.querySelector('[data-action="right"]'),
    scrollBtnL: document.querySelector('[data-action="left"]'),
}

refs.fiveDays.addEventListener('click', showWeather);

const tyest = {
  city: 'Kiev',
  latitude: 50.4333,
  longitude: 30.5167,
};
// let search = "";
function showWeather(e) {
    e.preventDefault();
    // search = e.currentTarget.elements.input.value;
    fetchWeather();

   

// refs.scrollBtnR.addEventListener('click', () => refs.contentBox.scrollTo({
//   left: 400,
//   behavior: 'smooth',
// }));


// refs.scrollBtnR.addEventListener('click', () => {
//     refs.contentBox.scrollTo(1000, 0)
// });
}

function render(data) {
    refs.contentBox.innerHTML = dayTemplate(data.everyDay);

    // console.log(data); 
}
function fetchWeather() {
    
    return getWeather.getWeather(tyest).then(data => {
        render(data);
    });
    
}




