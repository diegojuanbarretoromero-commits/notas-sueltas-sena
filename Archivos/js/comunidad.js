// ================================================================
// NOTAS SUELTAS — js/comunidad.js
// Lógica exclusiva de la página COMUNIDAD (comunidad.html):
// modal de nuevo post, publicación dinámica en el feed
// y toggle de like en los posts.
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupComunidadModal();
});

// ── MODAL DE NUEVO POST ──────────────────────────────────────────
// Gestiona la apertura, cierre y envío del formulario que
// inserta una nueva publicación al inicio del feed.
function setupComunidadModal() {
  const openBtn   = document.getElementById('btn-newpost-trigger');
  const overlay   = document.getElementById('newpost-modal-overlay');
  const closeBtn  = document.getElementById('modal-close-btn');
  const form      = document.getElementById('newpost-form');
  const feedList  = document.getElementById('community-feed-list');

  if (!openBtn || !overlay) return;

  // Abrir modal
  openBtn.addEventListener('click', () => overlay.classList.add('active'));

  // Cerrar con botón X
  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));

  // Cerrar al hacer clic fuera del modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  // Enviar formulario y publicar en el feed
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = document.getElementById('newpost-content')?.value?.trim();
    const tags    = document.getElementById('newpost-tags')?.value || '';

    if (!content) return;

    // Construir HTML de tags
    const tagArr  = tags.split(/[\s,]+/).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`);
    const tagsHtml = tagArr.map(t => `<a href="#" class="post-tag">${t}</a>`).join(' ');

    // Crear tarjeta de post nueva
    if (feedList) {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <div class="post-header">
          <div class="post-user">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                 class="post-avatar" alt="Ana">
            <div>
              <div class="post-username">@licianna</div>
              <div class="post-time">Hace unos instantes</div>
            </div>
          </div>
          <div class="post-more">•••</div>
        </div>
        <div class="post-content">${escapeHTML(content)}</div>
        <div class="post-tags">${tagsHtml}</div>
        <div class="post-actions">
          <button class="post-action-btn like-btn" onclick="togglePostLike(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="like-count">0</span>
          </button>
          <button class="post-action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>0</span>
          </button>
        </div>
      `;
      // Insertar al inicio del feed
      feedList.insertBefore(postCard, feedList.firstChild);
    }

    // Limpiar y cerrar modal
    form.reset();
    overlay.classList.remove('active');
  });
}

// ── TOGGLE DE LIKE EN POSTS ──────────────────────────────────────
// Alternativa entre estado "me gusta" / "sin me gusta"
// modificando el icono y el contador numérico.
window.togglePostLike = function(btn) {
  btn.classList.toggle('liked');
  const countEl = btn.querySelector('.like-count');
  let count = parseInt(countEl.textContent, 10) || 0;

  if (btn.classList.contains('liked')) {
    count++;
    btn.querySelector('svg').setAttribute('fill', '#E84D4D');
    btn.querySelector('svg').setAttribute('stroke', '#E84D4D');
  } else {
    count = Math.max(0, count - 1);
    btn.querySelector('svg').setAttribute('fill', 'none');
    btn.querySelector('svg').setAttribute('stroke', 'currentColor');
  }
  countEl.textContent = count;
};

// ── UTILIDAD: ESCAPAR HTML ───────────────────────────────────────
// Previene XSS al insertar contenido del usuario en el DOM
function escapeHTML(str) {
  return str.replace(/[&<>'"/]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    "'": '&#39;', '"': '&quot;', '/': '&#x2F;'
  }[tag] || tag));
}
