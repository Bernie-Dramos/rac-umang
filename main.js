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
        menu.classList.remove('hidden', 'scale-0');
        menu.classList.add('scale-100');
        btn.setAttribute('aria-expanded', 'true');
    }
    // Close menu
    function closeMenu() {
        menu.classList.add('scale-0');
        menu.classList.remove('scale-100');
        setTimeout(() => menu.classList.add('hidden'), 200); // Match transition duration
        btn.setAttribute('aria-expanded', 'false');
    }
    // Responsive: always show hamburger on <=1028px, hide mobile menu on >1028px
    function handleResize() {
        if (window.innerWidth > 1028) {
            closeMenu();
            menu.classList.add('hidden');
        } else {
            menu.classList.remove('hidden');
        }
    }
    if (btn && menu) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (menu.classList.contains('scale-0')) {
                openMenu();
            } else {
                closeMenu();
            }
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
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !btn.contains(e.target) && menu.classList.contains('scale-100')) {
                closeMenu();
            }
        });
        window.addEventListener('resize', handleResize);
    }
    handleResize();
});
