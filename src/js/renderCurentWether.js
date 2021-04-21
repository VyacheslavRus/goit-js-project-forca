
import locDataObject from './location.js'

const ref = {
    box1: document.querySelector('.weatherBox'),
}

function renderFirstPart() {
    locDataObject.getFetch().then(data => {
        ref.box1.insertAdjacentHTML('afterbegin', `
            <div class="firstPart">
                <svg class="firstPart-icon" width="35" height="35">
                     <use href="./images/symbol-defs.svg#${data.currentWeatherIcon}"></use>
                 </svg>
                <h1 class="firstPart-location">${data.cityName},${data.countryName}</h1>
                <div class="firstPart-temperature">
                    <h2 class="firstPart-temperature-main">${data.currentTemp}</h2>
                    <div class="firstPart-temperature-box">
                        <div class="firstPart-temperature-box1">
                            <p class="firstPart-temperature-min">min</p>
                            <p class="firstPart-temperature-minnumb">${data.currentMinTemp}&deg;</p>
                        </div>
                        <div class="firstPart-temperature-box2">
                            <p class="firstPart-temperature-max">max</p>
                            <p class="firstPart-temperature-maxnumb">${data.currentMaxTemp}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>`)
        
        
        // let box2 = document.querySelector('.firstPart')
        // function getIcon() {
        //     let oneDay = data.everyDay.slice(0, 1);
        //    oneDay.map(el => {
        //        switch (el.dayWeatherIcon) {
        //            case "13n":  //icon-snow
        //                box2.insertAdjacentHTML('afterbegin', ``);
        //                break
        //            case "10n":  //rain
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-rain"></use>
        //                              </svg>`);
        //                break
        //            case "04n":  //sun
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-sun"></use>
        //                              </svg>`);
        //                break
        //            case "02n":  //icon-clouds
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-clouds"></use>
        //                              </svg>`);
        //                break
        //            case "01n":  //icon-moon
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-moon"></use>
        //                              </svg>`);
        //                break
        //            case "01n":  //icon-clouds-and-sun
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-clouds-and-sun"></use>
        //                              </svg>`);
        //                break
        //         // -----------------------DAY
        //          case "13d":  //icon-snow
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-snow"></use>
        //                              </svg>`);
        //                break
        //            case "10d":  //rain
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-rain"></use>
        //                              </svg>`);
        //                break
        //            case "04d":  //sun
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-sun"></use>
        //                              </svg>`);
        //                break
        //            case "02d":  //icon-clouds
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-clouds"></use>
        //                              </svg>`);
        //                break
        //            case "01d":  //icon-moon
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-moon"></use>
        //                              </svg>`);
        //                break
        //            case "01d":  //icon-clouds-and-sun
        //                box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-clouds-and-sun"></use>
        //                              </svg>`);
        //                break
        //             default:
        //                 box2.insertAdjacentHTML('afterbegin', `<svg class="firstPart-icon" width="35" height="35">
        //                            <use href="./images/symbol-defs.svg#icon-clouds"></use>
        //                              </svg>`);
        //                break
        //         };
        //     });
        // };
        //     // getIcon()
    });
};
        //  renderFirstPart()
