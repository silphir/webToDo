const weater = document.querySelector(".js-weather");
const WEATH_API = "c9cf6c7b06c146ba6af46a409361428b";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATH_API}&units=metric`
        ).then(function(responseData){
            return responseData.json();
        }).then(function(json){
            const temp = json.main.temp;
            const location = json.name;
            const minTemp = json.main.temp_min;
            const maxTemp = json.main.temp_max;
            weater.innerText = `${Math.floor(temp)}°C (${minTemp}/${maxTemp}) @ ${location}`;
        });
}

function saveLocation(locObj) {
    localStorage.setItem("geoLoc", JSON.stringify(locObj));
}

function successGetLoc(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locObj = {
        latitude,
        longitude
    };
    saveLocation(locObj);
}
function errorGetLoc() {
    console.log("Cant get geo location")
}

function getGeoLoc() {
    navigator.geolocation.getCurrentPosition(successGetLoc, errorGetLoc);
}

function loadGeoLoc() {
    const geoLoc = localStorage.getItem("geoLoc");
    if (geoLoc === null) {
        getGeoLoc();
    }
    else {
        const parseGeoLoc = JSON.parse(geoLoc);
        getWeather(parseGeoLoc.latitude, parseGeoLoc.longitude);
    }
    console.log("complete");
}

function init() {
    loadGeoLoc();
    setInterval(loadGeoLoc, 3600000);
}

init();