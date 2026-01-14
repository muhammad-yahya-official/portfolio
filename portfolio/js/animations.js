document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.reveal');
    fadeUpElements.forEach(el => observer.observe(el));

    console.log(`Observing ${fadeUpElements.length} elements for fade-up animation`);
});
