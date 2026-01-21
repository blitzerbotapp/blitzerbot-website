// ============================================
// BLITZERBOT WEBSITE JAVASCRIPT
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate counters when they come into view
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.dataset.target);
                statNumber.dataset.animated = 'true';
                animateCounter(statNumber, target);
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach(el => {
    observer.observe(el);
});

// Fallback: Animate counters immediately - works on mobile too
function initCounters() {
    document.querySelectorAll('.stat-number').forEach(statEl => {
        if (!statEl.dataset.animated) {
            const target = parseInt(statEl.dataset.target);
            if (target > 0) {
                statEl.dataset.animated = 'true';
                animateCounter(statEl, target);
            }
        }
    });
}

// Try multiple times to ensure it works on mobile
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    setTimeout(initCounters, 300);
    setTimeout(initCounters, 1000);
});

// Also try on window load (for slow connections)
window.addEventListener('load', () => {
    initCounters();
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animation to sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// ============================================
// DEVICE DETECTION & SMART DOWNLOAD
// ============================================

function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // iOS Detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    // Android Detection
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    // Default: show both or detect from other signals
    return 'unknown';
}

function getStoreUrl(device) {
    const appStoreUrl = 'https://apps.apple.com/app/blitzerbot';
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.blitzerbot';
    
    switch(device) {
        case 'ios':
            return appStoreUrl;
        case 'android':
            return playStoreUrl;
        default:
            // Fallback: scroll to download section or show both
            return '#download';
    }
}

// Smart Download Button Handler
function setupSmartDownloadButtons() {
    const device = detectDevice();
    
    // Header Download Button
    const headerDownloadBtn = document.querySelector('.smart-download-btn');
    if (headerDownloadBtn) {
        headerDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = getStoreUrl(device);
            
            if (url.startsWith('http')) {
                // Direct redirect to store
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                // Scroll to download section
                const target = document.querySelector(url);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // Footer Download Link
    const footerDownloadLink = document.querySelector('a[href="#download"]');
    if (footerDownloadLink && footerDownloadLink.closest('footer')) {
        footerDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            const url = getStoreUrl(device);
            
            if (url.startsWith('http')) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                const target = document.querySelector(url);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // Optional: Highlight relevant store button based on device
    if (device === 'ios') {
        const iosButtons = document.querySelectorAll('.app-store-badge');
        iosButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.05)';
        });
        const androidButtons = document.querySelectorAll('.play-store-badge');
        androidButtons.forEach(btn => {
            btn.style.opacity = '0.7';
        });
    } else if (device === 'android') {
        const androidButtons = document.querySelectorAll('.play-store-badge');
        androidButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.05)';
        });
        const iosButtons = document.querySelectorAll('.app-store-badge');
        iosButtons.forEach(btn => {
            btn.style.opacity = '0.7';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Setup smart download buttons
    setupSmartDownloadButtons();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});
