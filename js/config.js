/* =====================================================================
   CONFIGURACIÓN DEL PORTAFOLIO  ·  ✏️  Edita SOLO este archivo
   ---------------------------------------------------------------------
   En "video" puedes poner cualquiera de estas 3 cosas:
     1) Ruta local ............ "assets/video/mi-video.mp4"
     2) Link de Google Drive .. "https://drive.google.com/file/d/XXXX/view?usp=sharing"
        (el archivo debe estar compartido como "Cualquier persona con el enlace")
     3) Link de YouTube ....... "https://youtu.be/XXXX"  o  "https://youtube.com/shorts/XXXX"

   "poster" (miniatura) es opcional: Drive y YouTube generan la suya solas.
   "formato": "9:16" (vertical) o "16:9" (horizontal). Por defecto 9:16.
   "encuadre" (opcional): qué parte de la miniatura se ve en la tarjeta,
      ej. "center", "70% center", "center top".
   "ajuste" (opcional): pon "completo" para ver la miniatura entera sin recortar.
   ===================================================================== */

window.PORTAFOLIO = {
  perfil: {
    nombre: "Desmos",
    rol: "Editor de video",
    email: "desmosedit@gmail.com",
    // ⚠️ PENDIENTE: reemplaza las X por el número real (Cuba: +53 y 8 dígitos, ej. "+53 5123 4567").
    // Mientras tenga X se ve en la página pero el botón no abre WhatsApp. Vacío = no se muestra.
    whatsapp: "+53 5XXX XXXX",
    nacionalidad: "Cubano", // con "Cubano"/"Cuba" se muestra la bandera de Cuba
    ubicacion: "", // opcional, ej. "La Habana, Cuba"
    redes: {
      // Pega el link completo de cada perfil. Vacío = no se muestra.
      instagram: "",
      tiktok: "",
      youtube: "",
      facebook: ""
    }
  },

  /* -------------------------------------------------------------------
     PROYECTOS
     Cada proyecto aparece como "caso" y sus videos salen en la galería.
     ⚠️ TEMPORAL: los videos de abajo son los clips locales de la carpeta
     base, solo para ver el diseño. Reemplázalos por los links de Drive.
     ------------------------------------------------------------------- */
  proyectos: [
    {
      titulo: "Reels para agencia de viajes",
      cliente: "Kruceros",
      clienteDetalle: "Agencia de viajes · España",
      categoria: "Reels",
      plataformas: ["TikTok", "YouTube"],
      descripcion:
        "Edición completa de una serie de reels para la agencia de viajes española Kruceros. El objetivo era mostrar los productos y la excelente atención al cliente de forma rápida, clara y atractiva.",
      tareas: [
        "Selección de las mejores tomas y ajuste del ritmo",
        "Animaciones, intros y cierres de marca",
        "Transiciones, efectos de sonido y música",
        "Imágenes, íconos y textos animados",
        "Subtítulos para ver sin sonido"
      ],
      resultado: "Ayudó a aumentar las visualizaciones y la interacción en el perfil de la marca.",
      links: {
        tiktok: "",  // link a los reels en TikTok
        youtube: ""  // link a los reels/shorts en YouTube
      },
      videos: [
        { titulo: "Reel promocional", video: "assets/video/demo/demo-intro.mp4", poster: "assets/posters/demo-intro-b.jpg" },
        { titulo: "Reel de destino", video: "assets/video/demo/demo-pantera.mp4", poster: "assets/posters/demo-pantera-a.jpg", encuadre: "78% center" },
        { titulo: "Reel de atención al cliente", video: "assets/video/demo/demo-intro.mp4", poster: "assets/posters/demo-intro-a.jpg" }
      ]
    },
    {
      titulo: "Reel para producto",
      cliente: "Marca / negocio",
      clienteDetalle: "Marketing de producto",
      categoria: "Reels",
      plataformas: ["Instagram", "TikTok"],
      descripcion:
        "Edición a partir de varios fragmentos de video entregados por el cliente, convertidos en una sola pieza lista para publicar en redes.",
      tareas: [
        "Selección de tomas y ritmo",
        "Intro y cierre con animaciones",
        "Transiciones, efectos de sonido y música",
        "Textos, íconos y subtítulos"
      ],
      resultado: "Resultado satisfactorio para el cliente, listo para publicar.",
      links: {},
      videos: [
        { titulo: "Reel de producto", video: "assets/video/demo/demo-pantera.mp4", poster: "assets/posters/demo-pantera-b.jpg", encuadre: "78% center" }
      ]
    }
  ],

  /* -------------------------------------------------------------------
     PRECIOS  ·  ⚠️ Valores de ejemplo: confírmalos antes de publicar.
     Pon mostrar: false para ocultar toda la sección.
     ------------------------------------------------------------------- */
  precios: {
    mostrar: true,
    moneda: "USD",
    simbolo: "$",
    porDuracion: [
      { duracion: "30 s – 1 min", precio: 20 },
      { duracion: "2 – 4 min", precio: 40 },
      { duracion: "5 – 7 min", precio: 75 },
      { duracion: "10 – 15 min", precio: 100 }
    ],
    paquetes: [
      {
        nombre: "Pack 3",
        detalle: "3 videos de 30 s – 1 min",
        precio: 55,
        ahorro: 5,
        incluye: ["3 videos de 30 s – 1 min", "Entrega en 5 días", "1 ronda de revisiones"]
      },
      {
        nombre: "Pack 5",
        detalle: "5 videos de 30 s – 1 min",
        precio: 90,
        ahorro: 10,
        destacado: true,
        incluye: ["5 videos de 30 s – 1 min", "Entrega en 7 días", "2 rondas de revisiones", "Miniaturas incluidas"]
      },
      {
        nombre: "Pack 10",
        detalle: "10 videos de 30 s – 1 min",
        precio: 170,
        ahorro: 30,
        incluye: ["10 videos de 30 s – 1 min", "Entrega en 10 días", "Revisiones ilimitadas", "Miniaturas + subtítulos"]
      }
    ],
    nota: "Los precios pueden variar según la complejidad del proyecto. Escríbeme y te preparo un presupuesto personalizado."
  }
};
