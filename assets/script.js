


// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
    var searchCity = event.target.searchTerm.value;
    getCityURL(searchCity)
})

// City Header

var cityHeader = document.querySelector('.city-header');


function getCityURL(searchCity) {
    // add %20 for spaces in search term

    var url = 'https://api.teleport.org/api/cities/?search=san%20francisco' // change this later to adapt to search query
    var cityURL = [];

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data){ 
        var cities = data._embedded["city:search-results"];

        for (let index = 0; index < cities.length; index++) {
            const element = cities[index];
            cityURL.push(element._links["city:item"].href);
        }

        cityURL = cityURL[0];
        console.log(cityURL)
        getCity(cityURL);
    })
}

function getCity(cityurl) {
    var cityIdURL;
    fetch(cityurl).then(function(response) {
        return response.json();
    }).then(function (data) {
        cityIdURL = data._links["city:urban_area"].href;
        // cityImage = data.photos[0].image.web;

        console.log(cityIdURL);
        getCityImageURL(cityIdURL)
    })
    
}

function getCityImageURL(cityIdURL) {
    var imageURL;
    fetch(cityIdURL).then(function(response) {
        return response.json();
    }).then(function (data) {
        imageURL = data._links["ua:images"].href;

        console.log(imageURL);
        getImage(imageURL);
    })
}

function getImage(imageURL) {
    fetch(imageURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.photos[0].image.web);
    });
}