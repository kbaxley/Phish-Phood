document.addEventListener("DOMContentLoaded", getWeather)

function getWeather() {
    let endpoint = "https://api.weatherapi.com/v1/current.json";
    let apiKey = "0ca83b3ecfb748a181a162322241811";
    let queryString = "key=" + apiKey + "&q=32789";
    let url = endpoint + "?" + queryString;
 
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
}

function responseReceivedHandler() {
    let weatherInfo = document.getElementById("weather");
    if (this.status === 200) {
        weatherInfo.innerHTML = 
            "<p>Updated: " + this.response.current.last_updated + "</p>" +
            "<p>Current temperature: " + this.response.current.temp_f + " &deg;F</p>" + 
            "<p>Feels like: " + this.response.current.feelslike_f + " &deg;F</p>" + 
            "<p>Condition: " + this.response.current.condition.text + "</p>" +  
            "<p>Humidity: " + this.response.current.humidity + "%</p>"; 
    } else {
        weatherInfo.innerHTML = "Weather data unavailable.";
    }
}

