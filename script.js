const API_KEY = "77c4e2b070a2e1396500d0b42ebf7cec"
const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const movieList = document.getElementById("movie-list")
const searchInput = document.getElementById("search-input")

async function fetchPopularMovies() {
  const res = await fetch(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=pt-BR`
  )
  const data = await res.json()
  displayMovies(data.results)
}

async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  )
  const data = await res.json()
  displayMovies(data.results)
}

function displayMovies(movies) {
  movieList.innerHTML = ""
  movies.forEach((movie) => {
    const movieCard = document.createElement("div")
    movieCard.classList.add("movie-card")

    movieCard.innerHTML = `
      <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Lançamento: ${movie.release_date}</p>
    `

    movieCard.addEventListener("click", () => {
      localStorage.setItem("selectedMovieId", movie.id)
      window.location.href = "detalhes.html"
    })

    movieList.appendChild(movieCard)
  })
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value
  if (query) {
    searchMovies(query)
  } else {
    fetchPopularMovies()
  }
})

fetchPopularMovies()