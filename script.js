const cardsUl = document.getElementById("cardsUl");

function showCardsUl() {
  cardsUl.classList.remove("hidden");
  cardsUl.classList.add("block");
}

function hideCardsUl() {
  cardsUl.classList.add("hidden");
  cardsUl.classList.remove("block");
}

showCardsUl();

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#search-btn");
const cardUl = document.querySelector("#cardsUl");

searchBtn.onclick = function () {
  const zipCode = searchInput.value;
  if (zipCode) {
    convertZipToGeo(zipCode);
    // getRestaurants(zipCode);
  }
};

var convertZipToGeo = function(zipCode) {
  var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8&libraries=places&callback=initMap&address=" + zipCode

  fetch(geoCodeURL).then(function(response)) {
    if (response.ok) {
      response.json().then(function(data) {
        
      }
    }
  }
}


var getRestaurants = function (zipCode) {
  // Add zip code to googleMapsUrl and as parameter for getRestaurants function
  var googleMapsUrl =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8&libraries=places&callback=initMap&address=06853";

  fetch(googleMapsUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRestaurants(data);
      });
    } else {
      alert("Error! Check API Get Call");
    }
  });
};

var displayRestaurants(restaurants) {
  if (restaurants.length == 0) {
    cardUl.textContent = "No Restaurants available in your area!"
      return;
  }
}
