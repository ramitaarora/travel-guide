


// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
})


// input city data fetch to display info  
  
var cityInput = ["q60"]
var countryInput = []
var dispName = document.querySelector(".display-input-name")
var dispRegion = document.querySelector("display-input-region")
var dispLanguage = document.querySelector("display-input-language")
var dispCurrency = document.querySelector("display-input-currency")
var dispTime = document.querySelector("display-input-time")
var dispAbout = document.querySelector("display-input-about")

// fetch request to get city name, region and population
var urlCityEl1 = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' + cityInput;

fetch(urlCityEl1 {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '964ebf4356msh7a0bb58633e129ep1376dfjsn57fb259d2f72',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
}
  
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayName
  });


  
  var displayName = function(data){
  
  if (data.length === 0) {
    return;

  }
  else {
    dispName.textContent = data.name
  }

}
  
