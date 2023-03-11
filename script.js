// const FANDANGO_API_KEY = "AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8" awaiting activation or need to find replacment api;
const GOOGLE_API_KEY = "AIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";
const cardsUl = document.getElementById("cardsUl");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

let lat, lon;
let zipCode = null;



const summary = {
  movieName: "",
  movieRating: "",
  movieCast: "",
  theatreName: "",
  theatreAddress: "",
  theatreRating: "",
  restaurantName: "",
  restaurantAddress: "",
  restaurantPhoneNumber: "",
};
//dummy info for testing
const movies = [
  {
    placeName: "Los Angeles",
    movieName: "The Dark Knight",
    popularity: 90,
    rating: 8.4,
    runtime: 152,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genre: ["Action", "Crime", "Drama"],
  },
  {
    placeName: "New York",
    movieName: "The Godfather",
    popularity: 85,
    rating: 9.2,
    runtime: 175,
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    genre: ["Crime", "Drama"],
  },
  {
    placeName: "London",
    movieName: "Inception",
    popularity: 80,
    rating: 8.8,
    runtime: 148,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    placeName: "Paris",
    movieName: "Amélie",
    popularity: 70,
    rating: 8.3,
    runtime: 122,
    cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"],
    genre: ["Comedy", "Romance"],
  },
  {
    placeName: "Tokyo",
    movieName: "Spirited Away",
    popularity: 75,
    rating: 8.6,
    runtime: 125,
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    genre: ["Animation", "Adventure", "Family"],
  },
];



function showCardsUl() {
  cardsUl.classList.remove("hidden");
  cardsUl.classList.add("block");
}

function hideCardsUl() {
  cardsUl.classList.add("hidden");
  cardsUl.classList.remove("block");
}


function createSelectButton() {
  const selectButton = document.createElement("button");
  selectButton.classList.add(
    "border",
    "px-4",
    "py-2",
    "mt-3",
    "text-lg",
    "cursor-pointer",
    "rounded-md",
    
    "ease-in",
    "duration-100",
   
    "text-white"
  );
  selectButton.innerText = "Select";
  return selectButton;
}


// Function is inputting zipCode (collected from user input) and converting into location (lat and long codes)
async function convertZipToGeo(zipCode) {
  const geoCodeURL =
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Fkey%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8%26libraries%3Dplaces%26callback%3DinitMap%26address%3D" +
    zipCode;
  let lat, lon;
  try {
    var res = await fetch(geoCodeURL);
    var data = await res.json();
    lat = data.results[0].geometry.location.lat;
    lon = data.results[0].geometry.location.lng;
  } catch (error) {
    console.log("Error while converting zip to lat&lon");
    console.error(error);
  }
  return { lat, lon };
}
async function handleFormSubmit(event) {
  event.preventDefault();
  document.querySelector("#gmap").style.display = "block";
  zipCode = searchInput.value;
  let geoData = await convertZipToGeo(zipCode);
  lat = geoData.lat;
  lon = geoData.lon;
  searchInput.value = "";
  fetchAndShowMovies();
}


//fetching 
// loop through movies and create card element for each movie
function fetchAndShowMovies() {
  cardsUl.innerHTML =
    "<h2 class='text-center my-4 font-bold text-2xl basis-full'>Select a Movie</h2>";
  movies.forEach((movie) => {
    cardsUl.append(createMovieCard(movie));
  });
  showCardsUl();
}

// loop through theatres and create card element for each theatre
async function fetchAndShowTheatres() {
  hideCardsUl();
  cardsUl.innerHTML =
    "<h2 class='text-center my-4 font-bold text-2xl basis-full'>Select a theatre</h2>";

  const gMapURL =
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fnearbysearch%2Fjson%3Flocation%3D" +
    lat +
    "%2C" +
    lon +
    "%26radius%3D5000%26type%3Dmovie_theater%26key%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";
  
    let theatresFromMap = [];
  try {
    const res = await fetch(gMapURL);
    const data = await res.json();
    if (data.status === "OK") {
      for (let i = 0; i < data.results.length; i++) {
        const t = data.results[i];
        const theaterObj = {
          name: t.name,
          address1: t.vicinity,
          address2: (""),
          postalCode: zipCode,
          types: t.types,
          rating: t.rating || 0,
          totalUserRating: t.user_ratings_total || 0,
        };
        theatresFromMap.push(theaterObj);
      }
    }
  } catch (error) {
    console.log("Error while fetching theatres");
    console.error(error);
  }

  theatresFromMap.forEach((theatre) => {
    cardsUl.append(createTheatreCard(theatre));
  });
  showCardsUl();
}

