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

const deleteFavList = (e) => {
  const buttonLine = e.path[1];

  let favMovies = localStorage.getItem("favMovies");
  const firstTwo = favMovies.substring(2);
  let favArray = firstTwo.split("/");
  favArray.pop();
  uniqueArray = favArray.filter((c, index) => {
    return favArray.indexOf(c) === index;
  });

  buttonLine.remove();

  let texts = e.path[2].innerText;
  const newTextsArray = texts.split("\nRemove\n");
  const string = JSON.stringify(newTextsArray);
  const editedText = string.slice(0, -10);
  const concatText = editedText.concat('"');
  console.log(concatText);
};

const addFavList = () => {
  let favMovies = localStorage.getItem("favMovies");
  const firstTwo = favMovies.substring(2);
  let favArray = firstTwo.split("/");
  favArray.pop();

  uniqueArray = favArray.filter((c, index) => {
    return favArray.indexOf(c) === index;
  });

  const listDiv = document.createElement("div");
  listDiv.classList.add("listDiv");

  const listTitleDiv = document.createElement("div");
  listTitleDiv.classList.add("listTitleDiv");

  const listTitle = document.createElement("h3");
  listTitle.textContent = "Your Favourite List";

  listTitleDiv.appendChild(listTitle);

  const dlDiv = document.createElement("div");
  dlDiv.classList.add("dlDiv");

  uniqueArray.forEach((element) => {
    const newDl = document.createElement("dl");
    newDl.classList.add("newDl");
    newDl.id = Math.random().toFixed(10).toString().slice(2);

    const newDt = document.createElement("dt");
    newDt.classList.add("newDt");
    newDt.innerHTML = element;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.id = Math.random().toFixed(10).toString().slice(2);
    deleteBtn.innerHTML = "Remove";
    deleteBtn.addEventListener("click", deleteFavList);

    newDl.appendChild(newDt);
    newDl.appendChild(deleteBtn);
    dlDiv.appendChild(newDl);
  });

  listDiv.appendChild(listTitleDiv);
  listDiv.appendChild(dlDiv);

  listContainer.appendChild(listDiv);
};

addFavList();

const eventListeners = () => {
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const searchURL = BASE_URL + "/search/movie?" + API_KEY;
    const search = document.getElementById("search");
    let searchValue = search.value;

    if (searchValue && searchValue !== "") {
      getMovies(searchURL + "&query=" + searchValue);
      searchValue = "";
    } else {
      window.location.reload();
    }
  });
  document.querySelector("#highest_rated").addEventListener("click", (e) => {
    location.href = "../Categories/Highest%20Rated/index.html";
  });
  document
    .querySelector("#popular_kid_movies")
    .addEventListener("click", (e) => {
      location.href = "../Categories/Popular%20Kid%20Movies/index.html";
    });
  document.querySelector("#dramas").addEventListener("click", (e) => {
    location.href = "../Categories/Dramas/index.html";
  });
  document.querySelector("#sci-fi").addEventListener("click", (e) => {
    location.href = "../Categories/Sci-Fi/index.html";
  });
  document.querySelector("#advanced_search").addEventListener("click", (e) => {
    location.href = "../Advanced Search/index.html";
  });
  document
    .querySelector("#my_favourite_list")
    .addEventListener("click", (e) => {
      location.href = "../My Fav List/index.html";
    });
  document.querySelector("#home").addEventListener("click", (e) => {
    location.href = "../index.html";
  });
  document.querySelector(".back_btn").addEventListener("click", (e) => {
    window.history.back();
  });
};

eventListeners();
