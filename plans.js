// Add hover effect to plan cards
const planCards = document.querySelectorAll('.plan-card');

planCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        planCards.forEach(c => c.style.opacity = '0.7');
        card.style.opacity = '1';
    });

    card.addEventListener('mouseout', () => {
        planCards.forEach(c => c.style.opacity = '1');
    });
});

// Plan selection handler
const planButtons = document.querySelectorAll('.plan-button');

planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const plan = e.target.closest('.plan-card').querySelector('h3').textContent;
        const contactForm = document.querySelector('#contact form');
        const serviceSelect = contactForm.querySelector('#service');
        
        // Smooth scroll to contact form
        contactForm.scrollIntoView({ behavior: 'smooth' });
        
        // Add plan info to message
        const messageArea = contactForm.querySelector('#message');
        messageArea.value = `I'm interested in the ${plan} plan. Please provide more information.`;
        
        // Trigger label animation
        messageArea.dispatchEvent(new Event('focus'));
    });
});
