/* Shared visual library for the Andromeda reel.
 * Duotone "photo" illustrations in the brand palette + a social-feed ad mockup.
 * Everything is deterministic (seeded), so every frame renders identically.
 */
(function () {
  const IV = "#FBFCEB", BU = "#720013", DM = "#2D0001", WI = "#3F1521", CR = "#80011F";

  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function windows(x, y, cols, rows, w, h, gx, gy, seed, litRate) {
    const r = rng(seed);
    let out = "";
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const lit = r() < litRate;
      out += `<rect class="win${lit ? " lit" : ""}" x="${x + i * gx}" y="${y + j * gy}" width="${w}" height="${h}" rx="2" fill="${IV}" opacity="${lit ? 0.85 : 0.1}"/>`;
    }
    return out;
  }

  // ---------- photos (640 × 440) ----------
  function sky(u, top, mid, bot) {
    return `<defs>
      <linearGradient id="sky${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient>
      <radialGradient id="sun${u}" cx=".74" cy=".3" r=".45"><stop offset="0" stop-color="${IV}" stop-opacity=".55"/><stop offset=".35" stop-color="${IV}" stop-opacity=".12"/><stop offset="1" stop-color="${IV}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="640" height="440" fill="url(#sky${u})"/><rect width="640" height="440" fill="url(#sun${u})"/>`;
  }

  function skyline(op) {
    return `<g fill="${DM}" opacity="${op}">
      <rect x="0" y="250" width="60" height="190"/><rect x="55" y="210" width="45" height="230"/><rect x="95" y="270" width="70" height="170"/>
      <rect x="450" y="230" width="55" height="210"/><rect x="500" y="260" width="80" height="180"/><rect x="575" y="200" width="65" height="240"/>
    </g>`;
  }

  function tower(u) {
    return `<g>
      <rect x="190" y="70" width="150" height="370" fill="${WI}" stroke="${IV}" stroke-opacity=".55" stroke-width="2"/>
      <rect x="340" y="140" width="120" height="300" fill="${DM}" stroke="${IV}" stroke-opacity=".45" stroke-width="2"/>
      <path d="M190 70 L265 46 L340 70" fill="none" stroke="${IV}" stroke-opacity=".7" stroke-width="2"/>
      ${windows(206, 92, 5, 13, 18, 14, 27, 26, 7 + u.length, 0.42)}
      ${windows(354, 160, 4, 10, 16, 14, 27, 27, 31 + u.length, 0.35)}
      <g stroke="${IV}" stroke-opacity=".35" stroke-width="2">${[118, 170, 222, 274, 326].map(y => `<path d="M190 ${y}h150"/>`).join("")}</g>
    </g>`;
  }

  function trees() {
    return `<g fill="${DM}">
      <circle cx="40" cy="410" r="46"/><circle cx="105" cy="420" r="38"/><circle cx="560" cy="414" r="44"/><circle cx="615" cy="405" r="40"/>
      <rect x="0" y="420" width="640" height="20"/>
    </g>`;
  }

  const photos = {
    tower(u, alt) {
      const s = alt ? sky(u, "#FBFCEB", "#80011F", "#3F1521") : sky(u, "#80011F", "#3F1521", "#2D0001");
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${s}${skyline(0.75)}${tower(u)}${trees()}</svg>`;
    },
    invest(u) {
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${sky(u, "#80011F", "#3F1521", "#2D0001")}${skyline(0.7)}
        <g transform="translate(-90 0)">${tower(u)}</g>${trees()}
        <rect x="380" y="70" width="230" height="250" rx="18" fill="${DM}" fill-opacity=".72" stroke="${IV}" stroke-opacity=".35" stroke-width="2"/>
        <path d="M405 290H590M405 290V95" stroke="${IV}" stroke-opacity=".35" stroke-width="2"/>
        <path class="trend" d="M412 270 L450 252 L488 258 L526 214 L560 196 L588 140" fill="none" stroke="${IV}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="trend-head" d="M572 136 L590 138 L586 156" fill="none" stroke="${IV}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    },
    family(u) {
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="wall${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3F1521"/><stop offset="1" stop-color="#2D0001"/></linearGradient>
        <radialGradient id="lamp${u}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${IV}" stop-opacity=".5"/><stop offset="1" stop-color="${IV}" stop-opacity="0"/></radialGradient></defs>
        <rect width="640" height="440" fill="url(#wall${u})"/>
        <g class="room-window"><rect x="200" y="50" width="300" height="190" fill="${CR}"/>
          <g fill="${DM}" opacity=".9"><rect x="215" y="150" width="40" height="90"/><rect x="260" y="120" width="34" height="120"/><rect x="300" y="165" width="50" height="75"/><rect x="390" y="130" width="40" height="110"/><rect x="435" y="160" width="50" height="80"/></g>
          <path d="M350 50V240M200 145H500" stroke="${DM}" stroke-width="6"/><rect x="200" y="50" width="300" height="190" fill="none" stroke="${IV}" stroke-opacity=".5" stroke-width="4"/></g>
        <rect x="0" y="330" width="640" height="110" fill="${DM}"/>
        <ellipse cx="330" cy="395" rx="230" ry="26" fill="${BU}" opacity=".55"/>
        <circle cx="560" cy="150" r="90" fill="url(#lamp${u})"/>
        <path d="M560 120v190M530 310h60" stroke="${IV}" stroke-opacity=".7" stroke-width="4"/><path d="M535 120h50l-12-34h-26z" fill="${IV}" opacity=".85"/>
        <g class="sofa"><rect x="150" y="270" width="360" height="80" rx="18" fill="${BU}"/><rect x="130" y="250" width="40" height="110" rx="14" fill="${CR}"/><rect x="490" y="250" width="40" height="110" rx="14" fill="${CR}"/><rect x="165" y="236" width="330" height="50" rx="16" fill="${CR}"/></g>
        <g class="people" fill="${IV}">
          <circle cx="250" cy="214" r="20"/><path d="M222 290c0-34 12-56 28-56s28 22 28 56z"/>
          <circle cx="330" cy="232" r="15"/><path d="M310 292c0-26 9-44 20-44s20 18 20 44z"/>
          <circle cx="408" cy="212" r="20"/><path d="M380 290c0-34 12-56 28-56s28 22 28 56z"/>
        </g>
        <g fill="${DM}"><path d="M70 330c-6-60 6-110 30-130 20 26 26 80 20 130z" fill="${BU}"/><rect x="74" y="320" width="44" height="40" rx="6" fill="${WI}"/></g>
        <g class="expand" stroke="${IV}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M118 405H30M44 392l-14 13 14 13M522 405h88M596 392l14 13-14 13"/></g>
      </svg>`;
    },
    map(u) {
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="440" fill="${DM}"/>
        <path d="M-20 300 C 120 250, 220 380, 360 330 S 560 260, 660 300" stroke="${BU}" stroke-width="34" fill="none" opacity=".8"/>
        <g fill="${WI}">${[[20, 20, 110, 80], [150, 20, 120, 80], [310, 20, 150, 80], [500, 20, 120, 80], [20, 130, 110, 110], [150, 130, 120, 60], [310, 130, 70, 110], [420, 130, 200, 60], [20, 360, 160, 60], [220, 370, 140, 50], [420, 360, 200, 60]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`).join("")}</g>
        <g stroke="${IV}" stroke-opacity=".14" stroke-width="10"><path d="M0 115H640M0 255H640M140 0V440M295 0V440M400 0V440M490 0V440"/></g>
        <path class="route" d="M110 330 C 110 255, 140 255, 220 255 S 295 200, 295 160 S 330 115, 400 115 S 490 80, 540 70" fill="none" stroke="${IV}" stroke-width="7" stroke-linecap="round"/>
        <g class="pin-home"><circle cx="110" cy="330" r="30" fill="${CR}" stroke="${IV}" stroke-width="4"/><path d="M96 334l14-12 14 12v12H96z" fill="${IV}"/></g>
        <g class="pin-office"><circle cx="540" cy="70" r="30" fill="${CR}" stroke="${IV}" stroke-width="4"/><rect x="528" y="58" width="24" height="24" rx="2" fill="${IV}"/><path d="M533 64h4M543 64h4M533 71h4M543 71h4" stroke="${CR}" stroke-width="2"/></g>
      </svg>`;
    },
    trust(u) {
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        ${sky(u, "#3F1521", "#2D0001", "#2D0001")}
        <g opacity=".35" transform="translate(330 20) scale(.9)">${tower(u)}</g>
        <g class="doc"><rect x="50" y="60" width="380" height="330" rx="18" fill="${IV}"/>
          <text x="100" y="110" font-size="24" font-weight="800" letter-spacing="2" fill="${CR}">BEFORE YOU BUY</text><rect x="100" y="126" width="230" height="4" rx="2" fill="${WI}" opacity=".25"/>
          ${[170, 240, 310].map((y, i) => `<g class="chk chk${i}"><circle cx="118" cy="${y}" r="20" fill="${CR}"/><path d="M108 ${y}l7 7 13-14" stroke="${IV}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="146" y="${y + 9}" font-size="25" font-weight="800" fill="${WI}">${["Developer credibility", "Project quality", "Documentation"][i]}</text></g>`).join("")}
        </g>
        <g class="seal" transform="translate(520 300)"><circle r="78" fill="${CR}" stroke="${IV}" stroke-width="5"/><circle r="62" fill="none" stroke="${IV}" stroke-opacity=".5" stroke-width="2" stroke-dasharray="6 6"/>
          <path d="M0-38l30 13v20c0 20-13 34-30 41-17-7-30-21-30-41v-20z" fill="none" stroke="${IV}" stroke-width="5"/><path d="M-13 2l9 9 18-19" fill="none" stroke="${IV}" stroke-width="5" stroke-linecap="round"/></g>
      </svg>`;
    },
    offer(u) {
      return `<svg viewBox="0 0 640 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        ${sky(u, "#80011F", "#720013", "#3F1521")}
        <g class="key" transform="translate(100 120)"><circle cx="60" cy="60" r="52" fill="none" stroke="${IV}" stroke-width="16"/><path d="M106 84 L200 178 M168 146 l26-26 M190 168 l18-18" stroke="${IV}" stroke-width="16" stroke-linecap="round"/>
          <rect x="34" y="-10" width="52" height="40" rx="6" fill="${DM}" stroke="${IV}" stroke-width="3"/><path d="M46 8l14-11 14 11v12H46z" fill="${IV}"/></g>
        <g class="plan" transform="translate(330 70)"><rect width="270" height="300" rx="22" fill="${DM}" fill-opacity=".85" stroke="${IV}" stroke-opacity=".4" stroke-width="2"/>
          <text x="24" y="46" font-size="22" font-weight="800" letter-spacing="2" fill="${IV}" opacity=".7">PAYMENT PLAN</text>
          ${[0, 1, 2].map(i => `<g class="pstep pstep${i}"><circle cx="46" cy="${100 + i * 70}" r="16" fill="${CR}" stroke="${IV}" stroke-width="3"/><text x="78" y="${109 + i * 70}" font-size="26" font-weight="800" fill="${IV}">${["Booking", "Installments", "Handover"][i]}</text></g>`).join("")}
          <path d="M46 116V154M46 186V224" stroke="${IV}" stroke-opacity=".5" stroke-width="3"/></g>
      </svg>`;
    },
    interiorPlan(u) { return photos.family(u); }
  };

  const globe = `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9" fill="none" stroke="${IV}" stroke-opacity=".6" stroke-width="2"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="${IV}" stroke-opacity=".6" stroke-width="1.6"/></svg>`;

  // ---------- social-feed ad mockup (640 × 740) ----------
  function ad(o) {
    const cls = "fbad" + (o.cls ? " " + o.cls : "");
    return `<div class="${cls}">
      <div class="fb-h"><div class="fb-av" data-layout-allow-overlap>AP</div><div><div class="fb-nm" data-layout-allow-overlap>Apartment Project</div><div class="fb-sp" data-layout-allow-overlap>Sponsored · ${globe}</div></div><div class="fb-dots" data-layout-allow-overlap>···</div></div>
      <div class="fb-tx"><i style="width:${o.t1 || 470}px"></i><i style="width:${o.t2 || 320}px"></i></div>
      <div class="fb-img">${o.photo}</div>
      <div class="fb-f"><div><div class="fb-dm" data-layout-allow-overlap>APARTMENTPROJECT.COM</div><div class="fb-hl" data-layout-allow-overlap>${o.headline}</div></div><div class="fb-cta" data-layout-allow-overlap>${o.cta || "Learn more"}</div></div>
    </div>`;
  }

  const angles = [
    { key: "invest", name: "INVESTMENT", photo: "invest", headline: "Invest in property?", cta: "Learn more" },
    { key: "family", name: "FAMILY", photo: "family", headline: "More space for family", cta: "See plans" },
    { key: "map", name: "LOCATION", photo: "map", headline: "30 minutes closer", cta: "View location" },
    { key: "trust", name: "TRUST", photo: "trust", headline: "Check these 3 things", cta: "Learn more" },
    { key: "offer", name: "OFFER", photo: "offer", headline: "Easy payment plan", cta: "Book now" }
  ];
  // Build an ad (native 640×740) wrapped for placement by its centre point.
  function place(parent, html, cx, cy, scale) {
    const w = document.createElement("div");
    w.style.cssText = `position:absolute;left:${cx - 320}px;top:${cy - 370}px;width:640px;height:740px;`;
    w.innerHTML = html;
    parent.appendChild(w);
    gsap.set(w, { scale, transformOrigin: "50% 50%" });
    return w;
  }
  function angleAd(i, u, extraCls) {
    const a = angles[i];
    return ad({ photo: photos[a.photo](u), headline: a.headline, cta: a.cta, cls: extraCls });
  }
  window.HFX = { photos, ad, rng, angles, place, angleAd };
})();
