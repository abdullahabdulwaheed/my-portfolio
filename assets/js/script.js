$(document).ready(function () {

    const sections = $("section[id]");
    const navLinks = $(".nav-link");
    const navbarCollapse = $(".navbar-collapse");
    const navHeight = $(".custom-nav").outerHeight();

    // ===== CLICK ACTIVE & AUTO-HIDE TOGGLER =====
    navLinks.on("click", function () {
        navLinks.removeClass("active");
        $(this).addClass("active");

        if (navbarCollapse.hasClass("show")) {
            navbarCollapse.collapse('hide');
        }
    });

    // ===== SCROLL ACTIVE & NAVBAR BG =====
    $(window).on("scroll", function () {
        let scrollPos = $(window).scrollTop() + navHeight + 20;

        // Active Link Update
        sections.each(function () {
            let top = $(this).offset().top;
            let bottom = top + $(this).outerHeight();
            let id = $(this).attr("id");

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.removeClass("active");
                $('.nav-link[href="#' + id + '"]').addClass("active");
            }
        });

        // Navbar Background Change
        if ($(window).scrollTop() > 50) {
            $(".custom-nav").addClass("scrolled");
        } else {
            $(".custom-nav").removeClass("scrolled");
        }
    });

    // ===== Scroll To Top Button =====
    const scrollTopBtn = $("#scrollTopBtn");
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
            scrollTopBtn.fadeIn();
        } else {
            scrollTopBtn.fadeOut();
        }
    });

    scrollTopBtn.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    // ==========================================
    // NEW: SCROLL REVEAL ANIMATION LOGIC
    // ==========================================
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS animation
                entry.target.classList.add('active');
                // Once shown, stop observing so it doesn't animate again
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15 // Trigger when 15% of element is visible
    });

    // Find all elements with the .reveal class and observe them
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => revealObserver.observe(el));
});