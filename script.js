// =========================
// MENÚ HAMBURGUESA
// =========================
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
const navLinks = document.getElementById('navLinks');

// Verifica que los elementos existen antes de agregar eventos
if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

if (navLinks && nav) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
}

// =========================
// HEADER SCROLL EFFECT
// =========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if(window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================
const animElements = document.querySelectorAll('.anim-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

animElements.forEach(el => observer.observe(el));

// =========================
// CARRUSEL DE TESTIMONIOS DINÁMICO
// =========================
const testimonios = document.querySelectorAll('.testimonio-card');
const puntos = document.querySelectorAll('.testimonios-paginacion .punto');
const prevBtn = document.querySelector('.testi-prev');
const nextBtn = document.querySelector('.testi-next');
let testiIndex = 0;
let testiInterval = null;

function showTestimonio(idx) {
    testimonios.forEach((t, i) => {
        if (i === idx) {
            t.classList.add('active', 'fade-in');
            t.classList.remove('fade-out');
        } else {
            t.classList.remove('active', 'fade-in');
            t.classList.add('fade-out');
        }
    });
    puntos.forEach((p, i) => {
        p.classList.toggle('active', i === idx);
    });
}

function nextTestimonio() {
    testiIndex = (testiIndex + 1) % testimonios.length;
    showTestimonio(testiIndex);
}

function prevTestimonio() {
    testiIndex = (testiIndex - 1 + testimonios.length) % testimonios.length;
    showTestimonio(testiIndex);
}

function goToTestimonio(idx) {
    testiIndex = idx;
    showTestimonio(testiIndex);
}

function startTestiInterval() {
    testiInterval = setInterval(nextTestimonio, 5000);
}

function stopTestiInterval() {
    clearInterval(testiInterval);
}

if (testimonios.length > 0) {
    showTestimonio(testiIndex);
    startTestiInterval();

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonio();
            stopTestiInterval();
            startTestiInterval();
        });
        nextBtn.addEventListener('click', () => {
            nextTestimonio();
            stopTestiInterval();
            startTestiInterval();
        });
    }

    puntos.forEach((p, i) => {
        p.addEventListener('click', () => {
            goToTestimonio(i);
            stopTestiInterval();
            startTestiInterval();
        });
    });
}

// =========================
// CARRUSEL DE PROYECTOS (opcional)
// =========================
// Puedes implementar lógica similar si deseas un carrusel en proyectos.


// Enviar formulario de contacto por fetch al backend
const contactoForm = document.querySelector('.contacto-form');
if (contactoForm) {
    contactoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = this.querySelector('input[name="nombre"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const mensaje = this.querySelector('textarea[name="mensaje"]').value;

       const res = await fetch('http://localhost:4000/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, mensaje })
});

if (res.ok) {
    alert('¡Mensaje enviado correctamente!');
    this.reset();
} else {
    const data = await res.json();
    alert('Error: ' + (data.error || data.msg || 'No se pudo enviar el mensaje.'));
}
    });
}