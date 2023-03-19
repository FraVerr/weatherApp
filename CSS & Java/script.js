//Current Date and time
let date = new Date();
let days = date.getDay();
let currentDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = currentDay[days];
let hour = date.getHours();
let minutes = date.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let changeDayHours = document.querySelector("#currentDate");
changeDayHours.innerHTML = `${day} ${hour}:${minutes}`;

//Forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `        
          <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
            
            <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt=""
              width="36"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temp-max"> 18° </span>
              <span class="weather-forecast-temp-min"> 12° </span>
            </div>
          </div>
        
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Search Engine
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let emojiElement = document.querySelector("#today-emoji");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  emojiElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiElement.getAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElemnt = document.querySelector("#search-input");
  search(cityInputElemnt.value);
}

function search(city) {
  let apiKey = `4004cdc50a999be03d9fd99d95ce5466`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahreTemp");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsiusTemp");
celsiusLink.addEventListener("click", showCelsius);

search("Milan");

displayForecast();

//Current Location
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeoLocation);
}

function getGeoLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `4004cdc50a999be03d9fd99d95ce5466`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let getCurrentWeather = document.querySelector("#currentLocation-button");
getCurrentWeather.addEventListener("click", currentLocation);
