// Menú mobile y scroll suave

document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Cerrar menú al hacer click en un link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Scroll suave y activar link actual
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80;
    // Transparencia en nav__list al hacer scroll usando clase
    const navList = document.querySelector('.nav__list');
    if (window.scrollY > 30) {
      navList.classList.add('scrolled');
    } else {
      navList.classList.remove('scrolled');
    }
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = section.getAttribute('id');
        const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  });

  // --- RESALTADO DE MENÚ SEGÚN SCROLL (solo una vez, sin duplicados) ---
  (function() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = [
      document.getElementById('inicio'),
      document.getElementById('sobremi'),
      document.getElementById('proyectos'),
      document.getElementById('contacto')
    ];
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.scrollY + 120; // margen para header fijo
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollY) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  })();

  // Efecto animación al aparecer (fade-in)
  const fadeEls = document.querySelectorAll('.project-card, .about__img, .about__info, .contact__form');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));

  // Animación de burbujas flotantes en hero
  const initHeroBubbles = () => {
    const bubbles = document.querySelectorAll('.bubble');

    if (bubbles.length === 0) return;

    bubbles.forEach((bubble, index) => {
      // Animación inicial con delay
      setTimeout(() => {
        bubble.style.opacity = '0.8';
        bubble.style.transform = 'translateY(0)';
      }, index * 300);

      // Movimiento aleatorio sutil cada 4-6 segundos
      const moveRandomly = () => {
        if (window.innerWidth > 900) {
          const randomX = Math.random() * 30 - 15; // -15px a +15px
          const randomY = Math.random() * 30 - 15; // -15px a +15px

          bubble.style.transition = 'transform 2s ease-in-out';
          bubble.style.transform = `translate(${randomX}px, ${randomY}px)`;

          // Volver a la posición original después de 3 segundos
          setTimeout(() => {
            bubble.style.transform = 'translate(0, 0)';
          }, 3000);
        }
      };

      // Iniciar movimiento aleatorio
      const intervalId = setInterval(moveRandomly, 4000 + Math.random() * 2000);

      bubble.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        bubble.style.pointerEvents = 'auto';
        bubble.style.transition = 'all 0.3s ease';
        bubble.style.transform = 'scale(1.15) translateY(-8px)';
        bubble.style.boxShadow = '0 15px 40px rgba(108, 99, 255, 0.4)';
        bubble.style.background = 'rgba(108, 99, 255, 0.95)';
        bubble.style.color = '#fff';
      });

      bubble.addEventListener('mouseleave', () => {
        bubble.style.transition = 'all 0.3s ease';
        bubble.style.transform = 'scale(1) translateY(0)';
      });
    });
  };

  // Inicializar burbujas si estamos en desktop
  if (window.innerWidth > 900) {
    setTimeout(initHeroBubbles, 500);
  }

  // Reinicializar en resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setTimeout(initHeroBubbles, 300);
    }
  });

  // Animación fade-up para hero y otros elementos
  const fadeUpEls = document.querySelectorAll('.fade-up');
  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  fadeUpEls.forEach(el => fadeUpObserver.observe(el));
});

// Animación fade-in
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in {
      opacity: 1 !important;
      transform: none !important;
      transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1);
    }
    .project-card, .about__img, .about__info, .contact__form {
      opacity: 0;
      transform: translateY(40px);
    }
  `;
  document.head.appendChild(style);
});

// Animación para completar la línea de tiempo y mostrar ítems al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline__item');
  const timelineLine = document.querySelector('.timeline__line');

  if (timelineItems.length === 0 || !timelineLine) return;

  const updateLineHeight = () => {
    const firstItem = timelineItems[0].getBoundingClientRect();
    const lastItem = timelineItems[timelineItems.length - 1].getBoundingClientRect();

    const scrollTop = window.scrollY;
    const lineHeight = Math.min(
      lastItem.top + scrollTop - firstItem.top,
      window.innerHeight
    );

    timelineLine.style.height = `${lineHeight}px`;
    timelineLine.style.background = `linear-gradient(to bottom, var(--color-accent) ${lineHeight}px, #e0e0e0)`;
  };

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.5 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  window.addEventListener('scroll', updateLineHeight);
  updateLineHeight();
});

