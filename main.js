const api = {
    key: "7d599ce045a697247a327dd3f4029960",
    basurl: "https://pro.openweathermap.org/data/2.5/forecast/hourly?",
    iconurl: 'http://openweathermap.org/img/wn/'  
}

window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetch(`${api.basurl}lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
                .then(responce => {
                    return responce.json();
                })
                .then(data => {
                    let city = document.querySelector('.location .city');
                    city.innerText = `${data.city.name}, ${data.city.country}`
                
                    let now = new Date();
                    
                    let date = document.querySelector('.location .date');
                    date.innerText = dateBuilder(now);
                    
                    let time = document.querySelector('.location .time');
                    time.innerText = timeBuilder(now);
                
                    let temp = document.querySelector('.current .temp');
                    temp.innerHTML= `${Math.round(data.list[0].main.temp)}<span>°c</span>`;
                    
                    let weather_el = document.querySelector('.current .weather');
                    weather_el.innerText = data.list[0].weather[0].main;
                
                    let hilow = document.querySelector('.current .hi-low');
                    hilow.innerText = `Max:${Math.round(data.list[0].main.temp_max)}°c~Min:${Math.round(data.list[0].main.temp_min)}°c`;
                });
            });
        }
    });
 
const celsiusbtn = document.querySelector('.celsius-btn');
celsiusbtn.addEventListener("click", celsiusFormat);

function celsiusFormat() {
    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(responce.list[0].main.temp)}<span>°c</span>`;
}

const fahrenheitbtn = document.querySelector('.fahrenheit-btn');
fahrenheitbtn.addEventListener("click", fahrenheitFormat);

function fahrenheitFormat() {
    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(((responce.list[0].main.temp)*1.8)+32)}<span>°c</span>`;
}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.basurl}q=${query}&units=metric&appid=${api.key}`)
        .then(responce => {
            return responce.json();
        })
        .then(data);
}

function data (responce) {
    console.log(responce);
    let city = document.querySelector('.location .city');
    city.innerText = `${responce.city.name}, ${responce.city.country}`
    
    let now = new Date();
    
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    
    let time = document.querySelector('.location .time');
    time.innerText = timeBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(responce.list[0].main.temp)}<span>°c</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = responce.list[0].weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `Max:${Math.round(responce.list[0].main.temp_max)}°c~Min:${Math.round(responce.list[0].main.temp_min)}°c`;

    //mini card
    let data = document.querySelector('container mini-card');
    for (let i = 0; 6; i++) {
        data.innerHTML = `<div class="time-mini">${timeBuilderMini(now)}</div>`;
        data.innerHTML = `<img src=`${api.iconurl}${responce.list[i].main.icon}@2x.png`/>`;
        data.innerHTML = `<div class="temp_mini">${Math.round(responce.list[i].main.temp)}<span>°c</span>`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "Augest", "September", "October", "Nouvember", "December"];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

function timeBuilder (d) {
    let hour = d.getHours();
    if (hour < 10) hour = '0' + hour;
    let minute = d.getMinutes();
    if (minute < 10) minute = '0' + minute;
    return `${hour}:${minute}`;
}
// time format for mini card
function timeBuilderMini (d, i=0) {
    let hour = d.getHours() + i;
    if (hour < 10) hour = '0' + hour;
    return `${hour}:00`;
}
