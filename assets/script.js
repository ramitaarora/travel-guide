


// Navigation/Search Bar

var searchBar = document.querySelector('#search-bar');
var searchButton = document.querySelector('#search-submit');

searchBar.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(event.target.searchTerm.value); // Accessing the city typed in the search bar

    // Searching for hotels with searchTerm.value below
    document.querySelector("#hotels").innerHTML = "";
    getCityID(event.target.searchTerm.value);
})


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
            console.log(data);
            console.log(data.properties[0], data.properties[0].name);

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
            console.log(data);
            console.log(data.data[0].gaiaId);
            getHotels(data.data[0].gaiaId);
        });
};
