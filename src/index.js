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

function showCityWeatherData(response) {
  // let cityTemperatureData = Math.round(response.data.temperature.current);
  // let cityHumidityData = response.data.temperature.humidity;
  // let cityWindData = response.data.wind.speed;
  // let cityWeatherDescription = response.data.condition.description;
  let cityTemperatureData = document.querySelector("#temp-element");
  let cityHumidityData = document.querySelector("#humidity-element");
  let cityWindData = document.querySelector("#wind-element");
  let cityWeatherDescription = document.querySelector("#weather-description");
  let shownIllustration = document.querySelector("#weather-illustration");

  celsiusTemperature = response.data.temperature.current;

  cityTemperatureData.innerHTML = Math.round(celsiusTemperature);
  cityHumidityData.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  cityWindData.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  cityWeatherDescription.innerHTML = response.data.condition.description;
  shownIllustration.setAttribute(
    "src",
    `images/${response.data.condition.icon}.png`
  );
  shownIllustration.setAttribute("alt", response.data.condition.description);
}

function searchCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#entered-city");
  let apiKey = "491037f95bt62c7eo1c6b568c53adb94";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${enteredCity.value}&key=${apiKey}&units=${units}`;

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

function showPositionWeatherData(response) {
  let positionCityName = response.data.city;
  let positionTemperatureData = Math.round(response.data.temperature.current);
  let positionHumidityData = response.data.temperature.humidity;
  let positionWindData = response.data.wind.speed;
  let positionWeatherDescription = response.data.condition.description;

  let shownCityName = document.querySelector("#city");
  shownCityName.innerHTML = positionCityName;

  let shownTemperature = document.querySelector("#temp-element");
  shownTemperature.innerHTML = positionTemperatureData;

  let shownHumidity = document.querySelector("#humidity-element");
  shownHumidity.innerHTML = `Humidity: ${positionHumidityData} %`;

  let shownWind = document.querySelector("#wind-element");
  shownWind.innerHTML = `Wind: ${Math.round(positionWindData)} km/h`;

  let shownWeatherDescription = document.querySelector("#weather-description");
  shownWeatherDescription.innerHTML = `${positionWeatherDescription}`;

  let shownIllustration = document.querySelector("#weather-illustration");
  shownIllustration.setAttribute(
    "src",
    `images/${response.data.condition.icon}.png`
  );

  shownIllustration.setAttribute("alt", response.data.condition.description);
}

function getPositionWeatherData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "491037f95bt62c7eo1c6b568c53adb94";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showPositionWeatherData);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(getPositionWeatherData);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#temp-element");
  fahrenheitTemperature.innerHTML = Math.round((24 * 9) / 5 + 32);
}

let celsiusTemperature = null;

let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

let fahrenheitConversionLink = document.querySelector("#fahrenheit-link");
fahrenheitConversionLink.addEventListener("click", showFahrenheitTemperature);

showEntireCurrentDate();
