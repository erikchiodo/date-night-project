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

console.log(cardsUl);
