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
    // Wait for close button to exist (in case of deferred script)
    function getCloseBtn() {
        return document.getElementById('close-menu-btn');
    }
    // Open menu
    function openMenu() {
        menu.classList.remove('scale-0');
        menu.classList.add('scale-100');
        btn.setAttribute('aria-expanded', 'true');
    }
    // Close menu
    function closeMenu() {
        menu.classList.add('scale-0');
        menu.classList.remove('scale-100');
        btn.setAttribute('aria-expanded', 'false');
    }
    // Responsive: always show hamburger on <=1028px, hide mobile menu on >1028px
    function handleResize() {
        if (window.innerWidth > 1028) {
            closeMenu();
        }
    }
    if (btn && menu) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            openMenu();
        });
        // Use event delegation for close button in case of dynamic DOM
        document.addEventListener('click', function(e) {
            const closeBtn = getCloseBtn();
            if (closeBtn && (e.target === closeBtn || closeBtn.contains(e.target))) {
                closeMenu();
            }
        });
        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        window.addEventListener('resize', handleResize);
    }
    handleResize();
});
