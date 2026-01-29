// ========================================
// Preloader
// ========================================
console.log('🚀 Script GestraCOO iniciado correctamente');

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
// Esperar a que el DOM esté completamente cargado
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM cargado - Inicializando componentes');

    // ========================================
    // Menu Mobile Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    if (menuToggle && navMenu) {
        // Abrir/cerrar menú con el botón toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
        });

        // Cerrar menú al hacer clic en el overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        }

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
            });
        });
    }

    // ========================================
    // Botones CTA - Solicitar demo/prueba gratis
    // ========================================
    // Botón del header - abre el modal
    const navDemoBtn = document.getElementById('nav-demo-btn');
    if (navDemoBtn) {
        navDemoBtn.addEventListener('click', () => {
            const betaModal = document.getElementById('beta-modal');
            if (betaModal) {
                betaModal.classList.add('active');
                console.log('Modal abierto desde botón del header');
            }
        });
    }

    // Botón del hero - va a la sección de contacto
    const heroBtn = document.getElementById('beta-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // Scroll Animations - Sistema Mejorado
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Animar títulos de secciones con efecto fade-in-up
    const sectionTitles = document.querySelectorAll('.section-title, .propuesta-title, .porque-title, .clientes-title, .planes-title, .confianza-title');
    sectionTitles.forEach(title => {
        title.classList.add('animate-fade-in-up');
        observer.observe(title);
    });

    // Animar contenido de propuesta con slide-in-left
    const propuestaContent = document.querySelector('.propuesta-content');
    if (propuestaContent) {
        propuestaContent.classList.add('animate-slide-in-left');
        observer.observe(propuestaContent);
    }

    // Animar imágenes de propuesta con slide-in-right
    const propuestaImages = document.querySelectorAll('.propuesta-img-wrapper');
    propuestaImages.forEach((img, index) => {
        img.classList.add('animate-slide-in-right');
        img.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(img);
    });

    // Animar items de lista con bounce-in
    const propuestaListItems = document.querySelectorAll('.propuesta-list li');
    propuestaListItems.forEach((item, index) => {
        item.classList.add('animate-bounce-in');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animar columnas de "Por Qué" con zoom-in
    const porqueColumns = document.querySelectorAll('.porque-column');
    porqueColumns.forEach((col, index) => {
        col.classList.add('animate-zoom-in');
        col.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(col);
    });

    // Animar imagen de "Por Qué" con rotate-in
    const porqueImage = document.querySelector('.porque-img-wrapper');
    if (porqueImage) {
        porqueImage.classList.add('animate-rotate-in');
        observer.observe(porqueImage);
    }

    // Animar lista de "Por Qué" con slide-in-left
    const porqueListItems = document.querySelectorAll('.porque-list li');
    porqueListItems.forEach((item, index) => {
        item.classList.add('animate-slide-in-left');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animar testimonios con flip-in
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    testimonioCards.forEach((card, index) => {
        card.classList.add('animate-flip-in');
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    // Animar items de confianza con scale-up
    const confianzaItems = document.querySelectorAll('.confianza-item');
    confianzaItems.forEach((item, index) => {
        item.classList.add('animate-scale-up');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animar subtítulo de planes con fade-in
    const planesSubtitle = document.querySelector('.planes-subtitle');
    if (planesSubtitle) {
        planesSubtitle.classList.add('animate-fade-in-up');
        observer.observe(planesSubtitle);
    }

    // Animar tarjetas de planes con zoom-in
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.classList.add('animate-zoom-in');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animar CTA final con pulse
    const ctaSection = document.querySelector('.section-cta');
    if (ctaSection) {
        ctaSection.classList.add('animate-fade-in-up');
        observer.observe(ctaSection);
    }

    // Animar botones con bounce
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((btn, index) => {
        btn.classList.add('animate-bounce-in');
        btn.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(btn);
    });

    // Animar tarjetas de funcionalidades
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('animate-slide-in-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animar beneficios
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.classList.add('animate-slide-in-up');
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
            
            // Si es el botón de demo-form, abrir el modal directamente
            if (targetId === '#demo-form') {
                const betaModal = document.getElementById('beta-modal');
                if (betaModal) {
                    betaModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    console.log('Modal abierto desde botón CTA final');
                }
                return;
            }
            
            if (targetId === '#') {
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
    const navLinks = document.querySelectorAll('.nav-menu a');
    
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

    if (nav) {
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
    }

    // ========================================
    // Features Slider
    // ========================================
    const featuresGrid = document.querySelector('.features-grid');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (featuresGrid && scrollLeftBtn && scrollRightBtn) {
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
    }

}); // Fin del DOMContentLoaded principal

// ========================================
// Modal del Formulario Beta
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const betaBtn = document.getElementById('beta-btn');
    const betaModal = document.getElementById('beta-modal');
    const modalClose = document.querySelector('.modal-close');
    const betaForm = document.getElementById('beta-form');

    if (!betaBtn || !betaModal || !modalClose || !betaForm) {
        console.error('Elementos del modal no encontrados');
        console.log('betaBtn:', betaBtn);
        console.log('betaModal:', betaModal);
        console.log('modalClose:', modalClose);
        console.log('betaForm:', betaForm);
        return;
    }
    
    console.log('Todos los elementos del formulario cargados correctamente ✓');

    // Función para restaurar textos originales del modal (prueba gratis)
    function restaurarTextosPruebaGratis() {
        const modalTitle = betaModal.querySelector('h2');
        const modalDescription = betaModal.querySelector('.modal-description');
        const submitButton = betaModal.querySelector('.form-submit-btn');
        
        if (modalTitle) {
            modalTitle.textContent = 'Solicita tu Mes Gratis de Prueba';
        }
        if (modalDescription) {
            modalDescription.textContent = 'Nuestro equipo se pondrá en contacto contigo para activar tu mes gratuito de prueba de GestraCOO. Elige el plan que más te interesa.';
        }
        if (submitButton) {
            submitButton.textContent = 'Solicitar mes gratis de prueba';
        }
    }

    // Función para cambiar textos a consulta de plan
    function cambiarTextosConsultaPlan() {
        const modalTitle = betaModal.querySelector('h2');
        const modalDescription = betaModal.querySelector('.modal-description');
        const submitButton = betaModal.querySelector('.form-submit-btn');
        
        if (modalTitle) {
            modalTitle.textContent = 'Consulta tu Plan GestraCOO';
        }
        if (modalDescription) {
            modalDescription.textContent = 'Completa el formulario y nos pondremos en contacto contigo para ofrecerte información detallada del plan que te interesa.';
        }
        if (submitButton) {
            submitButton.textContent = 'Enviar consulta';
        }
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

    // Abrir modal con botón "Solicitar Prueba Gratis"
    betaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Botón Solicitar Prueba Gratis clickeado');
        restaurarTextosPruebaGratis();
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
        const plan = document.getElementById('plan').value;
        const empresa = document.getElementById('empresa').value;
        
        // URL de tu Google Apps Script Web App
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwWGKQqaVNKsxjMBj4Uo9zIXMJk3EgCiC9uddpWi4Vtu2NUpEm6aJ10H2nUaoLdDnix/exec';
        
        const formData = {
            nombre: nombre,
            correo: correo,
            pais: pais,
            telefono: telefono,
            plan: plan,
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
            
            console.log('✓ Solicitud de mes gratis enviada:', formData);
            
            // Cerrar modal del formulario
            betaModal.classList.remove('active');
            betaForm.reset();
            
            // Resetear el código de país al valor por defecto (Chile)
            if (countryCode) {
                countryCode.textContent = '+56';
            }
            
            // Mostrar modal de éxito
            const successModal = document.getElementById('success-modal');
            successModal.classList.add('active');
            
        } catch (error) {
            console.error('✗ Error al enviar datos:', error);
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

    // ========================================
    // Botones de Consultar Plan
    // ========================================
    const planButtons = document.querySelectorAll('.plan-btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Abrir el modal de beta (formulario de contacto)
            if (betaModal) {
                // Cambiar los textos del modal para consulta de planes
                cambiarTextosConsultaPlan();
                betaModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// ========================================
// Log de carga completada
// ========================================
console.log('GestraCOO Landing Page cargada correctamente ✓');
