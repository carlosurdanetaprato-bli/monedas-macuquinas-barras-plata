document.addEventListener('DOMContentLoaded', () => {
  const puzzleGrid = document.getElementById('puzzle-grid');
  const pieces = document.querySelectorAll('.puzzle-piece');
  const splashContainer = document.getElementById('splash-container');
  const btnEntrar = document.getElementById('btn-entrar');

  // 1. Asigna posiciones y rotaciones aleatorias a cada pieza al iniciar
  pieces.forEach(piece => {
    const randomX = (Math.random() - 0.5) * 600;
    const randomY = (Math.random() - 0.5) * 600;
    const randomRot = (Math.random() - 0.5) * 360;

    piece.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(0.5)`;
  });

  // 2. Activa el ensamblaje automáticamente
  setTimeout(() => {
    if (puzzleGrid) {
      puzzleGrid.classList.add('assembled');
    }
  }, 300);

  // 3. Función para ir al sitio principal
  let redirigiendo = false;
  function irAlSitio(e) {
    if (redirigiendo) return; // Evita ejecuciones duplicadas si hace varios clics rápidos
    redirigiendo = true;

    if (e) e.stopPropagation();

    splashContainer.style.transition = 'opacity 0.6s ease';
    splashContainer.style.opacity = '0';
    
    setTimeout(() => {
      // Redirige a la página principal con el contenido (inicio.html)
      window.location.href = 'inicio.html';
    }, 600);
  }

  // Eventos de clic
  if (splashContainer) {
    splashContainer.addEventListener('click', irAlSitio);
  }

  if (btnEntrar) {
    btnEntrar.addEventListener('click', irAlSitio);
  }
});

// Abrir el modal del proyecto
function openAboutModal(e) {
  if (e) e.stopPropagation(); // Evita redirigir si el splash-container tiene evento click
  const modal = document.getElementById('modal-about-project');
  if (modal) {
    modal.classList.add('active');
  }
}

// Cerrar el modal con el botón 'X'
function closeAboutModal() {
  const modal = document.getElementById('modal-about-project');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Cerrar al hacer clic fuera de la tarjeta
function closeAboutOuter(e) {
  if (e.target.id === 'modal-about-project') {
    closeAboutModal();
  }
}