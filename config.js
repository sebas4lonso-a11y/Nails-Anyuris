/* ============================================================
   NAILS ANYURIS — CONFIGURACIÓN
   Aquí cambias precios, fotos, WhatsApp y dirección.
   No necesitas tocar index.html, styles.css ni script.js.
   ============================================================ */

window.NAILS_CONFIG = {

  /* ---------- WHATSAPP ----------
     Número con código de país y SIN espacios ni signos.
     Colombia = 57. Ejemplo: 573233351141                       */
  whatsapp: "573233351141",

  /* Mensaje que aparece escrito al abrir el chat */
  mensaje: "Hola Anyuris, quiero agendar una cita.",

  /* ---------- NEQUI / PAGOS ---------- */
  nequi: "",

  /* ---------- UBICACIÓN ---------- */
  direccion: "Camarones - calle #",

  /* Enlace de Google Maps (opcional). Pega aquí el enlace de tu
     ubicación para que el botón "Cómo llegar" abra el punto exacto.
     Si lo dejas vacío, se busca por la dirección.                 */
  mapa: "",

  /* ---------- SERVICIOS Y PRECIOS ----------
     nombre : nombre del servicio
     precio : tal cual quieres que se vea
     foto   : ruta de la foto, por ejemplo "img/semipermanente.jpg"
              (deja "" para mostrar el cuadro "Foto acá")
     nota   : texto corto opcional bajo el precio (déjalo "" si no)
     Para agregar un servicio, copia una línea completa y cámbiala.
     Para quitar uno, borra su línea.                              */
  servicios: [
    { nombre: "Semipermanente",     precio: "$30.000", foto: "", nota: "" },
    { nombre: "Polygel",            precio: "$60.000", foto: "", nota: "" },
    { nombre: "Soft gel",           precio: "$55.000", foto: "", nota: "" },
    { nombre: "Tradicional manos",  precio: "$15.000", foto: "", nota: "" },
    { nombre: "Tradicional pies",   precio: "$15.000", foto: "", nota: "" },
    { nombre: "Mantenimiento",      precio: "$40.000", foto: "", nota: "" },
    { nombre: "Retirado",           precio: "$10.000", foto: "", nota: "" }
  ],

  /* ---------- TRABAJOS REALIZADOS (galería) ----------
     foto : ruta de la foto, por ejemplo "img/trabajo-1.jpg"
            (deja "" para mostrar el cuadro "Foto acá")
     alt  : descripción corta de la foto (ayuda a accesibilidad)
     Agrega o quita líneas como quieras.                           */
  trabajos: [
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" },
    { foto: "", alt: "Trabajo de uñas realizado en Nails Anyuris" }
  ]
};
