
const api = {
  key: "48bbbb719c2c5b12dc6d3c6ec2e60cd2",
  base: "https://api.openweathermap.org/data/2.5/"
}
const ref = {
    locBtn: document.querySelector('.locationBtn'),
 }
 
export default async function getFetch() {
    const urlRequest = `weather?lat=${localStorage.getItem('latitude')}&lon=${localStorage.getItem('longitude')}&exclude=current&appid=${api.key}&units=metric`
 return fetch(api.base + urlRequest)
      .then(response => response.json())
     .then(response => response.cod ==='400' ? alert('Нет данных о вашей погоде!'): response)
    .catch(error => alert(error,'Ah Shit, Here We Go Again'))
      

  
}

function getLocation(e) {
  e.preventDefault()
 navigator.geolocation.getCurrentPosition(
   function (position) {
        localStorage.setItem('latitude', position.coords.latitude)
        localStorage.setItem('longitude', position.coords.longitude)
   }
);
setTimeout(() => {
    getFetch() 
}, 100);
}

// document.addEventListener('DOMContentLoaded', getFetch);

ref.locBtn.addEventListener('click', getLocation);
