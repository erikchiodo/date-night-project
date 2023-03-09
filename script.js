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

// Function is inputting zipCode (collected from user input) and converting into location (lat and long codes). Passed to getRestaurant function
var convertZipToGeo = function (zipCode) {
  var geoCodeURL =
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Fkey%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8%26libraries%3Dplaces%26callback%3DinitMap%26address%3D" +
    zipCode;
  fetch(geoCodeURL)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        alert("Wrong Zip Code");
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Fetch response Failed");
    })
    .then(function (data) {
      console.log(data);
      var locationLat = data.results[0].geometry.location.lat;
      var locationLong = data.results[0].geometry.location.lng;
      getRestaurants(locationLat, locationLong);
      getTheaters(locationLat, locationLong);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Unable to retrieve lat-long codes");
    });
};

// Function is inputting lat-long code into fetch call to google maps. Passed to displayRestaurants function.
var getRestaurants = function (lat, long) {
  // Add zip code to googleMapsUrl and as parameter for getRestaurants function
  var googleMapsUrl =
    // Need to figure out how to parse location (latLong) variable into lat and long and replace location within below url
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fnearbysearch%2Fjson%3Flocation%3D" +
    lat +
    "%2C" +
    long +
    "%26radius%3D300%26type%3Drestaurant%26key%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";

  fetch(googleMapsUrl)
    .then(function (response) {
      console.log(response);
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

var getTheaters = function (lat, long) {
  // Add zip code to googleMapsUrl and as parameter for getRestaurants function
  var googleMapsUrl =
    // Need to figure out how to parse location (latLong) variable into lat and long and replace location within below url
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fnearbysearch%2Fjson%3Flocation%3D" +
    lat +
    "%2C" +
    long +
    "%26radius%3D300%26type%3Drestaurant%26key%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";

  fetch(googleMapsUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        alert("Error! Check API Get Call");
      }
    })
    .then(function (data) {
      displayTheaters(data);
    });
};

var displayTheaters = function (restaurants) {
  if (restaurants.length == 0) {
    cardUl.textContent = "No Theaters available in your area!";
    return;
  }
};

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