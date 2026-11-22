(function () {
  "use strict";

  var C = window.NAILS_CONFIG || {};
  var html = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- WhatsApp ---------- */
  function waHref(msg) {
    var text = msg || C.mensaje || "Hola, quiero agendar una cita.";
    return "https://wa.me/" + encodeURIComponent(C.whatsapp || "") + "?text=" + encodeURIComponent(text);
  }
  $$(".wa-link").forEach(function (a) { a.href = waHref(); });

  /* ---------- Datos de contacto ---------- */
  if (C.direccion) $("#addr").textContent = C.direccion;
  $("#mapLink").href = C.mapa ||
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.direccion || "Camarones");

  if (C.nequi) {
    var n = String(C.nequi).replace(/\D/g, "");
    $("#nequiNum").textContent = n.length === 10 ? n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6) : n;
  }

  /* ---------- Fotos: imagen real o cuadro "Foto acá" ---------- */
  function media(foto, alt) {
    if (foto) {
      return '<img class="media reveal-media" src="' + esc(foto) + '" alt="' + esc(alt) +
        '" loading="lazy" decoding="async">';
    }
    return '<div class="media ph reveal-media" role="img" aria-label="Foto pendiente">' +
      '<svg class="spark ph__spark" aria-hidden="true"><use href="#sparkle"/></svg><span>Foto acá</span></div>';
  }

  /* ---------- Precios ---------- */
  var menu = $("#menu");
  (C.servicios || []).forEach(function (s, i) {
    var li = document.createElement("li");
    li.className = "svc";
    li.setAttribute("data-reveal", "");
    li.style.setProperty("--d", (i % 4) * 90 + "ms");
    li.innerHTML =
      '<figure class="svc__photo">' + media(s.foto, s.alt || "Ejemplo de " + s.nombre) + '<span class="veil"></span></figure>' +
      '<div class="svc__info">' +
        '<h3 class="svc__name"><svg aria-hidden="true"><use href="#sparkle"/></svg>' + esc(s.nombre) + '</h3>' +
        '<div class="svc__line"><i class="svc__leader" aria-hidden="true"></i><p class="svc__price">' + esc(s.precio) + '</p></div>' +
        (s.nota ? '<p class="svc__note">' + esc(s.nota) + '</p>' : '') +
        '<a class="svc__book" target="_blank" rel="noopener" href="' +
          esc(waHref("Hola Nails Anyuris, quiero agendar: " + s.nombre + ".")) + '">Agendar este servicio</a>' +
      '</div>';
    menu.appendChild(li);
  });

  /* ---------- Galería ---------- */
  var ratios = ["4 / 5", "1 / 1", "3 / 4", "1 / 1", "4 / 5", "3 / 4", "1 / 1", "4 / 5", "3 / 4"];
  var mosaic = $("#mosaic");
  (C.trabajos || []).forEach(function (t, i) {
    var fig = document.createElement("figure");
    fig.className = "shot";
    fig.setAttribute("data-reveal", "");
    fig.style.aspectRatio = ratios[i % ratios.length];
    fig.style.setProperty("--d", (i % 3) * 110 + "ms");
    fig.innerHTML = media(t.foto, t.alt || "Trabajo de uñas") + '<span class="veil"></span>';
    mosaic.appendChild(fig);
  });

  /* ---------- Banda (texto repetido) ---------- */
  var track = $("#bandTrack");
  var bandHTML = "";
  for (var b = 0; b < 14; b++) {
    bandHTML += "<span>Nails Anyuris</span><svg aria-hidden=\"true\"><use href=\"#sparkle\"/></svg>";
  }
  track.innerHTML = bandHTML;

  /* ---------- Revelado al hacer scroll ---------- */
  var revealEls = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Copiar Nequi ---------- */
  var copyBtn = $("#copyNequi");
  var live = $("#copyLive");
  copyBtn.addEventListener("click", function () {
    var num = String(C.nequi || "").replace(/\D/g, "");
    function done(ok) {
      var msg = ok ? "Número copiado" : "No se pudo copiar";
      copyBtn.textContent = msg;
      live.textContent = msg;
      setTimeout(function () { copyBtn.textContent = "Copiar número"; live.textContent = ""; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(num).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  /* ============================================================
     INTRO: el nombre en grande
     ============================================================ */
  var hero = $("#inicio");
  var idx = 0;
  $$(".hero__name .word").forEach(function (w) {
    var text = w.textContent;
    w.textContent = "";
    w.setAttribute("aria-hidden", "true");
    Array.prototype.forEach.call(text, function (ch) {
      var s = document.createElement("span");
      s.className = "char";
      s.textContent = ch;
      s.style.setProperty("--c", idx++);
      w.appendChild(s);
    });
  });

  /* Ajusta el tamaño del nombre para que siempre quepa en pantalla */
  var nameEl = $(".hero__name");
  function fitName() {
    nameEl.style.fontSize = "";
    var avail = window.innerWidth * 0.92;
    var widest = nameEl.scrollWidth;
    $$(".word", nameEl).forEach(function (w) { widest = Math.max(widest, w.scrollWidth); });
    if (widest > avail) {
      nameEl.style.fontSize = (parseFloat(getComputedStyle(nameEl).fontSize) * avail / widest).toFixed(2) + "px";
    }
  }
  fitName();
  window.addEventListener("resize", fitName, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);

  var settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    hero.classList.add("is-go", "is-settled");
    html.classList.remove("is-intro");
    ["wheel", "touchstart", "keydown"].forEach(function (ev) {
      window.removeEventListener(ev, settle);
    });
  }

  function start() {
    hero.classList.add("is-go");
    if (reduce) { settle(); return; }
    setTimeout(settle, 1750);
    ["wheel", "touchstart", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, settle, { passive: true, once: true });
    });
  }

  /* Espera a la tipografía para que la animación no salte */
  var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 1500); })]).then(start);

  /* ============================================================
     SCROLL: la portada se aleja, aparecen barra y botón flotante,
     la banda se desplaza
     ============================================================ */
  var stage = $("#stage");
  var foot = $("#heroFoot");
  var nav = $("#nav");
  var fab = $("#fab");
  var band = $("#band");
  var ticking = false;
  var heroDone = false;

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;
    var p = Math.min(Math.max(y / vh, 0), 1);

    if (!reduce && (p < 1 || !heroDone)) {
      stage.style.transform = "translate3d(0," + (-p * 9).toFixed(2) + "vh,0) scale(" + (1 - p * 0.16).toFixed(4) + ")";
      stage.style.opacity = (1 - p * 0.9).toFixed(3);
      foot.style.opacity = Math.max(0, 1 - p * 1.8).toFixed(3);
      heroDone = p >= 1;
    }

    var on = p > 0.6;
    nav.classList.toggle("is-on", on);
    nav.setAttribute("aria-hidden", on ? "false" : "true");
    fab.classList.toggle("is-on", on);

    if (!reduce) {
      var r = band.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        track.style.transform = "translate3d(" + ((r.top - vh) * 0.55).toFixed(1) + "px,0,0)";
      }
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
