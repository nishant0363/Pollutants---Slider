document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pollutant = urlParams.get('pollutant');
    if (pollutant) {
        loadImages(pollutant);
    }
});

function loadImages(pollutant) {
    const slidesContainer = document.getElementById('slides-container');
    const sliderTicksContainer = document.getElementById('slider-ticks-container');
    const sliderRange = document.getElementById('sliderRange');
    const totalSlides = 13; // Adjust this if you have a different number of images

    for (let i = 1; i <= totalSlides; i++) {
        const img = document.createElement('img');
        img.src = `images/${pollutant}/image${i}.png`;
        img.alt = `Image ${i}`;
        slidesContainer.appendChild(img);
    }

    sliderRange.max = totalSlides - 1;

    for (let i = 0; i < totalSlides; i++) {
        const tick = document.createElement('div');
        tick.classList.add('slider-tick');
        sliderTicksContainer.appendChild(tick);
    }

    sliderRange.addEventListener('input', () => {
        const index = sliderRange.value;
        const offset = -index * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
    });
}

let currentSlide = 0;

function moveSlides(step) {
    const slidesContainer = document.getElementById('slides-container');
    const sliderRange = document.getElementById('sliderRange');
    const totalSlides = slidesContainer.children.length;

    currentSlide += step;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    const offset = -currentSlide * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    sliderRange.value = currentSlide;
}
