document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Navbar scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'linear-gradient(to right, #1e3a8a, #0a1128)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Products filtering system
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const scrollContent = document.querySelector('.scroll-content');

    // Initialize with 'all' category active
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });

    // Filter functionality with animation
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            
            // Animate cards out
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
            });

            // After fade out, update visibility and fade in
            setTimeout(() => {
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hide');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.classList.add('hide');
                    }
                });
            }, 300);

            // Reset scroll animation
            scrollContent.style.animation = 'none';
            scrollContent.offsetHeight; // Trigger reflow
            scrollContent.style.animation = 'scrollProducts 40s linear infinite';
        });
    });

    // Products scroll interaction
    let isScrolling = true;
    let startX, scrollLeft;

    function toggleScroll(pause) {
        scrollContent.style.animationPlayState = pause ? 'paused' : 'running';
        isScrolling = !pause;
    }

    // Touch scroll handling
    scrollContent.addEventListener('touchstart', (e) => {
        toggleScroll(true);
        startX = e.touches[0].pageX - scrollContent.offsetLeft;
        scrollLeft = scrollContent.scrollLeft;
    });

    scrollContent.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - scrollContent.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContent.scrollLeft = scrollLeft - walk;
    });

    scrollContent.addEventListener('touchend', () => {
        startX = null;
        setTimeout(() => toggleScroll(false), 1500);
    });

    // Mouse scroll handling
    scrollContent.addEventListener('mouseenter', () => toggleScroll(true));
    scrollContent.addEventListener('mouseleave', () => toggleScroll(false));

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-hidden');
        observer.observe(section);
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            let isValid = true;
            let firstError = null;

            for (let [key, value] of formData.entries()) {
                const input = this.querySelector(`[name="${key}"]`);
                if (value.trim() === '') {
                    input.classList.add('error');
                    isValid = false;
                    if (!firstError) firstError = input;
                } else {
                    input.classList.remove('error');
                }
            }

            if (!isValid) {
                firstError.focus();
                return;
            }

            // Form submission logic would go here
            console.log('Form submitted successfully');
        });
    }
});