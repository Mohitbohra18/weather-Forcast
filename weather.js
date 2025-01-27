const input_tab = document.querySelector(".input");
const searchButton = document.querySelector("button");
const weatherImages = document.getElementsByClassName("images");
const temprature = document.querySelector("#temprature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const location_not_found = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weatherBody");
const containeer = document.querySelector(".containeer");
const date = document.querySelector("#date");
const clock = document.querySelector("#time");
const date_time = document.querySelector(".date_time");

setInterval(() => {
  let date = new Date();
  clock.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
}, 1000);

let ndate = new Date();
date.innerHTML = `${ndate.toLocaleDateString()}`;

async function checkWeather(city) {
  const cityName = city;
  const apiKey = "4ad7901a051cde6d9c0b3547b2eb3aef";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  info = await fetch(`${url}`).then((response) => response.json());
  console.log(info);

  if (info.cod === "404" || info.cod === "400") {
    location_not_found.style.display = "flex";
    weatherBody.style.display = "none";

    containeer.style.backgroundImage = `url('')`;
    date_time.style.display = "none";
    return;
  }

  location_not_found.style.display = "none";

  weatherBody.style.display = "flex";
  date_time.style.display = "flex";

  temprature.innerHTML = `${Math.round(info.main.temp - 273.15)}°C`;
  description.innerHTML = `${info.weather[0].description}`;
  humidity.innerHTML = `${info.main.humidity}%`;
  windSpeed.innerHTML = `${info.wind.speed}km/h `;

  switch (info.weather[0].main) {
    case "Clear":
      containeer.style.backgroundImage = "url('./images/clearsky.jpg')";
      weatherImages[0].src = "./images/clear.png";

      break;
    case "Clouds":
      weatherImages[0].src = "./images/cloud.png";
      containeer.style.backgroundImage = "url('./images/Cloud.jpg')";
      break;
    case "Snow":
      weatherImages[0].src = "./images/snow.png";
      containeer.style.backgroundImage = "url('./images/Snowsky.jpg')";
      break;
    case "Rain":
      weatherImages[0].src = "./images/rain.png";
      containeer.style.backgroundImage = "url('./images/Rain.jpg')";
      break;
    case "Mist":
      weatherImages[0].src = "./images/mist.png";
      containeer.style.backgroundImage = "url('./images/mistsky.jpg')";
      break;
    default:
      weatherImages[0].src = "./images/cloud.png";

      containeer.style.backgroundImage = "url('./images/Cloud.jpg')";
      break;
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(input_tab.value);
});
