// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// User Data (simulated database)
let users = JSON.parse(localStorage.getItem('travelWorldUsers')) || [
    { name: 'Admin User', email: 'admin@travelworld.com', password: 'admin123' }
];

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting to home page...');
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
}

// Signup Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if user already exists
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alert('User with this email already exists!');
            return;
        }
        
        // Create new user
        const newUser = { name, email, password };
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('travelWorldUsers', JSON.stringify(users));
        
        // Store current user in session and redirect
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        alert('Account created successfully! Redirecting to home page...');
        window.location.href = 'home.html';
    });
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'home.html';
    }
    
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
});