/* =====================================================================
   DESMOS · Lógica del portafolio
   (No hace falta tocar este archivo: el contenido se edita en config.js)
   ===================================================================== */
(() => {
  'use strict';

  const CFG = window.PORTAFOLIO || {};
  const PERFIL = CFG.perfil || {};
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cssUrl = (s) => `url("${String(s).replace(/["\\\n]/g, encodeURIComponent)}")`;
  const fmtDur = (t) => (isFinite(t) && t > 0 ? `${Math.floor(t / 60)}:${pad(Math.round(t % 60))}` : '');

  /* ---------- Icons ---------- */
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5L7 4.5Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    mail: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.4l-4.5 1.1Z"/><path d="M9.2 8.3c-.4 2.9 3.1 6.6 6.4 6.6l.9-1.5-1.9-1-1 .8c-.9-.4-2-1.5-2.4-2.4l.8-1-1-1.9-1.8.4Z" fill="currentColor" stroke="none"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor"/></svg>`,
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .9.1V9.4a5.9 5.9 0 1 0 5 5.8V9.1a7.6 7.6 0 0 0 4.3 1.3V7.3A4.4 4.4 0 0 1 16.6 3Z"/></svg>',
    youtube: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor"/></svg>`,
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z"/></svg>',
    pin: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/></svg>`,
    flagCU: '<svg viewBox="0 0 30 15" aria-hidden="true"><rect width="30" height="15" fill="#fff"/><path d="M0 0h30v3H0zM0 6h30v3H0zM0 12h30v3H0z" fill="#002a8f"/><path d="M0 0l13 7.5L0 15Z" fill="#cf142b"/><path d="M4.33 4.9l.59 1.79h1.88l-1.52 1.12.58 1.79-1.53-1.1-1.53 1.1.58-1.79-1.52-1.12h1.88Z" fill="#fff"/></svg>',
    external: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>`
  };
  const NET_LABEL = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', facebook: 'Facebook' };

  /* ---------- Video source parsing (local / Drive / YouTube) ---------- */
  function parseVideo(url) {
    const u = String(url || '').trim();
    if (!u) return null;
    let m;
    if (/drive\.google\.com|docs\.google\.com/i.test(u)) {
      m = u.match(/\/d\/([\w-]{10,})/) || u.match(/[?&]id=([\w-]{10,})/);
      if (!m) return null;
      return {
        type: 'drive',
        embed: `https://drive.google.com/file/d/${m[1]}/preview`,
        thumb: `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`
      };
    }
    if (/youtube\.com|youtu\.be/i.test(u)) {
      m = u.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
      if (!m) return null;
      return {
        type: 'youtube',
        shorts: /\/shorts\//i.test(u),
        embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0&playsinline=1`,
        thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`
      };
    }
    return { type: 'local', src: u };
  }

  /* ---------- Contact helpers ---------- */
  const waDisplay = String(PERFIL.whatsapp || '').trim();
  const waNumber = waDisplay.replace(/\D/g, '');
  const waPending = /x/i.test(waDisplay) || (waDisplay && waNumber.length < 8); // número aún sin completar
  const waReady = !!waNumber && !waPending;
  const email = String(PERFIL.email || '').trim();
  const nombre = PERFIL.nombre || 'Desmos';
  const waLink = (msg) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  function contactHref(msg) {
    if (waReady) return { href: `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, external: true };
    if (email) return { href: `mailto:${email}?subject=${encodeURIComponent('Cotización de video')}&body=${encodeURIComponent(msg)}`, external: false };
    return { href: '#contacto', external: false };
  }
  const linkAttrs = (c) => `href="${esc(c.href)}"${c.external ? ' target="_blank" rel="noopener"' : ''}`;

  /* ---------- Data ---------- */
  const proyectos = Array.isArray(CFG.proyectos) ? CFG.proyectos : [];
  const items = [];
  proyectos.forEach((p, pi) => {
    (p.videos || []).forEach((v) => {
      const media = parseVideo(v.video);
      if (!media) return;
      const isYtWide = media.type === 'youtube' && !media.shorts;
      items.push({
        titulo: v.titulo || p.titulo || 'Video',
        cliente: v.cliente || p.cliente || '',
        categoria: v.categoria || p.categoria || 'Video',
        formato: v.formato || (isYtWide ? '16:9' : '9:16'),
        duracion: v.duracion || '',
        encuadre: v.encuadre || '',
        ajuste: v.ajuste === 'completo' ? 'contain' : 'cover',
        poster: v.poster || media.thumb || '',
        media,
        proyecto: pi
      });
    });
  });

  /* =====================================================================
     RENDER · Galería
     ===================================================================== */
  function mediaMarkup(it, imgClass) {
    const bg = it.poster ? `<span class="work-card__bg" style="${esc('background-image:' + cssUrl(it.poster))}"></span>` : '';
    let main = '';
    if (it.poster) {
      main = `<img class="${imgClass}" src="${esc(it.poster)}" alt="" loading="lazy" decoding="async">`;
    } else if (it.media.type === 'local') {
      main = `<video class="${imgClass}" src="${esc(it.media.src)}#t=0.6" muted playsinline preload="metadata"></video>`;
    }
    return bg + main;
  }

  function cardHTML(it, i) {
    const cls = ['work-card', 'reveal'];
    if (it.ajuste === 'contain') cls.push('work-card--contain');
    const pos = it.encuadre ? `;--pos:${esc(it.encuadre)}` : '';
    return `
      <button class="${cls.join(' ')}" type="button" data-index="${i}" data-cat="${esc(slug(it.categoria))}" style="--d:${i % 4}${pos}"
        aria-label="${esc(`Ver video: ${it.titulo}${it.cliente ? ' · ' + it.cliente : ''}`)}">
        ${mediaMarkup(it, 'work-card__media')}
        <span class="work-card__shade"></span>
        <span class="work-card__corners"><span class="corner corner--tl"></span><span class="corner corner--tr"></span><span class="corner corner--bl"></span><span class="corner corner--br"></span></span>
        <span class="work-card__tag">${esc(it.categoria)} · ${esc(it.formato)}</span>
        <span class="work-card__dur">${esc(it.duracion)}</span>
        <span class="work-card__play">${ICON.play}</span>
        <span class="work-card__info"><strong>${esc(it.titulo)}</strong>${it.cliente ? `<span>${esc(it.cliente)}</span>` : ''}</span>
      </button>`;
  }

  const grid = $('#work-grid');
  function renderGrid() {
    if (!grid) return;
    if (!items.length) {
      grid.outerHTML = '<p class="section__lead" style="margin:auto;text-align:center">Muy pronto subiré nuevos trabajos aquí.</p>';
      return;
    }
    grid.innerHTML = items.map(cardHTML).join('');

    $$('.work-card', grid).forEach((card) => {
      const it = items[+card.dataset.index];
      const img = $('img.work-card__media', card);
      if (img) img.addEventListener('error', () => card.classList.add('is-broken'), { once: true });
      card.addEventListener('click', () => {
        const visible = $$('.work-card:not(.is-hidden)', grid).map((c) => items[+c.dataset.index]);
        openLightbox(visible, visible.indexOf(it), card);
      });
      if (it.media.type === 'local') setupLocalCard(card, it);
    });

    renderFilters();
  }

  // duración automática + vista previa al pasar el mouse (solo videos locales)
  const durObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          durObserver.unobserve(e.target);
          const durEl = $('.work-card__dur', e.target);
          const probe = document.createElement('video');
          probe.preload = 'metadata';
          probe.muted = true;
          probe.src = e.target.dataset.src;
          probe.addEventListener('loadedmetadata', () => { durEl.textContent = fmtDur(probe.duration); probe.removeAttribute('src'); probe.load(); }, { once: true });
        });
      }, { rootMargin: '200px' })
    : null;

  function setupLocalCard(card, it) {
    card.dataset.src = it.media.src;
    if (!it.duracion && durObserver) durObserver.observe(card);
    if (!canHover || reduceMotion) return;

    let timer = 0;
    let preview = null;
    card.addEventListener('pointerenter', () => {
      timer = setTimeout(() => {
        preview = document.createElement('video');
        preview.className = 'work-card__preview';
        preview.muted = true;
        preview.loop = true;
        preview.playsInline = true;
        preview.src = it.media.src;
        card.insertBefore(preview, $('.work-card__shade', card));
        preview.play().then(() => {
          preview && preview.classList.add('is-playing');
          card.classList.add('is-previewing');
        }).catch(() => {});
      }, 160);
    });
    card.addEventListener('pointerleave', () => {
      clearTimeout(timer);
      card.classList.remove('is-previewing');
      if (preview) { preview.pause(); preview.remove(); preview = null; }
    });
  }

  function renderFilters() {
    const wrap = $('#filters');
    if (!wrap) return;
    const cats = [];
    items.forEach((it) => { if (!cats.some((c) => c.slug === slug(it.categoria))) cats.push({ slug: slug(it.categoria), name: it.categoria }); });
    if (cats.length < 2) return;
    const count = (s) => items.filter((it) => slug(it.categoria) === s).length;
    wrap.innerHTML = [`<button class="filter" type="button" data-filter="*" aria-pressed="true">Todos<sup>${items.length}</sup></button>`]
      .concat(cats.map((c) => `<button class="filter" type="button" data-filter="${esc(c.slug)}" aria-pressed="false">${esc(c.name)}<sup>${count(c.slug)}</sup></button>`))
      .join('');
    wrap.hidden = false;
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;
      $$('.filter', wrap).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter;
      $$('.work-card', grid).forEach((card) => card.classList.toggle('is-hidden', f !== '*' && card.dataset.cat !== f));
    });
  }

  /* =====================================================================
     RENDER · Casos
     ===================================================================== */
  function caseHTML(p, pi) {
    const its = items.filter((it) => it.proyecto === pi);
    const first = its[0];
    const meta = [
      ['Cliente', p.cliente, p.clienteDetalle],
      ['Tipo', p.categoria, first ? `Formato ${first.formato}` : ''],
      ['Plataformas', (p.plataformas || []).join(' · '), '']
    ].filter((m) => m[1]);
    const links = Object.entries(p.links || {}).filter(([, url]) => url);

    const phone = first ? `
      <div class="case__media reveal">
        <button class="phone" type="button" data-case="${pi}" aria-label="${esc(`Ver video del proyecto: ${p.titulo}`)}"${first.encuadre ? ` style="--pos:${esc(first.encuadre)}"` : ''}>
          <span class="phone__screen">
            ${first.poster ? `<span class="work-card__bg" style="${esc('background-image:' + cssUrl(first.poster))}"></span>` : ''}
            ${first.media.type === 'local'
              ? `<video class="phone__video" src="${esc(first.media.src)}" muted loop playsinline preload="none"${first.poster ? ` poster="${esc(first.poster)}"` : ''}></video>`
              : `<img class="phone__img" src="${esc(first.poster)}" alt="" loading="lazy">`}
            <span class="phone__ui"><span>${esc(nombre)}</span><b>${ICON.play}</b></span>
          </span>
        </button>
      </div>` : '';

    return `
      <article class="case${first ? '' : ' case--nomedia'}">
        ${phone}
        <div class="case__body reveal">
          <p class="case__kicker">Proyecto ${pad(pi + 1)}${its.length > 1 ? ` · ${its.length} videos` : ''}</p>
          <h3 class="case__title">${esc(p.titulo)}</h3>
          ${meta.length ? `<dl class="case__meta">${meta.map(([k, v, d]) => `<div><dt>${k}</dt><dd>${esc(v)}${d ? `<small>${esc(d)}</small>` : ''}</dd></div>`).join('')}</dl>` : ''}
          ${p.descripcion ? `<p class="case__desc">${esc(p.descripcion)}</p>` : ''}
          ${(p.tareas || []).length ? `<ul class="case__tasks">${p.tareas.map((t) => `<li>${ICON.check}<span>${esc(t)}</span></li>`).join('')}</ul>` : ''}
          ${p.resultado ? `<div class="case__result"><span>Resultado</span><p>${esc(p.resultado)}</p></div>` : ''}
          ${links.length ? `<div class="case__links">${links.map(([k, url]) => `<a class="btn btn--ghost btn--sm" href="${esc(url)}" target="_blank" rel="noopener">${ICON[k] || ICON.external} Ver en ${esc(NET_LABEL[k] || k)}</a>`).join('')}</div>` : ''}
        </div>
      </article>`;
  }

  function renderCases() {
    const wrap = $('#cases');
    const section = $('#casos');
    if (!wrap || !section) return;
    if (!proyectos.length) { section.hidden = true; return; }
    wrap.innerHTML = proyectos.map(caseHTML).join('');

    $$('.phone', wrap).forEach((btn) => {
      const pi = +btn.dataset.case;
      const its = items.filter((it) => it.proyecto === pi);
      btn.addEventListener('click', () => openLightbox(its, 0, btn));
    });

    // los teléfonos se reproducen solos cuando están en pantalla
    const vids = $$('.phone__video', wrap);
    if (reduceMotion || !vids.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
      });
    }, { threshold: 0.35 });
    vids.forEach((v) => io.observe(v));
  }

  /* =====================================================================
     RENDER · Precios
     ===================================================================== */
  function renderPrices() {
    const P = CFG.precios;
    const section = $('#precios');
    const navItem = $('[data-requires="precios"]');
    const show = P && P.mostrar !== false && ((P.porDuracion || []).length || (P.paquetes || []).length);
    if (!section) return;
    if (!show) { section.hidden = true; if (navItem) navItem.hidden = true; return; }
    section.hidden = false;

    const sym = esc(P.simbolo || '$');
    const cur = esc(P.moneda || '');
    const price = (n) => `<span class="price"><small>${sym}</small>${esc(n)}</span>`;

    const tiles = $('#price-tiles');
    tiles.innerHTML = (P.porDuracion || []).map((t, i) => `
      <div class="price-tile reveal" style="--d:${i}">
        <span class="price-tile__dur">${esc(t.duracion)}</span>
        ${price(t.precio)}
        <span class="price__cur">${cur} · por video</span>
      </div>`).join('');
    if (!tiles.innerHTML.trim()) tiles.hidden = true;

    const packs = $('#packs');
    const list = P.paquetes || [];
    packs.innerHTML = list.map((k, i) => {
      const c = contactHref(`Hola ${nombre}, me interesa el ${k.nombre}${k.detalle ? ` (${k.detalle})` : ''}. ¿Me das más información?`);
      return `
      <article class="pack${k.destacado ? ' pack--featured' : ''} reveal" style="--d:${i}">
        ${k.destacado ? '<span class="pack__badge">★ Más elegido</span>' : ''}
        <div>
          <h4 class="pack__name">${esc(k.nombre)}</h4>
          ${k.detalle ? `<p class="pack__detail">${esc(k.detalle)}</p>` : ''}
        </div>
        <div>
          ${price(k.precio)} <span class="price__cur">${cur}</span>
          ${k.ahorro ? `<p class="pack__save">Ahorras ${sym}${esc(k.ahorro)}</p>` : ''}
        </div>
        ${(k.incluye || []).length ? `<ul>${k.incluye.map((x) => `<li>${ICON.check}<span>${esc(x)}</span></li>`).join('')}</ul>` : ''}
        <a class="btn ${k.destacado ? 'btn--primary' : 'btn--ghost'}" ${linkAttrs(c)}>Elegir ${esc(k.nombre)}</a>
      </article>`;
    }).join('');
    if (!list.length) { packs.hidden = true; $('.packs__title').hidden = true; }

    const note = $('#price-note');
    if (P.nota) note.textContent = '* ' + P.nota; else note.hidden = true;
  }

  /* =====================================================================
     RENDER · Contacto
     ===================================================================== */
  function renderContact() {
    const actions = $('#contact-actions');
    const socials = $('#socials');
    if (!actions || !socials) return;
    const hello = `Hola ${nombre}, vi tu portafolio y me gustaría cotizar un video.`;
    const mail = email ? `mailto:${email}?subject=${encodeURIComponent('Cotización de video')}&body=${encodeURIComponent(hello)}` : '';
    // mientras el número esté pendiente, el enlace no lleva a ningún lado
    const waAttrs = waReady
      ? `href="${esc(waLink(hello))}" target="_blank" rel="noopener"`
      : 'href="#contacto" data-pending title="Número de WhatsApp pendiente"';
    const btns = [];

    if (waDisplay) {
      btns.push(`<a class="btn btn--primary" ${waAttrs}>${ICON.whatsapp} Escríbeme por WhatsApp</a>`);
    }
    if (email) {
      btns.push(`<a class="btn ${waDisplay ? 'btn--ghost' : 'btn--primary'}" href="${esc(mail)}">${ICON.mail} Enviar email</a>`);
      if (!waDisplay) btns.push(`<button class="btn btn--ghost" type="button" data-copy="${esc(email)}">${ICON.copy} <span>Copiar email</span></button>`);
    }
    actions.innerHTML = btns.join('');

    // tarjetas con los datos de contacto
    const nac = String(PERFIL.nacionalidad || '').trim();
    const info = [];
    if (waDisplay) {
      info.push(`<li><a class="contact-card" ${waAttrs}><span class="contact-card__icon contact-card__icon--wa">${ICON.whatsapp}</span><span><small>WhatsApp</small><strong>${esc(waDisplay)}</strong></span></a></li>`);
    }
    if (email) {
      info.push(`<li><a class="contact-card" href="${esc(mail)}"><span class="contact-card__icon">${ICON.mail}</span><span><small>Email</small><strong>${esc(email)}</strong></span></a></li>`);
    }
    if (nac) {
      const flag = /cuba|cubano|cubana/i.test(nac) ? ICON.flagCU : ICON.globe;
      info.push(`<li><div class="contact-card"><span class="contact-card__icon contact-card__icon--flag">${flag}</span><span><small>Nacionalidad</small><strong>${esc(nac)}</strong></span></div></li>`);
    }
    if (PERFIL.ubicacion) {
      info.push(`<li><div class="contact-card"><span class="contact-card__icon">${ICON.pin}</span><span><small>Ubicación</small><strong>${esc(PERFIL.ubicacion)}</strong></span></div></li>`);
    }
    if (info.length) actions.insertAdjacentHTML('afterend', `<ul class="contact__info">${info.join('')}</ul>`);
    $$('[data-pending]', actions.parentElement).forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

    const copyBtn = $('[data-copy]', actions);
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const label = $('span', copyBtn);
        const done = () => { label.textContent = '¡Copiado!'; setTimeout(() => (label.textContent = 'Copiar email'), 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(copyBtn.dataset.copy).then(done, () => {});
      });
    }

    const redes = PERFIL.redes || {};
    socials.innerHTML = Object.keys(NET_LABEL)
      .filter((k) => redes[k])
      .map((k) => `<li><a href="${esc(redes[k])}" target="_blank" rel="noopener" aria-label="${NET_LABEL[k]}">${ICON[k]}</a></li>`)
      .join('');
  }

  /* =====================================================================
     LIGHTBOX
     ===================================================================== */
  const lb = $('#lightbox');
  const lbStage = $('#lb-stage');
  let lbList = [];
  let lbIndex = 0;
  let lbReturn = null;

  function openLightbox(list, index, opener) {
    if (!lb || !list.length) return;
    lbList = list;
    lbIndex = Math.max(0, index);
    lbReturn = opener || document.activeElement;
    lb.hidden = false;
    document.body.classList.add('is-locked');
    renderLightbox();
    $('.lightbox__close', lb).focus();
  }

  // ajusta el reproductor al tamaño de pantalla según la proporción del video
  function fitVideo(el, ar) {
    if (ar >= 1) {
      el.style.width = `min(92vw, 1100px, calc((100svh - var(--lb-space)) * ${ar}))`;
      el.style.height = 'auto';
    } else {
      el.style.height = `min(calc(100svh - var(--lb-space)), 820px, calc(92vw / ${ar}))`;
      el.style.width = 'auto';
    }
  }

  function renderLightbox() {
    const it = lbList[lbIndex];
    lbStage.innerHTML = '';
    if (it.media.type === 'local') {
      const v = document.createElement('video');
      v.src = it.media.src;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      if (it.poster) v.poster = it.poster;
      fitVideo(v, it.formato === '16:9' ? 16 / 9 : 9 / 16);
      v.addEventListener('loadedmetadata', () => { if (v.videoWidth) fitVideo(v, v.videoWidth / v.videoHeight); }, { once: true });
      lbStage.append(v);
      v.play().catch(() => {});
    } else {
      const f = document.createElement('iframe');
      f.src = it.media.embed;
      f.title = it.titulo;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.className = it.formato === '16:9' ? 'lb-frame--h' : 'lb-frame--v';
      lbStage.append(f);
    }
    $('#lb-title').textContent = it.titulo;
    $('#lb-meta').textContent = [it.cliente, it.categoria].filter(Boolean).join(' · ');
    $('#lb-count').textContent = lbList.length > 1 ? `${pad(lbIndex + 1)} / ${pad(lbList.length)}` : '';
    $$('.lightbox__nav', lb).forEach((b) => (b.hidden = lbList.length < 2));
  }

  function stepLightbox(dir) {
    if (lbList.length < 2) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    renderLightbox();
  }

  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lbStage.innerHTML = '';
    lb.hidden = true;
    document.body.classList.remove('is-locked');
    if (lbReturn && lbReturn.focus) lbReturn.focus();
  }

  if (lb) {
    $$('[data-close]', lb).forEach((el) => el.addEventListener('click', closeLightbox));
    $('.lightbox__nav--prev', lb).addEventListener('click', () => stepLightbox(-1));
    $('.lightbox__nav--next', lb).addEventListener('click', () => stepLightbox(1));
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') stepLightbox(1);
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'Tab') {
        const f = $$('button:not([hidden]), video, iframe', lb).filter((el) => el.offsetParent !== null || el.tagName === 'IFRAME');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* =====================================================================
     INTRO
     ===================================================================== */
  function runIntro() {
    const intro = $('#intro');
    const ready = () => root.classList.add('is-ready');
    if (!intro) return ready();

    let seen = false;
    try { seen = sessionStorage.getItem('desmos-intro') === '1'; } catch (_) { /* sin storage */ }
    if (seen || reduceMotion || location.hash.length > 1) { intro.remove(); ready(); return; }
    try { sessionStorage.setItem('desmos-intro', '1'); } catch (_) { /* sin storage */ }

    const video = $('video', intro);
    document.body.classList.add('is-locked');
    let done = false;
    const onKey = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) { e.preventDefault(); finish(); }
    };
    function finish() {
      if (done) return;
      done = true;
      intro.classList.add('is-done');
      document.body.classList.remove('is-locked');
      removeEventListener('keydown', onKey);
      ready();
      setTimeout(() => intro.remove(), 900);
    }
    addEventListener('keydown', onKey);
    intro.addEventListener('click', finish);
    video.addEventListener('timeupdate', () => {
      if (video.currentTime > 3.2) intro.classList.add('show-brand');
      if (video.currentTime > 4.95) finish();
    });
    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    const p = video.play();
    if (p && p.catch) p.catch(finish);
    setTimeout(finish, 9000);
  }

  /* =====================================================================
     UI: header, menú, progreso, scrollspy, timecode, reveal
     ===================================================================== */
  function setupHeader() {
    const header = $('#header');
    const bar = $('#progress');
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();

    // menú móvil
    const toggle = $('.nav__toggle');
    const links = $('#nav-links');
    const setOpen = (open) => {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
    $$('a', links).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (e) => { if (!e.target.closest('.nav')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

    // scrollspy
    if (!('IntersectionObserver' in window)) return;
    const navLinks = $$('.nav__links a[href^="#"]:not(.btn)');
    const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    if (byId.has('trabajos')) byId.set('casos', byId.get('trabajos'));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove('is-active'));
        const a = byId.get(e.target.id);
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach((s) => spy.observe(s));
  }

  function setupHero() {
    const hero = $('.hero');
    const video = $('.hero__video');
    const tc = $('#timecode');
    let visible = true;
    let raf = 0;
    let lastFrame = -1;
    const t0 = performance.now();

    if (video && reduceMotion) video.pause();

    const tick = (now) => {
      const t = (now - t0) / 1000;
      const frame = Math.floor(t * 30);
      if (frame !== lastFrame) {
        lastFrame = frame;
        tc.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(frame % 30)}`;
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    if (tc && !reduceMotion) raf = requestAnimationFrame(tick);

    if (!hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (video && !reduceMotion) { if (visible) video.play().catch(() => {}); else video.pause(); }
      if (visible && tc && !reduceMotion) { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
    }).observe(hero);
  }

  function setupReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  function numberSections() {
    $$('main > .section').filter((s) => !s.hidden).forEach((s, i) => {
      const n = $('.label span', s);
      if (n) n.textContent = pad(i + 1);
    });
  }

  /* ---------- Init ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  renderGrid();
  renderCases();
  renderPrices();
  renderContact();
  numberSections();
  setupHeader();
  setupHero();
  setupReveal();
  runIntro();
})();
