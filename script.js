/**
 * Royal Bites Cafe - Premium Professional JavaScript
 * Author: AI Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Initialization
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 120
    });

    // 2. Vanilla Tilt Initialization for Menu Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 3. Premium Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1000);
    });

    // 4. Sticky Navbar & Back to Top
    const nav = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            nav.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Typing Animation (Improved)
    const typingText = document.getElementById('typing-text');
    const text = "Experience Royal Dining";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typingText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }
    // Start typing after loader fades
    setTimeout(typeEffect, 1500);

    // 6. Theme Toggle (Animated)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animated icon swap
        icon.style.transform = 'rotate(360deg) scale(0)';
        setTimeout(() => {
            updateThemeIcon(newTheme);
            icon.style.transform = 'rotate(0) scale(1)';
        }, 250);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    // 7. Menu Filtering (Smooth Transitions)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    filterMenu(lastCategory);
    setActiveButton(lastCategory);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            localStorage.setItem('lastCategory', filter);
            filterMenu(filter);
            setActiveButton(filter);
        });
    });

    function filterMenu(category) {
        menuItems.forEach(item => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    }

    function setActiveButton(category) {
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 8. Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.countdown-container').innerHTML = "<h4 class='text-gold'>Offer Expired!</h4>";
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 9. Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalImg = document.getElementById('modalImg');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.getAttribute('data-img-src');
        });
    });

    // 10. Reservation Form (SweetAlert2 Integration)
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (!reservationForm.checkValidity()) {
            event.stopPropagation();
            reservationForm.classList.add('was-validated');
        } else {
            // Premium Success Message
            Swal.fire({
                title: 'Reservation Successful!',
                text: 'We look forward to serving you, ' + document.getElementById('resName').value + '!',
                icon: 'success',
                background: '#141414',
                color: '#f5f5f5',
                confirmButtonColor: '#d4af37',
                confirmButtonText: 'Perfect',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            
            reservationForm.reset();
            reservationForm.classList.remove('was-validated');
        }
    }, false);

    // 11. Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });

    // 12. Button Ripple Effect
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
