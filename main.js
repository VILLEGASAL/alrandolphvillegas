document.addEventListener('DOMContentLoaded', () => {
    
    // --- BANNER SLIDESHOW LOGIC ---
    const banner = document.querySelector('.cover-banner');
    
    const images = [
        'batman.jpg', 
        'venom.jpg', 
        'spiderman.jpg',
        'joker.jpg'
    ];
    
    let currentIndex = 0;

    if (banner) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            banner.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 500); 
    }
});