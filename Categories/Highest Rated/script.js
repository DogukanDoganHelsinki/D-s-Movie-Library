const API_KEY = "api_key=fcc651f2e319bf0891036e2b83989afc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const container = document.querySelector(".container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = BASE_URL + "search/movie?" + API_KEY;

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fcc651f2e319bf0891036e2b83989afc

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data, numImages = 5) {
  main.innerHTML = "";

  let i = 0;
  while (i < numImages) {
    data.forEach((movie) => {
      const { title, poster_path, overview, vote_average } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
    
    <img src="${IMG_URL + poster_path}" alt="${title}" />

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
    });
    i++;
  }
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});
