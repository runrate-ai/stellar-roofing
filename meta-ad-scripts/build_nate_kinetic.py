"""Build the 30s "Nate" kinetic-caption Meta ad (9:16 and 4:5) from the real promo footage.

Run:  uv run --with pillow python meta-ad-scripts/build_nate_kinetic.py
Needs ffmpeg. Words/timings come from ~/stellar-video-tools/words.json (Whisper, Nate's real audio).
Captions are PNGs (Anton, white caps, black stroke, yellow highlight) overlaid per cue.
"""
import json, os, subprocess, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

SRC = os.path.expanduser("~/Downloads/Stellar Roofing Promotional Video - Fine Cut.mp4")
TOOLS = os.path.expanduser("~/stellar-video-tools")
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = f"{PROJ}/meta-ad-clips"
WORK = f"{TOOLS}/work/nate"
LOGO = f"{PROJ}/public/images/logo.png"
FONT = os.path.expanduser("~/Library/Fonts/ANTON-REGULAR.TTF")
YELLOW, WHITE = (255, 212, 0, 255), (255, 255, 255, 255)
os.makedirs(WORK, exist_ok=True)
W = json.load(open(f"{TOOLS}/words.json"))

# (source start, source end, crop centre x as fraction of source width, zoom, kind)
SEGS = [
    (153.0, 156.0, 0.50, 1.00, "hook"),
    (0.00, 8.50, 0.50, 1.10, "voice"),
    (13.60, 15.80, 0.36, 1.00, "voice"),
    (34.40, 36.60, 0.50, 1.10, "voice"),
    (70.45, 79.20, 0.50, 1.00, "voice"),
    (92.40, 97.70, 0.40, 1.10, "voice"),
    (165.30, 168.30, 0.50, 1.00, "end"),
]
HL = {"nashville", "local", "family", "good", "bad", "puppy", "promise", "roof", "dog", "spa", "free", "get"}
FIX = {"into": "home to"}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        print("FAIL", " ".join(cmd[:4]), r.stderr[-800:]); sys.exit(1)


def cues_for(a, b, t0):
    """Chunk Nate's words in [a,b] into 2-3 word caption cues on the output timeline."""
    ws = [(s, e, FIX.get(w.lower().strip(",.?!"), w)) for s, e, w in W if a - 0.1 <= s <= b - 0.1]
    ws = [x for x in ws if x[2].lower().strip(",.?!") not in ("uh", "um")]
    out, cur = [], []
    for s, e, w in ws:
        cur.append((s, e, w))
        if len(cur) >= 3 or w[-1] in ".?!,":
            out.append(cur); cur = []
    if cur: out.append(cur)
    cues = []
    for i, c in enumerate(out):
        s = c[0][0] - a + t0
        e = (out[i + 1][0][0] - a + t0) if i + 1 < len(out) else c[-1][1] - a + t0 + 0.15
        cues.append((max(s, t0), min(e, t0 + b - a - 0.02), " ".join(x[2] for x in c)))
    return cues


def draw(path, lines, size, w=1040, color_fn=None, stroke=9, gap=1.05):
    f = ImageFont.truetype(FONT, size)
    h = int(len(lines) * size * gap + stroke * 4)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    y = stroke * 2
    for line in lines:
        words = line.upper().split()
        sp = size * 0.28
        widths = [d.textlength(x, font=f) for x in words]
        x = (w - (sum(widths) + sp * (len(words) - 1))) / 2
        for x_w, wd in zip(widths, words):
            col = YELLOW if color_fn(wd) else WHITE
            d.text((x, y), wd, font=f, fill=col, stroke_width=stroke, stroke_fill=(0, 0, 0, 255))
            x += x_w + sp
        y += size * gap
    im.save(path)
    return im.size


def wrap(txt, n=18):
    return textwrap.wrap(txt, n) or [txt]


