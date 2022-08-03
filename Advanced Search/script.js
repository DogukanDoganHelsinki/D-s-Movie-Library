const API_KEY = "api_key=fcc651f2e319bf0891036e2b83989afc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const container = document.querySelector(".container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const filmList = document.querySelector(".filmList");
const searchURL = BASE_URL + "search/movie?" + API_KEY;
const aHighestRated = document.querySelector("#highest_rated");

const changeSlider = () => {
  var slider = document.getElementById("myRange");
  document.querySelector("#demo").textContent = slider.value;
};
document.querySelector("#myRange").addEventListener("change", changeSlider);
const showMovies = (url) => {
  var slider = document.getElementById("myRange");

  search(url, slider.value);
};
getMovies();

document.querySelector("#search_Btn").addEventListener("click", getMovies);

function getMovies() {
  console.log();
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function search(url, sliderVal) {
  filmList.innerHTML = "";

  const listDiv = document.createElement("div");
  listDiv.classList.add("listDiv");

  const dlDiv = document.createElement("div");
  dlDiv.classList.add("dlDiv");

  for (let i = 0; i < url.length; i++) {
    const listTitle = url[i].original_title;
    const vote = url[i].vote_average;

    if (sliderVal < vote) {
      const newDl = document.createElement("dl");
      newDl.classList.add("newDl");

      const newDt = document.createElement("dt");
      newDt.classList.add("newDt");
      newDt.innerHTML = listTitle;

      const newDt2 = document.createElement("dt");
      newDt2.classList.add("newDt");
      newDt2.innerHTML = vote;

      newDl.appendChild(newDt);
      newDl.appendChild(newDt2);
      dlDiv.appendChild(newDl);
      listDiv.appendChild(dlDiv);
      filmList.appendChild(listDiv);
    }
  }
}

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
    location.href = "index.html";
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
