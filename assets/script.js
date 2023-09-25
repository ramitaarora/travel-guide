// input city data fetch to display info  

var dispPopulation = document.querySelector(".display-input-population")
var dispAbout = document.querySelector(".display-input-about")
var cityCardHeader = document.querySelector('#city-card')
var dispClimateEl1 = document.querySelector(".display-climate-label")
var dispClimateEl2 = document.querySelector(".display-climate-value")
var dispArtEl1 = document.querySelector(".display-art-label")
var dispArtEl2 = document.querySelector(".display-art-value")
var dispMuseumEl1 = document.querySelector(".display-museum-label")
var dispMuseumEl2 = document.querySelector(".display-museum-value")
var dispHistoryEl1 = document.querySelector(".display-history-label")
var dispHistoryEl2 = document.querySelector(".display-history-value")
var dispCurrencyEl1 = document.querySelector(".display-currency-label")
var dispCurrencyEl2 = document.querySelector(".display-currency-value")
var dispCurrencyRateEl1 = document.querySelector(".display-rate-label")
var dispCurrencyRateEl2 =document.querySelector(".display-rate-value")
var dispLanguageEl1 = document.querySelector(".display-language-label")
var dispLanguageEl2 = document.querySelector(".display-language-value" )
var dispLifeEl1 = document.querySelector(".display-life-label")
var dispLifeEl2 = document.querySelector(".display-life-value")
var dispLifeAgeEl1 = document.querySelector(".display-age-label")
var dispLifeAgeEl2 =document.querySelector(".display-age-value")
var dispAirEl1 = document.querySelector(".display-air-label")
var dispAirEl2 = document.querySelector(".display-air-value")
var dispPopulationEl1 = document.querySelector('.display-population-label')
var dispPopulationEl2 = document.querySelector('.display-population-value')

var cityHeader = document.querySelector('#city-header');
var cityName = document.querySelector('#city-name');
var topPlacesEl = document.querySelector('#top-places');

// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#searchInput');

searchBar.addEventListener('submit', function (event) {
    event.preventDefault();
    //console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
    var searchCity = event.target.searchTerm.value;

    // Searching for hotels with searchTerm.value below
    document.querySelector("#hotels").innerHTML = "";
    getCityID(event.target.searchTerm.value);

    getCityUrlShawn(searchCity);
    getWikiPageId(searchCity)
    getWikiPageImg(searchCity)
    getDetails(searchCity);

    // Searching for restaurants via yelp
    getRestaurants(event.target.searchTerm.value);

    // Call weather

    weather.fetchWeather(searchCity);
    saveSearch()

    // Setting header

    if (searchCity) {
        cityHeader.removeAttribute("class", "hidden");
        topPlacesEl.setAttribute("class", "hidden");
        getCityURL(searchCity);
}
})

// weather

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
        document.querySelector(".temp").innerText = Math.trunc((temp - 273.15) * (9/5) + 32) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h"
       
        
    },
   search: function() {
   this.fetchWeather(document.querySelector("#search-input").value);
   }
};
document.querySelector("#search-submit").addEventListener("click", function () {
weather.search();
});

document.querySelector("#search-input").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

//save search city

const maxSearches = 3; // Set the maximum number of searches

function saveSearch() {
  var searchInput = document.getElementById('search-input').value;
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


//fetch request to grab photos, name ,country and population for searched city

function showName(cityUrl,searchCity) {
    fetch(cityUrl).then(function(response) {
        return response.json();
    }).then(function(data){
        //console.log(data._links['city:urban_area'].href)
     var cityDetails = data._links['city:urban_area'].href
        //console.log(data._links['city:country'].name)
      dispName.textContent = data.name
    dispCountry.textContent = data._links['city:country'].name
    dispPopulation.textContent = ('POPULATION: '+ data.population)  
    getDetails(cityDetails,searchCity)
    })

}

function getDetails(cityDetails){
fetch(cityDetails).then(function(response) {
    return response.json();
}).then(function(data){
    //console.log(data)
})
}


function getCityUrlShawn(searchCity) {
    var url = 'https://api.teleport.org/api/cities/?search=' + searchCity;
    var cityUrl = [];
   
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data){ 
        //console.log(data)
        var cities = data._embedded["city:search-results"];

        for (let index = 0; index < cities.length; index++) {
            const element = cities[index];
            cityUrl.push(element._links["city:item"].href);
        }
        cityUrl = cityUrl[0];
        //console.log(cityUrl)
       urlofCity(cityUrl,searchCity)
       showName(cityUrl, searchCity)
    })
}

