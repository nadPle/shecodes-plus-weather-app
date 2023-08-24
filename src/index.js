function showEntireCurrentDate() {
  let now = new Date();
  let entireCurrentDate = document.querySelector("#entire-current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHours = String(now.getHours()).padStart(2, "0");
  let currentMinutes = String(now.getMinutes()).padStart(2, "0");

  entireCurrentDate.innerHTML = `${currentDay} | ${currentMonth} ${currentDate} | ${currentHours}:${currentMinutes}`;
}

showEntireCurrentDate();

function showCityWeatherData(response) {
  let cityTemperatureData = Math.round(response.data.main.temp);
  let cityHumidityData = response.data.main.humidity;
  let cityWindData = response.data.wind.speed;
  let cityWeatherDescription = response.data.weather[0].description;

  let shownTemperature = document.querySelector("#header-temp-element");
  shownTemperature.innerHTML = cityTemperatureData;

  let shownHumidity = document.querySelector("#header-humidity-element");
  shownHumidity.innerHTML = `Humidity: ${cityHumidityData} %`;

  let shownWind = document.querySelector("#header-wind-element");
  shownWind.innerHTML = `Wind: ${Math.round(cityWindData)} km/h`;

  let shownWeatherDescription = document.querySelector(
    "#header-weather-description"
  );
  shownWeatherDescription.innerHTML = `${cityWeatherDescription}`;
}

function searchCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#entered-city");
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityWeatherData);

  let shownCity = document.querySelector("#city");
  if (enteredCity.value) {
    shownCity.innerHTML = `${enteredCity.value}`;
  } else {
    alert(
      `Curious about the weather of a particular city?\nPlease enter the city name in the search box.`
    );
  }
}

let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", searchCity);

function showPositionWeatherData(response) {
  let positionCityName = response.data.name;
  let positionTemperatureData = Math.round(response.data.main.temp);
  let positionHumidityData = response.data.main.humidity;
  let positionWindData = response.data.wind.speed;
  let positionWeatherDescription = response.data.weather[0].description;

  let shownCityName = document.querySelector("#city");
  shownCityName.innerHTML = positionCityName;

  let shownTemperature = document.querySelector("#header-temp-element");
  shownTemperature.innerHTML = positionTemperatureData;

  let shownHumidity = document.querySelector("#header-humidity-element");
  shownHumidity.innerHTML = `Humidity: ${positionHumidityData} %`;

  let shownWind = document.querySelector("#header-wind-element");
  shownWind.innerHTML = `Wind: ${Math.round(positionWindData)} km/h`;

  let shownWeatherDescription = document.querySelector(
    "#header-weather-description"
  );
  shownWeatherDescription.innerHTML = `${positionWeatherDescription}`;
}

function getPositionWeatherData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showPositionWeatherData);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(getPositionWeatherData);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);