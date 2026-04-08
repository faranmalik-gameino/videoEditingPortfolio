// ==========================================
// VIDEO EDITOR PORTFOLIO — INTERACTIVE SCRIPT
// ==========================================

(function () {
    'use strict';

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        // Always start at the top on hard reloads (disable scroll restoration on reload).
        try {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }

            const navEntry = performance.getEntriesByType
                ? performance.getEntriesByType('navigation')[0]
                : null;
            const navType = navEntry && navEntry.type ? navEntry.type : '';
            if (navType === 'reload') {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        } catch (e) {
            // no-op
        }

        const reduceMotion = prefersReducedMotion();
        if (reduceMotion) {
            document.documentElement.classList.add('reduce-motion');
        }

        const heroTrailer = document.querySelector('[data-trailer]');
        if (heroTrailer && reduceMotion) {
            heroTrailer.remove();
        }

        // ---------- AOS ----------
        if (typeof AOS !== 'undefined') {
            if (reduceMotion) {
                AOS.init({ disable: true });
            } else {
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50
                });
            }
        }

        // ---------- Particles.js ----------
        if (!reduceMotion && typeof particlesJS !== 'undefined') {
            particlesJS('global-background', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: '#8b5cf6' },
                    shape: {
                        type: 'circle',
                        stroke: { width: 0, color: '#000000' },
                        polygon: { nb_sides: 5 }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#8b5cf6',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 0.5 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }

        // ---------- Custom cursor (fine pointer + motion OK) ----------
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const useCustomCursor =
            !reduceMotion && window.matchMedia('(pointer: fine)').matches && cursorDot && cursorOutline;

        if (useCustomCursor) {
            document.body.classList.add('has-custom-cursor');

            let mouseX = 0;
            let mouseY = 0;
            let outlineX = 0;
            let outlineY = 0;

            window.addEventListener('mousemove', function (e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            });

            const animateOutline = function () {
                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;
                cursorOutline.style.left = outlineX + 'px';
                cursorOutline.style.top = outlineY + 'px';
                requestAnimationFrame(animateOutline);
            };
            requestAnimationFrame(animateOutline);

            window.addEventListener('mousedown', function () {
                document.body.classList.add('clicking');
            });
            window.addEventListener('mouseup', function () {
                document.body.classList.remove('clicking');
            });
        }

        const interactiveElements = document.querySelectorAll(
            'a, button, .video-item, .service-card, input, textarea'
        );
        interactiveElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', function () {
                document.body.classList.remove('hovering');
            });
        });

        // ---------- Navigation ----------
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const navbarEl = document.querySelector('.navbar');

        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection && navbarEl) {
                    const targetPosition = targetSection.offsetTop - navbarEl.offsetHeight - 8;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: reduceMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });

        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                const isOpen = navMenu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

                const links = navMenu.querySelectorAll('li');
                links.forEach(function (link, index) {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation =
                            'navLinkFade 0.5s ease forwards ' + (index / 7 + 0.3) + 's';
                    }
                });
            });

            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    const links = navMenu.querySelectorAll('li');
                    links.forEach(function (li) {
                        li.style.animation = '';
                    });
                });
            });
        }

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // ---------- Portfolio filters + aria-pressed ----------
        const filterButtons = document.querySelectorAll('.filter-btn');
        const videoItems = document.querySelectorAll('.video-item');

        function setActiveFilter(activeBtn) {
            filterButtons.forEach(function (btn) {
                const isActive = btn === activeBtn;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        filterButtons.forEach(function (button) {
            button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
            button.addEventListener('click', function () {
                setActiveFilter(this);
                const filterValue = this.getAttribute('data-filter');

                videoItems.forEach(function (item) {
                    const match = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                    if (match) {
                        item.style.display = 'block';
                        setTimeout(function () {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(function () {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                setTimeout(function () {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, 400);
            });
        });

        // ---------- Video modal ----------
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const closeModalBtn = document.querySelector('.close-modal');

        function closeVideoModal() {
            if (!modal || !videoFrame) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            setTimeout(function () {
                videoFrame.src = '';
                videoFrame.removeAttribute('title');
            }, 300);
            document.body.style.overflow = '';
        }

        document.addEventListener('click', function (e) {
            const card = e.target.closest('.video-item');
            if (!card || !modal || !videoFrame) return;
            e.preventDefault();
            const button = card.querySelector('.play-btn');
            if (!button) return;
            const videoUrl = button.getAttribute('data-video');
            if (!videoUrl) return;

            let cleanUrl = videoUrl.split('?')[0];
            cleanUrl = cleanUrl.replace('youtube-nocookie.com', 'youtube.com');

            const titleEl = card.querySelector('.video-info h3');
            const titleText = titleEl ? titleEl.textContent.trim() : 'Video';
            videoFrame.title = 'Video: ' + titleText;

            const params = new URLSearchParams({
                autoplay: '1',
                mute: '1',
                rel: '0'
            });
            videoFrame.src = cleanUrl + '?' + params.toString();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (closeModalBtn) {
                closeModalBtn.focus();
            }
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeVideoModal);
        }

        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    closeVideoModal();
                }
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeVideoModal();
            }
        });

        // ---------- Contact form (Formspree) ----------
        const contactForm = document.getElementById('contactForm');

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function showNotification(message, type) {
            type = type || 'info';
            const existing = document.querySelector('.notification');
            if (existing) {
                existing.remove();
            }

            const notification = document.createElement('div');
            notification.className = 'notification notification-' + type;
            notification.setAttribute('role', 'alert');

            const span = document.createElement('span');
            span.textContent = message;
            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'notification-close';
            closeBtn.setAttribute('aria-label', 'Dismiss');
            closeBtn.innerHTML = '&times;';

            notification.appendChild(span);
            notification.appendChild(closeBtn);

            notification.style.cssText = [
                'position:fixed',
                'top:100px',
                'right:20px',
                'background:' + (type === 'success'
                    ? 'rgba(16, 185, 129, 0.95)'
                    : type === 'error'
                      ? 'rgba(239, 68, 68, 0.95)'
                      : 'rgba(139, 92, 246, 0.95)'),
                'color:#fff',
                'padding:15px 25px',
                'border-radius:6px',
                'box-shadow:0 10px 30px rgba(0,0,0,0.3)',
                'z-index:10000',
                'display:flex',
                'align-items:center',
                'gap:15px',
                "font-family:'Outfit',sans-serif",
                'font-weight:500',
                'backdrop-filter:blur(5px)',
                'border:1px solid rgba(255,255,255,0.1)',
                'transform:translateX(100%)',
                'transition:transform 0.3s cubic-bezier(0.68,-0.55,0.27,1.55)',
                'max-width:min(420px,calc(100vw - 40px))'
            ].join(';');

            document.body.appendChild(notification);

            setTimeout(function () {
                notification.style.transform = 'translateX(0)';
            }, 10);

            closeBtn.style.cssText =
                'background:none;border:none;color:inherit;font-size:20px;cursor:pointer;padding:0;opacity:0.7;flex-shrink:0';
            closeBtn.addEventListener('click', function () {
                notification.style.transform = 'translateX(120%)';
                setTimeout(function () {
                    notification.remove();
                }, 300);
            });

            setTimeout(function () {
                if (notification.parentNode) {
                    notification.style.transform = 'translateX(120%)';
                    setTimeout(function () {
                        notification.remove();
                    }, 300);
                }
            }, 6000);
        }

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                if (!contactForm.checkValidity()) {
                    return;
                }
                e.preventDefault();

                const action = contactForm.getAttribute('action') || '';
                if (action.indexOf('YOUR_FORM_ID') !== -1) {
                    showNotification(
                        'Contact form is not configured. Replace YOUR_FORM_ID in index.html with your Formspree form ID from https://formspree.io/',
                        'error'
                    );
                    return;
                }

                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const subject = document.getElementById('subject');
                const message = document.getElementById('message');

                const nameVal = name ? name.value.trim() : '';
                const emailVal = email ? email.value.trim() : '';
                const subjectVal = subject ? subject.value.trim() : '';
                const messageVal = message ? message.value.trim() : '';

                if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                    showNotification('Please fill in all fields.', 'error');
                    return;
                }
                if (!isValidEmail(emailVal)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }

                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton ? submitButton.textContent : '';
                if (submitButton) {
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;
                    submitButton.style.opacity = '0.7';
                }

                const formData = new FormData(contactForm);

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                })
                    .then(function (response) {
                        return response.text().then(function (text) {
                            var data = {};
                            if (text) {
                                try {
                                    data = JSON.parse(text);
                                } catch (ignore) {
                                    data = {};
                                }
                            }
                            return { ok: response.ok, data: data };
                        });
                    })
                    .then(function (result) {
                        if (result.ok) {
                            contactForm.reset();
                            showNotification(
                                "Message sent successfully! I'll get back to you soon.",
                                'success'
                            );
                        } else {
                            var errMsg = 'Could not send the message. Please try again.';
                            if (result.data) {
                                if (typeof result.data.error === 'string') {
                                    errMsg = result.data.error;
                                } else if (result.data.errors && result.data.errors.length) {
                                    errMsg = result.data.errors
                                        .map(function (e) {
                                            return e.message || e;
                                        })
                                        .join(' ');
                                }
                            }
                            showNotification(errMsg, 'error');
                        }
                    })
                    .catch(function () {
                        showNotification(
                            'Could not send the message. Check your connection or try again later.',
                            'error'
                        );
                    })
                    .finally(function () {
                        if (submitButton) {
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            submitButton.style.opacity = '1';
                        }
                    });
            });
        }

        // ---------- Hero scroll indicator ----------
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function () {
                const aboutSection = document.getElementById('about');
                if (aboutSection && navbarEl) {
                    window.scrollTo({
                        top: aboutSection.offsetTop - navbarEl.offsetHeight - 8,
                        behavior: reduceMotion ? 'auto' : 'smooth'
                    });
                }
            });
        }
    });
})();
