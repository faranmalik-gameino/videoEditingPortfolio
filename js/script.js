// ==========================================
// VIDEO EDITOR PORTFOLIO - INTERACTIVE SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // INITIALIZE AOS (Animate On Scroll)
    // ==========================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // ==========================================
    // INITIALIZE PARTICLES.JS
    // ==========================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('global-background', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8b5cf6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8b5cf6",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only active on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows immediately
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth trailing animation for outline
        const animateOutline = () => {
            // Lerp (Linear Interpolation) for smooth delay
            // Formula: current = current + (target - current) * factor
            outlineX += (mouseX - outlineX) * 0.15; // 0.15 is the speed factor
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateOutline);
        };

        requestAnimationFrame(animateOutline);

        // Click animation
        window.addEventListener('mousedown', () => {
            document.body.classList.add('clicking');
        });

        window.addEventListener('mouseup', () => {
            document.body.classList.remove('clicking');
        });
    }

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .video-item, .service-card, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });


    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                // Adjust for fixed header
                const targetPosition = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Animate links
            const links = navMenu.querySelectorAll('li');
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                const links = navMenu.querySelectorAll('li');
                links.forEach(link => {
                    link.style.animation = '';
                });
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // PORTFOLIO FILTERING SYSTEM
    // ==========================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            videoItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Re-trigger AOS layout refresh
            setTimeout(() => {
                AOS.refresh();
            }, 400);
        });
    });

    // ==========================================
    // VIDEO MODAL FUNCTIONALITY
    // ==========================================

    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');
    const playButtons = document.querySelectorAll('.play-btn');

    // Open modal when play button is clicked
    // Open modal when play button is clicked (Event Delegation)
    // Open modal when play button or overlay is clicked (Event Delegation)
    // Open modal when any part of the video card is clicked (Event Delegation)
    document.addEventListener('click', function (e) {
        // Broaden target to the entire video item card
        const card = e.target.closest('.video-item');

        if (card) {
            e.preventDefault();
            // Find the button (or just the data) within the card
            const button = card.querySelector('.play-btn');

            if (button) {
                const videoUrl = button.getAttribute('data-video');
                if (videoUrl) {
                    // Strip existing parameters to ensure clean state
                    let cleanUrl = videoUrl.split('?')[0];

                    // Standardize on normal youtube domain
                    cleanUrl = cleanUrl.replace('youtube-nocookie.com', 'youtube.com');

                    // Add autoplay and mute only - simplest config
                    videoFrame.src = `${cleanUrl}?autoplay=1&mute=1`;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            }
        }
    });

    // Close modal
    function closeVideoModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            videoFrame.src = ''; // Stop video after fade out
        }, 300);
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // ==========================================
    // CONTACT FORM FUNCTIONALITY
    // ==========================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';

                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(139, 92, 246, 0.95)'};
            color: #fff;
            padding: 15px 25px;
            border-radius: 6px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.1);
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        `;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            opacity: 0.7;
        `;

        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(120%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ==========================================
    // HERO SCROLL INDICATOR
    // ==========================================

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: aboutSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
});
