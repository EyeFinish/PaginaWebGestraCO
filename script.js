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
// Features Slider
// ========================================
const featuresGrid = document.querySelector('.features-grid');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

let currentIndex = 0;
const totalCards = document.querySelectorAll('.feature-card').length;

scrollLeftBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    scrollToCard(currentIndex);
});

scrollRightBtn.addEventListener('click', () => {
    currentIndex = Math.min(totalCards - 1, currentIndex + 1);
    scrollToCard(currentIndex);
});

function scrollToCard(index) {
    const cardWidth = featuresGrid.clientWidth;
    featuresGrid.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });
}

// ========================================
// Modal del Formulario Beta
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const betaBtn = document.getElementById('beta-btn');
    const demoBtn = document.getElementById('demo-btn');
    const betaModal = document.getElementById('beta-modal');
    const modalClose = document.querySelector('.modal-close');
    const betaForm = document.getElementById('beta-form');

    if (!betaBtn || !demoBtn || !betaModal || !modalClose || !betaForm) {
        console.error('Elementos del modal no encontrados');
        return;
    }

    // Actualizar código de país cuando se selecciona un país
    const paisSelect = document.getElementById('pais');
    const countryCode = document.getElementById('country-code');
    
    if (paisSelect && countryCode) {
        paisSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const code = selectedOption.getAttribute('data-code');
            if (code) {
                countryCode.textContent = code;
            }
        });
    }

    // Abrir modal
    betaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        betaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Abrir modal con el botón de demo
    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        betaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal con el botón X
    modalClose.addEventListener('click', () => {
        betaModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera del contenido
    betaModal.addEventListener('click', (e) => {
        if (e.target === betaModal) {
            betaModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && betaModal.classList.contains('active')) {
            betaModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Manejar envío del formulario
    betaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = betaForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;
        
        // Deshabilitar botón y mostrar estado de carga
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const paisSelect = document.getElementById('pais');
        const pais = paisSelect.value;
        
        // Validar que se haya seleccionado un país
        if (!pais || pais === '') {
            alert('Por favor, selecciona tu país');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }
        
        const codigoPais = paisSelect.options[paisSelect.selectedIndex].getAttribute('data-code');
        const telefonoInput = document.getElementById('telefono').value;
        const telefono = codigoPais + ' ' + telefonoInput;
        const empresa = document.getElementById('empresa').value;
        
        // URL de tu Google Apps Script Web App
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwkyP-kf-QOgA4j4wQ-Jrj9UVnlOcE7dZoOh3AlJLJNEIt9eLKdHVeat41ZyTJkLVfK/exec';
        
        const formData = {
            nombre: nombre,
            correo: correo,
            pais: pais,
            telefono: telefono,
            empresa: empresa,
            fecha: new Date().toLocaleString('es-CL')
        };
        
        try {
            // Enviar datos a Google Sheets
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Usuario registrado en lista de espera:', formData);
            
            // Cerrar modal del formulario
            betaModal.classList.remove('active');
            betaForm.reset();
            
            // Mostrar modal de éxito
            const successModal = document.getElementById('success-modal');
            successModal.classList.add('active');
            
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Hubo un error al registrarte. Por favor, intenta nuevamente o contáctanos directamente.');
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar modal de éxito
    const successCloseBtn = document.getElementById('success-close-btn');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            const successModal = document.getElementById('success-modal');
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// ========================================
// Log de carga completada
// ========================================
console.log('GestraCOO Landing Page cargada correctamente ✓');
