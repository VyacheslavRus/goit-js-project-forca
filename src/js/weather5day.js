// 
const BASE_URL = 'http://api.openweathermap.org';
const API_KEY = 'fa6fe7df4eee11a9497507101c08bbbb';


export default class Weather5days {
   constructor() {
     this.search='';
  }



 async fetchWeather () {
  // ${this.search}
    const gettingWeather = await fetch(
      `${BASE_URL}/data/2.5/forecast?q=kyiv&appid=${API_KEY}&units=metric`,
    );
    const data = await gettingWeather.json();
   
   return data;




  }
  get query() {
    return this.search;
  }
  set query(newQuery) {
    this.search = newQuery;
  }
 }
