const API_KEY = ""; // Replace with your valid API key
const BASE_URL = "https://pixabay.com/api/";

export const fetchImages = async (query, page = 1, perPage = 100) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
