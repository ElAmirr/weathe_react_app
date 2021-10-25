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
                    console.log(data);
                    let city = document.querySelector('.location .city');
                    city.innerText = `${data.city.name}, ${data.city.country}`;
                    
                    let now = new Date();
    
                    let date = document.querySelector('.location .date');
                    date.innerText = dateBuilder(now);
                    
                    let time = document.querySelector('.location .time');
                    time.innerText = timeBuilder(now);
                
                    let temp = document.querySelector('.current .temp');
                    temp.innerHTML= `${tempFormat(data.list[0].main.temp)}`;
                    
                    let defaultTemp = document.querySelector('.current .temp');
                    defaultTemp.innerHTML= `${Math.round(data.list[0].main.temp)}<span>°C</span>`;

                    let weather_el = document.querySelector('.current .weather');
                    weather_el.innerText = data.list[0].weather[0].main;
                
                    let hilow = document.querySelector('.current .hi-low');
                    hilow.innerText = `Max:${Math.round(data.list[0].main.temp_max)}°c~Min:${Math.round(data.list[0].main.temp_min)}°c`;
                });
            });
        }
    }); 


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
        evt.preventDefault();
        evt.currentTarget.value = "";    
    }
}

function getResults (query) {
    fetch(`${api.basurl}q=${query}&units=metric&appid=${api.key}`)
        .then(responce => {
            return responce.json();
        })
        .then(data);
}



function data (responce, card) {
    console.log(responce);
    let city = document.querySelector('.location .city');
    city.innerText = `${responce.city.name}, ${responce.city.country}`
    
    let now = new Date();
    
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    
    let time = document.querySelector('.location .time');
    time.innerText = timeBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${tempFormat(responce.list[0].main.temp)}`;

    let defaultTemp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(responce.list[0].main.temp)}<span>°C</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = responce.list[0].weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `Max:${Math.round(responce.list[0].main.temp_max)}°c~Min:${Math.round(responce.list[0].main.temp_min)}°c`;
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
//// time format for mini card
function timeBuilderMini (d) {
    let hour = d.getHours();
    if (hour < 10) hour = '0' + hour;
    return `${hour}:00`;
}




// slide show mini temp js code
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 


// Ato dark mode 
var today = new Date().getHours();
if (today >= 8 && today <= 18) {
    document.body.style.background = "linear-gradient(to bottom, #44A08D, #093637);)";
} else {
    document.body.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9))";
}

function tempFormat(t) {
    const celsiusbtn = document.querySelector('.celsius-btn');
    const fahrenheitbtn = document.querySelector('.fahrenheit-btn');
    

    celsiusbtn.addEventListener("click", celsiusFormat);
    function celsiusFormat() {
        let temp = document.querySelector('.current .temp');
        temp.innerHTML= Math.round(t) + "<span>°C</span>";
    }
    fahrenheitbtn.addEventListener("click", fahrenheitFormat);
    function fahrenheitFormat() {
            let temp = document.querySelector('.current .temp');
            temp.innerHTML= Math.round(t*1.8+32) + "<span>°F</span>";
            let hilow = document.querySelector('.current .hi-low');
            hilow.innerText = `Max:${Math.round(t1*1.8+32)}°F~Min:${Math.round(t2*1.8+32)}°F`;
        }

}

//mini card
//let text = "";
//for (let i = 0; i < 5; i++) {
//    //slider.innerHTML = `<div class="time-mini">${timeBuilderMini(now, i)}</div>`;
//    //slider.innerHTML = `<img src=${api.iconurl}${responce.list[i].main.icon}@2x.png/>`;
//    text += "amir"
//}   
//document.getElementsByClassName('.full-card .one').innerHTML = text; ;



