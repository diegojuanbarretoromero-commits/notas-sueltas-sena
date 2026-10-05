// ================================================================
// NOTAS SUELTAS — fonts/fonts-info.txt (referencia)
// Las fuentes se cargan desde Google Fonts vía @import en global.css.
// No se requiere ningún archivo local en esta carpeta.
//
// Fuentes utilizadas:
//   - Outfit         (pesos: 300, 400, 500, 600, 700) → textos del cuerpo
//   - Playfair Display (pesos: 400, 600, 700; cursiva 400) → títulos y logos
//
// URL de carga (incluida en css/global.css):
//   @import url('https://fonts.googleapis.com/css2?
//     family=Outfit:wght@300;400;500;600;700&
//     family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&
//     display=swap');
//
// Para uso OFFLINE, descarga los archivos .woff2 desde:
//   https://google-webfonts-helper.herokuapp.com/
// y colócalos aquí con sus @font-face en un archivo fonts.css local.
// ================================================================
SVG icons used in Notas Sueltas
================================

All icons in this project are inline SVGs embedded directly in the HTML files.
No external icon library is required.

Icons used:
  - Music note (logo): <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  - Play:   <path d="M8 5v14l11-7z"/>
  - Pause:  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  - Skip next: <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  - Skip prev: <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  - Volume: <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  - Heart (like): <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  - Chat bubble: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 ..."/>
  - Search: standard magnifier path
  - Edit pencil: standard pencil path

All icons use viewBox="0 0 24 24" with currentColor fill or stroke.
Images used in Notas Sueltas
==============================

All images in this project are loaded from Unsplash (CDN) for demonstration purposes.
No local image files are required to run the project.

Image sources used:
  - User avatar (Ana):
    https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80

  - Thriller / Michael Jackson cover:
    https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=60

  - Bohemian Rhapsody / Queen:
    https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=60

  - Nirvana:
    https://images.unsplash.com/photo-1524567214243-982894458528?w=150&auto=format&fit=crop&q=60

  - Live stream backgrounds:
    https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80

  - Story card covers:
    Various Unsplash concert/music photography images

To replace with local images:
  1. Download the images and place them in this /images/ folder.
  2. Update the src attributes in each HTML file to use relative paths, e.g.:
       src="images/thriller-cover.jpg"
