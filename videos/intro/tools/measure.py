"""Word-level timing for assets/voiceover.mp3 (offline: sherpa-onnx + Dolphin CTC).

Usage:  python3 tools/measure.py <path-to-dolphin-model-dir>
Prints speech segments with per-token timestamps; map them onto tools/cues.json,
then run `python3 tools/build.py` and re-render.
"""
import json, subprocess, sys, os
import sherpa_onnx, soundfile as sf
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
model = sys.argv[1]
wav = "/tmp/_vo16k.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(ROOT, "assets", "voiceover.mp3"), "-ac", "1", "-ar", "16000", wav], check=True)
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=noise=-35dB:d=0.25", "-f", "null", "-"], capture_output=True, text=True).stderr
sil, cur = [], None
for ln in log.splitlines():
    if "silence_start" in ln: cur = float(ln.split("silence_start:")[1])
    if "silence_end" in ln and cur is not None: sil.append((cur, float(ln.split("silence_end:")[1].split("|")[0]))); cur = None
segs, t = [], 0.0
for a, b in sil: segs.append((max(0, t - 0.05), a + 0.05)); t = b
rec = sherpa_onnx.OfflineRecognizer.from_dolphin_ctc(model=f"{model}/model.int8.onnx", tokens=f"{model}/tokens.txt", num_threads=4)
audio, sr = sf.read(wav, dtype="float32")
out = []
for a, b in segs:
    s = rec.create_stream(); s.accept_waveform(sr, audio[int(a * sr):int(b * sr)]); rec.decode_stream(s)
    toks = [(tk, round(a + ts, 2)) for tk, ts in zip(s.result.tokens, s.result.timestamps)]
    out.append({"a": a, "b": b, "text": s.result.text, "toks": toks})
    print(f"[{a:6.2f}-{b:6.2f}] " + " ".join(f"{tk.strip() or '_'}@{ts}" for tk, ts in toks))
json.dump(out, open(os.path.join(ROOT, "assets", "voiceover-timing.json"), "w"), ensure_ascii=False)
