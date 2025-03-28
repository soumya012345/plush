// // API Key for accessing Pexels API
// const API_KEY = "Xct8AqZZodq7ghMX8CCeaigwJZbEzJHJ30UX9QBimiGm2003TRJm5O7w";

// // Get references to important DOM elements
// const searchInput = document.getElementById("searchInput"); // Search input field
// const resultsContainer = document.getElementById("results"); // Container for search results
// const featuredContainer = document.getElementById("featured"); // Container for featured image
// const favoritesContainer = document.getElementById("favorites"); // Container for favorite images

// // Function to fetch images from Pexels API and display results
// async function searchImages() {
//     const query = searchInput.value.trim(); // Get search query from input
//     if (!query) return alert("Please enter a search term."); // Show alert if query is empty

//     // Fetch images from Pexels API
//     const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=8`, {
//         headers: { Authorization: API_KEY } // Provide API Key for authorization
//     });

//     const data = await response.json(); // Convert response to JSON format

//     // Check if images are found, if not, show an alert
//     if (data.photos.length === 0) return alert("No images found!");

//     displayFeaturedImage(data.photos[0]); // Display the first image as featured
//     displayResults(data.photos.slice(1)); // Display remaining images in the slider
// }

// // Function to display the first search result as a featured image
// function displayFeaturedImage(image) {
//     featuredContainer.innerHTML = `
//         <div class="featured-wrapper">
//             <div class="image-card">
//                 <img src="${image.src.medium}" alt="${image.alt}"> 
//                 <div class="image-info">${image.photographer}</div> 
//                 <button class="wishlist-btn" onclick="toggleFavorite(this, '${image.src.medium}', '${image.alt}', '${image.photographer}')">
//                     <i class="fa fa-heart"></i> 
//                 </button>
//             </div>
//             <button class="explore-btn" onclick="exploreMore()">Explore More</button> 
//         </div>
//     `;
// }

// // Function to handle "Explore More" button click
// function exploreMore() {
//     alert("Explore More clicked! You can extend this to load more images or navigate.");
// }

// // Function to display search results in Splide slider
// function displayResults(images) {
//     resultsContainer.innerHTML = ""; // Clear previous search results

//     images.forEach(photo => {
//         const card = document.createElement("li");  // Splide requires <li> elements for slides
//         card.className = "splide__slide image-card"; // Assign classes for styling

//         // Populate the image card with image, photographer name, and favorite button
//         card.innerHTML = `
//             <img src="${photo.src.medium}" alt="${photo.alt}">
//             <div class="image-info">${photo.photographer}</div>
//             <button class="wishlist-btn" onclick="toggleFavorite(this, '${photo.src.medium}', '${photo.alt}', '${photo.photographer}')">
//                 <i class="fa fa-heart"></i>
//             </button>
//         `;
//         resultsContainer.appendChild(card); // Append image card to results container
//     });

//     // Initialize Splide slider for image results
//     new Splide('#results-splide', {
//         type: 'slide',
//         perPage: 3, // Show 3 images per slide
//         gap: '10px', // Add spacing between slides
//         arrows: true, // Show navigation arrows
//         pagination: false, // Hide pagination dots
//         breakpoints: {
//             768: { perPage: 2 }, // Show 2 images per slide on tablets
//             480: { perPage: 1 }  // Show 1 image per slide on mobile screens
//         }
//     }).mount();
// }

// // Function to toggle favorite (add or remove image from favorites)
// function toggleFavorite(button, imageUrl, altText, photographer) {
//     const isFavorited = button.classList.contains("active"); // Check if image is already favorited

//     if (!isFavorited) {
//         addToFavorites(imageUrl, altText, photographer); // Add image to favorites
//         button.classList.add("active"); // Highlight heart button
//     } else {
//         removeFromFavorites(imageUrl); // Remove image from favorites
//         button.classList.remove("active"); // Unhighlight heart button
//     }
// }

// // Function to add an image to the favorites section
// function addToFavorites(imageUrl, altText, photographer) {
//     // Check if image is already in favorites to prevent duplicates
//     const existingFavorites = favoritesContainer.querySelectorAll("img");
//     for (let img of existingFavorites) {
//         if (img.src === imageUrl) return; // If image already exists, do nothing
//     }

