// API Key for accessing Pexels API
const API_KEY = "Xct8AqZZodq7ghMX8CCeaigwJZbEzJHJ30UX9QBimiGm2003TRJm5O7w";

// Get references to important DOM elements
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const featuredContainer = document.getElementById("featured");
const favoritesContainer = document.getElementById("favorites");

// Function to fetch trending images on page load
async function fetchTrendingImages() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6`, {
            headers: { Authorization: API_KEY }
        });
        const data = await response.json();

        if (data.photos.length > 0) {
            displayFeaturedImage(data.photos[0]);
            displayResults(data.photos.slice(1));
        }
    } catch (error) {
        console.error("Error fetching trending images:", error);
    }
}

// Function to search images
async function searchImages() {
    const query = searchInput.value.trim();
    if (!query) return alert("Please enter a search term.");

    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=8`, {
            headers: { Authorization: API_KEY }
        });
        const data = await response.json();

        if (data.photos.length === 0) return alert("No images found!");

        displayFeaturedImage(data.photos[0]);
        displayResults(data.photos.slice(1));
    } catch (error) {
        console.error("Error searching images:", error);
    }
}

// Function to display a featured image
function displayFeaturedImage(image) {
    featuredContainer.innerHTML = `
        <div class="featured-wrapper">
            <div class="image-card">
                <img src="${image.src.medium}" alt="${image.alt}" class="fixed-image">
                <div class="image-info">${image.photographer}</div>
                <button class="wishlist-btn" onclick="toggleFavorite(this, '${image.src.medium}', '${image.alt}', '${image.photographer}')">
                    <i class="fa fa-heart"></i>
                </button>
            </div>
            <button class="explore-btn" onclick="exploreMore('${image.photographer_url}')">Explore More</button>
        </div>
    `;
}

// Function to display images in the slider
function displayResults(images) {
    resultsContainer.innerHTML = "";

    images.forEach(photo => {
        const card = document.createElement("li");
        card.className = "splide__slide image-card";

        card.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="fixed-image">
            <div class="image-info">${photo.photographer}</div>
            <button class="wishlist-btn" onclick="toggleFavorite(this, '${photo.src.medium}', '${photo.alt}', '${photo.photographer}')">
                <i class="fa fa-heart"></i>
            </button>
        `;
        resultsContainer.appendChild(card);
    });

    new Splide('#results-splide', {
        type: 'slide',
        perPage: 5,
        gap: '10px',
        arrows: true,
        pagination: false,
        breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 }
        }
    }).mount();
}

// Function to toggle favorite (add or remove)
function toggleFavorite(button, imageUrl, altText, photographer) {
    const isFavorited = button.classList.contains("active");

    if (!isFavorited) {
        addToFavorites(imageUrl, altText, photographer);
        button.classList.add("active");
    } else {
        removeFromFavorites(imageUrl);
        button.classList.remove("active");
    }
}

// Function to add an image to favorites
function addToFavorites(imageUrl, altText, photographer) {
    const favCard = document.createElement("div");
    favCard.className = "image-card";

    favCard.innerHTML = `
        <img src="${imageUrl}" alt="${altText}" class="fixed-image">
        <div class="image-info">${photographer}</div>
        <button class="wishlist-btn active" onclick="removeFromFavorites('${imageUrl}', this)">
            <i class="fa fa-heart"></i>
        </button>
    `;

    favoritesContainer.appendChild(favCard);
}

// Function to remove an image from favorites
function removeFromFavorites(imageUrl, button) {
    const favoriteCards = favoritesContainer.querySelectorAll(".image-card");

    favoriteCards.forEach(card => {
        const img = card.querySelector("img");
        if (img.src === imageUrl) {
            card.remove();
        }
    });

    // Remove active state from wishlist buttons
    const buttons = document.querySelectorAll(".wishlist-btn");
    buttons.forEach(btn => {
        const imgElement = btn.parentElement.querySelector("img");
        if (imgElement.src === imageUrl) {
            btn.classList.remove("active");
        }
    });
}

// Function to open the photographer's profile
function exploreMore(photographerUrl) {
    if (photographerUrl) {
        window.open(photographerUrl, "_blank");
    } else {
        alert("Photographer's profile not available.");
    }
}

// Sort function for favorites
let isAscending = true;
function sortFavorites() {
    let cards = Array.from(favoritesContainer.children);
    if (cards.length === 0) return;

    cards.sort((a, b) => {
        let textA = a.querySelector(".image-info").textContent.toLowerCase();
        let textB = b.querySelector(".image-info").textContent.toLowerCase();
        return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });

    favoritesContainer.innerHTML = "";
    cards.forEach(card => favoritesContainer.appendChild(card));

    isAscending = !isAscending;
    document.querySelector(".filter-btn").textContent = isAscending ? "Sort ⬆" : "Sort ⬇";
}

// Load initial content
window.onload = function () {
    fetchTrendingImages(); // Load trending images on page load
};
