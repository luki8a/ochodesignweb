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

// Detección de sección actual y transparencia del header
document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Función para actualizar la navegación basada en el scroll
  function updateNav() {
    // Encontrar la posición actual del scroll
    const scrollY = window.scrollY;
    
    // Verificar si estamos más allá del hero para aplicar transparencia
    const heroHeight = document.querySelector('#inicio').offsetHeight;
    if (scrollY > heroHeight / 2) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Para cada sección, verificar si está en la vista
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Offset para activar un poco antes
      
      // Si la posición de scroll está dentro de esta sección
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remover clase active de todos los enlaces
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Evento de scroll
  window.addEventListener('scroll', updateNav);
  
  // Llamar la función una vez al cargar la página
  updateNav();
});

// =========================
// CARRUSEL DE TESTIMONIOS DINÁMICO
// =========================
document.addEventListener('DOMContentLoaded', function() {
  const testimoniosCarrusel = document.querySelector('.testimonios-carrusel');
  const paginacionMobile = document.getElementById('testimoniosPaginacionMobile');
  
  if (testimoniosCarrusel) {
    let isScrolling;
    const cards = testimoniosCarrusel.querySelectorAll('.testimonio-card');
    
    // Crear los puntos de navegación dinámicamente
    if (paginacionMobile) {
      cards.forEach((_, index) => {
        const punto = document.createElement('div');
        punto.classList.add('punto-mobile');
        if (index === 0) punto.classList.add('active');
        
        // Al hacer click en un punto, navegar al testimonio correspondiente
        punto.addEventListener('click', () => {
          const carouselWidth = testimoniosCarrusel.offsetWidth;
          testimoniosCarrusel.scrollTo({
            left: index * carouselWidth,
            behavior: 'smooth'
          });
        });
        
        paginacionMobile.appendChild(punto);
      });
    }
    
    // Ocultar indicador de swipe después del primer swipe
    testimoniosCarrusel.addEventListener('scroll', function() {
      const swipeIndicator = document.querySelector('.swipe-indicator');
      if (swipeIndicator) {
        // Clear timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
          swipeIndicator.style.opacity = '0';
          setTimeout(() => {
            swipeIndicator.style.display = 'none';
          }, 500);
        }, 100);
      }
      
      // Actualizar los puntos de navegación según la posición del scroll
      if (paginacionMobile) {
        const scrollPosition = this.scrollLeft;
        const carouselWidth = this.offsetWidth;
        const cardIndex = Math.round(scrollPosition / carouselWidth);
        
        // Actualizar punto activo
        const puntos = paginacionMobile.querySelectorAll('.punto-mobile');
        puntos.forEach((punto, index) => {
          if (index === cardIndex) {
            punto.classList.add('active');
          } else {
            punto.classList.remove('active');
          }
        });
        
        // Efecto visual para el testimonio actual
        cards.forEach((card, index) => {
          if (index === cardIndex) {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
          } else {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0.8';
          }
        });
      }
    });
    
    // Snap effect mejorado al finalizar el swipe
    testimoniosCarrusel.addEventListener('touchend', function() {
      const carouselWidth = this.offsetWidth;
      const scrollLeft = this.scrollLeft;
      
      // Calcular qué card debería ser visible
      const cardIndex = Math.round(scrollLeft / carouselWidth);
      
      // Animación suave hasta la card correcta
      this.scrollTo({
        left: cardIndex * carouselWidth,
        behavior: 'smooth'
      });
    });
  }
});
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

// Mostrar modal de éxito al enviar formularios
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('modal-exito').classList.remove('oculto');
    // Opcional: resetear el formulario
    form.reset();
  });
});

// Cerrar modal con la cruz o el botón continuar
document.getElementById('cerrarModalExito').onclick = cerrarModal;
document.getElementById('continuarModalExito').onclick = cerrarModal;

function cerrarModal() {
  document.getElementById('modal-exito').classList.add('oculto');
}


// Botón de Scroll Up
const btnScrollUp = document.getElementById('btnScrollUp');
const heroSection = document.getElementById('inicio');

