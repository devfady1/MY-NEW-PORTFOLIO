/* ==============================================================
   Nexus Portfolio — Main JavaScript
   Author: Fady Ashraf | Nexus Code
   Dependencies: GSAP 3, ScrollTrigger
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Register GSAP Plugins ────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    // ── References ───────────────────────────────────────────
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const loader = document.querySelector('.loader');
    const navbar = document.querySelector('.navbar');
    let loaderLogoLoop = null;

    // ═══════════════════════════════════════════════════════════
    //  1. CUSTOM CURSOR
    // ═══════════════════════════════════════════════════════════
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    if (cursorDot && cursorRing && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Dot follows immediately
            dotX += (mouseX - dotX) * 0.35;
            dotY += (mouseY - dotY) * 0.35;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            // Ring follows with lag
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow cursor on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .magnetic, .project-card, .review-card, input, textarea');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // ═══════════════════════════════════════════════════════════
    //  2. LOADING SCREEN
    // ═══════════════════════════════════════════════════════════
    function initLoaderLogoAnimation() {
        if (!loader) return null;

        const loaderLogo = loader.querySelector('.loader-logo');
        if (!loaderLogo) return null;

        const text = (loaderLogo.textContent || '').trim() || 'NEXUS';
        loaderLogo.innerHTML = text
            .split('')
            .map((char) => `<span class="loader-letter">${char}</span>`)
            .join('');

        const letters = loaderLogo.querySelectorAll('.loader-letter');
        gsap.set(letters, {
            opacity: 0,
            y: 22,
            filter: 'blur(8px)',
        });

        return gsap.timeline({ repeat: -1, repeatDelay: 0.12 })
            .to(letters, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.34,
                stagger: 0.055,
                ease: 'power3.out',
            })
            .to(letters, {
                opacity: 0.22,
                duration: 0.32,
                stagger: { each: 0.05, from: 'end' },
                ease: 'power2.inOut',
            }, '+=0.2')
            .to(letters, {
                opacity: 0,
                y: -12,
                filter: 'blur(6px)',
                duration: 0.38,
                stagger: 0.045,
                ease: 'power2.in',
            }, '+=0.04');
    }

    if (loader) {
        const loaderFill = loader.querySelector('.loader-bar-fill');
        loaderLogoLoop = initLoaderLogoAnimation();
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        if (loaderLogoLoop) {
                            loaderLogoLoop.kill();
                            loaderLogoLoop = null;
                        }
                        loader.style.display = 'none';
                        heroEntrance();
                    }
                });
            }
        });
        tl.to(loaderFill, { width: '100%', duration: 1.5, ease: 'power2.inOut' });
    } else {
        heroEntrance();
    }

    // ═══════════════════════════════════════════════════════════
    //  3. HERO ENTRANCE ANIMATION
    // ═══════════════════════════════════════════════════════════
    function heroEntrance() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero-tag', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
        .to('.hero-title .line-inner', {
            y: 0,
            duration: 1.2,
            stagger: 0.15,
        }, '-=0.4')
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.6')
        .to('.hero-cta-group', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.5')
        .to('.hero-scroll-indicator', {
            opacity: 1,
            duration: 1,
        }, '-=0.3')
        .to('.navbar', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.8')
        // Animated NEXUS logo entrance — stroke drawing
        .add(() => {
            initLogoDrawAnimation();
        }, '-=0.5');
    }

    // ═══════════════════════════════════════════════════════════
    //  3b. NEXUS LOGO — Stroke Draw + Brutal Scroll Morph
    // ═══════════════════════════════════════════════════════════
    function initLogoDrawAnimation() {
        const navLogo = document.getElementById('navLogo');
        if (!navLogo || navLogo.dataset.drawReady === '1') return;

        const softPath = navLogo.querySelector('.logo-path-soft');
        const hardPath = navLogo.querySelector('.logo-path-hard');
        const shimmer = navLogo.querySelector('.logo-shimmer');
        const displace = navLogo.querySelector('#nexusDisplace');
        const noise = navLogo.querySelector('#nexusNoise');

        if (!softPath || !hardPath) return;
        navLogo.dataset.drawReady = '1';

        const setupStrokeDraw = (path, baseOpacity) => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: baseOpacity,
            });
            return length;
        };

        const softLength = setupStrokeDraw(softPath, 1);
        const hardLength = setupStrokeDraw(hardPath, 0.02);

        gsap.set(navLogo, {
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 50%',
        });

        if (shimmer) {
            gsap.set(shimmer, {
                xPercent: -180,
                opacity: 0,
            });
        }

        const drawLoop = gsap.timeline({
            repeat: window.innerWidth > 768 ? -1 : 0,
            repeatDelay: 0.12,
            defaults: { ease: 'power2.inOut' },
        });

        drawLoop
            .to(softPath, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 2.2,
            })
            .to(hardPath, {
                strokeDashoffset: 0,
                opacity: 0.78,
                duration: 1.25,
                ease: 'power2.out',
            }, '-=1.2')
            .to(softPath, {
                strokeWidth: 7.8,
                duration: 0.34,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut',
            }, '-=0.75');

        if (shimmer) {
            drawLoop
                .fromTo(shimmer, {
                    xPercent: -180,
                    opacity: 0,
                }, {
                    xPercent: 220,
                    opacity: 0.72,
                    duration: 1.05,
                    ease: 'power2.out',
                }, '-=1.45')
                .to(shimmer, {
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power1.out',
                }, '-=0.08');
        }

        if (displace) {
            const distortion = { value: 0 };
            drawLoop
                .to(distortion, {
                    value: 10,
                    duration: 0.4,
                    ease: 'sine.out',
                    onUpdate: () => {
                        displace.setAttribute('scale', distortion.value.toFixed(2));
                    }
                }, '-=1.1')
                .to(distortion, {
                    value: 0,
                    duration: 0.55,
                    ease: 'sine.inOut',
                    onUpdate: () => {
                        displace.setAttribute('scale', distortion.value.toFixed(2));
                    }
                });
        }

        if (noise) {
            const turbulence = { value: 0.006 };
            drawLoop
                .to(turbulence, {
                    value: 0.012,
                    duration: 0.4,
                    ease: 'sine.out',
                    onUpdate: () => {
                        noise.setAttribute('baseFrequency', turbulence.value.toFixed(4));
                    }
                }, '<')
                .to(turbulence, {
                    value: 0.006,
                    duration: 0.55,
                    ease: 'sine.inOut',
                    onUpdate: () => {
                        noise.setAttribute('baseFrequency', turbulence.value.toFixed(4));
                    }
                });
        }

        drawLoop
            .to(hardPath, {
                strokeDashoffset: hardLength,
                opacity: 0.06,
                duration: 1.9,
            }, '+=0.08')
            .to(softPath, {
                strokeDashoffset: softLength,
                opacity: 0.2,
                duration: 1.9,
            }, '<')
            .set(softPath, { opacity: 1 })
            .set(hardPath, { opacity: 0.02 });

        navLogo.addEventListener('mousemove', (event) => {
            if (window.innerWidth <= 768) return;

            const rect = navLogo.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;

            gsap.to(navLogo, {
                rotateY: relX * 14,
                rotateX: relY * -10,
                duration: 0.35,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        });

        navLogo.addEventListener('mouseleave', () => {
            gsap.to(navLogo, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    //  4. MAGNETIC BUTTONS
    // ═══════════════════════════════════════════════════════════
    function initMagnetic() {
        const magnetics = document.querySelectorAll('.magnetic');

        magnetics.forEach(el => {
            const strength = el.dataset.strength || 0.3;

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: relX * strength,
                    y: relY * strength,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                });
            });
        });
    }
    initMagnetic();

    // ═══════════════════════════════════════════════════════════
    //  5. NAVBAR SCROLL EFFECT
    // ═══════════════════════════════════════════════════════════
    if (navbar) {
        // Initial state
        gsap.set('.navbar', { opacity: 0, y: -20 });

        ScrollTrigger.create({
            start: 'top -80px',
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 100) {
                    navbar.classList.add('scrolled');
                } else if (self.scroll() <= 100) {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    //  6. SCROLL ANIMATIONS — Section Labels & Text Reveals
    // ═══════════════════════════════════════════════════════════
    // Section labels
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.to(label, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // About text line reveals
    gsap.utils.toArray('.reveal-line-inner').forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: line.closest('.about-text-content') || line,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // About stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.value) || 0;
        const suffix = stat.dataset.suffix || '';

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        stat.textContent = Math.round(this.targets()[0].val) + suffix;
                    }
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════
    //  7. SCROLL VELOCITY SKEW
    // ═══════════════════════════════════════════════════════════
    let skewSetter = gsap.quickSetter('.skew-on-scroll', 'skewY', 'deg');
    let clamp = gsap.utils.clamp(-2, 2);

    ScrollTrigger.create({
        onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -500);
            skewSetter(skew);
        }
    });

    // Reset skew when scroll stops
    gsap.set('.skew-on-scroll', { transformOrigin: 'center center', force3D: true });

    // ═══════════════════════════════════════════════════════════
    //  8. SKILLS SECTION — Floating Animation
    // ═══════════════════════════════════════════════════════════
    const isMobile = window.innerWidth <= 768;

    gsap.utils.toArray('.skill-node').forEach((node, i) => {
        // Gentle floating — desktop only (too heavy on mobile)
        if (!isMobile) {
            gsap.to(node, {
                y: '+=12',
                duration: 2 + Math.random() * 1.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: i * 0.2,
            });
        }

        // Fade in on scroll
        gsap.from(node, {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.skills-orbit-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // Orbit rings fade in
    gsap.from('.orbit-ring', {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills-orbit-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        }
    });

    // ═══════════════════════════════════════════════════════════
    //  9. PROJECT CARDS — 3D Tilt & Staggered Reveal
    // ═══════════════════════════════════════════════════════════
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, i) => {
        // Staggered scroll reveal
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });

        // 3D tilt on mouse move
        if (window.innerWidth > 768) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;

                gsap.to(card, {
                    rotateY: x,
                    rotateX: y,
                    duration: 0.4,
                    ease: 'power2.out',
                    transformPerspective: 1000,
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                });
            });
        }
    });

    // ═══════════════════════════════════════════════════════════
    //  10. REVIEWS MARQUEE — Duplicate for seamless loop
    // ═══════════════════════════════════════════════════════════
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        // Clone all review cards for seamless infinite scroll
        const cards = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML += cards;
    }

    // ═══════════════════════════════════════════════════════════
    //  11. CONTACT FORM — Interactive fields + AJAX submit
    // ═══════════════════════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Field focus animations
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('focus', () => {
            gsap.to(field, {
                scale: 1.01,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        field.addEventListener('blur', () => {
            gsap.to(field, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        // Typing ripple — subtle border glow pulse
        field.addEventListener('input', () => {
            gsap.fromTo(field, {
                boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
            }, {
                boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.05)',
                duration: 0.5,
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;

            // Get CSRF token from cookie
            const csrfToken = getCookie('csrftoken');

            // Collect form data
            const formData = {
                name: contactForm.querySelector('[name="name"]').value.trim(),
                email: contactForm.querySelector('[name="email"]').value.trim(),
                subject: contactForm.querySelector('[name="subject"]').value.trim(),
                message: contactForm.querySelector('[name="message"]').value.trim(),
            };

            // Button sending animation
            submitBtn.classList.add('sending');
            submitBtn.textContent = 'Sending...';

            gsap.to(submitBtn, {
                scale: 0.97,
                duration: 0.2,
            });

            try {
                const response = await fetch('/api/contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    // Success animation
                    submitBtn.classList.remove('sending');
                    submitBtn.classList.add('success');
                    submitBtn.textContent = '✓ Sent Successfully!';

                    gsap.to(submitBtn, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                    });

                    showFormMessage(result.message, 'success');
                    contactForm.reset();

                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        submitBtn.textContent = originalText;
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Something went wrong.');
                }
            } catch (err) {
                submitBtn.classList.remove('sending');
                submitBtn.textContent = originalText;

                gsap.to(submitBtn, {
                    scale: 1,
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.5,
                });

                showFormMessage(err.message, 'error');
            }
        });
    }

    function showFormMessage(text, type) {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = 'form-message show ' + type;

        gsap.from(formMessage, {
            y: 10,
            opacity: 0,
            duration: 0.4,
        });

        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }

    // ── CSRF cookie helper ────────────────────────────────────
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // ═══════════════════════════════════════════════════════════
    //  12. GENERAL SCROLL REVEAL FOR ALL SECTIONS
    // ═══════════════════════════════════════════════════════════
    // Fade-up reveal for major content blocks
    gsap.utils.toArray('.scroll-reveal').forEach(el => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // Parallax effect on about visual
    const aboutVisual = document.querySelector('.about-visual');
    if (aboutVisual) {
        gsap.to(aboutVisual, {
            y: -40,
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }

    // Floating tags parallax
    gsap.utils.toArray('.about-floating-tag').forEach((tag, i) => {
        gsap.to(tag, {
            y: i % 2 === 0 ? -30 : 30,
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });
    });

    // ═══════════════════════════════════════════════════════════
    //  13. SMOOTH SCROLL FOR NAV LINKS
    // ═══════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 80 },
                    duration: 1.2,
                    ease: 'power3.inOut',
                });
            }
        });
    });

});
