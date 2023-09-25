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
var searchButton = document.querySelector('#searchInput');

searchBar.addEventListener('submit', function (event) {
    event.preventDefault();
   
    var searchCity = event.target.searchTerm.value;


        getCityUrlShawn(searchCity);
    
//console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar


// Searching for hotels with searchTerm.value below
document.querySelector("#hotels").innerHTML = "";
getCityID(event.target.searchTerm.value);

if (searchCity) {
    cityHeader.setAttribute("class", "hidden");
    getCityURL(searchCity);
}
})






// weather api key
let weather = {
    apikey : "c16441110b26354c450e03b44f77893f",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=%20metric&appid=c16441110b26354c450e03b44f77893f",
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const { icon, description } = data.weather[0];
        const {temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML ="Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "wind speed: " + speed + " km/h"
       
        
    },
   search: function() {
   this.fetchWeather(document.querySelector(".search-hold").value);
   }
};
document.querySelector(".search button").addEventListener("click", function () {
weather.search();
});

document.querySelector(".search-hold").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("California");



//save search city
const maxSearches = 5; // Set the maximum number of searches

function saveSearch() {
  var searchInput = document.getElementById('searchInput').value;
  if (searchInput) {
    var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    
    // Add the new search
    recentSearches.push(searchInput);

    // Trim the searches if the limit is exceeded
    if (recentSearches.length > maxSearches) {
      recentSearches = recentSearches.slice(recentSearches.length - maxSearches);
    }

    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
  }
}

function displayRecentSearches() {
  var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  var recentSearchesList = document.getElementById('recentSearches');
  recentSearchesList.innerHTML = '';

  recentSearches.forEach(function(search) {
    var listItem = document.createElement('li');
    listItem.textContent = search;
    recentSearchesList.appendChild(listItem);
  });
}

window.onload = displayRecentSearches;


  


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



function getCityUrlShawn(searchCity) {
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
        cityUrl = cityUrl[0];
        console.log(cityUrl)
       urlofCity(cityUrl,searchCity)
       showName(cityUrl, searchCity)
    })
}
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
        getCity(cityURL, searchCity);
       
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
        getImageShawn(imageUrlAbout, searchCity);
    })
}
 function getImageShawn(imageUrlAbout,searchCity){
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

// Hotels

function getHotels(cityID) {
    fetch('https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?sort_order=RECOMMENDED&locale=en_US&checkin_date=2023-09-26&adults_number=1&domain=US&region_id=' + cityID + '&checkout_date=2023-09-27', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8664a68d4dmshf551c85b3ef5a62p17821djsned6187553004',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.querySelector("#hotels").innerHTML = "";
            var displayLength = 3

            for (i = 0; i < displayLength; i++) {
                var hotelInfo = document.createElement("p");
                var hotelPhoto = document.createElement("img")
                var name = data.properties[i].name;
                var photos = data.properties[i].propertyImage.image.url;
                var alt = data.properties[i].propertyImage.image.description;

                hotelPhoto.setAttribute('src', photos);
                hotelPhoto.setAttribute('alt', alt);
                hotelInfo.append(name);
                document.querySelector("#hotels").append(hotelInfo, hotelPhoto);
            };
        });
};

function getCityID(searchTerm) {
    var requestURL = 'https://hotels-com-provider.p.rapidapi.com/v2/regions?domain=US&query=' + searchTerm + '&locale=en_US';

    fetch(requestURL, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8664a68d4dmshf551c85b3ef5a62p17821djsned6187553004',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getHotels(data.data[0].gaiaId);
        });
};
