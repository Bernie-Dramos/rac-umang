// Navbar appears at the top when scrolling up, hides when scrolling down
(function() {
    let lastScroll = window.scrollY;
    const navbar = document.getElementById('main-navbar');
    let ticking = false;

    function onScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down: hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up: show navbar
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
})();

// Hamburger menu toggle for responsive navbar
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('hidden');
        });
    }
});
