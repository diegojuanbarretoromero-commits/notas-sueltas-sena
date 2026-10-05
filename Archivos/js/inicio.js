// ================================================================
// NOTAS SUELTAS — js/inicio.js
// Lógica exclusiva de la página INICIO (index.html):
// carrusel de vídeos horizontales con flechas y chips de género.
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initGenreChips();
});

// ── CARRUSEL DE VÍDEOS CON FLECHAS ──────────────────────────────
// Hace scroll horizontal en el .carousel-track cuando se pulsas
// los botones de flecha izquierda / derecha.
function initCarousel() {
  // Soporta múltiples carruseles en la misma página
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-arrow--prev');
    const nextBtn = container.querySelector('.carousel-arrow--next');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
  });
}

// ── CHIPS DE GÉNERO ──────────────────────────────────────────────
// Toggle de clase .active en los chips de género / período para
// simular filtrado visual (la lógica de filtrado real se añadiría aquí).
function initGenreChips() {
  document.querySelectorAll('.genre-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      // Desactivar todos los chips del grupo
      chip.closest('.genre-chips-row, .category-chips')
          ?.querySelectorAll('.genre-chip, .category-chip')
          .forEach(c => c.classList.remove('active'));
      // Activar el clicado
      chip.classList.add('active');
    });
  });
}
