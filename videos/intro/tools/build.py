"""Builds index.html (scene slots) from cues.json, then all scenes."""
import os, json
from gen import C, ROOT

SCENES = [  # id, start cue, lead-in (s)
    ("s01-system", None, 0), ("s02-profile", "fahad", 0.35), ("s03-industries", "realEstate", 0.55), ("s04-brands", "brands", 0.35),
    ("s05-lead", "focus", 0.35), ("s06-funnel", "source", 0.3), ("s07-campaign", "campaign", 0.35), ("s08-modern", "today", 0.35),
    ("s09-nested", "advertising", 0.35), ("s10-system", "growthSystem", 0.3), ("s11-market", "reStudy", 0.35), ("s12-content", "platform", 0.35),
    ("s13-final", "ifYou", 0.35),
]
def starts():
    out = []
    for i, (cid, key, lead) in enumerate(SCENES):
        st = 0.0 if key is None else round(C[key] - lead, 3)
        out.append([cid, st])
    for i in range(len(out)):
        en = out[i + 1][1] if i + 1 < len(out) else C["end"]
        out[i].append(round(en - out[i][1], 3))
    return out
START = {cid: st for cid, st, _ in starts()}

def index():
    slots = "".join(f'      <div id="el-{cid[:3]}" data-composition-id="{cid}" data-composition-src="compositions/{cid}.html" data-start="{st:g}" data-duration="{du:g}" data-track-index="1" data-width="1080" data-height="1920"></div>\n' for cid, st, du in starts())
    end = C["end"]
    tpl = open(os.path.join(ROOT, "tools", "index.tpl.html")).read()
    audio = ""
    if os.path.exists(os.path.join(ROOT, "assets", "voiceover.mp3")):
        audio = f'      <audio id="voiceover" src="assets/voiceover.mp3" data-start="0" data-duration="{end:g}" data-track-index="10" data-volume="1"></audio>\n'
    html = tpl.replace("{{SLOTS}}", slots).replace("{{AUDIO}}", audio).replace("{{END}}", f"{end:g}")
    open(os.path.join(ROOT, "index.html"), "w").write(html)

if __name__ == "__main__":
    index()
    import scenes  # noqa: writes compositions
    print("built", len(SCENES), "scenes; end", C["end"])
