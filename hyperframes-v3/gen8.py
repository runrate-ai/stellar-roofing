"""v3: fast-cut Meta ad from Nate's real footage + AI snap intro, Hyperframes. ASPECT=916|45|11|169 python3 gen3.py"""
import json, os
ASPECT = os.environ.get("ASPECT", "916")
# W, H, caption top, caption font, disc top, end logo (top,size), end line tops, licence top
CFG = {"916": (1080, 1920, 1100, 104, 1700, (470, 330), (860, 985, 1130, 1230), 1370),
       "45": (1080, 1350, 760, 104, 1215, (250, 330), (590, 715, 860, 960), 1100),
       "11": (1080, 1080, 590, 96, 985, (150, 260), (440, 555, 690, 780), 890),
       "169": (1920, 1080, 600, 88, 990, (60, 250), (340, 450, 585, 675), 790)}
W_, H, CAPTOP, CAPFS, DISCTOP, (LOGOTOP, LOGOSZ), ETOPS, LICTOP = CFG[ASPECT]
WORDS = json.load(open("assets/vo8.json"))
_i = next(i for i, w in enumerate(WORDS) if w["w"].lower() == "five"); _j = next(i for i, w in enumerate(WORDS) if w["w"].lower().startswith("dollars"))
WORDS[_i:_j + 1] = [{"w": "$5,999,", "s": WORDS[_i]["s"], "e": WORDS[_j]["e"]}]
CARD = [w["s"] for w in WORDS if w["w"].lower() == "tap"][0]
TOTAL = round(CARD + 4.6, 2)
SNAP_END = 2.6
# (phrase start, phrase end, preferred real clips)
def start(word, nth=1):
    hits = [w["s"] for w in WORDS if w["w"].lower().strip(".,?!") == word]
    return hits[nth - 1]
ts = [start("well"), start("i'm"), start("you"), start("every"), start("if"), start("we're")]
CLIPS = [["r10", "r29", "r09", "r04", "r30", "r00"], ["r29", "r11", "r02"], ["r09", "r04", "r03"], ["r06", "r07", "r08"], ["r01", "r02", "r28"], ["r27", "r26", "r31"]]
PH = [(ts[i], ts[i + 1] if i + 1 < len(ts) else CARD, CLIPS[i]) for i in range(len(ts))]
SNAP_END = min(ts[0], 4.9)
PH[0] = (SNAP_END,) + PH[0][1:]
cuts = [("snap01", 0.0, SNAP_END, 0.0)]
for a, b, clips in PH:
    n = max(1, round((b - a) / 0.9)); d = (b - a) / n
    for k in range(n):
        cuts.append((clips[k % len(clips)], a + k * d, a + (k + 1) * d, 0.1))
HL = {"$5,999", "gutters", "free", "written", "match", "lifetime", "family", "nate", "quote", "price"}
norm = lambda w: w.lower().strip(".,?!")
cues, cur = [], []
for w in WORDS:
    cur.append(w)
    if len(cur) >= 2 or w["w"][-1] in ".?!,":
        cues.append(cur); cur = []
if cur: cues.append(cur)

vids, js = [], []
for i, (c, a, b, k) in enumerate(cuts):
    vids.append(f'<div class="shot" id="sh{i}"><video id="v{i}" class="clip" src="assets/{c}.mp4" data-start="{a:.3f}" data-duration="{b - a:.3f}" data-media-start="{k}" data-track-index="0" muted playsinline></video></div>')
    js.append(f'tl.fromTo("#sh{i}", {{scale: 1.2}}, {{scale: 1.04, duration: {min(b - a, 1.4):.3f}, ease: "power2.out"}}, {a:.3f});')
    if i: js.append(f'tl.fromTo("#flash", {{opacity: .4}}, {{opacity: 0, duration: .14, ease: "power2.out", immediateRender: false}}, {a:.3f});')
caps = []
for j, c in enumerate(cues):
    s = c[0]["s"]; e = min((cues[j + 1][0]["s"] if j + 1 < len(cues) else c[-1]["e"] + .25), c[-1]["e"] + .3, CARD - 0.03)
    if s >= CARD: continue
    spans = "".join(f'<span class="w{" hl" if norm(w["w"]).strip(",") in HL or w["w"].startswith("$") else ""}{" big" if w["w"].startswith("$") else ""}" id="w{j}_{n}">{"$5,999" if w["w"].startswith("$") else w["w"].replace(",", "")}</span> ' for n, w in enumerate(c))
    caps.append(f'<div class="cap" id="cap{j}">{spans}</div>')
    js.append(f'tl.set("#cap{j}", {{opacity: 1}}, {s:.2f}); tl.set("#cap{j}", {{opacity: 0}}, {e:.2f});')
    for n, w in enumerate(c):
        js.append(f'tl.fromTo("#w{j}_{n}", {{scale: .6, y: 18, opacity: 0}}, {{scale: 1, y: 0, opacity: 1, duration: .16, ease: "back.out(2)"}}, {w["s"]:.2f});')
