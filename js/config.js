/* =========================================================
   CONFIGURACIÓN DEL SUMMIT
   Edite solo este archivo para publicar fecha, sede y el
   envío del formulario. El resto de la página se ajusta sola.
   ========================================================= */
window.SUMMIT = {
  // Fecha del evento en formato AAAA-MM-DD (ej.: '2026-11-12').
  // Mientras sea null, la página muestra "Fecha por anunciar".
  date: null,

  // Sede (ej.: 'Hotel X, Bogotá'). Mientras sea null, muestra "Sede por anunciar".
  venue: null,

  // Correo que recibe las inscripciones cuando NO hay endpoint.
  registrationEmail: 'abogados@lopezasociados.net',

  // URL de un servicio de formularios (Formspree, Getform, Google Apps Script, etc.)
  // que acepte un POST con JSON. Si se deja vacío, el botón abre el correo del
  // usuario con los datos ya escritos.
  registrationEndpoint: '',

  // Enlace a la política de tratamiento de datos.
  privacyUrl: 'https://www.lopezasociados.net'
};
