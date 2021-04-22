import Chart from 'chart.js/auto';
import getWeatherInfo from './getWeather.js'
import chartMarkup from '../templates/chartTemplate.hbs';


const addInfo = document.querySelector('.additionalInfo');
const fiveDaysBtn = document.querySelector('[data-action="fiveDays"]');
let showChartContainer
let chartWidth = 0;

    let arrHumidity = [];
    let arrdayAvarageTemp =[];
    let arrWindSpeed = [];
    let arrPressure = [];

    let arrMonth = [];
    let arrYear = [];
    let arrDay = [];
    let arrDate = [];
    
    fiveDaysBtn.addEventListener('click', onShowChartContainer);

    function onShowChartContainer(){
        
    addInfo.innerHTML = `<div class="show-chart-container">
        <h2 class="chart-title show-chart">Show Chart</h2>
            <button class="pointer-button open-chart-btn">
                <svg class="icon-arrow-down-svg">
                    <use href="./images/symbol-defs.svg#icon-arrow-down"></use>
                </svg>
            </button>
        </div>`;

let showChartContainer = document.querySelector('.show-chart-container')
showChartContainer.addEventListener('click', openChart) 

function openChart(){
    arrHumidity = [];
    arrdayAvarageTemp =[];
    arrWindSpeed = [];
    arrPressure = [];

    arrMonth = [];
    arrYear = [];
    arrDay = [];
    arrDate = [];
    getWeatherInfo.getWeather(JSON.parse(localStorage.getItem('currentPos')))
    .then(data => render(data.everyDay))
    .catch(error => console.log(error));
}
}

let chart; 
let myChart;
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
    
    
    // function onResizingWindow(){
    //     // if(window.innerHeight <= 768){
    //     //     window.chart.options.scales.y.title.display = false;
    //     // }
    //     // else{
    //     //     window.chart.options.scales.y.title.display = true;
    //     // }
    //     // chart.update();
    //     console.log(chart);
    // }
    // onResizingWindow()
    
    const hideChartContainer = document.querySelector('.hide-chart-container');
    hideChartContainer.addEventListener('click', hideChart);
}

function renderChart(){
        Chart.defaults.font.size = 14;
        Chart.defaults.color = 'rgba(255, 255, 255, 0.5)';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        myChart = new Chart(chart, {
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

            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            animations: {
                tension: {
                    duration: 1500,
                    easing: 'easeOutSine',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text:'Value of Indicators',
                        color: 'rgba(255, 255, 255, 0.5)',
                        font:{
                            family: 'Lato',
                            size: 12,
                            weight: 400,
                        },
                        padding:{bottom:10}
                    },
                    stacked: true,
                    beginAtZero: false,
                    gridLines: {
                        display: true,
                    }
                },
                x: {
                    ticks:{
                        align:'start'
                    },
                gridLines: {
                    display: false,
                }, 
            }
            },
            plugins:{
                
                legend:{
                    position: 'top',
                    align: 'start',
                
                    labels: {
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
        },
        onResize: function(chart, size){
            setChartWidth()
            myChart.update()
        }
    });
}
    

function hideChart(){
    onShowChartContainer();
}

function setChartWidth() {
    chartWidth = chart.width

    if (chartWidth > 1108) {
        myChart.options.scales.y.title.display = false
    } else {
        myChart.options.scales.y.title.display = true    
    }  
    myChart.update()
    }



