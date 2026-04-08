/* javascript to enable drag-scrolling for weather app 2.0 */

// preparing variables 
let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;


// function to get remote JSON data 
async function getData(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw (response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

// update weather display in the DOM based on passed object
function updateWeather(weatherObject) {

    // outputting whole weather object to console
    console.log(weatherObject);

    // update current weather info
    document.querySelector("#currentTemp span").innerHTML = weatherObject.current.temp_f;
    document.querySelector("#currentStatus").innerHTML =
        `<img src="${weatherObject.current.condition.icon}" class="weatherIcon"> ${weatherObject.current.condition.text}`;
    document.querySelector("#currentHumidity span").innerHTML = weatherObject.current.humidity;

    // output wind speed and direction in a combined string
    let windspeed = weatherObject.current.wind_mph;
    let winddirection = weatherObject.current.wind_dir;
    document.querySelector("#currentWind").innerHTML = windspeed + "mph " + winddirection;

    // find all future day blocks and loop through them, matching the forecast days in the weather object
    let futureDays = document.querySelectorAll(".futureDay");
    for (let i = 0; i < futureDays.length; i++) {

        // update future temp
        futureDays[i].querySelector(".futureTemp span").innerHTML = weatherObject.forecast.forecastday[i].day.maxtemp_f;

        // update future windspeed
        windspeed = weatherObject.forecast.forecastday[i].day.maxwind_mph;
        futureDays[i].querySelector(".futureWind").innerHTML = windspeed + "mph";

        // update future condition status
        futureDays[i].querySelector(".futureStatus").innerHTML = weatherObject.forecast.forecastday[i].day.condition.text;
    }
}


// wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    scrollingBox = document.querySelector("#futureInfo");
    isMoving = false;

    scrollingBox.addEventListener("mousedown", function (e) {
        scrollLeftStart = scrollingBox.scrollLeft;
        offsetLeftStart = e.pageX - scrollingBox.offsetLeft;
        isMoving = true;
    });

    scrollingBox.addEventListener("mouseleave", function () {
        isMoving = false;
    });

    scrollingBox.addEventListener("mouseup", function () {
        isMoving = false;
    });

    scrollingBox.addEventListener("mousemove", function (e) {
        e.preventDefault();
        if (!isMoving) return;
        scrollingBox.scrollLeft = scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);
    });

    let sampleURL = "https://tordevries.github.io/477/examples/ajax-api-test/current-forecast.js";
    let sampleOptions = {};

    // get sample data
    getData(sampleURL, sampleOptions).then(function (result) {
        //code to operate on "result" JSON obkect
        updateWeather(result);
    });


});