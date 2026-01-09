/* ============================================
   OMix New Modern Design - main.js
   Interactive animations and functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page loads or after 2 seconds max
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            preloader.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        initAnimations();
    }
    
    // Hide preloader on window load
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 1000);
    });
    
    // Fallback: hide preloader after 2 seconds even if load event doesn't fire
    setTimeout(hidePreloader, 2000);

    // ===== Custom Cursor =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .nav-link, .btn-modern');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.opacity = '0.2';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.opacity = '0.5';
            });
        });
    }

    // ===== Mobile Navigation =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    // Create overlay
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    body.appendChild(navOverlay);
    
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    navOverlay.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== Back to Top Button =====
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Counter Animation =====
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.closest('.stat-card').dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // ===== Scroll Reveal Animations =====
    function initAnimations() {
        // Reveal cards on scroll
        const revealCards = document.querySelectorAll('.reveal-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay * 200);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        revealCards.forEach(card => revealObserver.observe(card));
        
        // Counter animation trigger
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }
    }

    // ===== Testimonial Slider =====
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card-new');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = 1;
        
        // Update cards per view based on screen size
        function updateCardsPerView() {
            if (window.innerWidth >= 992) {
                cardsPerView = 3;
            } else if (window.innerWidth >= 768) {
                cardsPerView = 2;
            } else {
                cardsPerView = 1;
            }
        }
        
        function updateSlider() {
            const cardWidth = testimonialCards[0].offsetWidth + 32; // including gap
            testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function nextSlide() {
            const maxIndex = Math.max(0, testimonialCards.length - cardsPerView);
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateSlider();
        }
        
        function prevSlide() {
            const maxIndex = Math.max(0, testimonialCards.length - cardsPerView);
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateSlider();
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto slide
        let autoSlide = setInterval(nextSlide, 5000);
        
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
        testimonialTrack.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        // Update on resize
        window.addEventListener('resize', () => {
            updateCardsPerView();
            updateSlider();
        });
        
        updateCardsPerView();
    }

    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Parallax Effect on Hero Shapes =====
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== Tilt Effect on Feature Cards =====
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const btn = this.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                btn.style.background = '#22c55e';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    this.reset();
                }, 3000);
            }
        });
    }

    // ===== Floating Cards Animation Enhancement =====
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // ===== Image Lazy Loading =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== GSAP Animations (if GSAP is loaded) =====
    // DISABLED - causing visibility issues. Using CSS animations instead.
    /*
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        gsap.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.5
        });
        
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.7
        });
        
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.9
        });
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 1.1
        });
        
        gsap.from('.hero-visual', {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            delay: 0.8
        });
        
        // Stats animation
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.1
        });
        
        // About cards animation
        gsap.from('.about-card-new', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.2
        });
        
        // Feature cards animation
        gsap.from('.feature-card-new', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15
        });
        
        // Blog cards animation
        gsap.from('.blog-card-new', {
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15
        });
    }
    */

    // ===== Simple CSS-based reveal on scroll =====
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about-card-new, .feature-card-new, .blog-card-new, .stat-card, .testimonial-card-new');
        
        elements.forEach(el => {
            // Remove any inline styles that might be hiding the element
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    }
    
    // Run immediately and on load
    revealOnScroll();
    window.addEventListener('load', revealOnScroll);

    // ===== Particles Effect (Simple version without library) =====
    const particlesBg = document.getElementById('particles-js');
    
    if (particlesBg) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${Math.random() > 0.5 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesBg.appendChild(particle);
        }
        
        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== Active Navigation Link =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (link.getAttribute('href') === 'index.html' && current === 'hero')) {
                link.classList.add('active');
            }
        });
    });

    // ===== Touch Swipe for Testimonials =====
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (testimonialTrack) {
        testimonialTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (diff > swipeThreshold) {
                // Swipe left - next
                document.querySelector('.next-btn').click();
            } else if (diff < -swipeThreshold) {
                // Swipe right - previous
                document.querySelector('.prev-btn').click();
            }
        }
    }

    // ===== Console Easter Egg =====
    console.log('%c🌿 OMix - Delivering Purity & Health', 'color: #22c55e; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with love by Team Aanchal', 'color: #f97316; font-size: 12px;');

});

// ===== Loading Animation on Page Change =====
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-leaving');
});
