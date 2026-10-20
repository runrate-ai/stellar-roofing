"""Build the AI b-roll kinetic Meta ad (9:16, 4:5) from Kling/Seedance clips + Kokoro voiceover.
Run: uv run --with pillow python meta-ad-scripts/build_ai_kinetic.py
Inputs: meta-ad-clips/ai-shots/shotNN.mp4 (720x1280), VO wav + word timings (Kokoro am_michael).
"""
import json, os, subprocess, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOTS = f"{PROJ}/meta-ad-clips/ai-shots"
OUT = f"{PROJ}/meta-ad-clips"
TAG = os.environ.get("AD_VOICE", "eleven")  # eleven = Brian, eric, bill
VO = f"{SHOTS}/vo/vo_{TAG}.mp3"
WORDS = json.load(open(f"{SHOTS}/vo/vo_{TAG}.json"))
WORK = f"{SHOTS}/work"; os.makedirs(WORK, exist_ok=True)
FONT = os.path.expanduser("~/Library/Fonts/ANTON-REGULAR.TTF")
LOGO = f"{PROJ}/public/images/logo.png"
YELLOW, WHITE = (255, 212, 0, 255), (255, 255, 255, 255)
# (clip, start, end, skip-into-clip). snap01 = old roof -> new roof on a finger snap (lands on "replace your roof?")
PLAN = [("snap01", 0, 3.6, 0), ("shot03", 3.6, 5.0, 0.3), ("shot04", 5.0, 7.3, 0.3), ("shot05", 7.3, 9.1, 0.3),
        ("shot06", 9.1, 11.3, 0.3), ("shot07", 11.3, 13.5, 0.3), ("shot08", 13.5, 14.5, 0.3), ("shot09", 14.5, 16.4, 0.3),
        ("shot10", 16.4, 17.9, 0.3), ("shot11", 17.9, 18.8, 0.3)]
CARD = 18.8
TOTAL = 24.4  # end card holds about 5.6s so the ending is not rushed
_tap = [w["s"] for w in WORDS if w["w"] == "Tap"][0]
_f = _tap / CARD  # stretch the cut points to this voice's pacing
PLAN = [(c, a * _f, b * _f, k) for c, a, b, k in PLAN]
CARD, TOTAL = CARD * _f, TOTAL * _f
HL = {"quotes", "look", "free", "written", "licensed", "lifetime", "local", "family-owned", "answers", "stellar",
      "dog", "work", "quote.", "roof."}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print("FAIL", r.stderr[-800:]); sys.exit(1)


