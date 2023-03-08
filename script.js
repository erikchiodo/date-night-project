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

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#searchInput");
const cardUl = document.querySelector("#cardsUl");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var zipCode = searchInput.value;
  // console.log(zipCode);
  if (zipCode) {
    convertZipToGeo(zipCode);
    // getRestaurants(zipCode);
  } else if (zipCode == "") {
    alert("Please submit zip code");
  } else {
    alert("Please re-submit zip code");
  }
});

// Function is inputting zipCode (collected from user input) and converting into location (lat and long codes). Passed to getRestaurant function
var convertZipToGeo = function (zipCode) {
  var geoCodeURL =
    "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8&libraries=places&callback=initMap&address=" +
    zipCode;
  fetch(geoCodeURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Wrong Zip Code");
      }
    })
    .then(function (data) {
      console.log(this);
      const geoLocation = data.location;
      getRestaurants(geoLocation);
    });
};

// Function is inputting lat-long code into fetch call to google maps. Passed to displayRestaurants function.
var getRestaurants = function (latLong) {
  // Add zip code to googleMapsUrl and as parameter for getRestaurants function
  var googleMapsUrl =
    // Need to figure out how to parse location (latLong) variable into lat and long and replace location within below url
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=20&type=restaurant&key=AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";

  fetch(googleMapsUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error! Check API Get Call");
      }
    })
    .then(function (data) {
      displayRestaurants(data);
    });
};

var displayRestaurants = function (restaurants) {
  if (restaurants.length == 0) {
    cardUl.textContent = "No Restaurants available in your area!";
    return;
  }
};
