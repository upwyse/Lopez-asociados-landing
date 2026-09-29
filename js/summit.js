/* =========================================================
   Summit López & Asociados — comportamiento de la página
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initEventInfo();
  initHeroVideo();
  initAgenda();
  initForm();
});

const CFG = window.SUMMIT || {};

/* Cabecera: transparente arriba, azul oscura al bajar por el hero,
   blanca cuando ya se salió del hero */
const initHeader = () => {
  const head = document.getElementById('head');
  const hero = document.querySelector('.hero');
  if (!head) return;
  const onScroll = () => {
    const y = window.scrollY;
    const heroEnd = hero ? hero.offsetHeight - head.offsetHeight : window.innerHeight;
    const pastHero = y >= heroEnd;
    head.classList.toggle('solid', pastHero);
    head.classList.toggle('navy', !pastHero && y > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
};

/* Menú en móvil */
const initMobileNav = () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;

  const head = document.getElementById('head');
  const close = () => {
    nav.classList.remove('open');
    if (head) head.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    if (head) head.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
};

/* Fecha y sede desde config.js */
const initEventInfo = () => {
  const set = (ids, text, extra) => {
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = text;
      el.classList.remove('tbd');
      if (extra) {
        const s = document.createElement('small');
        s.textContent = extra;
        el.appendChild(s);
      }
    });
  };

  if (CFG.date) {
    const d = new Date(CFG.date + 'T12:00:00');
    if (!isNaN(d)) {
      let label = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
      label = label.charAt(0).toUpperCase() + label.slice(1);
      const days = Math.ceil((d - new Date()) / 86400000);
      const extra = days > 1 ? `Faltan ${days} días` : days === 1 ? 'Es mañana' : days === 0 ? 'Es hoy' : null;
      set(['ev-date'], label, extra);
      set(['ev-date-2'], label);
    }
  }
  if (CFG.venue) set(['ev-venue', 'ev-venue-2'], CFG.venue);
  const p = document.getElementById('privacy-link');
  if (p && CFG.privacyUrl) p.href = CFG.privacyUrl;
};

/* Si el usuario prefiere menos movimiento, el video se queda en el póster */
const initHeroVideo = () => {
  const v = document.getElementById('herovideo');
  if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay');
    v.pause();
  }
};

/* Agenda: sesiones desplegables + filtro mañana/tarde */
const initAgenda = () => {
  const sessions = [...document.querySelectorAll('.slot.session')];
  const toggleAll = document.getElementById('toggleall');

  const setOpen = (slot, open) => {
    slot.classList.toggle('open', open);
    slot.querySelector('.slot-row').setAttribute('aria-expanded', String(open));
  };
  const syncToggleAll = () => {
    const visible = sessions.filter((s) => !s.closest('.block').hidden);
    const allOpen = visible.length && visible.every((s) => s.classList.contains('open'));
    if (toggleAll) toggleAll.textContent = allOpen ? 'Cerrar todas' : 'Abrir todas';
  };

  sessions.forEach((slot) => {
    slot.querySelector('.slot-row').addEventListener('click', () => {
      setOpen(slot, !slot.classList.contains('open'));
      syncToggleAll();
    });
  });

  if (toggleAll) {
    toggleAll.addEventListener('click', () => {
      const visible = sessions.filter((s) => !s.closest('.block').hidden);
      const allOpen = visible.every((s) => s.classList.contains('open'));
      visible.forEach((s) => setOpen(s, !allOpen));
      syncToggleAll();
    });
  }

  const chips = [...document.querySelectorAll('.chips button')];
  const blocks = [...document.querySelectorAll('.block')];
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      blocks.forEach((b) => { b.hidden = !(f === 'all' || b.dataset.block === f); });
      syncToggleAll();
    });
  });
};

/* Formulario de registro */
const initForm = () => {
  const form = document.getElementById('form');
  const notice = document.getElementById('notice');
  if (!form || !notice) return;

  const say = (msg, error) => {
    notice.textContent = msg;
    notice.classList.toggle('error', !!error);
    notice.classList.add('show');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = Object.fromEntries(new FormData(form));
    data.evento = 'Summit López & Asociados — 20 años';
    const btn = form.querySelector('button[type="submit"]');

    if (CFG.registrationEndpoint) {
      btn.disabled = true;
      try {
        const res = await fetch(CFG.registrationEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        say('Recibimos su solicitud. Nuestro equipo le confirmará su inscripción por correo.');
      } catch (err) {
        say('No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos a ' + (CFG.registrationEmail || 'abogados@lopezasociados.net') + '.', true);
      } finally {
        btn.disabled = false;
      }
      return;
    }

    // Sin endpoint: se abre el correo del usuario con los datos ya escritos
    const to = CFG.registrationEmail || 'abogados@lopezasociados.net';
    const subject = 'Registro Summit López & Asociados — ' + data.nombre + ' ' + data.apellido;
    const body = [
      'Solicitud de registro al Summit López & Asociados (20 años)',
      '',
      'Nombre: ' + data.nombre + ' ' + data.apellido,
      'Correo: ' + data.email,
      'Teléfono: ' + data.telefono,
      'Empresa: ' + data.empresa,
      'Cargo: ' + data.cargo,
      'Acepta la política de tratamiento de datos: sí'
    ].join('\n');
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    say('Se abrió su programa de correo con los datos de registro. Envíe el mensaje para completar su solicitud.');
  });
};
