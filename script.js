// DOM Elements
const navbar = document.querySelector('.glass-nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section-reveal');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close Mobile Menu on Link Click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

sections.forEach(section => {
    revealOnScroll.observe(section);
});

// Smooth Scrolling for Anchors (Polyfill/Enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form — EmailJS Integration
(function () {
    // IMPORTANT: Replace these with your actual IDs from EmailJS
    const PUBLIC_KEY = "s0j0SbbnQ5duzBop-";
    const SERVICE_ID = "service_5rwwhho";
    const TEMPLATE_ID = "template_wro6h0e";

    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Check if keys are set
            if (PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
                status.textContent = '❌ Please configure your EmailJS Public Key in script.js';
                status.className = 'form-status error';
                console.error("EmailJS Public Key not set.");
                return;
            }

            // Change button state to loading
            const originalBtnContent = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Send form using EmailJS
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(() => {
                    // Success feedback
                    btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    status.textContent = '✅ Message sent successfully! I will get back to you soon.';
                    status.className = 'form-status success';
                    form.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalBtnContent;
                        btn.style.background = '';
                        btn.disabled = false;
                        status.textContent = '';
                        status.className = 'form-status';
                    }, 5000);
                }, (error) => {
                    // Error feedback
                    console.error('EmailJS Error Object:', error);
                    const errorMsg = error?.text || error?.message || 'Unknown error';
                    console.error('EmailJS Error Message:', errorMsg);
                    
                    btn.innerHTML = 'Error! <i class="fas fa-exclamation-triangle"></i>';
                    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    status.textContent = `❌ Error: ${errorMsg}. Please check console for details.`;
                    status.className = 'form-status error';
                    btn.disabled = false;

                    setTimeout(() => {
                        btn.innerHTML = originalBtnContent;
                        btn.style.background = '';
                        status.textContent = '';
                        status.className = 'form-status';
                    }, 5000);
                });
        });
    }
})();

// Typewriter Effect
const texts = ["Data Scientist & AI Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        typewriterElement.textContent = letter;
    }

    typeSpeed = 100;
    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before starting next word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("typewriter")) {
        type();
    }
});

// Particle Background Automation
const canvas = document.getElementById('particles-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function initParticles() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        
        const particleCount = Math.floor(width / 20); // Responsive count

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw lines between close particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        initParticles();
    });
}
