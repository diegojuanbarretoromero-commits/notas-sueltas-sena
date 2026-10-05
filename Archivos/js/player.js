// ================================================================
// NOTAS SUELTAS — js/player.js
// Reproductor de audio flotante persistente.
// Se comparte en todas las páginas del sitio.
// Gestiona: play/pause, cambio de pista, seek, volumen,
// visualizador de ondas y persistencia en localStorage.
// ================================================================

// ── 1. BASE DE DATOS DE PISTAS ───────────────────────────────────
// Lista de canciones del reproductor con metadata y miniatura
const tracks = [
  {
    title: "Thriller",
    artist: "Michael Jackson",
    duration: "13:42",
    thumb: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Werewolf (Thriller Special)",
    artist: "Michael Jackson",
    duration: "4:56",
    thumb: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Like a Virgin",
    artist: "Madonna",
    duration: "3:38",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    duration: "5:01",
    thumb: "https://images.unsplash.com/photo-1524567214243-982894458528?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Get Ur Freak On",
    artist: "Missy Elliott",
    duration: "3:56",
    thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=60"
  },
  {
    title: "Karma Police",
    artist: "Radiohead",
    duration: "4:21",
    thumb: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&auto=format&fit=crop&q=60"
  }
];

// ── 2. ESTADO GLOBAL DEL REPRODUCTOR ────────────────────────────
// Variables de estado que persisten mientras la página está abierta
let currentTrackIndex = 0; // Índice de la pista actual
let isPlaying         = false;
let playTime          = 0;   // Segundos transcurridos de la pista
let trackDurationSec  = 240; // Duración total (por defecto 4 min)
let volume            = 0.8; // Volumen inicial (0 a 1)
let audioTimer        = null; // Referencia al setInterval del tick

// ── 3. INICIALIZACIÓN DEL REPRODUCTOR ───────────────────────────
// Se llama al cargar el DOM: recupera estado del localStorage y
// enlaza todos los controles del reproductor.
function initAudioPlayer() {
  const player = document.querySelector('.audio-player-bar');
  if (!player) return; // No hacer nada si no existe el player en la página

  // Recuperar estado guardado de sesión anterior
  const storedIndex   = localStorage.getItem('notasSueltas_trackIndex');
  const storedVolume  = localStorage.getItem('notasSueltas_volume');
  const storedTime    = localStorage.getItem('notasSueltas_playTime');
  const storedPlaying = localStorage.getItem('notasSueltas_isPlaying');

  if (storedIndex  !== null) currentTrackIndex = parseInt(storedIndex,  10);
  if (storedVolume !== null) volume            = parseFloat(storedVolume);
  if (storedTime   !== null) playTime          = parseInt(storedTime,   10);
  if (storedPlaying === 'true') isPlaying = true;

  updatePlayerUI();
  setVolume(volume);

  // Enlazar botones de control
  const playBtn    = player.querySelector('.player-btn-play');
  const prevBtn    = player.querySelector('.player-btn-prev');
  const nextBtn    = player.querySelector('.player-btn-next');
  const progressBar = player.querySelector('.player-slider-container');
  const volumeBar  = player.querySelector('.player-volume-slider');

  if (playBtn)     playBtn.addEventListener('click',    togglePlay);
  if (prevBtn)     prevBtn.addEventListener('click',    prevTrack);
  if (nextBtn)     nextBtn.addEventListener('click',    nextTrack);

  // Clic en la barra de progreso para hacer seek
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      seekTo((e.clientX - rect.left) / rect.width);
    });
  }

  // Clic en la barra de volumen
  if (volumeBar) {
    volumeBar.addEventListener('click', (e) => {
      const rect = volumeBar.getBoundingClientRect();
      setVolume(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
    });
  }

  // Enlazar clics en ítems de la playlist ([data-track-index])
  document.querySelectorAll('[data-track-index]').forEach(item => {
    item.addEventListener('click', () => {
      playTrack(parseInt(item.getAttribute('data-track-index'), 10));
    });
  });

  highlightActivePlaylistItem();

  // Si estaba reproduciendo, reanudar el tick
  if (isPlaying) startAudioTicking();
}