def draw(path, lines, size, color_fn, stroke=9, w=1040):
    f = ImageFont.truetype(FONT, size)
    im = Image.new("RGBA", (w, int(len(lines) * size * 1.05 + stroke * 4)), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    y = stroke * 2
    for line in lines:
        ws = line.upper().split(); sp = size * 0.28
        wd = [d.textlength(x, font=f) for x in ws]
        x = (w - (sum(wd) + sp * (len(ws) - 1))) / 2
        for xw, t in zip(wd, ws):
            d.text((x, y), t, font=f, fill=YELLOW if color_fn(t) else WHITE, stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
            x += xw + sp
        y += size * 1.05
    im.save(path)


def cues():
    out, cur = [], []
    for w in WORDS:
        cur.append(w)
        if len(cur) >= 3 or w["w"][-1] in ".?!,":
            out.append(cur); cur = []
    if cur: out.append(cur)
    res = []
    for i, c in enumerate(out):
        s = c[0]["s"]; e = out[i + 1][0]["s"] if i + 1 < len(out) else c[-1]["e"] + 0.2
        res.append((s, min(e, c[-1]["e"] + 0.35), " ".join(x["w"] for x in c).replace(",", "")))
    return res


def build(name, OW, OH, cap_y, disc_y, endcard):
    parts = []
    for i, (clip, t0, t1, skip) in enumerate(PLAN):
        ch = min(1280, round(720 * OH / OW / 2) * 2)
        vf = f"crop=720:{ch}:0:{(1280 - ch) // 2},scale={OW}:{OH}:flags=lanczos,setsar=1,fps=30"
        p = f"{WORK}/{name}_s{i}.mp4"
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{skip}", "-t", f"{t1 - t0:.2f}", "-i", f"{SHOTS}/{clip}.mp4", "-vf", vf, "-an",
             "-c:v", "libx264", "-crf", "16", "-preset", "fast", "-pix_fmt", "yuv420p", p])
        parts.append(p)
    # end card: space background built from logo + gradient
    end_d = TOTAL - CARD
    p = f"{WORK}/{name}_end.mp4"
    run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"gradients=s={OW}x{OH}:c0=0x05060f:c1=0x0b1d5c:x0=0:y0=0:x1=0:y1={OH}:d={end_d}:r=30",
         "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", p])
    parts.append(p)
    open(f"{WORK}/{name}_list.txt", "w").write("".join(f"file '{p}'\n" for p in parts))
    master = f"{WORK}/{name}_master.mp4"
    run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{WORK}/{name}_list.txt", "-c", "copy", master])

    sz = 130 if OH > 1500 else 118
    ov = []
    for k, (s, e, t) in enumerate(cues()):
        p = f"{WORK}/{name}_c{k}.png"
        draw(p, textwrap.wrap(t, 18) or [t], sz, lambda w: w.lower().strip(".,?") in {h.strip(".,?") for h in HL})
        ov.append((p, s, e, 20, cap_y))
    p = f"{WORK}/{name}_disc.png"
    draw(p, ["Illustrative AI footage. Puppy Promise applies to", "retail roof replacements only."], 30, lambda w: False, stroke=4)
    ov.append((p, 0.1, CARD, 20, disc_y))
    es = CARD
    ls = 330 if OH > 1500 else 280
    Image.open(LOGO).convert("RGBA").resize((ls, ls), Image.LANCZOS).save(f"{WORK}/{name}_logo.png")
    ov.append((f"{WORK}/{name}_logo.png", es + 0.2, TOTAL, (OW - ls) // 2, endcard[0]))
    for j, (t, hl) in enumerate([("Free inspection", True), ("+ written estimate", False), ("Lifetime workmanship warranty", False), ("Tap Get Quote", True)]):
        p = f"{WORK}/{name}_e{j}.png"
        draw(p, [t], 84 if j < 2 else 60, lambda w, hl=hl: hl, stroke=7)
        ov.append((p, es + 0.3 + 0.2 * j, TOTAL, 20, endcard[1] + [0, 118, 236, 330][j]))
    p = f"{WORK}/{name}_lic.png"
    draw(p, ["Licensed and insured · Nashville and Middle TN"], 30, lambda w: False, stroke=4)
    ov.append((p, es + 0.3, TOTAL, 20, endcard[2]))

    ins, fc, last = ["-i", master, "-i", VO], [], "0:v"
    for k, (p, s, e, x, y) in enumerate(ov):
        ins += ["-i", p]
        fc.append(f"[{last}][{k + 2}:v]overlay={x}:{y}:enable='between(t,{s:.2f},{e:.2f})'[o{k}]"); last = f"o{k}"
    fc.append(f"[1:a]apad,atrim=0:{TOTAL},afade=t=out:st={TOTAL - 0.6}:d=0.6[a]")
    out = f"{OUT}/stellar-ai-kinetic-{name}" + ("" if TAG == "eleven" else "-" + TAG) + ".mp4"
    run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", ";".join(fc), "-map", f"[{last}]", "-map", "[a]", "-c:v", "libx264",
         "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-t", f"{TOTAL}", "-movflags", "+faststart", out])
    print(out)


build("916", 1080, 1920, cap_y=1060, disc_y=1700, endcard=(540, 880, 1330))
if not os.environ.get("ONLY916"): build("45", 1080, 1350, cap_y=700, disc_y=1230, endcard=(250, 570, 990))
