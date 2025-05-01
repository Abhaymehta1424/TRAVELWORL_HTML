// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.classList.add('mobile-nav');
                
                // Clone nav links and auth buttons
                const navLinksClone = navLinks.cloneNode(true);
                const authButtonsClone = authButtons.cloneNode(true);
                
                mobileNav.appendChild(navLinksClone);
                mobileNav.appendChild(authButtonsClone);
                
                document.body.appendChild(mobileNav);
            }
            
            // Toggle mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            if (this.classList.contains('active')) {
                mobileNav.style.display = 'flex';
                setTimeout(() => {
                    mobileNav.style.transform = 'translateX(0)';
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                mobileNav.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    mobileNav.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        let currentSlide = 0;
        const slideWidth = testimonialSlides[0].clientWidth;
        
        // Hide all slides except the first one
        for (let i = 1; i < testimonialSlides.length; i++) {
            testimonialSlides[i].style.display = 'none';
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                testimonialSlides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                testimonialSlides[currentSlide].style.display = 'block';
                testimonialSlides[currentSlide].style.animation = 'fadeIn 0.5s forwards';
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                testimonialSlides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                testimonialSlides[currentSlide].style.display = 'block';
                testimonialSlides[currentSlide].style.animation = 'fadeIn 0.5s forwards';
            });
        }
        
        // Auto slide
        setInterval(function() {
            if (nextBtn) {
                nextBtn.click();
            }
        }, 5000);
    }
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    if (togglePasswordBtns) {
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            });
        });
    }
    
    // Form Validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const contactForm = document.getElementById('contactForm');
    
    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate login success
            showAlert('Login successful! Redirecting...', 'success');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // Register Form Validation
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            if (!terms) {
                showAlert('Please agree to the Terms & Conditions', 'error');
                return;
            }
            
            // Simulate registration success
            showAlert('Registration successful! Redirecting...', 'success');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission success
            showAlert('Your message has been sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Product Filtering (Accessories Page)
    const filterButton = document.getElementById('filterButton');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchAccessories');
    
    if (filterButton && productCards.length > 0) {
        filterButton.addEventListener('click', function() {
            const categoryFilter = document.getElementById('categoryFilter').value;
            const priceFilter = document.getElementById('priceFilter').value;
            const searchTerm = searchInput.value.toLowerCase();
            
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const price = card.getAttribute('data-price');
                const productName = card.querySelector('h3').textContent.toLowerCase();
                
                let showCard = true;
                
                // Category filter
                if (categoryFilter !== 'all' && category !== categoryFilter) {
                    showCard = false;
                }
                
                // Price filter
                if (priceFilter !== 'all' && price !== priceFilter) {
                    showCard = false;
                }
                
                // Search filter
                if (searchTerm && !productName.includes(searchTerm)) {
                    showCard = false;
                }
                
                // Show or hide card
                if (showCard) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Search on input change
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterButton.click();
            });
        }
    }
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Show success message
                showAlert(`${productName} added to cart!`, 'success');
                
                // Update cart count (simulated)
                updateCartCount();
            });
        });
    }
    
    // Pagination (Accessories Page)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                if (!this.classList.contains('next')) {
                    this.classList.add('active');
                }
                
                // Simulate page change (in a real app, this would load new products)
                window.scrollTo({
                    top: document.querySelector('.accessories-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                showAlert('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription success
            showAlert('Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(message, type) {
        // Create alert element if it doesn't exist
        if (!document.querySelector('.alert-container')) {
            const alertContainer = document.createElement('div');
            alertContainer.classList.add('alert-container');
            document.body.appendChild(alertContainer);
        }
        
        const alertContainer = document.querySelector('.alert-container');
        
        // Create alert
        const alert = document.createElement('div');
        alert.classList.add('alert', `alert-${type}`);
        alert.textContent = message;
        
        // Add alert to container
        alertContainer.appendChild(alert);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }
    
    function updateCartCount() {
        // Create cart icon if it doesn't exist
        if (!document.querySelector('.cart-icon')) {
            const cartIcon = document.createElement('div');
            cartIcon.classList.add('cart-icon');
            cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i><span class="cart-count">0</span>';
            
            // Add cart icon to header
            const authButtons = document.querySelector('.auth-buttons');
            if (authButtons) {
                authButtons.parentNode.insertBefore(cartIcon, authButtons);
            }
        }
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
        }
    }
});