const api = {
    key: "7d599ce045a697247a327dd3f4029960",
    basurl: "https://pro.openweathermap.org/data/2.5/forecast/hourly?"
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
    hilow.innerText = `${Math.round(responce.list[0].main.temp_min)}°c / ${Math.round(responce.list[0].main.temp_max)}°c`;
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
