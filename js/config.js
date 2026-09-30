/* =========================================================
   CONFIGURACIÓN DEL SUMMIT
   Edite solo este archivo para cambiar fecha, sede y el
   envío del formulario. El resto de la página se ajusta sola.
   (Si cambia la fecha o la sede, actualice también los textos
   iniciales del HTML: buscar "Club El Nogal" y "23 de octubre".)
   ========================================================= */
window.SUMMIT = {
  // Fecha del evento en formato AAAA-MM-DD.
  date: '2026-10-23',

  // Sede y dirección.
  venue: 'Club El Nogal',
  venueAddress: 'AK 7 #78-96, Bogotá',

  // Correo que recibe las inscripciones cuando NO hay endpoint.
  registrationEmail: 'abogados@lopezasociados.net',

  // URL de un servicio de formularios (Formspree, Getform, Google Apps Script, etc.)
  // que acepte un POST con JSON. Si se deja vacío, el botón abre el correo del
  // usuario con los datos ya escritos.
  registrationEndpoint: '',

  // Enlace a la política de tratamiento de datos.
  privacyUrl: 'https://www.lopezasociados.net'
};