function urlofCity(cityUrl, searchCity) {
    var cityPath;
    fetch(cityUrl).then(function(response) {
        return response.json();
    }).then(function (data) {
        cityPath = data._links["city:urban_area"].href;

        //console.log(cityPath);
        getImageAbout(cityPath, searchCity)
  })
}

function getImageAbout(cityPath,searchCity) {
var imageUrlAbout;
fetch(cityPath).then(function(response) {
   return response.json();

}).then(function(data) {
   imageUrlAbout = data._links["ua:images"].href;
   //console.log(imageUrlAbout);
   getImageShawn(imageUrlAbout, searchCity);
})
}


function getImageShawn(imageUrlAbout,searchCity){
fetch(imageUrlAbout).then(function(response) {
   return response.json();
}).then(function(data) {

   var imgCity = data.photos[0].image.web
   //console.log(imgCity)
   setImg(imgCity,searchCity)
})
}

function setImg (imgCity,searchCity){
    dispName.innerHTML = searchCity;
}
  

// City Header

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
        getCity(cityURL);
    })
}

function getCity(cityurl, searchCity) {
    var cityIdURL;
    var latitude;
    var longitude;
    var cityNameAPI;

    fetch(cityurl).then(function(response) {
        return response.json();
    }).then(function (data) {
        cityIdURL = data._links["city:urban_area"].href;
        cityNameAPI = data.full_name;
        latitude = data.location.latlon.latitude
        longitude = data.location.latlon.longitude;

        //console.log(cityIdURL);
        //console.log(latLong)
        //console.log(cityNameAPI)
        getCityImageURL(cityIdURL, cityNameAPI)
        getMap(latitude, longitude, searchCity)
    })
    
}

function getCityImageURL(cityIdURL, cityNameAPI) {
    var imageURL;
    fetch(cityIdURL).then(function(response) {
        return response.json();
    }).then(function (data) {
        imageURL = data._links["ua:images"].href;

        //console.log(imageURL);
        getImage(imageURL, cityNameAPI);
    })
}

function getImage(imageURL, cityNameAPI) {
    var headerImage;
    fetch(imageURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        headerImageURL = data.photos[0].image.web;

        //console.log(headerImageURL)
        setHeaderInfo(headerImageURL, cityNameAPI);
    });
}

