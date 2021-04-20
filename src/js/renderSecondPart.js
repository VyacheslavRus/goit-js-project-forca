import api from './getWeather'
const div = document.querySelector('.contentBox');
const click5days = document.querySelector('[data-action="fiveDays"]');
const clickToday = document.querySelector('[data-action="today"]')
console.log(click5days);

clickToday.addEventListener('click', ()=>{
    getFetch();
    clock();
})

click5days.addEventListener('click', ()=>{
    clearInterval(interval)   
})

function getFetch() {
    api.getWeather({latitude: 50.4333, longitude: 30.5167})
    .then((data) => {
        renderSecPart(data)
    })
    .catch(error => {
        console.log(error);
    })
}
getFetch()

let interval;
function clock() {
    let time;
    interval = setInterval(() => {
        document.querySelector('.secondPartBox-dateBox-time').innerHTML = time= new Date().toLocaleTimeString()
    }, 1000);
}
clock()

function renderSecPart(data) {
    div.insertAdjacentHTML('beforeend', `<div class="secondPartBox">
    <h2 class="secondPartBox-date">${data.everyDay[0].day}<sup>th</sup> ${data.everyDay[0].dayOfWeek}</h2>
    <div class='secondPartBox-combi'>
    <div class="secondPartBox-dateBox">
    <p class="secondPartBox-dateBox-month">${data.everyDay[0].month}</p>
    <p class="secondPartBox-dateBox-time"></p>
    </div>
    <div class="secondPartBox-sun">
    <svg class="secondPartBox-sun-icon" width="20" height="20">    
    <use href="./images/symbol-defs.svg#icon-sunrise"></use>
    </svg>
    <p class="secondPartBox-sun-sunrise">${data.currentSunRise}</p>
    
    <svg class="secondPartBox-sun-icon" width="20" height="20">
    <use href="./images/symbol-defs.svg#icon-sunset"></use>
    </svg>
    <p class="secondPartBox-sun-sunset">${data.currentSunSet}</p>
    </div>
    </div>`);
  }



