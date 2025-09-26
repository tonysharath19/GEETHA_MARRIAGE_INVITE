document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const body = document.body;
    const video = document.getElementById('carVideo');
    const tapInvite = document.getElementById('tapInvite');

    // Prevent downloads: Global event listeners
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

    // Prevent long press on mobile
    let longPressTimer;
    document.addEventListener('touchstart', function(e) {
        longPressTimer = setTimeout(function() {
            e.preventDefault();
        }, 500);
    });
    document.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
    });
    document.addEventListener('touchmove', function() {
        clearTimeout(longPressTimer);
    });

    /* ================= HAMBURGER ANIMATION ================= */
    function animateHamburger(isOpen){
        const spans = hamburgerMenu.querySelectorAll('span');
        if(isOpen){
            spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px,-6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    /* ================= MENU OPEN/CLOSE ================= */
    function openMenu() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');

        document.querySelector('main')?.setAttribute('inert','');
        document.querySelector('header')?.setAttribute('inert','');

        closeBtn.focus();
        animateHamburger(true);
    }

    function closeMenu() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');

        document.querySelector('main')?.removeAttribute('inert');
        document.querySelector('header')?.removeAttribute('inert');

        hamburgerMenu.focus();
        animateHamburger(false);
    }

    function toggleMenu(){
        if(sideMenu.classList.contains('active')){
            closeMenu();
        } else {
            openMenu();
        }
    }

    /* ================= EVENT LISTENERS ================= */
    if(hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
        hamburgerMenu.addEventListener('keydown', function(e){
            if(e.key === 'Enter' || e.key === ' ') toggleMenu();
        });
    }

    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);

    // Menu items click
    menuItems.forEach(item => {
        item.addEventListener('click', function(){
            const targetId = this.getAttribute('href')?.substring(1);
            const targetSection = document.getElementById(targetId);
            if(targetSection){
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            closeMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event){
        if(event.key === 'Escape' && sideMenu.classList.contains('active')){
            closeMenu();
        }
    });

    /* ================= HEADER SCROLL EFFECT ================= */
    window.addEventListener('scroll', function(){
        const header = document.querySelector('.header');
        if(header){
            if(window.scrollY > 100){
                header.style.background = 'rgba(233,30,99,0.95)';
            } else {
                header.style.background = 'rgba(244,106,152,0.8)';
            }
        }
    });

    /* ================= TAP TO SHOW VIDEO ================= */
    if(tapInvite){
        tapInvite.addEventListener('click', function() {
            const videoContainer = document.querySelector('.video-container');
            if(video){
                video.style.display = 'block';
                video.load();
                video.play();
            }
            if(videoContainer){
                videoContainer.classList.add('active');
            }
            this.style.display = 'none';
        });
    }
});
