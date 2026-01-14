/**
 * AI Agency - Main JavaScript
 * Dynamic Star Background & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFormHandling();
    initParallax();
    initLanguageDropdown();
});

/**
 * Create animated star background
 */
function initStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 150;
    const numberOfShootingStars = 3;
    
    // Create regular stars
    for (let i = 0; i < numberOfStars; i++) {
        createStar(starsContainer);
    }
    
    // Create shooting stars
    for (let i = 0; i < numberOfShootingStars; i++) {
        createShootingStar(starsContainer, i);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size (1-3px)
    const size = Math.random() * 2 + 1;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Random animation duration (2-6s)
    const duration = Math.random() * 4 + 2;
    
    // Random delay
    const delay = Math.random() * 4;
    
    star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        --opacity: ${opacity};
        --duration: ${duration}s;
        --delay: ${delay}s;
    `;
    
    container.appendChild(star);
}

function createShootingStar(container, index) {
    const star = document.createElement('div');
    star.className = 'star shooting';
    
    // Position at different starting points
    const startX = Math.random() * 30;
    const startY = Math.random() * 30;
    
    star.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        animation-delay: ${index * 5}s;
    `;
    
    container.appendChild(star);
}

/**
 * Header scroll effect
 */
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Language dropdown toggle
 */
function initLanguageDropdown() {
    const langDropdown = document.querySelector('.lang-dropdown');
    const langDropdownBtn = document.getElementById('langDropdownBtn');
    const langDropdownMenu = document.getElementById('langDropdownMenu');
    
    if (!langDropdown || !langDropdownBtn || !langDropdownMenu) return;
    
    // Toggle dropdown on button click
    langDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            langDropdown.classList.remove('active');
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .about-feature, .info-card, .tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Parallax effect for floating cards
 */
function initParallax() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (window.innerWidth < 768) return; // Disable on mobile
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Form handling
 */
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Gönderiliyor...</span>
            <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            .spinner {
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        submitBtn.innerHTML = `
            <span>Mesajınız Gönderildi!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Add floating label effect
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/**
 * Add typing effect for hero title (optional enhancement)
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--color-primary)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.style.borderRight = 'none';
        }
    };
    
    // Start after initial animations
    setTimeout(typeWriter, 1000);
}

/**
 * Counter animation for stats
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                const numericValue = parseInt(value);
                
                if (!isNaN(numericValue)) {
                    animateCounter(target, numericValue, value.includes('%') ? '%' : '+');
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/**
 * Cursor glow effect (optional)
 */
function initCursorGlow() {
    if (window.innerWidth < 768) return;
    
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        glow.style.opacity = '1';
    });
}

// Initialize optional features
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    // Uncomment to enable optional features:
    // initTypingEffect();
    // initCursorGlow();
});
