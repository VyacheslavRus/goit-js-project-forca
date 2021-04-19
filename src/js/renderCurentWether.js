import curentDataFetch from './location.js'

const ref = {
    box1: document.querySelector('.weatherBox'),
    box2: document.querySelector('.contentBox'),
}

function clock() { 
    let time;
    setInterval(() => {
        document.querySelector('.contentBox-dateBox-time').innerHTML = time= new Date().toLocaleTimeString()
    }, 1000);
}

function render() {
    curentDataFetch().then(data => {
        if (data.cod !== '400') {
            clock()
        }
        
        function showIcon() {
            data.weather.map(el => {
            switch(el.icon) {
                        case '01n':  //sun
                ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-sun"></use>
                                    </svg>`;
                            break
                        case '02n':  //clouds-and-sun
                ref.box1.innerText = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-clouds-and-sun"></use>
                                    </svg>`;
                            break
                        case '04n':  //cloudy
                ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-clouds"></use>
                                    </svg>`;
                            break
                        case '10n':  //rain
                ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-rain"></use>
                                    </svg>`;
                            break
                        case '13n':  //snow
                ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-snow"></use>
                                    </svg>`;
                            break
                        case '01n':  
                ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-clouds"></use>
                                    </svg>`;
                            break
                    default:
                            ref.box1.innerHTML = `<svg class="weatherBox-icon" width="35" height="35">
                                    <use href="./images/symbol-defs.svg#icon-clouds"></use>
                                    </svg>`;
                            break
                }
            })
        }
         showIcon()
        
        ref.box1.insertAdjacentHTML('beforeend', `
        
        <h1 class="weatherBox-location">${data.name}, ${data.sys.country}</h1>
        <div class="weatherBox-temperature">
        <h2 class="weatherBox-temperature-main">${Math.round(data.main.temp)}</h2>
        <div class="weatherBox-temperature-box">
        <div class="weatherBox-temperature-box1">
        <p class="weatherBox-temperature-min">min</p>
        <p class="weatherBox-temperature-minnumb">${Math.round(data.main.temp_min)}&deg;</p>
        </div>
        <div class="weatherBox-temperature-box2">
        <p class="weatherBox-temperature-max">max</p>
        <p class="weatherBox-temperature-maxnumb">${Math.round(data.main.temp_max)}&deg;</p>
        </div>
        </div>
        </div>`);
              
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sun", "Mon", "Tues", "Wedn", "Thur", "Fr", "Sat"];
        let today = new Date();
        let curDay = today.getDate();
        let dayOfWek = days[today.getDay()];
        let month = months[today.getMonth()];
        let time = today.toLocaleTimeString()

    function sunSeter(ms) {
        const hours = new Date(ms).getHours() 
        const minutes = new Date(ms).getMinutes()
        return `${hours}:${minutes}`
        };
        let sunrise = sunSeter(Number.parseInt(data.sys.sunrise + '000'));
        let sunset = sunSeter(Number.parseInt(data.sys.sunset + '000'));

        ref.box2.insertAdjacentHTML('beforeend', `
            <h2 class="contentBox-date">${curDay}<sup>th</sup> ${dayOfWek}</h2>
            <div class="contentBox-dateBox">
            <p class="contentBox-dateBox-month">${month}</p>
            <p class="contentBox-dateBox-time">${time}</p>
            </div>
            <div class="contentBox-sun">
            <svg class="contentBox-sun-icon" width="20" height="20">
            <use href="./images/symbol-defs.svg#icon-sunrise"></use>
            </svg>
            <p class="contentBox-sun-sunrise">${sunrise}</p>

            <svg class="contentBox-sun-icon" width="20" height="20">
            <use href="./images/symbol-defs.svg#icon-sunset"></use>
            </svg>
            <p class="contentBox-sun-sunset">${sunset}</p>
            </div>`);
    })
}
render()







