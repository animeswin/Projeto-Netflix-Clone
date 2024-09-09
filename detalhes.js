const API_KEY = "77c4e2b070a2e1396500d0b42ebf7cec"
const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const movieDetails = document.getElementById("movie-details")

async function fetchMovieDetails(movieId) {
  try {
    const res = await fetch(
      `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
    )
    if (!res.ok) throw new Error("Erro ao buscar detalhes do filme")
    const movie = await res.json()
    displayMovieDetails(movie)
  } catch (error) {
    movieDetails.innerHTML = "<p>Erro ao carregar detalhes do filme.</p>"
    console.error(error)
  }
}

function displayMovieDetails(movie) {
  movieDetails.innerHTML = `
    <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
    <h2>${movie.title}</h2>
    <p><strong>Lançamento:</strong> ${movie.release_date}</p>
    <p><strong>Sinopse:</strong> ${movie.overview}</p>
    <p><strong>Nota:</strong> ${movie.vote_average} / 10</p>
    <div class="clear"></div>
  `
  createButtons(movie);
}

function createButtons(movie) {
  const backButton = document.createElement("button")
  backButton.textContent = "Voltar"
  backButton.id = "back-button"
  backButton.addEventListener("click", () => {
    window.history.back()
  })

  const detailsButton = document.createElement("button")
  detailsButton.textContent = "Detalhes"
  detailsButton.id = "details-button"

  const additionalDetails = document.createElement("div")
  additionalDetails.id = "additional-details"
  additionalDetails.style.display = "none"

  detailsButton.addEventListener("click", () => {
    if (additionalDetails.style.display === "none") {
      displayAdditionalDetails(movie, additionalDetails)
      additionalDetails.style.display = "block"
      detailsButton.textContent = "Ocultar Detalhes"
    } else {
      additionalDetails.style.display = "none"
      detailsButton.textContent = "Detalhes"
    }
  })

  movieDetails.appendChild(backButton)
  movieDetails.appendChild(detailsButton)
  movieDetails.appendChild(additionalDetails)
}

function displayAdditionalDetails(movie, container) {
  container.innerHTML = `
    <p><strong>Gêneros:</strong> ${movie.genres
      .map((genre) => genre.name)
      .join(", ")}</p>
    <p><strong>Duração:</strong> ${movie.runtime} minutos</p>
    <p><strong>Idioma:</strong> ${movie.original_language.toUpperCase()}</p>
    <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
    <p><strong>Orçamento:</strong> $${movie.budget.toLocaleString()}</p>
    <p><strong>Receita:</strong> $${movie.revenue.toLocaleString()}</p>
  `
}

const selectedMovieId = localStorage.getItem("selectedMovieId")
if (selectedMovieId) {
  fetchMovieDetails(selectedMovieId)
} else {
  movieDetails.innerHTML = "<p>Filme não encontrado.</p>"
}