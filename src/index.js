function changeBackgroundColor() {
  let background = document.querySelector("#weather-app-box");
  let now = new Date();
  let dayTime = now.getHours();

  if (7 <= dayTime && dayTime >= 20) {
    background.classList.remove("weather-app-day");
    background.classList.add("weather-app-night");
  } else {
    background.classList.add("weather-app-day");
    background.classList.remove("weather-app-night");
  }
}

changeBackgroundColor();

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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[forecastDay];
}

function showCityWeatherForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let shownWeatherIcon = document.querySelector("#weather-illustration");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
      <div class="forecast-day">${formatForecastDate(forecastDay.time)}</div>
        <img class ="forecast-icon"
        src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt = "${forecastDay.condition.icon}"
          />
        <div class="forecast-temp">
          <span class="forecast-temp-high" id="forecast-temp-high">${Math.round(
            forecastDay.temperature.maximum
          )}°</span> |
          <span class="forecast-temp-low" id="forecast-temp-low">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCityWeatherData(response) {
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

function getEnteredCityForecast(city) {
  let apiKey = "491037f95bt62c7eo1c6b568c53adb94";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityWeatherForecast);
}

function searchCity(city) {
  let apiKey = "491037f95bt62c7eo1c6b568c53adb94";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityWeatherData);

  let shownCity = document.querySelector("#city");
  if (city) {
    shownCity.innerHTML = city;
  } else {
    alert(
      `Curious about the weather of a particular city?\nPlease enter the city name in the search box.`
    );
  }
}

function handleCityInput(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#entered-city");
  searchCity(enteredCity.value);
  getEnteredCityForecast(enteredCity.value);
}

function showPositionForecastData(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
      <div class="forecast-day">${formatForecastDate(forecastDay.time)}</div>
        <img class ="forecast-icon"
        src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt = "${forecastDay.condition.icon}"
          />
        <div class="forecast-temp">
          <span class="forecast-temp-high" id="forecast-temp-high">${Math.round(
            forecastDay.temperature.maximum
          )}°</span> |
          <span class="forecast-temp-low" id="forecast-temp-low">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showPositionWeatherData(response) {
  let positionCityName = document.querySelector("#city");
  let positionTemperatureData = document.querySelector("#temp-element");
  let positionHumidityData = document.querySelector("#humidity-element");
  let positionWindData = document.querySelector("#wind-element");
  let positionWeatherDescription = document.querySelector(
    "#weather-description"
  );
  let shownIllustration = document.querySelector("#weather-illustration");

  celsiusTemperature = response.data.temperature.current;

  positionCityName.innerHTML = response.data.city;
  positionTemperatureData.innerHTML = Math.round(celsiusTemperature);
  positionHumidityData.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  positionWindData.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  positionWeatherDescription.innerHTML = response.data.condition.description;
  shownIllustration.setAttribute(
    "src",
    `images/${response.data.condition.icon}.png`
  );
  shownIllustration.setAttribute("alt", response.data.condition.description);
}

function getPositionForecastData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "491037f95bt62c7eo1c6b568c53adb94";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showPositionForecastData);
}

function getPositionForecast(event) {
  navigator.geolocation.getCurrentPosition(getPositionForecastData);
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

let celsiusTemperature = null;

let enterCityForm = document.querySelector("#enter-city-form");
enterCityForm.addEventListener("submit", handleCityInput);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);
currentLocationButton.addEventListener("click", getPositionForecast);

searchCity("Solothurn");
getEnteredCityForecast("Solothurn");
