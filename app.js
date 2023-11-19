function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let dateElement = document.querySelector("#current-date");
  let humidity = response.data.humidity;
  let windSpeed = response.data.windSpeed;

  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(new Date());
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let currentDetailsElement = document.querySelector(".current-details");
  currentDetailsElement.innerHTML = `${dateElement.innerHTML}, moderate rain <br />
  Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed}km/h</strong>`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Amsterdam");