// Timeline scroll-activated animation
window.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.timeline__container');
  const line = document.querySelector('.timeline__line');
  const items = document.querySelectorAll('.timeline__item');

  if (!timeline || !line || items.length === 0) return;

  function animateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Calcular cuánto de la timeline está visible
    let visibleHeight = Math.min(windowHeight - rect.top, rect.height);
    visibleHeight = Math.max(0, visibleHeight);
    line.style.height = visibleHeight + 'px';

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowHeight - 80) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', animateTimeline);
  window.addEventListener('resize', animateTimeline);
  animateTimeline();
});

// Mostrar/ocultar scroll-to-top
(function() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) scrollBtn.style.display = 'none';
  window.addEventListener('scroll', function() {
    if (!scrollBtn) return;
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
})();

// Inicialmente oculto
const scrollBtnInit = document.querySelector('.scroll-to-top');
if (scrollBtnInit) scrollBtnInit.style.display = 'none';

// Scroll suave al hacer clic en el botón de volver al inicio
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Animación burbuja flotante en sección gracias
function startGraciasBubble() {
  const section = document.querySelector('.gracias-section');
  if (!section) return;

  // Crear burbuja
  let bubble = document.createElement('div');
  bubble.className = 'gracias-bubble';
  bubble.innerHTML = '<span>¡gracias<br>por visitar!</span>';
  section.appendChild(bubble);

  // Colores de borde, texto y shadow
  const colors = [
    {border: '#6c63ff', text: '#6c63ff', shadow: '0 8px 24px #6c63ff99'},
    {border: '#ff4747', text: '#ff4747', shadow: '0 8px 24px #ff474799'}
  ];
  let colorIndex = 0;

  // Posición y velocidad inicial aleatoria
  let size = 90;
  let x = Math.random() * (section.offsetWidth - size);
  let y = Math.random() * (section.offsetHeight - size);
  let dx = (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? 1 : -1);
  let dy = (Math.random() * 1.2 + 0.4) * (Math.random() < 0.5 ? 1 : -1);

  function move() {
    x += dx;
    y += dy;
    let changed = false;
    if (x <= 0 || x >= section.offsetWidth - size) {
      dx *= -1;
      changed = true;
    }
    if (y <= 0 || y >= section.offsetHeight - size) {
      dy *= -1;
      changed = true;
    }
    if (changed) {
      colorIndex = (colorIndex + 1) % colors.length;
      bubble.style.borderColor = colors[colorIndex].border;
      bubble.style.color = colors[colorIndex].text;
      bubble.style.boxShadow = colors[colorIndex].shadow;
    }
    bubble.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(move);
  }
  
  // Inicializar color
  bubble.style.borderColor = colors[0].border;
  bubble.style.color = colors[0].text;
  bubble.style.boxShadow = colors[0].shadow;
  move();
}

document.addEventListener('DOMContentLoaded', startGraciasBubble);

// Explosión y reposicionamiento aleatorio de tech-bubble en hero
function enableTechBubbleExplosion() {
  const hero = document.querySelector('.hero');
  const bubbles = document.querySelectorAll('.tech-bubble');
  const content = document.querySelector('.hero__content');
  if (!hero || !bubbles.length) return;

  function isOverlapping(x, y, bubble, contentRect) {
    const bubbleRect = {left: x, top: y, right: x + bubble.offsetWidth, bottom: y + bubble.offsetHeight};
    return !(
      bubbleRect.right < contentRect.left - hero.offsetLeft - 40 ||
      bubbleRect.left > contentRect.right - hero.offsetLeft + 40 ||
      bubbleRect.bottom < contentRect.top - hero.offsetTop - 40 ||
      bubbleRect.top > contentRect.bottom - hero.offsetTop + 40
    );
  }

  bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
      // Desaparece rápido
      bubble.style.transition = 'opacity 0.18s';
      bubble.style.opacity = '0';
      setTimeout(() => {
        const heroRect = hero.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        let x, y, tries = 0;
        do {
          x = Math.random() * (heroRect.width - bubble.offsetWidth - 40) + 20;
          y = Math.random() * (heroRect.height - bubble.offsetHeight - 40) + 20;
          tries++;
        } while (isOverlapping(x + heroRect.left, y + heroRect.top, bubble, contentRect) && tries < 30);
        bubble.style.transition = 'none';
        bubble.style.left = x + 'px';
        bubble.style.top = y + 'px';
        // Reaparece igual que antes
        setTimeout(() => {
          bubble.style.transition = 'opacity 0.22s';
          bubble.style.opacity = '0.85';
        }, 30);
      }, 180);
    });
  });
}
document.addEventListener('DOMContentLoaded', enableTechBubbleExplosion);