end = [("New roof from $5,999", "hl"), ("+ free gutters", ""), ("Free inspection + written estimate", "sm"), ("Tap Get Quote", "hl sm")]
end_html = "".join(f'<div class="el {c}" id="e{n}">{t}</div>' for n, (t, c) in enumerate(end))
js.append(f'tl.set("#disc1", {{opacity: 1}}, 0.1); tl.set("#disc1", {{opacity: 0}}, {SNAP_END}); tl.set("#disc2", {{opacity: 1}}, {SNAP_END}); tl.set("#disc2", {{opacity: 0}}, {TOTAL});')
js.append(f'tl.fromTo("#endcard", {{opacity: 0}}, {{opacity: 1, duration: .3}}, {CARD});')
js.append(f'tl.fromTo("#logo", {{scale: .4, opacity: 0}}, {{scale: 1, opacity: 1, duration: .5, ease: "back.out(1.8)"}}, {CARD + .1});')
for n in range(4):
    js.append(f'tl.fromTo("#e{n}", {{y: 50, opacity: 0}}, {{y: 0, opacity: 1, duration: .4, ease: "power3.out"}}, {CARD + .35 + .3 * n});')
js.append(f'tl.fromTo("#lic", {{opacity: 0}}, {{opacity: 1, duration: .4}}, {CARD + 1.6});')
music = os.path.exists("assets/music.mp3")
html = f'''<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width={W_}, height={H}" /><title>Stellar Fast Cut v8 price hook</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face {{ font-family: "Anton"; src: url("assets/Anton.ttf"); }}
body {{ margin: 0; background: #000; font-family: "Anton", sans-serif; }}
#root {{ position: relative; width: 100%; height: 100%; overflow: hidden; background: #000; }}
.shot {{ position: absolute; inset: 0; transform-origin: 50% 50%; }}
.shot video {{ position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }}
#flash {{ position: absolute; inset: 0; background: #fff; opacity: 0; }}
.cap {{ position: absolute; left: 30px; right: 30px; top: {CAPTOP}px; text-align: center; font-size: {CAPFS}px; line-height: 1.05; text-transform: uppercase; color: #fff; opacity: 0; }}
.w {{ display: inline-block; -webkit-text-stroke: 9px #000; paint-order: stroke fill; text-shadow: 0 5px 14px rgba(0,0,0,.5); }}
.w.hl {{ color: #ffd400; }}
.w.big {{ font-size: 1.9em; line-height: 1; }}
.disc {{ position: absolute; left: 40px; right: 40px; font-size: 26px; top: {DISCTOP}px; text-align: center; font-size: 28px; text-transform: uppercase; color: #fff; -webkit-text-stroke: 4px #000; paint-order: stroke fill; line-height: 1.15; opacity: 0; }}
#endcard {{ position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 30%, #12307f 0%, #070b24 60%, #02030a 100%); opacity: 0; }}
#logo {{ position: absolute; left: {(W_ - LOGOSZ) // 2}px; top: {LOGOTOP}px; width: {LOGOSZ}px; height: {LOGOSZ}px; }}
.el {{ position: absolute; left: 0; right: 0; text-align: center; font-size: 96px; color: #fff; text-transform: uppercase; opacity: 0; }}
.el.hl {{ color: #ffd400; }} .el.sm {{ font-size: 64px; }}
#e0 {{ top: {ETOPS[0]}px; }} #e1 {{ top: {ETOPS[1]}px; }} #e2 {{ top: {ETOPS[2]}px; }} #e3 {{ top: {ETOPS[3]}px; }}
#lic {{ position: absolute; left: 0; right: 0; top: {LICTOP}px; text-align: center; font-size: 34px; color: #cfd6ff; text-transform: uppercase; opacity: 0; letter-spacing: 1px; }}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-width="{W_}" data-height="{H}" data-duration="{TOTAL}">
{chr(10).join(vids)}
<div id="flash"></div>
{chr(10).join(caps)}
<div class="disc" id="disc1">AI-generated intro. Starting price: your price depends on roof size and is on your written estimate. Free gutters: standard 5-inch seamless, retail replacements only.</div>
<div class="disc" id="disc2">Starting price: your price depends on roof size and is on your written estimate. Free gutters: standard 5-inch seamless, retail replacements only.</div>
<div id="endcard"><img id="logo" src="assets/logo.png" alt="Stellar Roofing and Restorations" />{end_html}<div id="lic">Lifetime workmanship warranty · Licensed and insured</div></div>
<audio id="vo" src="assets/vo8.mp3" data-start="0" data-duration="{WORDS[-1]["e"] + 0.05:.2f}" data-track-index="5"></audio>
{'<audio id="bgm" src="assets/music.mp3" data-start="0" data-duration="' + str(TOTAL) + '" data-volume="0.13" data-track-index="6"></audio>' if music else ''}
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
{chr(10).join(js)}
window.__timelines["main"] = tl;
</script></body></html>'''
open("index.html", "w").write(html)
print(ASPECT, "cuts:", len(cuts), "total", TOTAL)