function setHeaderInfo(headerImageURL, cityNameAPI) {
    cityHeader.removeAttribute("class", "hidden")
    cityHeader.setAttribute("style", `background-image:url("${headerImageURL}")`)
    cityName.innerHTML = cityNameAPI;
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

// Restaurants (Yelp)

function getRestaurants(searchTerm) {
    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + searchTerm + '&term=restaurants&sort_by=review_count&limit=5', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer 8GkrzCSBb-7hLtDuXuJFVo0NAkoGFSiYYiTLv-lf5MjJOIq0e0KuCx1_MZeT7FXWNZwGof-Y1mjZEjBm79e9v9M4ErO3jeS6sw-9UK6ZYWVbFYNMVdHuK06aY8QNZXYx'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            document.querySelector("#yelp").innerHTML = "";
            var displayLength = 3;
            reviewsArray = [];

            for (i = 0; i < displayLength; i++) {

                var yelpName = document.createElement("p");
                var yelpRating = document.createElement("p");
                var yelpPhone = document.createElement("p");
                var yelpPhoto = document.createElement("img");
                var icon = document.createElement("i");
                var name = data.businesses[i].name;
                var rating = data.businesses[i].rating;
                var phone = data.businesses[i].display_phone;
                var photos = data.businesses[i].image_url;

                icon.setAttribute("class", "fa-solid fa-star fa-sm");
                icon.style = "color:#f0e800";
                yelpName.textContent = "Restaurant Name: ";
                yelpPhone.textContent = "Phone Number: ";
                yelpRating.textContent = "Yelp Rating: ";
                yelpPhoto.setAttribute('src', photos);
                yelpName.append(name);
                yelpRating.append(icon);
                yelpRating.append(rating);
                yelpPhone.append(phone);
                $("#yelp").append(yelpPhoto, yelpName, yelpRating, yelpPhone);
                $("#yelp").append('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal' + [i] + '">Click for Reviews</button>')

                // Order of arrays not same as order of businesses displayed on screen. Why?
                // setTimeout(getYelpReviews(data.businesses[i].id), 5000);

                getYelpReviews(data.businesses[i].id, i)
            };

            var prefix = "yelpName";
            var modalName;
            for (j = 0; j < 3; j++) {
                modalName = document.getElementById(prefix + j);
                modalName.textContent = data.businesses[j].name;
            };
        });
};

// Displays reviews in modals

var reviewsArray = [];

function getYelpReviews(restaurantID, index) {
    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + restaurantID + '/reviews?limit=3&sort_by=yelp_sort', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer 8GkrzCSBb-7hLtDuXuJFVo0NAkoGFSiYYiTLv-lf5MjJOIq0e0KuCx1_MZeT7FXWNZwGof-Y1mjZEjBm79e9v9M4ErO3jeS6sw-9UK6ZYWVbFYNMVdHuK06aY8QNZXYx'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var length = 3

            for (j = 0; j < length; j++) {
                var review = data.reviews[j].text;
                var name = data.reviews[j].user.name;
                var date = data.reviews[j].time_created;

                var reviewObject = {
                    restaurantID: index,
                    reviewText: review,
                    reviewName: name,
                    reviewDate: date
                };

                reviewsArray.push(reviewObject);
                //console.log(reviewsArray);
            };

            displayReviews();
        })
};

function displayReviews() {

    var prefix = "yelpReview";
    var modalReviews;

    for (j = 0; j < 3; j++) {
        var clearReviews = document.getElementById(prefix + j);
        clearReviews.innerHTML = "";
    };

    for (i = 0; i < reviewsArray.length; i++) {
        var reviewID = reviewsArray[i].restaurantID;
        modalReviews = document.getElementById(prefix + reviewID);

        var reviewTextEl = document.createElement("p");
        var reviewerNameEl = document.createElement("p");
        var reviewDateEl = document.createElement("p");
        var space = document.createElement("hr");

        reviewTextEl.textContent = reviewsArray[i].reviewText;
        reviewerNameEl.textContent = "Reviewer Name: " + reviewsArray[i].reviewName;
        reviewDateEl.textContent = "Review Date: " + reviewsArray[i].reviewDate;

        modalReviews.append(reviewTextEl);
        modalReviews.append(reviewerNameEl);
        modalReviews.append(reviewDateEl, space);
    };
};

// Map

var mapImage = document.querySelector('#map-image');
mapImage.setAttribute("class", "hidden");

function getMap(lat, long, city) {
    mapURL = 'https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/' + lat + '%2C' + long + '/13?mapSize=600%2C300&format=png&key=AjpBW5YPLt1z69jc_F5gvBQ1c9UMsLKKXp7pvnaEB16G1gyV-tb1-0leGlXqVVyk';
    
    mapImage.setAttribute("src", mapURL);
    mapImage.setAttribute("alt", city);
    mapImage.removeAttribute("class", "hidden");
}

// City Information

