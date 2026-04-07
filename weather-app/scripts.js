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
   console.log(weatherObject);
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
});/* javascript to enable drag-scrolling for weather app */

let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;

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

    let sampleURL = "https://tordevries.github.io/477/examples/ajax-api-test/current-forecast.js" ;
    let sampleOptions = {};

    // get sample data
    getData(sampleURL, sampleOptions).then(function (result) {
        //code to operate on "result" JSON obkect
        updateWeather(result);
    });


});