//     // Create a new favorite image card
//     const favCard = document.createElement("div");
//     favCard.className = "image-card"; // Add class for styling

//     // Populate favorite card with image, photographer name, and remove button
//     favCard.innerHTML = `
//         <img src="${imageUrl}" alt="${altText}">
//         <div class="image-info">${photographer}</div>
//         <button class="remove-btn" onclick="removeFromFavorites('${imageUrl}', this)">❌</button>
//     `;

//     favoritesContainer.appendChild(favCard); // Add to favorites container
// }

// // Function to remove an image from the favorites section
// function removeFromFavorites(imageUrl) {
//     const favoriteCards = favoritesContainer.querySelectorAll(".image-card"); // Get all favorite cards

//     // Loop through favorite cards to find and remove the matching image
//     favoriteCards.forEach(card => {
//         const img = card.querySelector("img");
//         if (img.src === imageUrl) {
//             card.remove(); // Remove the image card from favorites
//         }
//     });

//     // Also update the heart button state in the search results
//     const buttons = document.querySelectorAll(".wishlist-btn");
//     buttons.forEach(btn => {
//         const imgElement = btn.parentElement.querySelector("img");
//         if (imgElement.src === imageUrl) {
//             btn.classList.remove("active"); // Unhighlight the heart button
//         }
//     });
// }

// // Function to sort favorites alphabetically (Ascending/Descending order)
// function sortFavorites(order) {
//     let cards = Array.from(favoritesContainer.children); // Convert NodeList to array

//     // Sort favorite cards based on photographer's name
//     cards.sort((a, b) => {
//         let textA = a.querySelector(".image-info").textContent.toLowerCase();
//         let textB = b.querySelector(".image-info").textContent.toLowerCase();

//         return order === 'asc' ? textA.localeCompare(textB) : textB.localeCompare(textA);
//     });

//     favoritesContainer.innerHTML = ""; // Clear existing favorites

//     // Append sorted cards back to the favorites container
//     cards.forEach(card => favoritesContainer.appendChild(card));
// }


// API Key for accessing Pexels API
const API_KEY = "Xct8AqZZodq7ghMX8CCeaigwJZbEzJHJ30UX9QBimiGm2003TRJm5O7w";

// Get references to important DOM elements
const searchInput = document.getElementById("searchInput"); // Search input field
const resultsContainer = document.getElementById("results"); // Container for search results
const featuredContainer = document.getElementById("featured"); // Container for featured image
const favoritesContainer = document.getElementById("favorites"); // Container for favorite images

// Function to fetch images from Pexels API and display results
async function searchImages() {
    const query = searchInput.value.trim(); // Get search query from input
    if (!query) return alert("Please enter a search term."); // Show alert if query is empty

    // Fetch images from Pexels API
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=8`, {
        headers: { Authorization: API_KEY } // Provide API Key for authorization
    });

    const data = await response.json(); // Convert response to JSON format

    // Check if images are found, if not, show an alert
    if (data.photos.length === 0) return alert("No images found!");

    displayFeaturedImage(data.photos[0]); // Display the first image as featured
    displayResults(data.photos.slice(1)); // Display remaining images in the slider
}

// Function to display the first search result as a featured image
function displayFeaturedImage(image) {
    featuredContainer.innerHTML = `
        <div class="featured-wrapper">
            <div class="image-card">
                <img src="${image.src.medium}" alt="${image.alt}"> 
                <div class="image-info">${image.photographer}</div> 
                <button class="wishlist-btn" onclick="toggleFavorite(this, '${image.src.medium}', '${image.alt}', '${image.photographer}')">
                    <i class="fa fa-heart"></i> 
                </button>
            </div>
            <button class="explore-btn" onclick="exploreMore()">Explore More</button> 
        </div>
    `;
}

// Function to handle "Explore More" button click
function exploreMore() {
    alert("Explore More clicked! You can extend this to load more images or navigate.");
}

// Function to display search results in Splide slider
function displayResults(images) {
    resultsContainer.innerHTML = ""; // Clear previous search results

    images.forEach(photo => {
        const card = document.createElement("li");  // Splide requires <li> elements for slides
        card.className = "splide__slide image-card"; // Assign classes for styling

        // Populate the image card with image, photographer name, and favorite button
        card.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}">
            <div class="image-info">${photo.photographer}</div>
            <button class="wishlist-btn" onclick="toggleFavorite(this, '${photo.src.medium}', '${photo.alt}', '${photo.photographer}')">
                <i class="fa fa-heart"></i>
            </button>
        `;
        resultsContainer.appendChild(card); // Append image card to results container
    });

    // Initialize Splide slider for image results
    new Splide('#results-splide', {
        type: 'slide',
        perPage: 3, // Show 3 images per slide
        gap: '10px', // Add spacing between slides
        arrows: true, // Show navigation arrows
        pagination: false, // Hide pagination dots
        breakpoints: {
            768: { perPage: 2 }, // Show 2 images per slide on tablets
            480: { perPage: 1 }  // Show 1 image per slide on mobile screens
        }
    }).mount();
}

