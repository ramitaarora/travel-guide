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

searchBar.addEventListener('submit', function (event) {
    event.preventDefault();
    //console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar
    var searchCity = event.target.searchTerm.value;

    // Searching for hotels with searchTerm.value below
    document.querySelector("#hotels").innerHTML = "";
    getCityID(event.target.searchTerm.value);

    getCityUrlShawn(searchCity);
    getWikiData(searchCity)
    
    // Searching for hotels with searchTerm.value below
    document.querySelector("#hotels").innerHTML = "";
    getCityID(event.target.searchTerm.value);

    // Searching for restaurants via yelp
    getRestaurants(event.target.searchTerm.value);

    // Setting header
    if (searchCity) {
        cityHeader.setAttribute("class", "hidden");
        getCityURL(searchCity);
}
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
        //console.log(cityURL)
        getCity(cityURL);
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
            // document.querySelector("#hotels").innerHTML = "";
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
    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + searchTerm + '&term=restaurants&sort_by=rating&limit=5', {
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
            var displayLength = 5

            for (i = 0; i < displayLength; i++) {
                var yelpName = document.createElement("p");
                var yelpRating = document.createElement("p");
                var yelpPhone = document.createElement("p");
                var yelpPhoto = document.createElement("img")
                var name = data.businesses[i].name;
                var rating = data.businesses[i].rating;
                var phone = data.businesses[i].display_phone;
                var photos = data.businesses[i].image_url;
                var icon = document.createElement("i");

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
                document.querySelector("#hotels").append(yelpPhoto, yelpName, yelpRating, yelpPhone);
            };
        });
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

function getWikiData(searchCity) {
fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search="+ searchCity).then(function(resp) {
            console.log(resp);
            return resp.json()
        }).then(function(data) {
            console.log(data);
            var wikiId = data[3][0]
            console.log(wikiId)
            

         
            
            
            var iFrame = document.createElement("iframe");
            iFrame.setAttribute("src",wikiId);
            iFrame.setAttribute("width",'100%');
            
            
            var divEl = document.querySelector("#article");
            divEl.append(iFrame)
            getWikiHeader(wikiId)

        })}



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
        
