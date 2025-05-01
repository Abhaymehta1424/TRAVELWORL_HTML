// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll) functionality
    initAOS();
    
    // Add scroll animations to elements
    addScrollAnimations();
    
    // Add hover animations to cards
    addCardHoverEffects();
    
    // Add parallax effect to page banners
    addParallaxEffect();
    
    // Add counter animation to stats
    addCounterAnimation();
    
    // Initialize AOS (Animate on Scroll) functionality
    function initAOS() {
        // Simulate AOS library functionality
        const aosElements = document.querySelectorAll('[data-aos]');
        
        if (aosElements.length > 0) {
            // Create CSS for animations
            const style = document.createElement('style');
            style.textContent = `
                [data-aos] {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                [data-aos].aos-animate {
                    opacity: 1;
                    transform: translateY(0);
                }
                [data-aos="fade-up"] {
                    transform: translateY(50px);
                }
                [data-aos="fade-down"] {
                    transform: translateY(-50px);
                }
                [data-aos="fade-left"] {
                    transform: translateX(50px);
                }
                [data-aos="fade-right"] {
                    transform: translateX(-50px);
                }
                [data-aos="zoom-in"] {
                    transform: scale(0.8);
                }
                [data-aos="flip-left"] {
                    transform: perspective(2500px) rotateY(90deg);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Check if elements are in viewport on scroll
            window.addEventListener('scroll', checkAOSElements);
            
            // Initial check
            setTimeout(checkAOSElements, 100);
        }
    }
    
    // Check if AOS elements are in viewport
    function checkAOSElements() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        aosElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            if (elementTop < windowHeight * 0.85) {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    // Add scroll animations to elements
    function addScrollAnimations() {
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('section');
        
        if (sections.length > 0) {
            sections.forEach(section => {
                if (!section.hasAttribute('data-aos')) {
                    section.setAttribute('data-aos', 'fade-up');
                }
            });
        }
    }
    
    // Add hover animations to cards
    function addCardHoverEffects() {
        // Program cards
        const programCards = document.querySelectorAll('.program-card');
        
        if (programCards.length > 0) {
            programCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.program-image img');
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.program-image img');
                    if (image) {
                        image.style.transform = 'scale(1)';
                    }
                });
            });
        }
        
        // Product cards
        const productCards = document.querySelectorAll('.product-card');
        
        if (productCards.length > 0) {
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.product-image img');
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.product-image img');
                    if (image) {
                        image.style.transform = 'scale(1)';
                    }
                });
            });
        }
        
        // Team member cards
        const teamMembers = document.querySelectorAll('.team-member');
        
        if (teamMembers.length > 0) {
            teamMembers.forEach(member => {
                member.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.member-image img');
                    if (image) {
                        image.style.transform = 'scale(1.1)';
                    }
                    
                    const social = this.querySelector('.member-social');
                    if (social) {
                        social.style.bottom = '0';
                    }
                });
                
                member.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                    
                    const image = this.querySelector('.member-image img');
                    if (image) {
                        image.style.transform = 'scale(1)';
                    }
                    
                    const social = this.querySelector('.member-social');
                    if (social) {
                        social.style.bottom = '-50px';
                    }
                });
            });
        }
        
        // Facility cards
        const facilities = document.querySelectorAll('.facility');
        
        if (facilities.length > 0) {
            facilities.forEach(facility => {
                facility.addEventListener('mouseenter', function() {
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1.1)';
                    }
                    
                    const overlay = this.querySelector('.facility-overlay');
                    if (overlay) {
                        overlay.style.background = 'linear-gradient(transparent, rgba(255, 87, 34, 0.8))';
                    }
                });
                
                facility.addEventListener('mouseleave', function() {
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                    }
                    
                    const overlay = this.querySelector('.facility-overlay');
                    if (overlay) {
                        overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))';
                    }
                });
            });
        }
    }
    
    // Add parallax effect to page banners
    function addParallaxEffect() {
        const pageBanners = document.querySelectorAll('.page-banner');
        
        if (pageBanners.length > 0) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                
                pageBanners.forEach(banner => {
                    banner.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
                });
            });
        }
    }
    
    // Add counter animation to stats
    function addCounterAnimation() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        if (statItems.length > 0) {
            // Create intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const targetValue = parseInt(target.textContent);
                        let currentValue = 0;
                        
                        // Animate counter
                        const interval = setInterval(() => {
                            currentValue += Math.ceil(targetValue / 50);
                            
                            if (currentValue >= targetValue) {
                                target.textContent = targetValue + (target.textContent.includes('+') ? '+' : '');
                                clearInterval(interval);
                            } else {
                                target.textContent = currentValue + (target.textContent.includes('+') ? '+' : '');
                            }
                        }, 30);
                        
                        // Unobserve after animation
                        observer.unobserve(target);
                    }
                });
            }, { threshold: 0.5 });
            
            // Observe stat items
            statItems.forEach(item => {
                observer.observe(item);
            });
        }
    }
});