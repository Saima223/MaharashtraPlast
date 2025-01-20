document.addEventListener('DOMContentLoaded', function() {
    // Initialize layout adjustments
    adjustLayout();
    
    // Navbar functionality
    initializeNavbar();
    
    // Product filtering and display
    initializeProducts();

    // Window resize handler
    window.addEventListener('resize', debounce(adjustLayout, 250));
});

function adjustLayout() {
    // Adjust section heights and spacing
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Set minimum height for sections
        section.style.minHeight = section.id === 'home' ? 
            'calc(100vh - 70px)' : 'auto';
        
        // Add consistent padding
        section.style.padding = '80px 0';
        
        // Ensure proper content width
        const container = section.querySelector('.container');
        if (container) {
            container.style.maxWidth = '1200px';
            container.style.margin = '0 auto';
            container.style.padding = '0 20px';
        }
    });

    // Adjust hero section layout
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        if (window.innerWidth <= 768) {
            heroContent.style.flexDirection = 'column';
            heroContent.style.gap = '40px';
        } else {
            heroContent.style.flexDirection = 'row';
            heroContent.style.gap = '60px';
        }
    }

    // Adjust product cards grid
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        if (window.innerWidth <= 768) {
            productsGrid.style.gridTemplateColumns = '1fr';
            productsGrid.style.gap = '20px';
        } else {
            productsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            productsGrid.style.gap = '30px';
        }
    }

    // Adjust contact section layout
    const contactSection = document.querySelector('.contact-section .container');
    if (contactSection) {
        contactSection.style.display = 'grid';
        contactSection.style.gap = '40px';
        if (window.innerWidth <= 768) {
            contactSection.style.gridTemplateColumns = '1fr';
        } else {
            contactSection.style.gridTemplateColumns = '1fr 1fr';
        }
    }
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = navbar.querySelectorAll('.nav-links a');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = navbar.querySelector('.mobile-menu-btn');
    const navMenu = navbar.querySelector('.nav-links');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                navMenu.classList.contains('active'));
        });
    }
}

function initializeProducts() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Initialize all products visible
    filterButtons.forEach(btn => {
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter products with smooth transition
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize product scroll interaction
    const scrollContainer = document.querySelector('.products-scroll');
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
}

// Utility function for debouncing resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}