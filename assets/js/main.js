// DigitalFlow - Enhanced Main JavaScript File
// Apple-inspired dual-mode theme system with advanced animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initThemeSystem();
    initTypewriter();
    initScrollAnimations();
    initCounterAnimations();
    initFloatingCTA();
    initNavbarScroll();
    initServiceCards();
    initPortfolioEffects();
    initEnhancedInteractions();
    
    // Theme System Management
    function initThemeSystem() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        updateThemeToggleIcon(currentTheme);
        
        // Theme toggle functionality
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                // Animate theme switch
                animateThemeSwitch(newTheme);
                
                // Update theme
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeToggleIcon(newTheme);
                
                // Dispatch theme change event
                window.dispatchEvent(new CustomEvent('themeChanged', {
                    detail: { theme: newTheme }
                }));
            });
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener(function(e) {
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    html.setAttribute('data-theme', newTheme);
                    updateThemeToggleIcon(newTheme);
                }
            });
        }
    }
    
    function animateThemeSwitch(newTheme) {
        // Create overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${newTheme === 'dark' ? '#0F172A' : '#FFFFFF'};
            opacity: 0;
            z-index: 9999;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Animate overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.8';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }, 150);
        });
    }
    
    function updateThemeToggleIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                
                // Animate icon change
                anime({
                    targets: icon,
                    rotate: '180deg',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        }
    }
    
    // Static Text for Hero Section (No Typewriter Animation)
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (typewriterElement) {
            typewriterElement.textContent = "Bloom Your Business with Everbloom";
        }
    }
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animation for cards
                    if (entry.target.classList.contains('service-card') || 
                        entry.target.classList.contains('portfolio-item') ||
                        entry.target.classList.contains('team-member')) {
                        
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        
                        anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 600,
                            delay: delay,
                            easing: 'easeOutCubic'
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Animated Counter Statistics
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + (target === 500 ? '+' : target === 50 ? 'M+' : target === 200 ? '+' : '');
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Floating CTA visibility
    function initFloatingCTA() {
        const floatingCTA = document.querySelector('.floating-cta');
        if (!floatingCTA) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 500 && currentScrollY < lastScrollY) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Navbar scroll effects
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                navbar.classList.add('scrolled');
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = 'none';
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Service cards hover effects (Apple-inspired)
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
                
                // Animate icon
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    anime({
                        targets: icon,
                        scale: 1.1,
                        rotate: '5deg',
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
                
                // Reset icon
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    anime({
                        targets: icon,
                        scale: 1,
                        rotate: '0deg',
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    }
    
    // Portfolio hover effects
    function initPortfolioEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const image = item.querySelector('.portfolio-image');
            const overlay = item.querySelector('.portfolio-overlay');
            
            if (image && overlay) {
                item.addEventListener('mouseenter', function() {
                    anime({
                        targets: image,
                        scale: 1.1,
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                    
                    anime({
                        targets: overlay,
                        opacity: 1,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                    
                    // Animate overlay content
                    const overlayContent = overlay.querySelector('.overlay-content');
                    if (overlayContent) {
                        anime({
                            targets: overlayContent,
                            translateY: [20, 0],
                            opacity: [0, 1],
                            duration: 300,
                            delay: 100,
                            easing: 'easeOutCubic'
                        });
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    anime({
                        targets: image,
                        scale: 1,
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                    
                    anime({
                        targets: overlay,
                        opacity: 0,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                });
            }
        });
    }
    
    // Enhanced interactions
    function initEnhancedInteractions() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-white');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            button.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
        
        // Testimonial card animations
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
        
        // Team member hover effects
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                const photo = this.querySelector('.team-photo');
                if (photo) {
                    anime({
                        targets: photo,
                        scale: 1.1,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
                
                const socialLinks = this.querySelectorAll('.team-social a');
                anime({
                    targets: socialLinks,
                    translateY: [-10, 0],
                    opacity: [0, 1],
                    duration: 300,
                    delay: anime.stagger(50),
                    easing: 'easeOutCubic'
                });
            });
            
            member.addEventListener('mouseleave', function() {
                const photo = this.querySelector('.team-photo');
                if (photo) {
                    anime({
                        targets: photo,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
        
        // FAQ animations
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    const icon = this.querySelector('.faq-icon');
                    
                    if (isActive) {
                        anime({
                            targets: icon,
                            rotate: '0deg',
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    } else {
                        anime({
                            targets: icon,
                            rotate: '180deg',
                            duration: 300,
                            easing: 'easeOutCubic'
                        });
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Stagger animation for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Stagger animation for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });
    
    // Mobile menu toggle animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                anime({
                    targets: '.navbar-nav .nav-item',
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-white, .btn-form');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(() => {
        // Handle scroll-based animations here
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Update navbar based on scroll position
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Error handling for missing elements
    function safeQuerySelector(selector, callback) {
        const element = document.querySelector(selector);
        if (element && typeof callback === 'function') {
            callback(element);
        }
        return element;
    }
    
    // Initialize tooltips and popovers if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
    
    // Add CSS for ripple effect and theme transitions
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .btn-primary, .btn-secondary, .btn-white, .btn-form {
            position: relative;
            overflow: hidden;
        }
        
        .loaded .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card, .portfolio-item, .team-member {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        /* Theme transition styles */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Dark mode specific styles */
        [data-theme="dark"] .navbar {
            background: rgba(15, 23, 42, 0.95) !important;
            border-bottom: 1px solid rgba(51, 65, 85, 0.2) !important;
        }
        
        [data-theme="dark"] .navbar-brand {
            background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        [data-theme="dark"] .hero {
            background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%);
        }
        
        [data-theme="dark"] .service-card {
            background: #1E293B;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        
        [data-theme="dark"] .service-card:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        [data-theme="dark"] .portfolio-item {
            background: #1E293B;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        
        [data-theme="dark"] .portfolio-item:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        [data-theme="dark"] .testimonial-card {
            background: #1E293B;
        }
        
        [data-theme="dark"] .contact-form-container {
            background: #1E293B;
        }
        
        [data-theme="dark"] .team-member {
            background: #1E293B;
        }
        
        [data-theme="dark"] .faq-item {
            background: #1E293B;
        }
        
        [data-theme="dark"] .case-study {
            background: #1E293B;
        }
        
        [data-theme="dark"] .footer {
            background: #0F172A;
        }
    `;
    document.head.appendChild(style);
    
    console.log('DigitalFlow enhanced website initialized successfully! 🚀✨');
});
