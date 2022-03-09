const gal = document.querySelector('.gallery__inner');


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomGallery() {
    const srcs = [
        [1, 4],
        [2, 5],
        [3, 5],
        [4, 4],
        [5, 5],
        [6, 5],
        [7, 5],
        [8, 5],
        [9, 5],
        [10, 4],
        [11, 4],
        [12, 3],
        [13, 3],
        [14, 5],
        [15, 4]
    ];
    shuffle(srcs);
    srcs.forEach((item, i) => {
        if (i === 0 || (i === 1 && document.body.clientWidth > 956)) {
            gal.insertAdjacentHTML("beforeend", '<div style="height: 26px;"></div>');
        }
        const img = `<img src="assets/img/galery/galery${item[0]}.jpg" alt="Gallery Louvre" class="gallery__item gallery__item-r${item[1]}">`;
        gal.insertAdjacentHTML("beforeend", img);
    });
}
randomGallery();
const sliderImages = document.querySelectorAll('.gallery__item'); 
function checkSlide() {
    sliderImages.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.offsetHeight/2;
        const imageBottom = image.offsetTop + image.offsetHeight + image.offsetParent.offsetTop;
        const isHalfShown = slideInAt > (image.offsetTop+image.offsetParent.offsetTop);
        const isNotScrolPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolPast) {
            image.classList.add('gallery__item-active');
        } else {
            image.classList.remove('gallery__item-active');
        }
    });
}
window.addEventListener('scroll', checkSlide);
checkSlide();

