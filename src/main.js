
import "/src/css/style.css";
import { fetchImages } from "/src/js/pixabay-api";
import {
  renderGallery,
  showLoadingIndicator,
  hideLoadingIndicator,
  showErrorMessage,
} from "/src/js/render-functions";

let currentPage = 1; // Tracking current page
let query = ""; // Store the search query

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Gallery</h1>
    <div class="card">
      <input 
        type="text" 
        id="search-input" 
        placeholder="Search images..." 
        class="search-input"
      />
      <button class="btn" id="search-btn">Search</button>
    </div>
    <ul id="gallery-container" class="gallery"></ul>
    <button class="btn load-more" id="load-more-btn" style="display: none;">Load More</button>
  </div>
`;

// DOM Elements
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const galleryContainer = document.querySelector("#gallery-container");
const loadMoreBtn = document.querySelector("#load-more-btn");

const fetchAndRenderImages = async (isLoadMore = false) => {
  if (!query) return;

  if (!isLoadMore) {
    galleryContainer.innerHTML = ""; // Clear gallery for a new search
    currentPage = 1; // Reset page number
  }

  showLoadingIndicator(searchBtn);
  loadMoreBtn.style.display = "none";

  try {
    const data = await fetchImages(query, currentPage, 30);
    if (data.hits.length === 0 && !isLoadMore) {
      showErrorMessage("Sorry, no images found. Please try again.");
      galleryContainer.innerHTML = ""; // Clear gallery
    } else {
      renderGallery(data.hits, galleryContainer);
      if (data.hits.length > 0) {
        loadMoreBtn.style.display = "block"; // Show Load More button
      }
    }
  } catch (error) {
    showErrorMessage("An error occurred while fetching images.");
  } finally {
    hideLoadingIndicator(searchBtn);
    currentPage++; // Increment page
  }
};

// Event Listeners
searchBtn.addEventListener("click", () => {
  query = searchInput.value.trim();
  if (!query) {
    showErrorMessage("Please enter a search term!");
    return;
  }
  fetchAndRenderImages();
});

loadMoreBtn.addEventListener("click", () => {
  fetchAndRenderImages(true);
});


