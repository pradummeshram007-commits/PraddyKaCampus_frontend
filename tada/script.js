document.addEventListener('DOMContentLoaded', function() {

    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Advanced Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('.cursor-hover-target');

    let mouse = { x: 0, y: 0 };
    let ring = { x: 0, y: 0 };
    const speed = 0.15;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const animateCursor = () => {
        cursorDot.style.left = `${mouse.x}px`;
        cursorDot.style.top = `${mouse.y}px`;
        ring.x += (mouse.x - ring.x) * speed;
        ring.y += (mouse.y - ring.y) * speed;
        cursorRing.style.left = `${ring.x}px`;
        cursorRing.style.top = `${ring.y}px`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
        target.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });

    // --- Preloader Animation ---
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
                initPageAnimations();
            }, 1000);
        }, 3500);
    }

    // --- Navigation Effects ---
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                // Use Lenis for smooth scrolling
                lenis.scrollTo(targetId, { offset: -80 });
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                if (navMenu.classList.contains('open')) mobileMenuBtn.click();
            });
        });

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }
    
    // --- 3D Tilt Effects for Feature Cards ---
    function init3DTiltEffects() {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / (rect.height / 2) * -10;
                const rotateY = (x - rect.width / 2) / (rect.width / 2) * 10;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // --- Scroll Reveal Animations ---
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-up, .hub-container').forEach(el => {
            observer.observe(el);
        });
    }

    // --- Testimonial Carousel ---
    function initTestimonialCarousel() {
        const track = document.querySelector('.testimonial-track');
        if (!track) return;
        
        const cards = Array.from(track.children);
        cards.forEach(card => track.appendChild(card.cloneNode(true)));
        
        let currentIndex = 0;
        setInterval(() => {
            currentIndex++;
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(-${(100 / (cards.length * 2)) * currentIndex}%)`;

            if (currentIndex >= cards.length) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = `translateX(0%)`;
                }, 500);
            }
        }, 5000);
    }
    
    function initPageAnimations() {
        initNavigation();
        init3DTiltEffects();
        initScrollReveal();
        initTestimonialCarousel();
        console.log('🚀 PradyyKaCampus: All systems initialized');
    }

    // Initialize all functions
    initPreloader();
});