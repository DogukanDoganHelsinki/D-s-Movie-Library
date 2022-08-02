const API_KEY = "api_key=fcc651f2e319bf0891036e2b83989afc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const container = document.querySelector(".container");
const listContainer = document.querySelector(".listContainer");
const main = document.getElementById("main");
const searchURL = BASE_URL + "search/movie?" + API_KEY;
const aHighestRated = document.querySelector("#highest_rated");

const startConf = () => {
  let favMovies = localStorage.getItem("favMovies");

  if (!favMovies) {
    localStorage.setItem("favMovies", JSON.stringify([]));
  } else {
    localStorage.getItem("favMovies");
  }
};

startConf();

const favList = () => {
  let favMovies = localStorage.getItem("favMovies");
  const firstTwo = favMovies.substring(2);
  const favArray = firstTwo.split("/");

  const listDiv = document.createElement("div");
  listDiv.classList.add("listDiv");

  const listTitleDiv = document.createElement("div");
  listTitleDiv.classList.add("listTitleDiv");

  const listTitle = document.createElement("h3");
  listTitle.textContent = "Your Favourite List";

  listTitleDiv.appendChild(listTitle);

  const myULDiv = document.createElement("div");
  myULDiv.classList.add("myULDiv");

  const myUL = document.createElement("ul");
  myUL.classList.add("myUL");

  const myLI = document.createElement("li");
  myLI.classList.add("myLI");
  favArray.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.classList.add("newLi");
    newLi.innerHTML = element;
    myLI.appendChild(newLi);
  });

  myUL.appendChild(myLI);
  myULDiv.appendChild(myUL);

  listDiv.appendChild(listTitleDiv);
  listDiv.appendChild(myULDiv);

  listContainer.appendChild(listDiv);
};

favList();

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const search = document.getElementById("search");
  let searchValue = search.value;

  if (searchValue && searchValue !== "") {
    getMovies(searchURL + "&query=" + searchValue);
    searchValue = "";
  } else {
    window.location.reload();
  }
});

const eventListeners = () => {
  document.querySelector("#highest_rated").addEventListener("click", (e) => {
    location.href =
      "http://127.0.0.1:5500/Categories/Highest%20Rated/index.html";
  });
  document
    .querySelector("#popular_kid_movies")
    .addEventListener("click", (e) => {
      location.href =
        "http://127.0.0.1:5500/Categories/Popular%20Kid%20Movies/index.html";
    });
  document.querySelector("#dramas").addEventListener("click", (e) => {
    location.href = "http://127.0.0.1:5500/Categories/Dramas/index.html";
  });
  document.querySelector("#sci-fi").addEventListener("click", (e) => {
    // location.href = "http://127.0.0.1:5500/Categories/Sci-Fi/index.html";
    //BUNU SOR, 2 KERE ATLAYINCA BU PROBLEMI NASIL COZECEGIZ?
    location.href = "Categories/Sci-Fi/index.html";
  });
};

eventListeners();
