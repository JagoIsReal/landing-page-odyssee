document.addEventListener('DOMContentLoaded', function() {
    // Scroll vers le haut au chargement
    window.scrollTo(0, 0);

    const backToTopButton = document.querySelector('.back-to-top');
    const modal = document.getElementById('imageModal');
    const modalImg = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const header = document.querySelector('.header');
    const chevronDown = document.querySelector('.scroll-down');
    
    // Gestion du bouton "Retour en haut" et de la bordure du header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            backToTopButton.classList.add('visible');
            chevronDown.classList.add('hidden');
            header.classList.add('scrolled');
        } else {
            backToTopButton.classList.remove('visible');
            chevronDown.classList.remove('hidden');
            header.classList.remove('scrolled');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo(0, 0);
    });

    // Effet de parallaxe pour le header
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const backgroundPosition = 50 + (currentScroll * 0.1);
        header.style.backgroundPositionY = `${backgroundPosition}%`;
        lastScroll = currentScroll;
    });

    // Observer pour l'animation des éléments
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Initialisation des éléments
    document.querySelectorAll('.section, .feature-card, .gallery-item, .testimonial-card').forEach(element => {
        // On force le navigateur à calculer la position avant de cacher l'élément
        element.offsetHeight;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease';
        observer.observe(element);
    });

    // Défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gestion de la galerie modale
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
