/* Shared kit for the Fahad intro: one line-icon family + small builders. */
(function () {
  const P = {
    ads: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M7 15l3-6 3 6M8 13h4M15.5 9v6M15.5 9h1.5a2 2 0 0 1 0 4h-1.5"/>',
    strategy: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h5a3 3 0 0 1 3 3v1M16 18h-5a3 3 0 0 1-3-3v-1M14 8l2 2 2-2M6 16l2-2 2 2"/>',
    users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.7-3 2.8-4.6 5.5-4.6s4.8 1.6 5.5 4.6"/><circle cx="16.5" cy="9" r="2.4"/><path d="M15.5 14.6c2.6 0 4.3 1.5 5 4.4"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>',
    funnel: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
    growth: '<path d="M4 18l5-5 4 3 7-8M15 8h5v5"/>',
    building: '<path d="M5 21V6l7-3v18M12 9l7 2.5V21M3 21h18M8 8.5h1.5M8 12h1.5M8 15.5h1.5M15 14h1.5M15 17h1.5"/>',
    grad: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5M21.5 9.5V15"/>',
    plane: '<path d="M10.5 13.5L4 11l1.5-1.5 7 1L17 6c1-1 2.6-1.3 3-1s0 2-1 3l-4.5 4.5 1 7L14 21l-2.5-6.5L8 18v2.5L6.5 22 5 18.5 1.5 17 3 15.5h2.5z"/>',
    car: '<path d="M4 15.5l1.6-5A2 2 0 0 1 7.5 9h9a2 2 0 0 1 1.9 1.5l1.6 5V19h-3v-2H7v2H4z"/><circle cx="7.5" cy="14.5" r="1.1"/><circle cx="16.5" cy="14.5" r="1.1"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V9M16 16v-6"/>',
    nodes: '<circle cx="12" cy="12" r="2.6"/><circle cx="5" cy="6" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.3 7l3.7 3.2M17.7 7 14 10.2M6.3 17l3.7-3.2M17.7 17 14 13.8"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    house: '<path d="M4 11l8-6.5L20 11M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    brief: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5h6v2M3.5 12.5h17"/>',
    laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 18.5h18"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',
    star: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
    cal: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    tag: '<path d="M3.5 12.5V4.5h8l9 9-8 8z"/><circle cx="8" cy="9" r="1.5"/>',
    coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.3c-.5-1-1.6-1.6-2.8-1.6-1.6 0-2.8.9-2.8 2.1 0 2.8 5.8 1.4 5.8 4.3 0 1.2-1.3 2.2-3 2.2-1.3 0-2.5-.6-3-1.6M12 6v1.7M12 16.3V18"/>',
    ai: '<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9.5 15l1.6-6h1.8l1.6 6M10.1 13h3.8M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
    crm: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 13h3M8 16h6M15.5 13h1"/>',
    web: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 8.5h18M6 6.5h.01M8.5 6.5h.01"/>',
    revenue: '<path d="M4 20h16M6 20v-5M10 20v-8M14 20v-6M18 20V7"/><path d="M15 5h3v3"/>',
    leak: '<path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z"/>'
  };
  function icon(name, size, cls) {
    return `<svg class="ico ${cls || ""}" viewBox="0 0 24 24" width="${size || 48}" height="${size || 48}"><g class="ic">${P[name] || ""}</g></svg>`;
  }
  function el(html) { const t = document.createElement("div"); t.innerHTML = html.trim(); return t.firstElementChild; }
  function put(parent, html, x, y) { const e = el(html); e.style.position = "absolute"; e.style.left = x + "px"; e.style.top = y + "px"; parent.appendChild(e); return e; }
  // glass node: [icon] LABEL  (centred on x,y when placed with putC)
  function node(label, ic, cls, size) {
    return `<div class="node glass ${cls || ""}">${ic ? icon(ic, size || 40) : ""}<span data-layout-allow-overlap>${label}</span></div>`;
  }
  function putC(parent, html, cx, cy) {
    const e = el(html); e.style.position = "absolute"; e.style.left = cx + "px"; e.style.top = cy + "px";
    parent.appendChild(e);
    gsap.set(e, { xPercent: -50, yPercent: -50 });
    return e;
  }
  window.KIT = { icon, el, put, putC, node, P };
})();
