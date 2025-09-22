// DOM Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const menuItems = document.querySelectorAll('.menu-item');
const body = document.body;

// Open Menu
function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('menu-open');

    // Disable focus on main content
    document.querySelector('main').setAttribute('inert','');
    document.querySelector('header').setAttribute('inert','');
    document.querySelector('footer').setAttribute('inert','');

    closeBtn.focus();
    animateHamburger(true);
}

// Close Menu
function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');

    document.querySelector('main').removeAttribute('inert');
    document.querySelector('header').removeAttribute('inert');
    document.querySelector('footer').removeAttribute('inert');

    hamburgerMenu.focus();
    animateHamburger(false);
}

// Hamburger animation
function animateHamburger(isOpen){
    const spans = hamburgerMenu.querySelectorAll('span');
    if(isOpen){
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px,-6px)';
    }else{
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Toggle Menu
function toggleMenu(){
    if(sideMenu.classList.contains('active')){
        closeMenu();
    } else {
        openMenu();
    }
}

// Event Listeners
hamburgerMenu.addEventListener('click', toggleMenu);
hamburgerMenu.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' ') toggleMenu();
});
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on menu items + smooth scroll
menuItems.forEach(item => {
    item.addEventListener('click', function(e){
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection){
            const headerHeight = document.querySelector('.header').offsetHeight;
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

// Header scroll effect
window.addEventListener('scroll', function(){
    const header = document.querySelector('.header');
    if(window.scrollY > 100){
        header.style.background = 'rgba(233,30,99,0.95)';
    } else {
        header.style.background = '#e91e63';
    }
});
