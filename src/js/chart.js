import Chart from 'chart.js/auto';
import getWeatherInfo from './getWeather.js'
import chartMarkup from '../templates/chartTemplate.hbs';



const addInfo = document.querySelector('.additionalInfo');
const hideChartTitle = document.querySelector('.hide-chart-title');
const hideChartBtn = document.querySelector('.hide-chart-btn');
// const openBtn = document.querySelector('.open-chart-btn')


    let arrHumidity = [];
    let arrdayAvarageTemp =[];
    let arrWindSpeed = [];
    let arrPressure = [];

    let arrMonth = [];
    let arrYear = [];
    let arrDay = [];
    let arrDate = [];
    

openBtn.addEventListener('click', openChart) 
    
function openChart(){
    getWeatherInfo.getWeather({ latitude: 50.4333, longitude: 30.5167 })
    .then(data => render(data.everyDay))
    .catch(error => console.log(error));
}


let chart; 
function render(data) {
    data.forEach(el => {
        arrdayAvarageTemp.push(el.dayAvarageTemp);
        arrHumidity.push(el.humidity);
        arrWindSpeed.push(el.windSpeed);
        arrPressure.push(el.pressure);
        arrMonth.push(el.month);
        arrYear.push(el.year);
        arrDay.push(el.day);
    });
    for (let i = 0; i < 5; i++) {
        arrDate.push(arrMonth[i]+' '+arrDay[i]+', '+arrYear[i])
    }
    addInfo.innerHTML = chartMarkup(data);
    chart = document.querySelector('#myChart');
    renderChart(); 
}


    function renderChart(){
        Chart.defaults.font.size = 14;
        Chart.defaults.color = 'rgba(255, 255, 255, 0.5)';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';

    const myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: arrDate,
            datasets: [{
                label: ' - Temperature, C°',
                data: arrdayAvarageTemp,
                backgroundColor: 
                'rgba(255, 255, 255, 0.2)',
                borderColor: '#ff6b09',
                backgroundColor: '#ff6b09',
                borderWidth: 2,
            },
            {
                label: ' - Humidity, %',
                data: arrHumidity,
                borderColor: '#0906eb',
                backgroundColor: '#0906eb',
                borderWidth: 2,
            },
            {
                label: ' - Wind Speed, m/s',
                data: arrWindSpeed,
                borderColor: '#ea9a05',
                backgroundColor: '#ea9a05',
                borderWidth: 2,
            },
            {
                label: ' - Atmosphere Pressure, m/m',
                data: arrPressure,
                borderColor: '#067806',
                backgroundColor: '#067806',
                borderWidth: 2,
            }
        ],
            
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    
                    // title: {
                    //     display: true,
                    //     text:'Value of Indicators',
                    //     color: 'rgba(255, 255, 255, 0.5)',
                    //     font:{
                    //         family: 'Lato',
                    //         size: 12,
                    //         weight: 400,
                    //     },
                    //     padding:{bottom:10}
                    // },
                    stacked: true,
                    beginAtZero: false,
                    gridLines: {
                        display: true,
                    }
                },
                
            x: {
                gridLines: {
                    display: false,
                }
            }
            },
            plugins:{
                legend:{
                    position: 'top',
                    align: 'start',
    
                    labels: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        boxWidth: 10,
                        boxHeight:10,
                        },
                },
                title:{
                    display: true,
                    text: 'AVERAGE:',
                    color: 'rgba(255, 255, 255, 0.5)',
                    align: 'start',
                    font: {
                        family: "Lato",
                        weight: 400,
                        },
                },
            },
        }
        
    });
}


function hideChart(){
    if (addInfo.style.display === "block"){
        addInfo.style.display = "none";
    }else{
        addInfo.style.display = "block";
    }
}

// hideChartTitle.addEventListener('click', hideChart);
// hideChartBtn.addEventListener('click', hideChart);




