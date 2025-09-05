document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('nav-list-open');
        navToggle.classList.toggle('nav-toggle-active');
    });
    
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navList.contains(event.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('nav-list-open');
            navToggle.classList.remove('nav-toggle-active');
        }
    });
});