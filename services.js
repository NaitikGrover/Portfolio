// Add animation to service cards
const serviceCards = document.querySelectorAll('.service-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect
            setTimeout(() => {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

serviceCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(card);
});

// Add hover effect to service icons
serviceCards.forEach(card => {
    const icon = card.querySelector('i');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        icon.style.transform = `translateZ(50px) scale(1.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        icon.style.transform = 'translateZ(0) scale(1)';
    });
});
