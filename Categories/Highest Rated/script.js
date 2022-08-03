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

const API_KEY = "api_key=fcc651f2e319bf0891036e2b83989afc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data, numImages = 1) {
  const main = document.getElementById("main");
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
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
  const clickedMovieText = e.path[2].firstElementChild.alt;

  let favMovies = localStorage.getItem("favMovies");
  favMovies = favMovies + clickedMovieText;
  localStorage.setItem("favMovies", favMovies + "/");
  toastr.success(
    "You have successfully added the movie to your favorite list.",
    "The Movie has added"
  );
};

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
    location.href = "../Highest Rated/index.html";
  });
  document
    .querySelector("#popular_kid_movies")
    .addEventListener("click", (e) => {
      location.href = "../Popular Kid Movies/index.html";
    });
  document.querySelector("#dramas").addEventListener("click", (e) => {
    location.href = "../Dramas/index.html";
  });
  document.querySelector("#sci-fi").addEventListener("click", (e) => {
    // location.href = "http://127.0.0.1:5500/Categories/Sci-Fi/index.html";
    //BUNU SOR, 2 KERE ATLAYINCA BU PROBLEMI NASIL COZECEGIZ?
    location.href = "../Sci-Fi/index.html";
  });
  document.querySelector("#advanced_search").addEventListener("click", (e) => {
    location.href = "../../Advanced Search/index.html";
  });
  document
    .querySelector("#my_favourite_list")
    .addEventListener("click", (e) => {
      location.href = "../../My Fav List/index.html";
    });
  document.querySelector("#home").addEventListener("click", (e) => {
    location.href = "../../index.html";
  });
  document.querySelector(".back_btn").addEventListener("click", (e) => {
    window.history.back();
  });
};

eventListeners();
