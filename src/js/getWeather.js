const BASEURL = 'http://api.openweathermap.org/data/2.5/';
const APIKEY = '48bbbb719c2c5b12dc6d3c6ec2e60cd2';
const UNITSCOUNT = '40';
const UNITS = 'metric';
const DAYSFORFORECAST = 5;
const WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

function apiFiveDaysEveryThreeHours(locationString) {
  return fetch(
    `${BASEURL}forecast?${locationString}&appid=${APIKEY}&cnt=${UNITSCOUNT}&units=${UNITS}`,
  )
    .then(responce => responce.json())
    .catch(error => console.log(error));
}

function apiEveryDay(lat, lon) {
  return fetch(
    `${BASEURL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIKEY}&units=${UNITS}`,
  )
    .then(responce => responce.json())
    .catch(error => console.log(error));
}

function getTimeString(date) {
  let dateString = '';

  date.getHours() < 10
    ? (dateString += `0${date.getHours()}`)
    : (dateString += `${date.getHours()}`);

  dateString += ':';

  date.getMinutes() < 10
    ? (dateString += `0${date.getMinutes()}`)
    : (dateString += `${date.getMinutes()}`);

  return dateString;
}

const getWeather = async ({ city, latitude, longitude }) => {
  let locationString = '';
  city
    ? (locationString = `q=${city}`)
    : (locationString = `lat=${latitude}&lon=${longitude}`);

  let weatherData = {
    // currentTemp: 0,
    // currentMinTemp: 0,
    // currentMaxTemp: 0,
    // currentSunRise: 0,
    // currentSunSet: 0,
    everyDay: [],
    eachDayEveryThreeHours: [],
  };

  // const fiveDaysObject = await apiFiveDaysEveryThreeHours(
  //   city ? `q=${city}` : `lat=${latitude}&lon=${longitude}`,
  // );

  const fiveDaysObject = await apiFiveDaysEveryThreeHours(locationString);
  const everyDayObject = await apiEveryDay(
    fiveDaysObject.city.coord.lat,
    fiveDaysObject.city.coord.lon,
  );

  weatherData.currentTemp = Math.round(everyDayObject.current.temp);
  weatherData.currentMinTemp = Math.round(everyDayObject.daily[0].temp.min);
  weatherData.currentMaxTemp = Math.round(everyDayObject.daily[0].temp.max);
  weatherData.currentSunRise = getTimeString(
    new Date(everyDayObject.current.sunrise * 1000),
  );
  weatherData.currentSunSet = getTimeString(
    new Date(everyDayObject.current.sunset * 1000),
  );

  everyDayObject.daily.forEach(el => {
    weatherData.everyDay.push({
      dayOfWeek: WEEK[new Date(el.dt * 1000).getDay()],
      day: new Date(el.dt * 1000).getDate(),
      month: MONTH[new Date(el.dt * 1000).getMonth()],
      year: new Date(el.dt * 1000).getFullYear(),
      dayAvarageTemp: Math.round((el.temp.max + el.temp.min) / 2),
      dayMinTemp: Math.round(el.temp.min),
      dayMaxTemp: Math.round(el.temp.max),
      dayWeatherIcon: el.weather[0].icon,
      humidity: el.humidity,
      pressure: el.pressure,
      windSpeed: Math.round(el.wind_speed * 10) / 10,
    });
  });
  weatherData.everyDay = weatherData.everyDay.slice(0, DAYSFORFORECAST);

  let dayCounter = new Date().getDate();

  fiveDaysObject.list.forEach(el => {
    if (new Date(el.dt_txt).getDate() === dayCounter) {
      weatherData.eachDayEveryThreeHours.push([]);
      dayCounter++;
    }
  });

  dayCounter = new Date().getDate();
  let counter = 0;

  fiveDaysObject.list.forEach(el => {
    if (new Date(el.dt_txt).getDate() === dayCounter) {
      weatherData.eachDayEveryThreeHours[counter].push({
        time: getTimeString(new Date(el.dt_txt)),
        weatherIcon: el.weather[0].icon,
        temp: Math.round(el.main.temp),
        pressure: el.main.pressure,
        humidity: el.main.humidity,
        windSpeed: Math.round(el.wind.speed * 10) / 10,
      });
    } else {
      counter++;
      weatherData.eachDayEveryThreeHours[counter].push({
        time: getTimeString(new Date(el.dt_txt)),
        weatherIcon: el.weather[0].icon,
        temp: Math.round(el.main.temp),
        pressure: el.main.pressure,
        humidity: el.main.humidity,
        windSpeed: Math.round(el.wind.speed * 10) / 10,
      });
      dayCounter++;
    }
  });

  weatherData.eachDayEveryThreeHours = weatherData.eachDayEveryThreeHours.slice(
    0,
    DAYSFORFORECAST,
  );
  return weatherData;
};

export default { getWeather };

// const tyest = {
//   city: 'Kiev',
//   latitude: 50.4333,
//   longitude: 30.5167,
// };

// getWeather({ latitude: 50.4333, longitude: 30.5167 })
//   .then(users => console.log(users))
//   .catch(error => console.log(error));

//////////////////////////////////////////////////////

// Trying LocalStorage

// let settings = {
//   location: 0,
//   lastModifyTime: 0,
//   object: {
//     a: 1,
//     b: 2,
//   },
// };

// function fetchStorage(city) {
//   try {
//     console.log('Try');
//     console.log(JSON.parse(localStorage.getItem(city)).location);
//     console.log(settings.location);
//     if (JSON.parse(localStorage.getItem(city)).location === city) {
//       console.log('OK');
//     }
//   } catch {
//     settings.location = city;
//     localStorage.setItem(city, JSON.stringify(settings));
//     console.log('ELSE');
//   }
// }

// fetchStorage('Kiev');
// console.log('-------------------');
// console.log(settings.location);

// --------------------------------------------

// const settings = {
//   theme: 'dark',
//   isAuthenticated: true,
//   options: [1, 2, 3],
// };

// localStorage.setItem('settings', JSON.stringify(settings));

// const parsedSettings = JSON.parse(localStorage.getItem('settings'));

// console.log(settings.theme === parsedSettings.theme);

// console.log(parsedSettings);
