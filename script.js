// Smooth scrolling for navigation links
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

// Form handling
const form = document.getElementById('partnershipForm');
const formStatus = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            business: document.getElementById('business').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            products: document.getElementById('products').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Basic validation
        if (!formData.name || !formData.business || !formData.email || !formData.message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // TODO: Replace this with your actual form submission endpoint
            // Options include:
            // 1. Formspree (https://formspree.io/)
            // 2. Netlify Forms (if you move to Netlify)
            // 3. EmailJS (https://www.emailjs.com/)
            // 4. Web3Forms (https://web3forms.com/)
            // 5. Custom backend API

            // For now, we'll simulate a submission
            // Uncomment and configure one of the following when ready:

            /*
            // Example with Formspree:
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }
            */

            /*
            // Example with Web3Forms:
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'YOUR_ACCESS_KEY',
                    ...formData
                })
            });

            const result = await response.json();
            if (!result.success) {
                throw new Error('Form submission failed');
            }
            */

            // Temporary solution: Log to console and show message
            console.log('Form submission data:', formData);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            showStatus('Thank you for your interest! We will contact you within 1-2 business days. (Note: Form backend needs to be configured for actual email delivery)', 'success');
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('Sorry, there was an error submitting your form. Please try again or contact us directly.', 'error');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Add active state to navigation on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow to navbar on scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }

    lastScrollTop = scrollTop;
});

// Highlight current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// Add animation on scroll for service cards and highlights
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .highlight, .benefit');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});
