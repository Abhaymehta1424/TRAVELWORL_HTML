// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const searchBox = document.querySelector('.search-box');
const destinationCards = document.querySelectorAll('.destination-card');
const quotes = document.querySelectorAll('.quote');
const exploreBtn = document.querySelector('.explore-btn');
const showLogin = document.getElementById('showLogin');
const showSignup = document.getElementById('showSignup');
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        searchBox.classList.toggle('active');
    });
}

// Form Toggle
if (showLogin && showSignup) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });
}

// Quote Slider
let currentQuote = 0;
if (quotes.length > 0) {
    quotes[0].classList.add('active');
    
    setInterval(() => {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }, 5000);
}

// Destination Card Click
destinationCards.forEach(card => {
    card.addEventListener('click', () => {
        const destination = card.getAttribute('data-destination');
        window.location.href = `destinations.html?destination=${destination}`;
    });
});

// Explore Button Click
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        window.location.href = 'destinations.html';
    });
}

// Scroll Animation
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('is-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
    
    // Navbar scroll effect
    const nav = document.querySelector('.scrolling-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});