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
    e.preventDefault();

    const isItemEl = e.target.classList.contains('gallery__image');
    if (!isItemEl) {
        return;
    }

    const isModalOpen = document.querySelector('.js-lightbox.is-open');

    if (!isModalOpen) {
        const lightboxEl = document.querySelector('.js-lightbox');
        lightboxEl.classList.add('is-open');

        document.body.addEventListener('keydown', onKeyPressCheck);

        const imgLightboxEl = lightboxEl.querySelector('.lightbox__image');
        imgLightboxEl.src = e.target.dataset.source;
        imgLightboxEl.alt = e.target.alt;

        const btnCloseEl = document.querySelector('[data-action="close-lightbox"]');
        btnCloseEl.addEventListener('click', onCloseModal);
    }
}

function onCloseModal() {
    document.querySelector('.js-lightbox.is-open')?.classList.remove('is-open');
    document.body.removeEventListener('keydown', onKeyPressCheck);

    clearImgBox();
}

function onKeyPressCheck(e) {
    switch (e.code) {
        case "Escape":
            onCloseModal();
            break;
        case "ArrowLeft":
            changeImg(-1);
            break;
        case "ArrowRight":
            changeImg(1);
            break;
        default:
            // console.log();
    }
}

function changeImg(shift) {

    const imgLightboxEl = document.querySelector('.lightbox__image');
    const imgCurrent = images.find((img) => 
                img.original === imgLightboxEl.src
    );
    
    let newIndex = images.indexOf(imgCurrent) + shift;

    if (newIndex < 0)
        newIndex = images.length - 1;
    
    if (newIndex === images.length)
        newIndex = 0;
    
    imgLightboxEl.src = images[newIndex].original;
    imgLightboxEl.alt = images[newIndex].description;
}

function clearImgBox() {
    const imgLightboxEl = document.querySelector('.lightbox__image');
    imgLightboxEl.src = '';
    imgLightboxEl.alt = '';
}