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
    //console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
    var searchCity = event.target.searchTerm.value;


        getCityURL(searchCity);
    
})



 //fetch request to get city name, region and population

//  function getCity(searchCity) {
    
//  var url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' + searchCity;
    

//  fetch(url, {
//   method: 'GET',
//    headers: {
//      'X-RapidAPI-Key': '964ebf4356msh7a0bb58633e129ep1376dfjsn57fb259d2f72',
//      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//  }
  
//  })
//    .then(function (response) {
//      return response.json();
//    })
//    .then(function (data) {
//      console.log(data);
//      displayName(data)
//    });


//   // display function to show population, 
//   var displayName = function(data){
  
//   if (data.data === 0) {
//     return;

//   }
//   else {
//     dispName.textContent = data.data.name
//     dispCountry.textContent = data.data.country
//     dispPopulation.textContent = ('POPULATION: '+ data.data.population)
//   }

// }
//  }
//fetch request to grab photos for searched city

function showName(cityURL,searchCity) {
    fetch(cityURL).then(function(response) {
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
       urlofCity(cityURL,searchCity)
       showName(cityURL, searchCity)
    })
}

function urlofCity(cityurl, searchCity) {
         var cityPath;
         fetch(cityurl).then(function(response) {
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