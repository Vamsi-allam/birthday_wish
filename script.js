// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Envelope click handler
    const envelope = document.getElementById('envelope');
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('mainContent');
    
    envelope.addEventListener('click', function() {
        envelope.classList.add('open');
        
        // Create confetti burst
        setTimeout(() => {
            createConfetti();
        }, 500);
        
        // Hide landing and show main content
        setTimeout(() => {
            landing.classList.add('hidden');
            mainContent.classList.add('visible');
        }, 1500);
    });
    
    // Blow candles functionality
    const blowBtn = document.getElementById('blowBtn');
    const wishMessage = document.getElementById('wishMessage');
    const flames = document.querySelectorAll('.flame');
    
    blowBtn.addEventListener('click', function() {
        // Blow out candles one by one
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add('blown');
            }, index * 200);
        });
        
        // Show wish message and create confetti
        setTimeout(() => {
            blowBtn.classList.add('hidden');
            wishMessage.classList.remove('hidden');
            createConfetti();
            createConfetti();
        }, flames.length * 200 + 500);
    });
    
    // Music toggle
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = '🎵';
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.textContent = '🔊';
        }
        isPlaying = !isPlaying;
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .reason-card, .gallery-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Sparkle effect on mouse move
    let sparkleTimeout;
    document.addEventListener('mousemove', function(e) {
        if (sparkleTimeout) return;
        
        sparkleTimeout = setTimeout(() => {
            sparkleTimeout = null;
        }, 50);
        
        if (Math.random() > 0.8) {
            createSparkle(e.clientX, e.clientY);
        }
    });
});

// Create floating hearts in the background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞'];
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 500);
}

// Create confetti burst
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b95', '#ff8e53', '#ffd93d', '#6bcf63', '#4ecdc4', '#a855f7'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Random shapes
            const shapes = ['circle', 'square', 'rectangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'rectangle') {
                confetti.style.width = '5px';
                confetti.style.height = '15px';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 20);
    }
}

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Easter egg: Konami code for extra confetti
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger massive confetti
        for (let i = 0; i < 5; i++) {
            setTimeout(createConfetti, i * 300);
        }
    }
});

// Touch support for mobile
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Swipe up detection
    if (diff > 50) {
        // Could add swipe up animations here
    }
});

// Preload images for smoother experience
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

preloadImages();

// Console message for developers who peek
console.log('%c💖 Made with love 💖', 'font-size: 20px; color: #ff6b95; font-weight: bold;');
console.log('%cHappy Birthday to your special someone!', 'font-size: 14px; color: #ff8e53;');
