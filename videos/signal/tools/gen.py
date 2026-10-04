"""Tiny scaffolder: wraps a scene's CSS/HTML/JS in the HyperFrames sub-composition shell."""
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "compositions")

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
        const S = window.SIG, H = window.HFX;
        const T0 = {t0}, at = (g) => +(g - T0).toFixed(3);
        const scope = '[data-composition-id="{cid}"]';
        const $ = (s) => document.querySelector(scope + ' ' + s);
        const $$ = (s) => Array.from(document.querySelectorAll(scope + ' ' + s));
        const rise = (sel, t, d) => tl.fromTo(sel, {{ yPercent: 125 }}, {{ yPercent: 0, duration: d || 0.45, ease: "expo.out" }}, at(t));
        const fadeUp = (sel, t, d) => tl.fromTo(sel, {{ opacity: 0, y: 22 }}, {{ opacity: 1, y: 0, duration: d || 0.4, ease: "power3.out" }}, at(t));
        const fadeOut = (sel, t, d) => tl.to(sel, {{ opacity: 0, duration: d || 0.25, ease: "power2.in" }}, at(t));
        const dash = (el) => {{ const l = el.getTotalLength(); el.style.strokeDasharray = l; el.style.strokeDashoffset = l; return l; }};
        const draw = (el, t, d) => {{ const l = dash(el); tl.fromTo(el, {{ strokeDashoffset: l }}, {{ strokeDashoffset: 0, duration: d || 0.5, ease: "power2.inOut" }}, at(t)); }};
        const line = (svg, d, stroke, w) => {{
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', stroke || 'rgba(251,252,235,0.45)');
          p.setAttribute('stroke-width', w || 3); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p); return p;
        }};
{js}
        window.__timelines["{cid}"] = tl;
      </script>
    </template>
  </body>
</html>
'''
    with open(os.path.join(OUT, cid + ".html"), "w") as f:
        f.write(doc)
