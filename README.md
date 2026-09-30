# Summit 2026 · López & Asociados — Landing

Landing estática del Summit 2026 de López & Asociados (viernes 23 de octubre, Club El Nogal, Bogotá). Hereda el sistema de
diseño del sitio nuevo (Source Serif 4 + Roboto, azul de marca, naranja de acento
y la curva del isotipo). Sin dependencias ni proceso de compilación: funciona
directo en GitHub Pages.

Publicada en: https://upwyse.github.io/Lopez-asociados-landing/

## Qué editar

| Qué | Dónde |
|---|---|
| Fecha, sede, correo/endpoint del formulario, política de datos | `js/config.js` |
| Textos, sesiones, panelistas | `index.html` (sección `#agenda`) |
| Colores, tipografías, espacios | `css/summit.css` (variables en `:root`) |

### Fecha y sede
En `js/config.js` están la fecha (`date`), la sede (`venue`) y la dirección (`venueAddress`).
La página muestra la fecha con un conteo de días. Si cambian, actualice también los textos
iniciales de `index.html` (buscar "Club El Nogal" y "23 de octubre") y los datos del
evento en el bloque `application/ld+json` del `<head>`.

### Formulario de registro
- Sin `registrationEndpoint`: al enviar, se abre el correo del usuario con los
  datos ya escritos hacia `registrationEmail`.
- Con `registrationEndpoint` (Formspree, Getform, Google Apps Script, etc.):
  se envía un POST con JSON y se muestra la confirmación en la página.

### Agregar o confirmar panelistas
Cada sesión en `index.html` es un bloque `<article class="slot session">`.
Los panelistas son elementos `<li>` dentro de `<div class="people">`.
Las líneas en cursiva (`class="pending"`) son avisos de "por anunciar".

## Despliegue
```bash
git add .
git commit -m "Landing Summit López & Asociados"
git push origin main
```
Luego, en GitHub: Settings → Pages → Deploy from a branch → `main` / `(root)`.
Si el despliegue no se dispara, un commit vacío lo fuerza:
`git commit --allow-empty -m "rebuild" && git push`.