// loop through restaurants and create card element for each restaurant
async function fetchAndShowRestaurants() {
  hideCardsUl();
  cardsUl.innerHTML =
    "<h2 class='text-center my-4 font-bold text-2xl basis-full'>Select a Restaurant</h2>";
  const gMapURL =
    "https://corsproxy.io/?https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fplace%2Fnearbysearch%2Fjson%3Flocation%3D" +
    lat +
    "%2C" +
    lon +
    "%26radius%3D5000%26type%3Drestaurant%26key%3DAIzaSyCmdB_Ov1gxNFIiPerrkI8HQZ3j018SxF8";
  const restaurantsFromMap = [];
  try {
    const res = await fetch(gMapURL);
    const data = await res.json();
    if (data.status === "OK") {
      for (let i = 0; i < data.results.length; i++) {
        const t = data.results[i];
        const restaurantObj = {
          name: t.name,
          address:
            ("") +
            "\n" +
            t.vicinity,
          rating: t.rating || 0,
          totalUserRating: t.user_ratings_total || 0,
          types: t.types,
        };
        restaurantsFromMap.push(restaurantObj);
      }
    }
  } catch (error) {
    console.log("Error while fetching restaurants");
    console.error(error);
  }
  restaurantsFromMap.forEach((restaurant) => {
    cardsUl.append(createRestaurantCard(restaurant));
  });
  showCardsUl();
}
//append elemnets to HTML
// create HTML for movie card
function createMovieCard(movie) {
  const li = document.createElement("li");
  li.classList.add(
    "movie-card",
    "p-4",
    "border",
    "rounded-md",
    "basis-[350px]",
    "grow"
  );
  li.innerHTML = `<p class="text-sm">Place Name: ${movie.placeName}</p>
  <h3 class="mb-3 font-bold mt-2 text-xl">${movie.movieName}</h3>
  <p>Popularity: ${movie.popularity}</p>
  <p>Rating: ${movie.rating}</p>
  <p>Runtime: ${movie.runtime}</p>
  <p>Cast: ${movie.cast.join(", ")}</p>
  <p>Genre: ${movie.genre.join(", ")}</p>`;
  const selectButton = createSelectButton();
  selectButton.addEventListener("click", async () => {
    summary.movieName = movie.movieName;
    summary.movieCast = movie.cast.join(", ");
    summary.movieRating = movie.rating;
    await fetchAndShowTheatres();
  });
  li.append(selectButton);
  return li;
}

// create HTML elements for theatre card
function createTheatreCard(theatre) {
  const li = document.createElement("li");
  li.classList.add(
    "theatre-card",
    "p-4",
    "border",
    "rounded-md",
    "basis-[350px]",
    "grow"
  );
  li.innerHTML = `<h3 class="mb-3 mt-2 font-bold text-xl">${theatre.name}</h3>
  <p>Address 1: ${theatre.address1}</p>
  <p>Address 2: ${theatre.address2}</p>
  <p>Postal Code: ${theatre.postalCode}</p>
  <p>Rating: ${theatre.rating}</p>
  <p>Total User Ratings: ${theatre.totalUserRating}</p>`;
  const selectButton = createSelectButton();
  selectButton.addEventListener("click", async () => {
    summary.theatreAddress = theatre.address1 + "\n" + theatre.address2;
    summary.theatreName = theatre.name;
    summary.theatreRating = theatre.rating;
    await fetchAndShowRestaurants();
  });
  li.append(selectButton);
  return li;
}

// creates HTML element for restaurant card
function createRestaurantCard(restaurant) {
  const li = document.createElement("li");
  li.classList.add(
    "restaurant-card",
    "p-4",
    "border",
    "rounded-md",
    "basis-[350px]",
    "grow"
  );
  li.innerHTML = `<h3 class="mb-3 mt-2 font-bold text-xl">${
    restaurant.name
  }</h3>
  <p>Address: ${restaurant.address}</p>
  <p>Total User Rating: ${restaurant.totalUserRating}</p>
  <p>Rating: ${restaurant.rating}</p>
  <p>Types: ${restaurant.types.join(", ")}</p>`;
  const selectButton = createSelectButton();
  selectButton.addEventListener("click", () => {
    summary.restaurantAddress = restaurant.address;
    summary.restaurantName = restaurant.name;
    summary.restaurantRating = restaurant.rating;
    showSummary();
  });
  li.append(selectButton);
  return li;
}

// clear cardUl innerhtml and show the summary
function showSummary() {
  hideCardsUl();
  cardsUl.innerHTML = "";
  const li = document.createElement("li");
  li.classList.add(
    "summary-card",
    "p-4",
    "border",
    "rounded-md",
    "basis-[350px]",
    "grow"
  );
  li.innerHTML = `<h3 class="text-3xl mt-2 mb-3">Summary</h3>
  <p class="text-sm mt-2 font-bold">Movie Info</p>
  <p>${summary.movieName}</p>
  <p>${summary.movieCast}</p>
  <p>Rating: ${summary.movieRating}</p>
  <hr class="max-w-1/2 my-2">
  <p class="text-sm mt-2 font-bold">Theatre Info</p>
  <p>${summary.theatreName}</p>
  <p>${summary.theatreAddress}</p>
  <p>Rating: ${summary.rating}</p>
  <hr class="max-w-1/2 my-2">
  <p class="text-sm mt-2 font-bold">Restaurant Info</p>
  <p>${summary.restaurantName}</p>
  <p>${summary.restaurantAddress}</p>
  <p>Rating: ${summary.restaurantRating}</p>`;
  cardsUl.append(li);
  showCardsUl();
}


searchForm.addEventListener("submit", handleFormSubmit);
