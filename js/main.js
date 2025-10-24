// main.js
// Propósito: Animaciones, efectos y manejo del formulario de contacto (envío AJAX).
// Funciones principales:
// - optimizePerformance: reduce la frecuencia de ejecución en scroll
// - isInViewport: detecta si un elemento está visible en pantalla
// - animateSections: aplica animaciones a secciones al hacer scroll
// - manejo de formulario: envía los datos a /api/contact

document.addEventListener('DOMContentLoaded', () => {
    // Configuración de rendimiento
    const optimizePerformance = () => {
        let scrollTimeout;
        const onScroll = (callback) => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    callback();
                }, 16); // ~60fps
            }
        };
        return onScroll;
    };

    // Detector de elementos en viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Aplicar animaciones a las secciones
    const sections = document.querySelectorAll('.section');
    const animateSections = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Estilo inicial para las secciones
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Eventos de scroll
    window.addEventListener('scroll', animateSections);
    animateSections(); // Animar secciones visibles inicialmente

    // Efecto hover en los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 5px 15px rgba(255, 68, 68, 0.3)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Simple validación
            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            try {
                contactStatus.textContent = 'Enviando...';
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!resp.ok) {
                    const err = await resp.json();
                    contactStatus.textContent = 'Error: ' + (err.error || resp.statusText);
                    return;
                }

                const result = await resp.json();
                contactStatus.textContent = 'Mensaje enviado. ¡Gracias!';
                contactForm.reset();
            } catch (error) {
                contactStatus.textContent = 'Error al enviar. Intenta más tarde.';
                console.error('Contact submit error:', error);
            }
        });
    }
});