// Function to toggle favorite (add or remove image from favorites)
function toggleFavorite(button, imageUrl, altText, photographer) {
    const isFavorited = button.classList.contains("active"); // Check if image is already favorited

    if (!isFavorited) {
        addToFavorites(imageUrl, altText, photographer); // Add image to favorites
        button.classList.add("active"); // Highlight heart button
    } else {
        removeFromFavorites(imageUrl); // Remove image from favorites
        button.classList.remove("active"); // Unhighlight heart button
    }
}

// Function to add an image to the favorites section
function addToFavorites(imageUrl, altText, photographer) {
    // Check if image is already in favorites to prevent duplicates
    const existingFavorites = favoritesContainer.querySelectorAll("img");
    for (let img of existingFavorites) {
        if (img.src === imageUrl) return; // If image already exists, do nothing
    }

    // Create a new favorite image card
    const favCard = document.createElement("div");
    favCard.className = "image-card"; // Add class for styling

    // Populate favorite card with image, photographer name, and remove button
    favCard.innerHTML = `
        <img src="${imageUrl}" alt="${altText}">
        <div class="image-info">${photographer}</div>
        <button class="remove-btn" onclick="removeFromFavorites('${imageUrl}')">❌</button>
    `;

    favoritesContainer.appendChild(favCard); // Add to favorites container
}

// Function to remove an image from the favorites section
function removeFromFavorites(imageUrl) {
    const favoriteCards = favoritesContainer.querySelectorAll(".image-card"); // Get all favorite cards

    // Loop through favorite cards to find and remove the matching image
    favoriteCards.forEach(card => {
        const img = card.querySelector("img");
        if (img.src === imageUrl) {
            card.remove(); // Remove the image card from favorites
        }
    });

    // Also update the heart button state in the search results
    const buttons = document.querySelectorAll(".wishlist-btn");
    buttons.forEach(btn => {
        const imgElement = btn.parentElement.querySelector("img");
        if (imgElement.src === imageUrl) {
            btn.classList.remove("active"); // Unhighlight the heart button
        }
    });
}

// Variable to track sorting order (default: ascending)
let isAscending = true;

// Function to sort favorites alphabetically (toggle Ascending/Descending)
function sortFavorites() {
    let cards = Array.from(favoritesContainer.children); // Convert NodeList to array

    if (cards.length === 0) return; // If no favorites, exit function

    // Sort favorite cards based on photographer's name
    cards.sort((a, b) => {
        let textA = a.querySelector(".image-info").textContent.toLowerCase();
        let textB = b.querySelector(".image-info").textContent.toLowerCase();

        return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });

    // Clear existing favorites
    favoritesContainer.innerHTML = "";

    // Append sorted cards back to the favorites container
    cards.forEach(card => favoritesContainer.appendChild(card));

    // Toggle sorting order for next click
    isAscending = !isAscending;

    // Update button text to reflect sorting order
    document.querySelector(".filter-btn").textContent = isAscending ? "Sort ⬆" : "Sort ⬇";
}
