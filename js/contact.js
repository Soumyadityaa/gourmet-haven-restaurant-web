/**
 * contact.js - Handles Contact Form Validation and Success Messaging
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');
    
    // Form Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Email validation regex
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Helper to show error
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorDisplay.innerText = message;
        errorDisplay.style.display = 'block';
    };

    // Helper to clear error
    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        errorDisplay.innerText = '';
        errorDisplay.style.display = 'none';
    };

    // Validate entire form
    const validateInputs = () => {
        let isValid = true;
        
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const subjectValue = subjectInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Name Validation
        if (nameValue === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Email Validation
        if (emailValue === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, 'Provide a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Subject Validation
        if (subjectValue === '') {
            showError(subjectInput, 'Subject is required');
            isValid = false;
        } else {
            clearError(subjectInput);
        }

        // Message Validation
        if (messageValue === '') {
            showError(messageInput, 'Message cannot be empty');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    };

    // Handle Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual page reload

        if (validateInputs()) {
            // Simulate an API call or form submission process
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success actions
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                successAlert.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successAlert.classList.remove('active');
                }, 5000);
                
            }, 1500); // 1.5s simulated delay
        }
    });

    // Clear errors on input typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                clearError(input);
            }
        });
    });
});