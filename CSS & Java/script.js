// Search Engine
function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let citySelected = document.querySelector("#selected-city");
  citySelected.innerHTML = `${searchInput.value}`;
  search(searchInput.value);
}

function search(city) {
  let apiKey = `4004cdc50a999be03d9fd99d95ce5466`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", newCity);

function currentWeather(response) {
  let citySelected = document.querySelector("#selected-city");
  citySelected.innerHTML = response.data.name;
  let currentTemp = document.querySelector(".degrees");
  currentTemp.innerHTML = `Currently ${Math.round(response.data.main.temp)}`;
}

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
  axios.get(apiUrl).then(currentWeather);
}

let getCurrentWeather = document.querySelector("#currentLocation.button");
getCurrentWeather.addEventListener("click", currentLocation);

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

let changeDayHours = document.querySelector("#currentDate");
changeDayHours.innerHTML = `${day} ${hour}:${minutes}`;

//Form Celsius to Fahrenheit
function celsiusDegrees() {
  let celsTemp = document.querySelector(".degrees");
  celsTemp.innerHTML = "Currently 11";
}
let celsiusTemp = document.querySelector("#celsiusTemp");
celsiusTemp.addEventListener("click", celsiusDegrees);

function fahrenheitDegrees() {
  let fahrenTemp = document.querySelector(".degrees");
  fahrenTemp.innerHTML = "Currently 51,8";
}
let fahrenheitTemp = document.querySelector("#fahreTemp");
fahrenheitTemp.addEventListener("click", fahrenheitDegrees);
