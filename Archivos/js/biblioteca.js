// ================================================================
// NOTAS SUELTAS — js/biblioteca.js
// Lógica exclusiva de la página MI BIBLIOTECA (biblioteca.html):
// animación de barras de progreso de logros al cargar la página.
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupBibliotecaLogros();
});

// ── ANIMACIÓN DE BARRAS DE PROGRESO ─────────────────────────────
// Lee el atributo data-progress de cada .logro-bar-fill y asigna
// ese valor como width después de un breve retardo, activando la
// transición CSS de relleno (width 1.2s ease en biblioteca.css).
function setupBibliotecaLogros() {
  const progressFills = document.querySelectorAll('.logro-bar-fill');
  if (progressFills.length === 0) return;

  // Retardo pequeño para que la animación sea visible al cargar
  setTimeout(() => {
    progressFills.forEach(fill => {
      const targetPercent = fill.getAttribute('data-progress') || '0%';
      fill.style.width = targetPercent;
    });
  }, 300);
}
