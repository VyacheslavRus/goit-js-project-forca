import Chart from 'chart.js/auto';
// import chartMarkup from '../templates/chartTemplate.hbs';

const chart = document.querySelector('#myChart');
const addInfo = document.querySelector('.additionalInfo');
const hideChartTitle = document.querySelector('.hide-chart-title');
const hideChartBtn = document.querySelector('.hide-chart-btn');


const API_KEY = '48bbbb719c2c5b12dc6d3c6ec2e60cd2';
const BASE_KEY = 'http://api.openweathermap.org/data/2.5/onecall'


getData()
async function getData(){
    const response = await fetch(
        `${BASE_KEY}?lat=33.441792&lon=-94.037689&exclude=minutely,hourly&appid=${API_KEY}&units=metric,`);
    const data = await response.json()
    .then(({daily}) => {
        return daily
    })
    .then(showInfo)
}

function showInfo(daily) {
    
    const unixFullData = [];
    let fourDaysData = [];
    let arrHumidity = [];
    let fourDaysHumidity =[];
    let arrWind_speed = [];
    let fourDaysWind_speed =[];
    let arrPressure = [];
    let fourDaysPressure = [];
    let arrTemp = [];
    let fourDaysTemp = [];



    daily.forEach(data => {
        const {dt, humidity, wind_speed, pressure, temp} = data;
        unixFullData.push(dt);
        arrHumidity.push(humidity);
        arrWind_speed.push(wind_speed);
        arrPressure.push(pressure);
        arrTemp.push(temp.day);
    })

    fourDaysData = unixFullData.slice(0,5);
    fourDaysHumidity = arrHumidity.slice(0,5);
    fourDaysWind_speed = arrWind_speed.slice(0,5);
    fourDaysPressure = arrPressure.slice(0,5);
    fourDaysTemp = arrTemp.slice(0,5)


    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ]
    let formattedDate = [];
    
    for(let i=0; i< fourDaysData.length; i++){
            formattedDate.push(`${months[new Date(fourDaysData[i]*1000).getMonth()]} ${new Date(fourDaysData[i]*1000).getDate()}, ${new Date(fourDaysData[i]*1000).getFullYear()}`)  
        }
        Chart.defaults.font.size = 14;
        Chart.defaults.color = 'rgba(255, 255, 255, 0.5)';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';
        
    const myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: formattedDate,
            datasets: [{
                label: ' - Temperature, C°',
                data: fourDaysTemp,
                backgroundColor: 
                'rgba(255, 255, 255, 0.2)',
                borderColor: '#ff6b09',
                backgroundColor: '#ff6b09',
                borderWidth: 2,
            },
            {
                label: ' - Humidity, %',
                data: fourDaysHumidity,
                borderColor: '#0906eb',
                backgroundColor: '#0906eb',
                borderWidth: 2,
            },
            {
                label: ' - Wind Speed, m/s',
                data: fourDaysWind_speed,
                borderColor: '#ea9a05',
                backgroundColor: '#ea9a05',
                borderWidth: 2,
            },
            {
                label: ' - Atmosphere Pressure, m/m',
                data: fourDaysPressure,
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

hideChartTitle.addEventListener('click', hideChart);
hideChartBtn.addEventListener('click', hideChart);