// Mostrar/ocultar el botón al hacer scroll
window.addEventListener('scroll', () => {
  // Muestra el botón después de 300px de scroll
  if (window.scrollY > 300) {
    btnScrollUp.classList.add('visible');
  } else {
    btnScrollUp.classList.remove('visible');
  }
  
  // Si hay una sección hero, oculta el botón cuando estés en ella
  if (heroSection) {
    const heroPosition = heroSection.getBoundingClientRect();
    if (heroPosition.top >= 0 && heroPosition.bottom >= 0) {
      btnScrollUp.classList.remove('visible');
    }
  }
});

// Función para volver arriba con animación suave
btnScrollUp.addEventListener('click', () => {
  // Scroll suave hacia arriba
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Control mejorado del mensaje emergente de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  const wspMsgBubble = document.getElementById('wspMsgBubble');
  const wspClose = document.getElementById('wspClose');
  const btnWhatsapp = document.querySelector('.btn-whatsapp');
  
  if (!wspMsgBubble || !wspClose || !btnWhatsapp) return;
  
  // Variables para controlar tiempos
  const showDuration = 7000; // 7 segundos mostrado
  const reappearInterval = 300000; // 5 minutos (300,000 ms)
  let messageTimer = null;
  let reappearTimer = null;
  
  // Función para mostrar el mensaje
  function showMessage() {
    wspMsgBubble.classList.add('show');
    
    // Cerrar automáticamente después de 7 segundos
    messageTimer = setTimeout(() => {
      hideMessage();
    }, showDuration);
  }
  
  // Función para ocultar el mensaje
  function hideMessage() {
    wspMsgBubble.classList.remove('show');
    clearTimeout(messageTimer);
    
    // Programar reaparición después de 5 minutos
    reappearTimer = setTimeout(() => {
      showMessage();
    }, reappearInterval);
  }
  
  // Mostrar mensaje inicial después de 5 segundos de cargar la página
  setTimeout(() => {
    showMessage();
  }, 5000);
  
  // Cerrar mensaje al hacer clic en el botón de cerrar
  wspClose.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Evita que el clic se propague al fondo
    hideMessage();
  });
  
  // También cerrar mensaje al hacer clic en el botón de WhatsApp
  btnWhatsapp.addEventListener('click', function() {
    hideMessage();
    // No programar reaparición si el usuario ha interactuado con WhatsApp
    clearTimeout(reappearTimer);
  });
  
  // Reiniciar los timers si el usuario cambia de pestaña y vuelve
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Si la página está oculta, limpiamos los timers
      clearTimeout(messageTimer);
      clearTimeout(reappearTimer);
    } else {
      // Si la página vuelve a estar visible, reiniciamos el timer de reaparición
      clearTimeout(reappearTimer);
      reappearTimer = setTimeout(() => {
        showMessage();
      }, reappearInterval);
    }
  });
  
  // Ajuste de posición para dispositivos móviles
  function adjustPositionForMobile() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Asegurarse de que el globo esté posicionado correctamente en móvil
      const whatsappBtn = btnWhatsapp.getBoundingClientRect();
      wspMsgBubble.style.bottom = (window.innerHeight - whatsappBtn.top + 15) + 'px';
    } else {
      wspMsgBubble.style.bottom = '85px'; // Valor por defecto para desktop
    }
  }
  
  // Llamamos a la función al cargar y al cambiar el tamaño de la ventana
  adjustPositionForMobile();
  window.addEventListener('resize', adjustPositionForMobile);
});

// =========================
// FORMULARIO NEWSLETTER
// =========================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar los datos a un servicio de newsletter
    // Por ahora solo mostramos el modal de éxito
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // Mostrar el modal de éxito con un mensaje personalizado
      const modalExito = document.getElementById('modal-exito');
      if (modalExito) {
        const modalTitle = modalExito.querySelector('h3');
        const modalText = modalExito.querySelector('p');
        
        if (modalTitle) modalTitle.textContent = '¡Te has suscrito!';
        if (modalText) modalText.textContent = `Gracias por suscribirte a nuestro newsletter con ${email}. ¡Te mantendremos actualizado!`;
        
        modalExito.classList.remove('oculto');
        
        // Resetear el formulario después de enviar
        this.reset();
        
        // Animación de éxito en el botón
        const button = this.querySelector('button');
        if (button) {
          // Guardar el texto original
          const originalText = button.innerHTML;
          // Mostrar el ícono de éxito
          button.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
          button.classList.add('success');
          
          // Volver al estado original después de 3 segundos
          setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('success');
          }, 3000);
        }
      }
    }
  });
}
