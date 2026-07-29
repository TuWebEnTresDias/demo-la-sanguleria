/* ============================================
   LA SANGULERÍA — Landing Page Scripts
   Vanilla JS · No dependencies
   ============================================ */

(function () {
    'use strict';

    // ==========================================
    // HEADER — Scroll effect
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ==========================================
    // MOBILE MENU — Toggle
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', function () {
            const isOpen = mobileNav.classList.contains('active');
            mobileNav.classList.toggle('active');
            burgerBtn.classList.toggle('active');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close mobile nav on link click
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                burgerBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL — All anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS — Intersection Observer
    // ==========================================
    var animElements = document.querySelectorAll('.anim-fade, .anim-reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all immediately
        animElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ==========================================
    // MENU TABS — Food menu
    // ==========================================
    var menuTabBtns = document.querySelectorAll('.menu-tabs__btn');
    var menuPanels = document.querySelectorAll('.menu-tabs__panel');

    menuTabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tabId = this.getAttribute('data-tab');

            // Update buttons
            menuTabBtns.forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Update panels
            menuPanels.forEach(function (panel) {
                panel.classList.remove('active');
            });

            var targetPanel = document.getElementById('tab-' + tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // WINE TABS
    // ==========================================
    var vinoTabBtns = document.querySelectorAll('.vinos-tabs__btn');
    var vinoPanels = document.querySelectorAll('.vinos-tabs__panel');

    vinoTabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tabId = this.getAttribute('data-vtab');

            // Update buttons
            vinoTabBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Update panels
            vinoPanels.forEach(function (panel) {
                panel.classList.remove('active');
            });

            var targetPanel = document.getElementById('vtab-' + tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // RESERVA FORM → WhatsApp
    // ==========================================
    var form = document.getElementById('reservaForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nombre = document.getElementById('reservaNombre').value.trim();
            var telefono = document.getElementById('reservaTel').value.trim();
            var fecha = document.getElementById('reservaFecha').value;
            var hora = document.getElementById('reservaHora').value;
            var personas = document.getElementById('reservaPersonas').value;
            var mensaje = document.getElementById('reservaMensaje').value.trim();

            if (!nombre || !telefono || !fecha || !hora || !personas) {
                // Shake animation on button
                var submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.style.animation = 'shake 0.4s ease';
                setTimeout(function () {
                    submitBtn.style.animation = '';
                }, 400);
                return;
            }

            // Format date nicely
            var fechaObj = new Date(fecha + 'T12:00:00');
            var opciones = { weekday: 'long', day: 'numeric', month: 'long' };
            var fechaFormateada = fechaObj.toLocaleDateString('es-AR', opciones);

            // Build WhatsApp message
            var whatsappMsg = 'Hola! Quisiera reservar una mesa en LA SANGULERÍA 🍷\n\n';
            whatsappMsg += '👤 *' + nombre + '*\n';
            whatsappMsg += '📅 ' + fechaFormateada + '\n';
            whatsappMsg += '🕐 ' + hora + ' hs\n';
            whatsappMsg += '👥 ' + personas + (personas === 'mas' ? ' personas (consultar)' : ' persona' + (personas > 1 ? 's' : '')) + '\n';

            if (mensaje) {
                whatsappMsg += '\n📝 ' + mensaje + '\n';
            }

            whatsappMsg += '\n¡Gracias!';

            // Encode and open
            var encoded = encodeURIComponent(whatsappMsg);
            var phone = '5493534456088';
            var url = 'https://wa.me/' + phone + '?text=' + encoded;

            window.open(url, '_blank', 'noopener');
        });
    }

    // ==========================================
    // KEYBOARD ACCESSIBILITY — Tabs
    // ==========================================
    function setupTabKeyboard(containerSelector) {
        var containers = document.querySelectorAll(containerSelector);
        containers.forEach(function (container) {
            var buttons = container.querySelectorAll('[role="tab"]');
            buttons.forEach(function (btn, index) {
                btn.addEventListener('keydown', function (e) {
                    var newIndex;
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        newIndex = (index + 1) % buttons.length;
                        buttons[newIndex].focus();
                        buttons[newIndex].click();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        newIndex = (index - 1 + buttons.length) % buttons.length;
                        buttons[newIndex].focus();
                        buttons[newIndex].click();
                    }
                });
            });
        });
    }

    setupTabKeyboard('.menu-tabs__nav');
    setupTabKeyboard('.vinos-tabs__nav');

    // ==========================================
    // HIDE SCROLL INDICATOR ON SCROLL
    // ==========================================
    var scrollIndicator = document.querySelector('.hero__scroll');
    if (scrollIndicator) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = '';
            }
        }, { passive: true });
    }

    // ==========================================
    // STAGGERED ANIMATION for grid items
    // ==========================================
    if ('IntersectionObserver' in window) {
        var staggerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var children = entry.target.querySelectorAll('.anim-reveal');
                    children.forEach(function (child, index) {
                        child.style.transitionDelay = (index * 0.1) + 's';
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05
        });

        // Apply stagger to grids
        var grids = document.querySelectorAll('.propuesta__grid, .cocteleria__grid, .momentos__grid, .testimonios__grid');
        grids.forEach(function (grid) {
            staggerObserver.observe(grid);
        });
    }

})();
