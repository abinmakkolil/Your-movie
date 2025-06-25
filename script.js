// JavaScript to fetch movie data from OMDb API
// script.js

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const movieTitle = document.getElementById('movieTitle').value;
    const resultContainer = document.getElementById('result');
    const errorMessage = document.getElementById('errorMessage');

    // Your provided API Key (ensure it's activated)
    const apiKey = '78af7462'; 
    
    // IMPORTANT: The URL must use "https://"
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
    
    // Clear previous results and errors
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    errorMessage.textContent = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const imdbRating = data.Ratings.find(rating => rating.Source === 'Internet Movie Database');
                
                const movieHTML = `
                    <div class="movie-card">
                        <div class="movie-poster">
                            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/200x300.png?text=No+Image'}" alt="${data.Title} Poster">
                        </div>
                        <div class="movie-details">
                            <h2 class="movie-title">${data.Title}</h2>
                            <p class="movie-meta">
                                <span>${data.Year}</span> &bull; 
                                <span>${data.Rated}</span> &bull; 
                                <span>${data.Runtime}</span>
                            </p>
                            <p class="movie-plot">${data.Plot}</p>
                            ${imdbRating ? `
                            <div class="movie-rating">
                                <span class="movie-rating-value">${imdbRating.Value}</span>
                                <span class="movie-rating-source">IMDb Rating</span>
                            </div>
                            ` : '<p>IMDb Rating not available.</p>'}
                        </div>
                    </div>
                `;
                resultContainer.innerHTML = movieHTML;
                resultContainer.style.display = 'block';
            } else {
                // This will now correctly show "Movie not found!" instead of "Invalid API key!"
                errorMessage.textContent = data.Error || 'Movie not found!';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        });
});
