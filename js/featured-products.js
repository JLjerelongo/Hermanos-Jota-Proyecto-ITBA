document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselIndicators = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carousel = document.getElementById('products-carousel');
    
    let currentIndex = 0;
    let autoPlayInterval;
    let featuredProducts = [];
    
    function formatPrice(price) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    }
    
    function getImagePath(originalPath) {
        // Remover el "../" del inicio si existe, ya que estamos en index.html en la raíz
        return originalPath.replace('../', '');
    }
    
    function createCarouselItem(product, index) {
        return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="product-card">
                    <img 
                        src="${getImagePath(product.imagen)}" 
                        alt="${product.nombre}"
                        class="product-image"
                        loading="lazy"
                    >
                    <div class="product-info">
                        <h3 class="product-name">${product.nombre}</h3>
                        <p class="product-description">${product.descripcion}</p>
                        <p class="product-price">${formatPrice(product.precio)}</p>
                        <span class="product-badge">Sustentable</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    function createIndicator(index) {
        return `<button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir al producto ${index + 1}"></button>`;
    }
    
    function updateCarousel() {
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
        
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        const itemWidth = 320;
        const gap = 32;
        const containerWidth = carouselTrack.parentElement.offsetWidth;
        const centerOffset = (containerWidth - itemWidth) / 2;
        const translateX = centerOffset - (currentIndex * (itemWidth + gap));
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % featuredProducts.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + featuredProducts.length) % featuredProducts.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function loadFeaturedProducts() {
        loadingElement.classList.add('active');
        
        setTimeout(() => {
            const featuredProductIds = ['aparador-uspallata', 'biblioteca-recoleta', 'butaca-mendoza', 'sillon-copacabana'];
            featuredProducts = productos.filter(product => featuredProductIds.includes(product.id));
            
            let carouselHTML = '';
            let indicatorsHTML = '';
            
            featuredProducts.forEach((product, index) => {
                carouselHTML += createCarouselItem(product, index);
                indicatorsHTML += createIndicator(index);
            });
            
            carouselTrack.innerHTML = carouselHTML;
            carouselIndicators.innerHTML = indicatorsHTML;
            
            setTimeout(() => {
                updateCarousel();
                startAutoPlay();
            }, 100);
            
            loadingElement.classList.remove('active');
            
            const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => goToSlide(index));
            });
            
        }, 1000);
    }
    
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    window.addEventListener('resize', updateCarousel);
    
    loadFeaturedProducts();
});