def build(name, OW, OH, cap_y, disc_y, endcard):
    cw = round(1080 * OW / OH / 2) * 2  # crop width from the 1080-high source
    parts, cues, t = [], [], 0.0
    for i, (a, b, cx, z, kind) in enumerate(SEGS):
        d = b - a
        w_ = round(cw / z / 2) * 2; h_ = round(1080 / z / 2) * 2
        x = min(max(cx * 1920 - w_ / 2, 0), 1920 - w_)
        p = f"{WORK}/{name}_s{i}.mp4"
        af = f"afade=t=in:d=0.05,afade=t=out:st={d - 0.05:.2f}:d=0.05"
        if kind in ("hook", "end"):
            af = f"afade=t=in:d=0.2,afade=t=out:st={d - 0.5:.2f}:d=0.5"
        vf = f"crop={w_}:{h_}:{x:.0f}:{(1080 - h_) // 2},scale={OW}:{OH}:flags=lanczos,setsar=1,fps=30"
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a}", "-t", f"{d}", "-i", SRC, "-vf", vf, "-af", af,
             "-c:v", "libx264", "-crf", "16", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", p])
        parts.append(p)
        if kind == "voice":
            cues += cues_for(a, b, t)
        t += d
    total = t
    lst = f"{WORK}/{name}_list.txt"
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    master = f"{WORK}/{name}_master.mp4"
    run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", master])

    # overlay PNGs: (file, start, end, x, y)
    ov = []
    hook_end = SEGS[0][1] - SEGS[0][0]
    sz = 130 if OH > 1500 else 118
    p = f"{WORK}/{name}_hook.png"
    draw(p, ["Replacing your roof", "in Nashville?"], sz + 8, color_fn=lambda w: w.startswith("NASHVILLE"))
    ov.append((p, 0.15, hook_end - 0.1, 20, cap_y - 40))
    for k, (s, e, txt) in enumerate(cues):
        txt = txt.replace(" ,", ",")
        p = f"{WORK}/{name}_c{k}.png"
        draw(p, wrap(txt), sz, color_fn=lambda w: w.strip(",.?!").lower() in HL)
        ov.append((p, s, e, 20, cap_y))
    speech_end = total - (SEGS[-1][1] - SEGS[-1][0])
    p = f"{WORK}/{name}_disc.png"
    draw(p, ["Puppy Promise applies to retail roof replacements only"], 30, w=1040, color_fn=lambda w: False, stroke=4)
    ov.append((p, hook_end, speech_end, 20, disc_y))

    # end card: logo + lines
    es = speech_end
    logo = Image.open(LOGO).convert("RGBA"); ls = 330 if OH > 1500 else 280
    logo.resize((ls, ls), Image.LANCZOS).save(f"{WORK}/{name}_logo.png")
    ov.append((f"{WORK}/{name}_logo.png", es + 0.2, total, (OW - ls) // 2, endcard[0]))
    for j, (txt, hl) in enumerate([("Free inspection", True), ("+ written estimate", False),
                                   ("Lifetime workmanship warranty", False), ("Tap Get Quote", True)]):
        p = f"{WORK}/{name}_e{j}.png"
        draw(p, [txt], 84 if j < 2 else 60, color_fn=lambda w, hl=hl: hl, stroke=7)
        ov.append((p, es + 0.35 + 0.18 * j, total, 20, endcard[1] + [0, 118, 236, 330][j]))
    p = f"{WORK}/{name}_lic.png"
    draw(p, ["Licensed and insured · Nashville and Middle TN"], 30, color_fn=lambda w: False, stroke=4)
    ov.append((p, es + 0.35, total, 20, endcard[2]))

    ins, fc, last = ["-i", master], [], "0:v"
    for k, (p, s, e, x, y) in enumerate(ov):
        ins += ["-i", p]
        fc.append(f"[{last}][{k + 1}:v]overlay={x}:{y}:enable='between(t,{s:.2f},{e:.2f})'[o{k}]")
        last = f"o{k}"
    out = f"{OUT}/stellar-nate-kinetic-30s-{name}.mp4"
    run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", ";".join(fc), "-map", f"[{last}]", "-map", "0:a",
         "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "copy",
         "-movflags", "+faststart", out])
    print(name, f"{total:.1f}s", out)
    for c in cues: print("  %.2f-%.2f %s" % c)


build("916", 1080, 1920, cap_y=1060, disc_y=1560, endcard=(540, 880, 1330))
build("45", 1080, 1350, cap_y=700, disc_y=1190, endcard=(250, 570, 990))