function getWikiPageId(searchCity) {
    fetch("https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=" + searchCity )
    .then(function(resp) {
                //console.log(resp);
                return resp.json()
            }).then(function(data) {
                dataNum = Object.keys(data.query.pages)[0]
                //console.log(data)
            

              var wikiId = (data.query.pages[dataNum].extract)
              //console.log(wikiId)     
              var divEl = document.querySelector("#article");
              divEl.innerHTML = `${wikiId}`
       
})
             
}
             
function getWikiPageImg(searchCity) {
  
  
  
    fetch("https://api.unsplash.com/search/photos?query="+ searchCity + "&client_id=M-iPfuxYSOOq-37o5ECD78Xx7qfNrKZeq-cGC7x8K2Q&per_page=10" )
    .then(function(resp) {
                //console.log(resp);
                return resp.json()
            }).then(function(data) {
                
                //console.log(data.results[0].urls.full)
            var imgCity = data.results[0].urls.full
                cityCardHeader.src = imgCity
  })
             
  }


// Suggested Cities Carousel

        $('#myCarousel').carousel({
            interval: 3000
          })
          
          $('.carousel .carousel-item').each(function(){
              var minPerSlide = 3;
              var next = $(this).next();
              if (!next.length) {
              next = $(this).siblings(':first');
              }
              next.children(':first-child').clone().appendTo($(this));
              
              for (var i=0;i<minPerSlide;i++) {
                  next=next.next();
                  if (!next.length) {
                      next = $(this).siblings(':first');
                    }
                  
                  next.children(':first-child').clone().appendTo($(this));
                }
          });
          
        
          function getDetails(searchCity) {
            var lowerCity = searchCity.toLowerCase()
            fetch("https://api.teleport.org/api/urban_areas/slug:" + lowerCity + "/")
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                //console.log(data._links["ua:details"].href);
                var detailsOfCity = data._links["ua:details"].href;
          
                getAllInfo(detailsOfCity);
              });
          }
          
         
          
          function getAllInfo(detailsOfCity) {
            fetch(detailsOfCity)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                
                //console.log(data);
          
                dispClimateEl1.textContent = data.categories[2].data[1].label;

                dispClimateEl2.textContent = data.categories[2].data[1].float_value;
          
                dispArtEl1.textContent = data.categories[4].data[1].label;
          
                dispArtEl2.textContent = data.categories[4].data[1].int_value;
          
                dispMuseumEl1.textContent = data.categories[4].data[11].label;
          
                dispMuseumEl2.textContent = data.categories[4].data[11].int_value;
          
                dispHistoryEl1.textContent = data.categories[4].data[9].label;
          
                dispHistoryEl2.textContent = data.categories[4].data[9].int_value;

                dispPopulationEl1.textContent = data.categories[1].data[0].label;
                dispPopulationEl2.textContent = data.categories[1].data[0].float_value;
          
                dispCurrencyEl1.textContent = data.categories[5].data[0].label;
          
                dispCurrencyEl2.textContent = data.categories[5].data[0].string_value;
          
                dispCurrencyRateEl1.textContent = data.categories[5].data[1].label;
          
                dispCurrencyRateEl2.textContent = data.categories[5].data[1].float_value;
          
                dispLanguageEl1.textContent = data.categories[11].data[2].label;
          
                dispLanguageEl2.textContent = data.categories[11].data[2].string_value;
          
                dispLifeEl1.textContent = data.categories[9].data[1].label;
          
                dispLifeEl2.textContent = data.categories[9].data[1].float_value;
          
                dispLifeAgeEl1.textContent = data.categories[9].data[2].label;
          
                dispLifeAgeEl2.textContent = data.categories[9].data[2].float_value;
          
                dispAirEl1.textContent = data.categories[15].label;
          
                dispAirEl2 = data.categories[15].data[2].float_value;
              });
          }

// Set weather initially

weather.fetchWeather("Los Angeles");
window.onload = displayRecentSearches;