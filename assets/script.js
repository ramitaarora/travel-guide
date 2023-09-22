


// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
})




displayRecentSearches();


// weather api key
let weather = {
    apikey : "c16441110b26354c450e03b44f77893f",
    fetchWeather: function () {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const { icon, description } = data.weather[0];
        const {temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML ="Weather in" + name;
        document.querySelector(".icon")
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "wind speed: " + speed + " km/h"
        document.querySelector(".icon").innerText =
    },
   search: function() {
   this.fetchWeather(document.querySelector(".search-hold").value);
   }
};
document.querySelector(".search button").addEventListener("click", function () {
weather.search();
});

document.querySelector(".search-hold").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

