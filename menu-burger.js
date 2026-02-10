// Menu Burger JavaScript
// Encodage UTF-8 correct

document.addEventListener('DOMContentLoaded', function() {

    // Créer le bouton burger s'il n'existe pas
    const nav = document.querySelector('.nav-circl');
    const navLeft = document.querySelector('.nav-left');
    const navLinks = document.querySelector('.nav-links');

    if (!nav || !navLeft || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }

    // Créer le bouton hamburger
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '&#9776;'; // Icone hamburger (☰)
        menuToggle.setAttribute('aria-label', 'Toggle menu');

        // Insérer le bouton avant nav-left
        nav.insertBefore(menuToggle, navLeft);

        // Gérer le clic sur le bouton
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');

            // Changer l'icône
            if (navLinks.classList.contains('mobile-open')) {
                menuToggle.innerHTML = '&#10005;'; // Icone X (✕)
            } else {
                menuToggle.innerHTML = '&#9776;'; // Icone hamburger (☰)
            }
        });
    }

    // Gérer les sous-menus sur mobile
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');

        if (dropdownLink) {
            // Sur mobile, toggle le menu au clic
            dropdownLink.addEventListener('click', function(e) {
                // Seulement sur mobile (largeur < 768px)
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                }
            });
        }
    });

    // Fermer le menu quand on clique sur un lien (sauf les dropdowns)
    const menuLinks = document.querySelectorAll('.nav-links > li > a:not(.dropdown > a)');

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('mobile-open');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) {
                    menuToggle.innerHTML = '&#9776;'; // Icone hamburger (☰)
                }
            }
        });
    });

    // Fermer le menu si on redimensionne vers desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-open');
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.innerHTML = '&#9776;'; // Icone hamburger (☰)
            }

            // Fermer tous les dropdowns ouverts
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
});