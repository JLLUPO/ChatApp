document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const form = document.getElementById('feedback-form');
    const stars = document.querySelectorAll('.star-rating i');
    const memberSelect = document.getElementById('member-select');
    const feedbackText = document.getElementById('feedback-text');
    let currentRating = 0;

    // Initialize functionality
    function initialize() {
        setupStarRating();
        setupFormSubmission();
    }

    // Setup star rating system
    function setupStarRating() {
        stars.forEach(star => {
            // Hover effects
            star.addEventListener('mouseover', () => {
                const rating = parseInt(star.dataset.rating);
                updateStars(rating, 'hover');
            });

            star.addEventListener('mouseout', () => {
                updateStars(currentRating, 'active');
            });

            // Click handling
            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.rating);
                updateStars(currentRating, 'active');
            });
        });
    }

    // Update star display
    function updateStars(rating, state) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            
            // Reset classes
            star.className = 'far fa-star';
            
            if (state === 'hover') {
                if (starRating <= rating) {
                    star.className = 'fas fa-star';
                }
            } else if (state === 'active') {
                if (starRating <= rating) {
                    star.className = 'fas fa-star active';
                }
            }
        });
    }

    // Setup form submission
    function setupFormSubmission() {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate rating
            if (currentRating === 0) {
                alert('Please select a rating');
                return;
            }

            // Get form data
            const feedback = {
                member: memberSelect.value,
                rating: currentRating,
                comment: feedbackText.value,
                timestamp: new Date().toISOString()
            };

            // Log feedback to console
            console.log('Feedback submitted:', feedback);

            // Show success message
            showSuccessMessage();

            // Reset form
            resetForm();
        });
    }

    // Show success message
    function showSuccessMessage() {
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i>Feedback Submitted';
        submitBtn.style.background = '#2ecc71';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }

    // Reset form
    function resetForm() {
        form.reset();
        currentRating = 0;
        updateStars(0, 'active');
    }

    // Initialize
    initialize();
});
