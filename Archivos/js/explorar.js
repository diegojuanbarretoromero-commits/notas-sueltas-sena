// ================================================================
// NOTAS SUELTAS — js/explorar.js
// Lógica exclusiva de la página EXPLORAR (explorar.html):
// interacción de la línea de tiempo de décadas con los mapas SVG.
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupExplorarTimeline();
});

// ── LÍNEA DE TIEMPO DE DÉCADAS ───────────────────────────────────
// Al hacer clic en un ítem de la timeline, se activa y se resaltan
// los nodos del mapa de géneros y directores relacionados con esa era.
function setupExplorarTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length === 0) return;

  const genreNodes    = document.querySelectorAll('#mapa-generos .svg-node');
  const directorNodes = document.querySelectorAll('#mapa-directores .svg-node');

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      // Marcar el ítem activo
      timelineItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Resaltar nodos relacionados con la década seleccionada
      const decade = item.getAttribute('data-decade');
      highlightNodesForDecade(decade, genreNodes, directorNodes);
    });
  });
}

// ── RESALTAR NODOS POR DÉCADA ────────────────────────────────────
// Define qué términos clave se asocian a cada período y atenúa
// los nodos que no coinciden, resaltando los que sí lo hacen.
function highlightNodesForDecade(decade, genreNodes, directorNodes) {
  // Primero, limpiar el estado de todos los nodos
  [...genreNodes, ...directorNodes].forEach(n => n.classList.remove('dimmed', 'highlighted'));

  // Mapa de décadas a palabras clave de nodos relacionados
  const decadeMap = {
    '60s': ['rock', 'beatles', 'pop'],
    '70s': ['pop', 'queen', 'rock', 'disco'],
    '80s': ['pop', 'jackson', 'quincy', 'mtv'],
    '00s': ['jazz', 'gondry', 'fincher', 'hip-hop'],
    '10s': ['reggae', 'williams', 'jonze', 'teal'],
    '20s': ['electronica', 'cecleveve', 'artista', 'hybrid'],
  };

  const targets = decadeMap[decade] || [];
  if (targets.length === 0) return;

  // Función auxiliar para comprobar si un nodo coincide con algún término clave
  const matchesTarget = (node) => {
    const id    = (node.getAttribute('data-id') || '').toLowerCase();
    const label = (node.querySelector('text')?.textContent || '').toLowerCase();
    return targets.some(t => id.includes(t) || label.includes(t));
  };

  let matchedAny = false;
  [...genreNodes, ...directorNodes].forEach(n => {
    if (matchesTarget(n)) {
      n.classList.add('highlighted');
      matchedAny = true;
    } else {
      n.classList.add('dimmed');
    }
  });

  // Auto-restablecer el resaltado después de 4 segundos
  if (matchedAny) {
    clearTimeout(window._explorarTimeout);
    window._explorarTimeout = setTimeout(() => {
      [...genreNodes, ...directorNodes].forEach(n => n.classList.remove('dimmed', 'highlighted'));
    }, 4000);
  }
}
