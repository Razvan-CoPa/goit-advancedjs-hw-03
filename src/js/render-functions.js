import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let lightbox = null;

export const renderGallery = (images, galleryElement) => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="image-info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join("");

  galleryElement.innerHTML += markup; // Append to existing content

  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
  lightbox.refresh();
};

export const showLoadingIndicator = (buttonElement) => {
  buttonElement.textContent = "Loading...";
  buttonElement.disabled = true;
};

export const hideLoadingIndicator = (buttonElement) => {
  buttonElement.textContent = "Search";
  buttonElement.disabled = false;
};

export const showErrorMessage = (message) => {
  iziToast.error({
    title: "Error",
    message: message,
    position: "topRight",
  });
};