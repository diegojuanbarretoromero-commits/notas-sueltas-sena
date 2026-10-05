// ================================================================
// NOTAS SUELTAS — js/svg-network.js
// Lógica de interactividad para las redes de nodos SVG.
// Se comparte en Inicio (grafo de influencias) y Explorar
// (mapa de géneros y directores).
// ================================================================

// ── INICIALIZACIÓN: HOVER EN NODOS ──────────────────────────────
// Recorre todos los grafos SVG de la página y enlaza eventos
// de mouseenter / mouseleave para el efecto highlight/dim.
function setupSVGNetworks() {
  document.querySelectorAll('.svg-network').forEach(svg => {
    const nodes = svg.querySelectorAll('.svg-node');
    const links = svg.querySelectorAll('.svg-link');

    nodes.forEach(node => {
      // Al entrar en un nodo: atenuar todo y resaltar el nodo + sus conexiones
      node.addEventListener('mouseenter', () => {
        const nodeId = node.getAttribute('data-id');

        // Atenuar todos los nodos y enlaces
        nodes.forEach(n => { if (n !== node) n.classList.add('dimmed'); });
        links.forEach(l => l.classList.add('dimmed'));

        // Resaltar este nodo
        node.classList.add('highlighted');

        // Resaltar los enlaces y nodos conectados
        links.forEach(link => {
          const source = link.getAttribute('data-source');
          const target = link.getAttribute('data-target');

          if (source === nodeId || target === nodeId) {
            link.classList.remove('dimmed');
            link.classList.add('highlighted');

            // Resaltar nodos en los extremos del enlace
            nodes.forEach(n => {
              const nid = n.getAttribute('data-id');
              if (nid === source || nid === target) {
                n.classList.remove('dimmed');
                n.classList.add('highlighted');
              }
            });
          }
        });
      });

      // Al salir del nodo: restablecer todo
      node.addEventListener('mouseleave', () => {
        nodes.forEach(n => n.classList.remove('dimmed', 'highlighted'));
        links.forEach(l => l.classList.remove('dimmed', 'highlighted'));
      });

      // Al hacer clic en un nodo: reproducir la pista si el artista coincide
      // (Requiere que player.js esté cargado también en la página)
      node.addEventListener('click', () => {
        if (typeof tracks === 'undefined' || typeof playTrack !== 'function') return;
        const label = node.querySelector('text')?.textContent?.trim() || '';
        const idx = tracks.findIndex(t =>
          t.title.toLowerCase().includes(label.toLowerCase()) ||
          t.artist.toLowerCase().includes(label.toLowerCase())
        );
        if (idx !== -1) playTrack(idx);
      });
    });
  });
}

// ── INICIALIZAR AL CARGAR EL DOM ────────────────────────────────
document.addEventListener('DOMContentLoaded', setupSVGNetworks);