// JavaScript para el efecto de burbujas en el hero
const bubbles = document.querySelectorAll('.bubble');
const hero = document.querySelector('.hero');

function getRandomPositionAroundContent() {
  const heroRect = hero.getBoundingClientRect();
  const contentRect = document.querySelector('.hero__content').getBoundingClientRect();

  const padding = 50; // Espacio alrededor del contenedor central
  const x = Math.random() * (contentRect.width + padding * 2) - padding + contentRect.left - heroRect.left;
  const y = Math.random() * (contentRect.height + padding * 2) - padding + contentRect.top - heroRect.top;

  return { x, y };
}

function isOverlapping(x, y, bubble, bubbles) {
  const bubbleRect = {
    left: x,
    top: y,
    right: x + bubble.offsetWidth,
    bottom: y + bubble.offsetHeight
  };

  return bubbles.some(otherBubble => {
    if (otherBubble === bubble) return false;
    const otherRect = otherBubble.getBoundingClientRect();
    return !(
      bubbleRect.right < otherRect.left ||
      bubbleRect.left > otherRect.right ||
      bubbleRect.bottom < otherRect.top ||
      bubbleRect.top > otherRect.bottom
    );
  });
}

function getRandomPositionAvoidingOverlap(bubble, bubbles) {
  const heroRect = hero.getBoundingClientRect();
  let x, y, tries = 0;

  do {
    x = Math.random() * (heroRect.width - bubble.offsetWidth);
    y = Math.random() * (heroRect.height - bubble.offsetHeight);
    tries++;
  } while (isOverlapping(x, y, bubble, bubbles) && tries < 50);

  return { x, y };
}

function moveBubble(bubble) {
  const heroRect = hero.getBoundingClientRect();
  const x = Math.random() * (heroRect.width - bubble.offsetWidth);
  const y = Math.random() * (heroRect.height - bubble.offsetHeight);
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
}

bubbles.forEach(bubble => {
  // Posicionar inicialmente las burbujas
  moveBubble(bubble);

  bubble.addEventListener('animationend', () => {
    moveBubble(bubble);
    bubble.style.opacity = 1;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.querySelectorAll(".bubble");

  bubbles.forEach((bubble) => {
    const randomizePosition = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      bubble.style.transform = `translate(${x}px, ${y}px)`;
    };

    setInterval(randomizePosition, 5000);
  });
});

// Hero Section Animations
document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect for skill bubbles
  const bubbles = document.querySelectorAll('.skill-bubble');
  let mouseX = 0;
  let mouseY = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate bubbles
  function animateBubbles() {
    bubbles.forEach((bubble, index) => {
      const rect = bubble.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;

      // Calculate distance between mouse and bubble center
      const deltaX = mouseX - bubbleCenterX;
      const deltaY = mouseY - bubbleCenterY;

      // Create subtle movement based on mouse position
      const movement = 30; // maximum pixels to move
      const moveX = (deltaX / windowWidth) * movement;
      const moveY = (deltaY / windowHeight) * movement;

      // Apply transform with different delays for each bubble
      bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateBubbles);
  }

  // Start animation
  animateBubbles();

  // Update window dimensions on resize
  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });
});

// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      // Cambiar el texto del botón mientras se envía
      btnText.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Mostrar mensaje de éxito
          btnText.textContent = '¡Mensaje enviado!';
          submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
          
          // Limpiar el formulario
          this.reset();
          
          // Restaurar el botón después de 3 segundos
          setTimeout(() => {
            btnText.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Error al enviar el formulario');
        }
      } catch (error) {
        // Mostrar mensaje de error
        btnText.textContent = 'Error al enviar';
        submitBtn.style.background = 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)';
        
        // Restaurar el botón después de 3 segundos
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const wspMsg = document.getElementById('wsp-msg');

  // Mostrar mensaje después de 5 segundos
  setTimeout(() => {
    if (wspMsg) {
      wspMsg.style.display = 'flex';
      setTimeout(() => {
        closeWspMsg();
      }, 7000); // Ocultar automáticamente después de 7 segundos
    }
  }, 5000);
});

function closeWspMsg() {
  const wspMsg = document.getElementById('wsp-msg');
  if (wspMsg) wspMsg.style.display = 'none';
}
