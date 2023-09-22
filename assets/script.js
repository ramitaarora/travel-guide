// input city data fetch to display info  
  



var dispName = document.querySelector(".display-input-name")
var dispCountry = document.querySelector(".display-input-country")
var dispPopulation = document.querySelector(".display-input-population")
var dispLanguage = document.querySelector(".display-input-language")
var dispCurrency = document.querySelector(".display-input-currency")
var dispTime = document.querySelector(".display-input-time")
var dispAbout = document.querySelector(".display-input-about")
var cityCardHeader = document.querySelector('#city-card')


// Navigation/Search Bar
var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function(event) {
    event.preventDefault();
   
    var searchCity = event.target.searchTerm.value;


        getCityUrl(searchCity);
    
})





//fetch request to grab photos, name ,country and population for searched city

function showName(cityUrl,searchCity) {
    fetch(cityUrl).then(function(response) {
        return response.json();
    }).then(function(data){
        console.log(data._links['city:country'].name)
      dispName.textContent = data.name
    dispCountry.textContent = data._links['city:country'].name
    dispPopulation.textContent = ('POPULATION: '+ data.population)  
    })

}



function getCityURL(searchCity) {
    var url = 'https://api.teleport.org/api/cities/?search=' + searchCity;
    var cityUrl = [];

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data){ 
        var cities = data._embedded["city:search-results"];

        for (let index = 0; index < cities.length; index++) {
            const element = cities[index];
            cityUrl.push(element._links["city:item"].href);
        }
        cityUrl = cityURL[0];
        console.log(cityUrl)
       urlofCity(cityUrl,searchCity)
       showName(cityurl, searchCity)
    })
}

function urlofCity(cityUrl, searchCity) {
         var cityPath;
         fetch(cityUrl).then(function(response) {
             return response.json();
         }).then(function (data) {
             cityPath = data._links["city:urban_area"].href;
    
             console.log(cityPath);
             getImageAbout(cityPath, searchCity)
       })
    }

function getImageAbout(cityPath,searchCity) {
    var imageUrlAbout;
    fetch(cityPath).then(function(response) {
        return response.json();
    
    }).then(function(data) {
        imageUrlAbout = data._links["ua:images"].href;
        console.log(imageUrlAbout);
        getImage(imageUrlAbout, searchCity);
    })
}
 function getImage(imageUrlAbout,searchCity){
 fetch(imageUrlAbout).then(function(response) {
     return response.json();
 }).then(function(data) {
  
    var imgCity = data.photos[0].image.web
       console.log(imgCity)
     setImg(imgCity,searchCity)
 })
 }
    function setImg (imgCity,searchCity){

   cityCardHeader.src = imgCity
  dispName.innerHTML = searchCity;
    }