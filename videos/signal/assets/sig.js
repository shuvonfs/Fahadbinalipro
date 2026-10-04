/* Shared components for "The Signal Has Changed".
 * One line-icon family, signal chips, the audience-setup panel, persona cards,
 * system nodes and funnel steps — reused across scenes for continuity.
 */
(function () {
  const P = {
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    user: '<circle cx="12" cy="8.5" r="3.4"/><path d="M5.5 19.5c.8-3.3 3.3-5.1 6.5-5.1s5.7 1.8 6.5 5.1"/>',
    users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.7-3 2.8-4.6 5.5-4.6s4.8 1.6 5.5 4.6"/><circle cx="16.5" cy="9" r="2.4"/><path d="M15.5 14.6c2.6 0 4.3 1.5 5 4.4"/>',
    home: '<path d="M4 11l8-6.5L20 11M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    pin: '<path d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 1 0-13 0c0 5.2 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    cursor: '<path d="M6 3.5l12 7-5.2 1.4 3.4 6-2.4 1.4-3.4-6L6.5 17z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>',
    db: '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>',
    signal: '<path d="M4 18c2-3 4-3 6 0s4 3 6 0 3-3 4-1.5"/><path d="M4 11c2-3 4-3 6 0s4 3 6 0 3-3 4-1.5"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
    ai: '<circle cx="12" cy="12" r="2.6"/><circle cx="5" cy="6" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.3 7l3.7 3.2M17.7 7 14 10.2M6.3 17l3.7-3.2M17.7 17 14 13.8"/>',
    rank: '<path d="M5 19V13M10 19V9M15 19V11M20 19V5"/><path d="M3 19h18"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
    graph: '<path d="M4 18l5-5 4 3 7-8M15 8h5v5"/>',
    cal: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    form: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
    star: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
    goal: '<path d="M5 21V4M5 4.5h11l-2 3.5 2 3.5H5"/>',
    chat: '<path d="M4 5.5h16V16H10l-4.5 3.5V16H4z"/>',
    heart: '<path d="M12 19.5s-7.5-4.6-7.5-9.7A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.2c0 5.1-7.5 9.7-7.5 9.7z"/>',
    play: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M10 9.2v5.6l4.8-2.8z"/>',
    text: '<path d="M5 6h14M5 10h14M5 14h9M5 18h6"/>',
    tag: '<path d="M3.5 12.5V4.5h8l9 9-8 8z"/><circle cx="8" cy="9" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    space: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  function icon(name, size, cls) {
    return `<svg class="ico ${cls || ""}" viewBox="0 0 24 24" width="${size || 48}" height="${size || 48}"><g class="ic">${P[name] || ""}</g></svg>`;
  }
  // UI chip: [icon] LABEL
  function chip(label, ic, extra) {
    return `<div class="uchip ${extra || ""}">${ic ? icon(ic, 34) : ""}<span data-layout-allow-overlap>${label}</span></div>`;
  }
  // Persona card
  function persona(name, sub, tags) {
    return `<div class="pcard glass"><div class="pc-av">${icon("user", 56)}</div><div class="pc-tx"><b data-layout-allow-overlap>${name}</b><em data-layout-allow-overlap>${sub || ""}</em></div>
      ${tags ? `<div class="pc-tags">${tags.map(t => `<i data-layout-allow-overlap>${t}</i>`).join("")}</div>` : ""}</div>`;
  }
  // System node
  function node(label, ic, extra) {
    return `<div class="snode ${extra || ""}">${icon(ic, 46)}<span data-layout-allow-overlap>${label}</span></div>`;
  }
  // mini ad candidate (numbered)
  function cand(n) {
    return `<div class="cand"><b></b><i></i><u data-layout-allow-overlap>AD ${String(n).padStart(2, "0")}</u></div>`;
  }
  function el(html) {
    const t = document.createElement("div");
    t.innerHTML = html.trim();
    return t.firstElementChild;
  }
  function put(parent, html, x, y) {
    const e = el(html);
    e.style.position = "absolute";
    e.style.left = x + "px";
    e.style.top = y + "px";
    parent.appendChild(e);
    return e;
  }
  window.SIG = { icon, chip, persona, node, cand, el, put, P };
})();
