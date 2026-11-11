# Portafolio · Desmos (editor de video)

Sitio estático (HTML + CSS + JS, sin instalar nada), listo para GitHub Pages.

## Verlo en local

Doble clic en `index.html`. Listo.

## Editar el contenido

Todo lo que cambia está en **`js/config.js`**:

| Qué | Dónde |
| --- | --- |
| Email, WhatsApp, nacionalidad, redes, ubicación | `perfil` (⚠️ el WhatsApp tiene X: pon el número real) |
| Proyectos y sus videos | `proyectos` |
| Precios y paquetes | `precios` (pon `mostrar: false` para ocultarlos) |

### Poner los videos de Google Drive

1. En Drive: clic derecho al video → **Compartir** → Acceso general: **"Cualquier persona con el enlace"**.
2. Copia el enlace y pégalo en el campo `video`:

```js
{ titulo: "Reel promocional", video: "https://drive.google.com/file/d/XXXX/view?usp=sharing" }
```

La miniatura sale sola desde Drive (no hace falta `poster`). También funcionan links de YouTube.

Cuando ya estén todos los videos de Drive, borra la carpeta `assets/video/demo/` y `assets/posters/`
(son solo de prueba).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `desmos-portafolio`).
2. Sube **el contenido de esta carpeta** (que `index.html` quede en la raíz del repo).
3. En el repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/desmos-portafolio/`.

Después de publicar, en `index.html` cambia `og:image` por la URL completa
(`https://TU-USUARIO.github.io/desmos-portafolio/assets/img/og.jpg`) para que se vea la vista previa al compartir el link.

## Estructura

```
index.html          página
css/styles.css      estilos
js/config.js        ✏️ contenido editable
js/main.js          lógica (galería, reproductor, intro, menú)
assets/img/         logo, favicon, imagen para compartir
assets/video/       intro de marca y video de fondo
assets/video/demo/  videos de prueba (temporales)
```
