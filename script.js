function getWeather() {
    const keyAPI = '';  // здесь будет api key, который можно получить на OpenWeather
    const city = document.getElementById('city').value;

    if(!city) {
        alert('Please enter your city');
        return;
    }
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyAPI}`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {showWeather(data);})
        .catch(error => {
            console.error(`Error fetching weather data: ${error}`);
            alert('Error fetching weather data. Please try again later.');
        });

    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {showHourlyForecast(data.list);})
        .catch(error => {
            console.error(`Error fetching hourly forecast data: ${error}`);
            alert('Error fetching hourly forecast data. Please try again later.');
        });
}

function showWeather(data) {
    const temperature = document.getElementById('temperature');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecast = document.getElementById('hourly-forecast');

    temperature.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';

    if (data.cod === '404') {weather.innerHTML = `<p>${data.message}</p>`;}
    else {
        const cityName = data.name;
        const temp = Math.round(data.main.temp - 273.15);    // перевод в градусы Цельсия
        const description = data.weather[0].description;
        const iconURL = './img/' + data.weather[0].icon + '.png';

        // иконки с сайта open weather
        // const iconCode = data.weather[0].icon;
        // const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempDisplay = `<p>${temp}°C</p>`;
        const weatherDisplay = `
            <p>${cityName}</p>
            <p>${description}</p>`;
        
        temperature.innerHTML = tempDisplay;
        weatherInfo.innerHTML = weatherDisplay;
        weatherIcon.src = iconURL;
        weatherIcon.alt = description;

        showImg();
    }
}

function showHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById('hourly-forecast');
    const next24hours = hourlyData.slice(0, 8);     // интервалы по 3 часа

    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);  // перевод в милисекунды
        const hour = dateTime.getHours();
        const temp = Math.round(item.main.temp - 273.15); 
        const iconURL = './img/' + item.weather[0].icon + '.png';

        // иконки с сайта open weather
        // const iconCode = item.weather[0].icon;
        // const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconURL}" alt="Hourly Weather Icon">
                <span>${temp}°C</span>
            </div>`;

        hourlyForecast.innerHTML += hourlyItemHTML;
    });
}

function showImg() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'
}
