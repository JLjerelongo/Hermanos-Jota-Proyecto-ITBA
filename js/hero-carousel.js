document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.getElementById('hero-carousel');
    const heroSlides = document.getElementById('hero-slides');
    const heroNavigation = document.getElementById('hero-navigation');
    
    if (!heroCarousel || !heroSlides || !heroNavigation) return;
    
    const slides = heroSlides.querySelectorAll('.hero-slide');
    const navButtons = heroNavigation.querySelectorAll('.hero-nav-btn');
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        navButtons.forEach((button, index) => {
            button.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    heroCarousel.addEventListener('mouseenter', stopAutoPlay);
    heroCarousel.addEventListener('mouseleave', startAutoPlay);
    
    startAutoPlay();
});