document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const scrollContent = document.querySelector('.scroll-content');

    // Initialize with 'all' category active
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });

            // Restart animation after filtering
            scrollContent.style.animation = 'none';
            scrollContent.offsetHeight; // Trigger reflow
            scrollContent.style.animation = 'scrollProducts 40s linear infinite';
        });
    });

    // Touch and mouse interaction
    let isScrolling = true;

    // Function to toggle scroll animation
    function toggleScroll(pause) {
        scrollContent.style.animationPlayState = pause ? 'paused' : 'running';
        isScrolling = !pause;
    }

    // Mouse events
    scrollContent.addEventListener('mouseenter', () => toggleScroll(true));
    scrollContent.addEventListener('mouseleave', () => toggleScroll(false));

    // Touch events
    scrollContent.addEventListener('touchstart', () => toggleScroll(true));
    scrollContent.addEventListener('touchend', () => toggleScroll(false));

    // Product details modal functionality
    const modal = document.getElementById('specs-modal');
    const closeModal = document.querySelector('.close-modal');
    const specsContent = document.querySelector('.specs-content');

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-product');
            showProductDetails(productId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});