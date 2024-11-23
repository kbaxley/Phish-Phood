document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    let questions = document.querySelectorAll(".faqs button");
    questions.forEach(element => {
        let answer = element.nextElementSibling;
        answer.hidden = true;
        element.addEventListener("click", () => {
            answer.hidden = !answer.hidden;
        });
    });
});

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
            "<p>Updated: <span class=\"r\">" + this.response.current.last_updated + "</span></p>" +
            "<p>Temperature: <span class=\"r\">"  + this.response.current.temp_f + "&deg;F</span></p>" + 
            "<p>Feels like: <span class=\"r\">" + this.response.current.feelslike_f + "&deg;F</span></p>" + 
            "<p>Condition: <span class=\"r\">" + this.response.current.condition.text + "</span></p>" +  
            "<p>Humidity: <span class=\"r\">" + this.response.current.humidity + "</span></p>"; 
    } else {
        weatherInfo.innerHTML = "Weather data unavailable.";
    }
}


