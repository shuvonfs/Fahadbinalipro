"""Scaffolding for the Fahad intro. Timings come from tools/cues.json (C[...])."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
C = {k: v for k, v in json.load(open(os.path.join(HERE, "cues.json"))).items() if not k.startswith("_")}

def scene(cid, t0, css, html, js):
    doc = f'''<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>
        #root {{ position: absolute; inset: 0; }}
{css}
      </style>
      <div id="root" data-composition-id="{cid}" data-width="1080" data-height="1920">
{html}
      </div>
      <script>
        const tl = gsap.timeline({{ paused: true }});
        const K = window.KIT;
        const C = {json.dumps(C)};
        const T0 = {t0}, at = (g) => +(g - T0).toFixed(3);
        const scope = '[data-composition-id="{cid}"]';
        const $ = (s) => document.querySelector(scope + ' ' + s);
        const $$ = (s) => Array.from(document.querySelectorAll(scope + ' ' + s));
        const rise = (sel, t, d) => tl.fromTo(sel, {{ yPercent: 125 }}, {{ yPercent: 0, duration: d || 0.5, ease: "expo.out" }}, at(t));
        const fadeUp = (sel, t, d) => tl.fromTo(sel, {{ opacity: 0, y: 22 }}, {{ opacity: 1, y: 0, duration: d || 0.45, ease: "power3.out" }}, at(t));
        const pop = (sel, t, d) => tl.fromTo(sel, {{ opacity: 0, scale: 0.85 }}, {{ opacity: 1, scale: 1, duration: d || 0.45, ease: "back.out(1.5)" }}, at(t));
        const fadeOut = (sel, t, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.3, ease: "power2.in" }}, at(t));
        const dash = (el) => {{ const l = el.getTotalLength(); el.style.strokeDasharray = l; el.style.strokeDashoffset = l; return l; }};
        const draw = (el, t, d) => {{ const l = dash(el); tl.fromTo(el, {{ strokeDashoffset: l }}, {{ strokeDashoffset: 0, duration: d || 0.6, ease: "power2.inOut" }}, at(t)); }};
        const line = (svg, d, stroke, w) => {{
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', stroke || 'rgba(114,0,19,0.35)');
          p.setAttribute('stroke-width', w || 3); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p); return p;
        }};
        const pulse = (svg, d, t, until, w) => {{
          const p = line(svg, d, '#80011F', w || 6); const len = p.getTotalLength(); p.style.strokeDasharray = `22 ${{len}}`;
          const n = Math.max(1, Math.floor((until - t) / 0.9));
          tl.fromTo(p, {{ strokeDashoffset: 22 }}, {{ strokeDashoffset: -len, duration: 0.9, ease: "none", repeat: n - 1 }}, at(t));
          return p;
        }};
{js}
        window.__timelines["{cid}"] = tl;
      </script>
    </template>
  </body>
</html>
'''
    with open(os.path.join(ROOT, "compositions", cid + ".html"), "w") as f:
        f.write(doc)