// ── 4. ACTUALIZAR LA INTERFAZ DEL REPRODUCTOR ───────────────────
// Sincroniza todos los elementos visuales con el estado actual
function updatePlayerUI() {
  const player = document.querySelector('.audio-player-bar');
  if (!player) return;

  const track = tracks[currentTrackIndex];
  player.querySelector('.player-track-thumb').src            = track.thumb;
  player.querySelector('.player-track-title').textContent    = track.title;
  player.querySelector('.player-track-artist').textContent   = track.artist;

  // Convertir duración "MM:SS" a segundos
  const [mins, secs] = track.duration.split(':').map(Number);
  trackDurationSec = mins * 60 + secs;

  // Tiempos y barra de progreso
  player.querySelector('.player-time-current').textContent   = formatTime(playTime);
  player.querySelector('.player-time-duration').textContent  = track.duration;
  const pct = (playTime / trackDurationSec) * 100;
  player.querySelector('.player-slider-fill').style.width    = `${pct}%`;
  player.querySelector('.player-slider-knob').style.left     = `${pct}%`;

  // Icono play/pause
  const playBtn = player.querySelector('.player-btn-play');
  if (isPlaying) {
    player.classList.add('playing');
    playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  } else {
    player.classList.remove('playing');
    playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  highlightActivePlaylistItem();
}

// ── 5. RESALTAR ÍTEM ACTIVO EN LA PLAYLIST ──────────────────────
// Añade la clase .active al ítem que corresponde a la pista actual
function highlightActivePlaylistItem() {
  document.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.classList.toggle('active', index === currentTrackIndex);
  });
}

// ── 6. CONTROLES DE REPRODUCCIÓN ────────────────────────────────
// Toggle play/pause
function togglePlay() {
  isPlaying = !isPlaying;
  localStorage.setItem('notasSueltas_isPlaying', isPlaying);
  isPlaying ? startAudioTicking() : stopAudioTicking();
  updatePlayerUI();
}

// Cargar y reproducir una pista específica por índice
function playTrack(index) {
  currentTrackIndex = index;
  playTime = 0;
  isPlaying = true;
  localStorage.setItem('notasSueltas_trackIndex', index);
  localStorage.setItem('notasSueltas_isPlaying',  true);
  localStorage.setItem('notasSueltas_playTime',   0);
  startAudioTicking();
  updatePlayerUI();
}

// Siguiente pista (circular)
function nextTrack() {
  playTrack((currentTrackIndex + 1) % tracks.length);
}

// Pista anterior (circular)
function prevTrack() {
  playTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
}

// Saltar a una posición de la pista (0.0 – 1.0)
function seekTo(percentage) {
  playTime = Math.floor(percentage * trackDurationSec);
  localStorage.setItem('notasSueltas_playTime', playTime);
  updatePlayerUI();
}

// ── 7. CONTROL DE VOLUMEN ────────────────────────────────────────
function setVolume(pct) {
  volume = pct;
  localStorage.setItem('notasSueltas_volume', volume);
  const player = document.querySelector('.audio-player-bar');
  if (player) {
    player.querySelector('.player-volume-fill').style.width = `${pct * 100}%`;
  }
}

// ── 8. TICK DEL PROGRESO (Simulación de reproducción) ───────────
// Incrementa el tiempo cada segundo para simular el avance
function startAudioTicking() {
  stopAudioTicking();
  audioTimer = setInterval(() => {
    playTime++;
    if (playTime >= trackDurationSec) {
      playTime = 0;
      nextTrack(); // Pasar a la siguiente pista al terminar
    } else {
      localStorage.setItem('notasSueltas_playTime', playTime);
      updateProgressTick();
    }
  }, 1000);
}

function stopAudioTicking() {
  if (audioTimer) {
    clearInterval(audioTimer);
    audioTimer = null;
  }
}

// Actualización liviana del tick (solo progreso, no re-renderiza todo)
function updateProgressTick() {
  const player = document.querySelector('.audio-player-bar');
  if (!player) return;
  player.querySelector('.player-time-current').textContent = formatTime(playTime);
  const pct = (playTime / trackDurationSec) * 100;
  player.querySelector('.player-slider-fill').style.width  = `${pct}%`;
  player.querySelector('.player-slider-knob').style.left   = `${pct}%`;
}

// ── 9. UTILIDAD: FORMATEAR TIEMPO ───────────────────────────────
// Convierte segundos a formato "M:SS"
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ── 10. INICIALIZAR AL CARGAR EL DOM ────────────────────────────
document.addEventListener('DOMContentLoaded', initAudioPlayer);
