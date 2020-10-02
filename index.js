// Set appId
const appId = '0ab7938d5212fab3a91087a3352d0fed';

// getDataForCity function that fetches weather info from openweathermap api
const getDataForCity = city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`)
    .then(response => response.json());

// createCardHtml function used to render the weather info 
const createCardHtml = (name, main, description, temp, feelsLike, tempMin, tempMax, humidity, sunrise, sunset) => `
<div class="card" style="background-color: rgba(0, 0, 0, 0); border: 0px solid orange; color: white; text-shadow: rgba(15, 6, 0, 0.85) 0px 7px 4px">
<div class="card-header; text-align-center;" style="font-size: 200%;"><p><strong>${name}</strong></p> 
</div>
<div class="card-body; justify-content-center;" >
 
<p class="card-text" style="border-bottom: 1px solid orange; font-size: 150%; font-weight: 500">${main}</p>
<p class="card-text"><strong>IN DETAIL<strong></p>
  <p class="card-text">${description}</p>
  <div class="row; text-align: center;">
  
  <div class="col-sm-4;"><p class="card-text">temp. is</p></div>
  <div class="col-sm-4;"><p class="card-text">${temp}</p></div>
<div class="row; text-align: center;">
  <div class="col-sm-4; justify-content-center;" style="border-bottom: 1px solid orange";>
  <p class="card-text">Even though it feels like</p>
  <p class="card-text">${feelsLike}</p>
  <p class="card-text">Day's minimum</p>
  <p class="card-text">${tempMin}</p>
  <p class="card-text">And it's maximum</p>
  <p class="card-text">${tempMax}</p>
  <p class="card-text">Humidity</p>
  <p class="card-text">${humidity}%</p>
  <p class="card-text">Sunrise @</p>
  <p class="card-text">${sunrise}</p>
  <p class="card-text">Sunsets @</p>
  <p class="card-text">${sunset}</p>
  </div>
  </div>
</div>
</div>`;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
};

// selecting all the things needed
const goButton = document.querySelector('#go-button');
const cityInput = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-container');

// event listener for a click event on the "Go!" button
goButton.addEventListener('click', () => {
    // get the city from the input field
    const city = cityInput.value;

    // get the weather data for the city
    getDataForCity(city)
        .then(data => {
            const name = data.name;
            const main = data.weather[0].main;
            const description = data.weather[0].description;
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const humidity = data.main.humidity;
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            /*  
              // create the card html
              const cardHtml = createCardHtml(name, main, description, temp, feels_like, temp_min, temp_max, humidity, sunrise, sunset); 
              // get the data we need for our html from the response
             
              const name = data.name;
              const emoji = emojis[data.weather[0].icon];
              const temp = data.main.temp;
              const feelsLike = data.main.feels_like;
              const description = data.weather[0].description;
              
        */
            // create the card html
            const cardHtml = createCardHtml(name, main, description, temp, feelsLike, tempMin, tempMax, humidity, sunrise, sunset);

            // render!
            weatherContainer.innerHTML = cardHtml;
        });
});
