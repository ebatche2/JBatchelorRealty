/* =========================================================
   script.js
   Loaded with `defer` on every page, so the HTML is fully
   parsed before this runs — no need to wrap everything in a
   DOMContentLoaded listener, though many tutorials will show
   you that pattern too.
   ========================================================= */

/* ---------------------------------------------------------
   1. AUTO-HIGHLIGHT THE CURRENT PAGE IN THE NAV
   Instead of hand-editing class="active" on every page (easy
   to forget, easy to get wrong), we ask the browser what page
   we're on and match it against each nav link's href.
   --------------------------------------------------------- */
function highlightCurrentPage() {
    // window.location.pathname gives us something like "/listings.html"
    // .split('/').pop() grabs just the filename at the end
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ---------------------------------------------------------
   2. ADD A SHADOW TO THE STICKY NAVBAR ONCE YOU SCROLL
   The CSS handles the "stick to the top" part on its own.
   This just adds a visual cue (a shadow) once there's actual
   content scrolled underneath it, so it doesn't look like it's
   floating over nothing when you're still at the very top.
   --------------------------------------------------------- */
function initNavbarShadow() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ---------------------------------------------------------
   3. MOBILE HAMBURGER MENU
   Clicking the button toggles a CSS class that shows/hides
   the nav links (see the @media rules in style.css).
   --------------------------------------------------------- */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');

        // Update aria-expanded so screen readers know the menu state
        const isOpen = links.classList.contains('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
}

/* ---------------------------------------------------------
   4. CONTACT FORM FEEDBACK
   There's no backend yet, so we can't actually send this
   anywhere. What we CAN do is stop the default page-reload
   behavior and show the visitor a confirmation message instead
   — this is the same event.preventDefault() pattern you'll use
   later once the form does talk to a real server.
   --------------------------------------------------------- */
    function initContactForm() {
        const form = document.querySelector('form');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {'Accept': 'application/json'}
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'thanks.html';
                } else {
                    alert('Error: Please try again.');
                }
            })
        })
    }


/* Run everything */
highlightCurrentPage();
initNavbarShadow();
initMobileMenu();
initContactForm();
