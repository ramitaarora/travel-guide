


// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
    var searchCity = event.target.searchTerm.value;

    if (searchCity) {
        cityHeader.setAttribute("class", "hidden");
        getCityURL(searchCity);
    }
})

// City Header

var cityHeader = document.querySelector('#city-header');
var cityName = document.querySelector('#city-name');

function getCityURL(searchCity) {
    var url = 'https://api.teleport.org/api/cities/?search=' + searchCity;
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
        //console.log(cityURL)
        getCity(cityURL, searchCity);
    })
}

function getCity(cityurl, searchCity) {
    var cityIdURL;
    fetch(cityurl).then(function(response) {
        return response.json();
    }).then(function (data) {
        cityIdURL = data._links["city:urban_area"].href;
        // cityImage = data.photos[0].image.web;

        //console.log(cityIdURL);
        getCityImageURL(cityIdURL, searchCity)
    })
    
}

function getCityImageURL(cityIdURL, searchCity) {
    var imageURL;
    fetch(cityIdURL).then(function(response) {
        return response.json();
    }).then(function (data) {
        imageURL = data._links["ua:images"].href;

        //console.log(imageURL);
        getImage(imageURL, searchCity);
    })
}

function getImage(imageURL, searchCity) {
    var headerImage;
    fetch(imageURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        headerImageURL = data.photos[0].image.web;

        //console.log(headerImageURL)
        setHeaderInfo(headerImageURL, searchCity);
    });
}

function setHeaderInfo(headerImageURL, searchCity) {
    cityHeader.removeAttribute("class", "hidden")
    cityHeader.setAttribute("style", `background-image:url("${headerImageURL}")`)
    cityName.innerHTML = searchCity;
}