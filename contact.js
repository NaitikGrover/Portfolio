// Initialize phone input
let phoneInput;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the international telephone input
    const phoneInputField = document.querySelector("#phone");
    phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
        separateDialCode: true,
        initialCountry: "in",
        preferredCountries: ["in", "us", "gb", "ca", "au"],
        formatOnDisplay: true,
        autoPlaceholder: "aggressive",
        customContainer: "phone-input-container",
        dropdownContainer: document.body
    });

    // Add validation on blur
    phoneInputField.addEventListener('blur', function() {
        if (phoneInputField.value.trim()) {
            if (phoneInput.isValidNumber()) {
                phoneInputField.classList.remove('error');
            } else {
                phoneInputField.classList.add('error');
            }
        }
    });
});

// Initialize phone input with custom settings
phoneInputField = document.querySelector("#phone");
window.phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "in", // Set India as default
    separateDialCode: true,
    preferredCountries: ["in", "us", "gb", "ca", "au"],
    formatOnDisplay: true,
    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return "Enter your phone number";
    },
    dropdownContainer: document.body,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

// Hide flag by default and show on focus
const flagContainer = phoneInputField.parentElement.querySelector('.iti__flag-container');
const phoneGroup = phoneInputField.closest('.form-group');
flagContainer.style.display = 'none';

phoneInputField.addEventListener('focus', function() {
    flagContainer.style.display = 'block';
    phoneGroup.classList.add('focused');
    phoneInputField.classList.add('iti__flag-shown');
});

phoneInputField.addEventListener('blur', function() {
    if (!phoneInputField.value) {
        flagContainer.style.display = 'none';
        phoneGroup.classList.remove('focused');
        phoneInputField.classList.remove('iti__flag-shown');
    }
});

// Handle label animation for phone input
phoneInputField.addEventListener('focus', function() {
    this.closest('.form-group').classList.add('iti--focus');
});

phoneInputField.addEventListener('blur', function() {
    const formGroup = this.closest('.form-group');
    if (this.value) {
        formGroup.classList.add('iti--filled');
    } else {
        formGroup.classList.remove('iti--filled');
    }
    formGroup.classList.remove('iti--focus');
});

// Check initial state
if (phoneInputField.value) {
    phoneInputField.closest('.form-group').classList.add('iti--filled');
}

// Add input event listener to handle styling when input has value
phoneInputField.addEventListener('input', function() {
    if (this.value) {
        this.classList.add('iti__has-value');
    } else {
        this.classList.remove('iti__has-value');
    }
});

// Update placeholder text with better formatting
phoneInputField.placeholder = "Enter phone number";

// Format the input value for better readability
phoneInputField.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 0) {
        // Add proper spacing for better readability
        value = value.match(/.{1,4}/g).join(' ');
        this.value = value;
    }
});

// Update label position when country is selected
phoneInput.promise.then(function() {
    phoneInput.addEventListener('countrychange', function() {
        phoneGroup.classList.add('focused');
        phoneInputField.classList.add('iti__flag-shown');
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Add floating label effect
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    if (input) {
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });

        // Check if input has value on page load
        if (input.value) {
            group.classList.add('focused');
        }
    }
});

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate phone number first
    const phoneInput = document.querySelector('#phone');
    if (!window.phoneInput.isValidNumber()) {
        alert('Please enter a valid phone number.');
        phoneInput.focus();
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: window.phoneInput.getNumber(), // Get formatted number with country code
        phoneCountry: window.phoneInput.getSelectedCountryData().name,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your server
    // For demonstration, we'll just show a success message
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    try {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        
        // Reset form styles
        formGroups.forEach(group => group.classList.remove('focused'));
        
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
