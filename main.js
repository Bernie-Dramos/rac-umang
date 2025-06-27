// Improved: Navbar transitions in on scroll up, out on scroll down
(function() {
    let lastScroll = window.scrollY;
    const navbar = document.getElementById('main-navbar');
    let ticking = false;

    function onScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
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
