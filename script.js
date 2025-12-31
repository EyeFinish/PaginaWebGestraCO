// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Ocultar el preloader después de que la página cargue
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Remover el preloader del DOM después de la transición
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000); // Mostrar el preloader por al menos 1 segundo
});

// ========================================
// Menu Mobile Toggle
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Animar tarjetas de funcionalidades
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Animar beneficios
const benefitItems = document.querySelectorAll('.benefit-item');
benefitItems.forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// ========================================
// Smooth Scroll con offset para el nav fijo
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '#demo-form') {
            // Si no hay un elemento específico, scroll suave a la sección de contacto
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Destacar enlace activo en navegación
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Cambio de color del nav al hacer scroll
// ========================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = 'var(--blanco)';
        nav.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Log de carga completada
// ========================================
console.log('GestraCOO Landing Page cargada correctamente ✓');
