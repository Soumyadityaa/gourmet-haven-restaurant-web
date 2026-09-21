/**
 * gallery.js - Handles Gallery Category Filtering and Modal Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // ==========================================
    // Category Filtering Logic
    // ==========================================
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Show or hide items based on filter
                if (filterValue === 'All' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Small timeout to allow display:block to apply before animating opacity
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Wait for animation to finish before hiding
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // Lightbox Modal Logic
    // ==========================================
    
    // Open Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
            const imgAlt = item.querySelector('.gallery-img').getAttribute('alt');
            
            // Set image and caption
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
            
            // Show modal
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Clear src after closing to prevent old image flash on next open
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 300);
    };

    // Close on click (X button)
    lightboxClose.addEventListener('click', closeLightbox);

    // Close on click outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});