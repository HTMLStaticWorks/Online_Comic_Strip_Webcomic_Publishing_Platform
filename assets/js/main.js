document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme (runs on every page)
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Theme Switcher Buttons (only if present)
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    if (themeToggleBtns.length > 0) {
        const updateThemeUI = (isDark) => {
            themeToggleBtns.forEach(btn => {
                btn.innerHTML = isDark 
                    ? '<i class="bi bi-sun-fill"></i>' 
                    : '<i class="bi bi-moon-fill"></i>';
            });
        };

        updateThemeUI(currentTheme === 'dark');

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Prevent double trigger if buttons programmatically click each other
                e.stopImmediatePropagation();
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                updateThemeUI(isDark);
            });
        });
    }

    // 2. Initialize RTL Direction & Logo paths (runs on every page)
    const currentDirection = localStorage.getItem('dir') || 'ltr';
    const bootstrapStyle = document.getElementById('bootstrap-css');
    
    const updateLogo = (isRTL) => {
        const logos = document.querySelectorAll('.logo-img');
        logos.forEach(logo => {
            logo.src = isRTL ? 'assets/images/logo-rtl.svg' : 'assets/images/logo.svg';
        });
    };

    if (currentDirection === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        if (bootstrapStyle) {
            bootstrapStyle.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
        }
        updateLogo(true);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        if (bootstrapStyle) {
            bootstrapStyle.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
        }
        updateLogo(false);
    }

    // RTL Toggle Button (only if present)
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.innerHTML = '<i class="bi bi-translate"></i>';
        rtlToggleBtn.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const newDir = isRTL ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateLogo(newDir === 'rtl');
            
            // Adjust bootstrap styles dynamically if needed
            if (bootstrapStyle) {
                if (newDir === 'rtl') {
                    bootstrapStyle.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
                } else {
                    bootstrapStyle.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
                }
            }
        });
    }

    // Active Navigation Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'home-1.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle-btn');
    passwordToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input && (input.type === 'password' || input.type === 'text')) {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                btn.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Alert Demo
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }

    // Newsletter Form Alert Demo
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Subscribed successfully!');
            form.reset();
        });
    });
});
