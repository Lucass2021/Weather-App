const apikey = "6deadad7ba2cb656b22759c757eb2d62";

const weatherData = document.querySelector("#weather-data");
const cityInputElement = document.querySelector("#city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />`;

    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;

    weatherData.querySelector(".description").textContent = `${description}°C`;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = ``;

    weatherData.querySelector(".temperature").textContent = ``;
    weatherData.querySelector(
      ".description"
    ).textContent = `An error has occurred, please try again later`;
    weatherData.querySelector(".details").innerHTML = ``;
  }
}
