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

const searchURL = BASE_URL + "search/movie?" + API_KEY;
const aHighestRated = document.querySelector("#highest_rated");

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fcc651f2e319bf0891036e2b83989afc

const startConf = () => {
  let favMovies = localStorage.getItem("favMovies");

  if (!favMovies) {
    localStorage.setItem("favMovies", JSON.stringify([]));
  } else {
    localStorage.getItem("favMovies");
  }
};

startConf();

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data, numImages = 1) {
  main.innerHTML = "";

  let i = 0;
  while (i < numImages) {
    data.forEach((movie) => {
      const { title, poster_path, overview, vote_average, id } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
    
    <img src="${IMG_URL + poster_path}" alt="${title}" />

    <button id="${id}" class="material-icons"><i class="fa fa-heart"></i></button>

   

    
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>

    `;

      main.appendChild(movieEl);

      let favBtns = document.querySelectorAll(".material-icons");

      favBtns.forEach((fb) => {
        //foreach yaptik cunku addeventlistener dizide calismiyor, bir elementte calisiyor.

        fb.addEventListener("click", addFav);
        /* fb.addEventListener("click", (e) => {
          const clickedBtn = e.path[1];
          const clickedBtnId = e.path[1].id;

          if (fb.id === clickedBtnId) {
            clickedBtn.style.color = "red";
          }
        }); */
      });
    });

    i++;
  }
}

const getColor = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const addFav = (e) => {
  let favBtns = document.querySelectorAll(".material-icons");
  const clickedMovieText = e.path[2].firstElementChild.alt;

  let favMovies = localStorage.getItem("favMovies");
  favMovies = favMovies + clickedMovieText;
  localStorage.setItem("favMovies", favMovies + "/");
};

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
