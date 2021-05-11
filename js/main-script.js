import images from './data/gallery-items.js'

const galleryUl = document.querySelector('.js-gallery');
const imgsMarkup = createImageCardsMarkup(images);

galleryUl.insertAdjacentHTML('beforeend', imgsMarkup);

galleryUl.addEventListener('click', onImgCardClick);

function createImageCardsMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a> 
        </li>`;
    }).join('');
}

function onImgCardClick(e) {
    // e.preventDefault();

    const isItemEl = e.target.classList.contains('gallery__image');
    // if (!isItemEl) {
    //     return;
    // }
    console.log(e.target);
}