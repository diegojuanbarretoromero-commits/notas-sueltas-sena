// ================================================================
// NOTAS SUELTAS — js/historias.js
// Lógica exclusiva de la página HISTORIAS (historias.html):
// búsqueda en tiempo real por título/extracto,
// filtrado por categoría y toggle de chips de categoría.
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  initStorySearch();
  initCategoryChips();
});

// ── BÚSQUEDA EN TIEMPO REAL ──────────────────────────────────────
// Filtra las tarjetas .story-card según el texto escrito en el
// input de búsqueda, comparando contra título y extracto.
function initStorySearch() {
  const searchInput = document.getElementById('historias-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.story-card');

    cards.forEach(card => {
      const title   = card.querySelector('.story-card-title')?.textContent.toLowerCase()   || '';
      const excerpt = card.querySelector('.story-card-excerpt')?.textContent.toLowerCase() || '';
      const matches = query === '' || title.includes(query) || excerpt.includes(query);
      // Ocultar o mostrar con transición suave
      card.style.opacity    = matches ? '1' : '0.2';
      card.style.pointerEvents = matches ? 'all' : 'none';
    });
  });
}

// ── FILTRADO POR CATEGORÍA ───────────────────────────────────────
// Toggle de chip activo + filtrado de tarjetas por la categoría
// almacenada en el atributo data-category de cada .story-card.
function initCategoryChips() {
  const chips = document.querySelectorAll('.category-chip');
  if (chips.length === 0) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Activar el chip clicado
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selected = chip.getAttribute('data-category') || 'all';
      const cards = document.querySelectorAll('.story-card');

      cards.forEach(card => {
        const cat     = card.getAttribute('data-category') || 'all';
        const matches = selected === 'all' || cat === selected;
        card.style.opacity       = matches ? '1' : '0.2';
        card.style.pointerEvents = matches ? 'all' : 'none';
      });
    });
  });
}
