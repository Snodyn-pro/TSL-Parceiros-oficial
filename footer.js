document.addEventListener('DOMContentLoaded', function() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Add delay to each section's items
    footerSections.forEach((section, index) => {
        const items = section.querySelectorAll('li, .social-links');
        items.forEach((item, itemIndex) => {
            item.style.transitionDelay = `${itemIndex * 0.1}s`;
        });
    });

    // Handle section clicks
    footerSections.forEach(section => {
        const title = section.querySelector('h3');
        title.addEventListener('click', () => {
            // Toggle active class
            section.classList.toggle('active');
            
            // Close other sections
            footerSections.forEach(otherSection => {
                if (otherSection !== section && otherSection.classList.contains('active')) {
                    otherSection.classList.remove('active');
                }
            });
        });
    });

    // Open first section by default on desktop
    if (window.innerWidth > 768) {
        footerSections[0].classList.add('active');
    }
}); 