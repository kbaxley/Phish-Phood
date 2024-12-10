var currentTemp = 999;

document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    displayFish();
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
    xhr.addEventListener("load", setCurrentTemp);
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

function setCurrentTemp(){
  if(this.status === 200){
    currentTemp = this.response.current.temp_f;
  }
}

async function displayFish() {
    const data = await fetchData();
    const speciesData = data.fish_species;
    const fishGrid = document.getElementById("algoGrid");
    speciesData.forEach(species => {
        const speciesItem = document.createElement('div');
        const imageFile = replaceSpace(species.common_name);
        const checkPeakSeason = checkSeason(species.peak_feeding_times.seasonal);
        const checkPeakDaily = checkPeakFeedingTime(species.peak_feeding_times.daily);
        const checkFeedTemp = checkFeedingTemp(species.preferred_weather_conditions.feeding_temperature)
        speciesItem.classList.add('speciesItem');
        speciesItem.innerHTML= `
        <li class="list-group-item">
            <ul class="list-group">
                <h3 class="fw-bold lh-1 mb-3">${species.common_name}</h3>
                <li class="list-group-item list-group-item-info"><strong>Preferred Habitat: </strong>${species.preferred_habitat}.</li>
                <li class="list-group-item list-group-item-info"><strong>Preferred Bait: </strong>${species.fishing_methods}.</li>
                <li class="list-group-item list-group-item-${checkPeakSeason}"><strong>Peak Season: </strong>${species.peak_season}.</li>
                <li class="list-group-item list-group-item-${checkFeedTemp}"><strong>Preferred Feeding Temp: </strong>${species.preferred_weather_conditions.feeding_temperature}.</li>
                <li class="list-group-item list-group-item-${checkPeakDaily}"><strong>Peak Feeding Times: </strong>${species.peak_feeding_times.daily}.</li>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start"></div>
             </ul>
          </li>
          <div class="b-example-divider"></div>
        `;
        fishGrid.appendChild(speciesItem);

    })
  }

  async function fetchData() {
    try {
      const response = await fetch("lake_vir_species_data.json");
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  function replaceSpace(input){
    const output = input.replace(/ /g, "_");
    return output;
  }

  function checkSeason(seasons){
    var currentSeason = "";
    var currentDate = new Date();
    var isSeason = "danger";
    var currentYear = currentDate.getFullYear();
    var nextYear = currentYear + 1;
    var springStart = new Date("2024-03-01T00:00:00");
    springStart.setFullYear(currentYear);
    var springEnd = new Date("2024-05-31T00:00:00");
    springEnd.setFullYear(currentYear);
    var summerStart = new Date("2024-06-01T00:00:00");
    summerStart.setFullYear(currentYear);
    var summerEnd = new Date("2024-08-31T00:00:00");
    summerEnd.setFullYear(currentYear);
    var fallStart = new Date("2024-09-01T00:00:00");
    fallStart.setFullYear(currentYear);
    var fallEnd = new Date("2024-11-30T00:00:00");
    fallEnd.setFullYear(currentYear);
    var winterStart = new Date("2024-12-01T00:00:00");
    winterStart.setFullYear(currentYear);
    var winterEnd = new Date("2024-02-28T00:00:00");
    winterEnd.setFullYear(nextYear);
  
    if(springStart <= currentDate && currentDate <= springEnd){
      currentSeason = "spring";
    }
    else if(summerStart <= currentDate && currentDate <= summerEnd){
      currentSeason = "summer";
    }
    else if(fallStart <= currentDate && currentDate <= fallEnd){
      currentSeason = "fall";
    }
    else if(winterStart <= currentDate && currentDate <= winterEnd){
      currentSeason = "winter";
    }
    else{
      console.log("ERROR");
    }

    seasons.forEach(season => {

      if(season === currentSeason){
        isSeason = "success";
      }
    });
    return isSeason;
  }

  function checkPeakFeedingTime(feedingTimes) {
    var isPeak = "danger";
    var currentFeedingTime = "";
    const peakFeedingTimes = {
        Early_morning: { start: "05:00", end: "08:00" },
        Late_evening: { start: "18:00", end: "21:00" },
        Morning: { start: "06:00", end: "10:00" },
        Late_afternoon: { start: "15:00", end: "18:00" },
        Dawn: { start: "05:00", end: "06:30" },
        Dusk: { start: "19:30", end: "21:00" },
        Nighttime: { start: "20:00", end: "05:00" }
    };
  
    const currentTime = new Date();
    const [currentHour, currentMinute] = [
        currentTime.getHours(),
        currentTime.getMinutes()
    ];
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
    for (const [peakTimeKey, peakTimeValue] of Object.entries(peakFeedingTimes)) {
        const [startHour, startMinute] = peakTimeValue.start.split(":").map(Number);
        const startTimeInMinutes = startHour * 60 + startMinute;
  
        const [endHour, endMinute] = peakTimeValue.end.split(":").map(Number);
        const endTimeInMinutes = endHour * 60 + endMinute;
  
        if (
            (endTimeInMinutes < startTimeInMinutes &&
                (currentTimeInMinutes >= startTimeInMinutes ||
                    currentTimeInMinutes < endTimeInMinutes)) ||
            (currentTimeInMinutes >= startTimeInMinutes &&
                currentTimeInMinutes < endTimeInMinutes)
        ) {
            currentFeedingTime = peakTimeKey;
        }
    }
    feedingTimes.forEach(season => {
      season = replaceSpace(season);
      if(season === currentFeedingTime){
        isPeak = "success";
      }
    })
    return isPeak;
  }

  function checkFeedingTemp(feedingTemp){
    var isFeedTemp = "danger";
  
    feedingTemp = feedingTemp.substring(0, 5);
    feedingTemp = feedingTemp.split("-");
    minFeedTemp = feedingTemp[0];
    maxFeedTemp = feedingTemp[1];
  
    if(minFeedTemp <= currentTemp && currentTemp <= maxFeedTemp){
      isFeedTemp = "success";
    }
  
    return isFeedTemp;
  }
  