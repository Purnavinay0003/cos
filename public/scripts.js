// Menu Toggle
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');
let section = document.querySelector('section');

menuToggle.onclick = function () {
    header.classList.toggle('active');
    section.classList.toggle('active');
};

// Slideshow
const slides = document.querySelectorAll('.slide');
let counter = 0;

// Position slides horizontally
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

// Go to previous slide
const goPrev = () => {
    counter--;
    if (counter < 0) {
        counter = slides.length - 1; // Loop back to last slide
    }
    slideImg();
};

// Go to next slide
const goNext = () => {
    counter++;
    if (counter >= slides.length) {
        counter = 0; // Loop back to first slide
    }
    slideImg();
};

// Slide images
const slideImg = () => {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

// Automatic Slideshow
setInterval(() => {
    goNext();
}, 3000); // Change slide every 3 seconds

// Brand Carousel
const brands = document.querySelector('.brands');
const rightButton = document.querySelector('.right-btn');
let scrollPosition = 0;
let autoScrollInterval;

// Start automatic scrolling
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        const containerWidth = brands.parentElement.offsetWidth;
        const contentWidth = brands.scrollWidth;

        // If end is reached, reset position
        if (Math.abs(scrollPosition) >= contentWidth - containerWidth) {
            scrollPosition = 0;
        } else {
            scrollPosition -= 2; // Scroll left by 2px
        }

        brands.style.transform = `translateX(${scrollPosition}px)`;
    }, 20);
}

// Handle right button click
function scrollRight() {
    const containerWidth = brands.parentElement.offsetWidth;

    // Stop auto-scrolling temporarily
    clearInterval(autoScrollInterval);

    // Scroll right by one container width
    scrollPosition -= containerWidth / 2;

    // Check if scroll position exceeds limits
    const contentWidth = brands.scrollWidth;
    if (Math.abs(scrollPosition) >= contentWidth - containerWidth) {
        scrollPosition = 0; // Reset to the beginning
    }

    brands.style.transform = `translateX(${scrollPosition}px)`;

    // Restart auto-scroll after a delay
    setTimeout(startAutoScroll, 2000);
}

// Attach click event listener to the right button
rightButton.addEventListener('click', scrollRight);

// Pause auto-scroll on hover
brands.parentElement.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));

// Resume auto-scroll on mouse leave
brands.parentElement.addEventListener('mouseleave', startAutoScroll);

// Start automatic scrolling when the page loads
startAutoScroll();
