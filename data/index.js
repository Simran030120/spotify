// Create sparkles effect
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.transform = scale(${Math.random()});
    sparkle.style.position = 'absolute';
    sparkle.style.width = '2px';
    sparkle.style.height = '2px';
    sparkle.style.backgroundColor = Math.random() > 0.5 ? '#00ff88' : '#ff00ff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.animation = sparkle ${1 + Math.random() * 2}s linear forwards;
    document.querySelector('.sparkles').appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Create sparkles periodically
setInterval(createSparkle, 50);

// Add sparkle animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1
});

// Observe all cards and sections
document.querySelectorAll('.profile-card, .service-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add hover effect to music icons
document.querySelectorAll('.music-icon').forEach(icon => {
    icon.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.2) rotate(20deg)';
    });

    icon.addEventListener('mouseout', function() {
        this.style.transform = '