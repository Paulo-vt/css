document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});

document.addEventListener('click', (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: { x, y },
        colors: ['#ff50bc', '#281c29', '#007BFF', '#ffffff']
    });
});