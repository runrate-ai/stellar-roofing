"""Generate index.html for the Stellar AI kinetic ad (Hyperframes). Run: python3 gen.py"""
import json, os, sys
ASPECT = os.environ.get("ASPECT", "916")
CFG = {  # W, H, caption top, caption font, disclaimer top, end logo (top, size), end line tops, licence top, logo-bug top
    "916": (1080, 1920, 1010, 132, 1700, (470, 330), (860, 985, 1130, 1230), 1370, 290),
    "45": (1080, 1350, 690, 132, 1215, (250, 330), (590, 715, 860, 960), 1100, 40),
    "11": (1080, 1080, 500, 120, 985, (150, 260), (440, 555, 690, 780), 890, 40),
    "169": (1920, 1080, 520, 120, 990, (60, 250), (340, 450, 585, 675), 790, 40),
}
W_, H, CAPTOP, CAPFS, DISCTOP, (LOGOTOP, LOGOSZ), ETOPS, LICTOP, BUGTOP = CFG[ASPECT]
OUTFILE = "index.html"
W = json.load(open("assets/vo.json"))
PLAN = [("snap01", 0, 3.6, 0), ("shot03", 3.6, 5.0, .3), ("shot04", 5.0, 7.3, .3), ("shot05", 7.3, 9.1, .3), ("shot06", 9.1, 11.3, .3),
        ("shot07", 11.3, 13.5, .3), ("shot08", 13.5, 14.5, .3), ("shot09", 14.5, 16.4, .3), ("shot10", 16.4, 17.9, .3), ("shot11", 17.9, 18.8, .3)]
CARD, TOTAL = 18.8, 24.4
HL = {"quotes", "look", "free", "written", "licensed", "lifetime", "local", "family-owned", "answers", "stellar", "dog", "work", "quote", "roof"}
norm = lambda w: w.lower().strip(".,?!")
# cues of up to 3 words
cues, cur = [], []
for w in W:
    cur.append(w)
    if len(cur) >= 3 or w["w"][-1] in ".?!,":
        cues.append(cur); cur = []
if cur: cues.append(cur)

vids, js = [], []
for i, (c, a, b, k) in enumerate(PLAN):
    vids.append(f'<div class="shot" id="sh{i}"><video id="v{i}" class="clip" src="assets/{c}.mp4" data-start="{a}" data-duration="{b - a:.2f}" data-media-start="{k}" data-track-index="0" muted playsinline></video></div>')
    js.append(f'tl.fromTo("#sh{i}", {{scale: 1.0}}, {{scale: 1.09, duration: {b - a:.2f}, ease: "none"}}, {a});')
    if i: js.append(f'tl.fromTo("#flash", {{opacity: .55}}, {{opacity: 0, duration: .2, ease: "power2.out", immediateRender: false}}, {a});')

caps = []
for j, c in enumerate(cues):
    s = c[0]["s"]; e = min((cues[j + 1][0]["s"] if j + 1 < len(cues) else c[-1]["e"] + .25), c[-1]["e"] + .35)
    e = min(e, CARD - 0.05)
    if s >= CARD: continue
    spans = "".join(f'<span class="w{" hl" if norm(w["w"]) in HL else ""}" id="w{j}_{n}">{w["w"].replace(",", "")}</span> ' for n, w in enumerate(c))
    caps.append(f'<div class="cap" id="cap{j}">{spans}</div>')
    js.append(f'tl.set("#cap{j}", {{opacity: 1}}, {s:.2f}); tl.set("#cap{j}", {{opacity: 0}}, {e:.2f});')
    for n, w in enumerate(c):
        js.append(f'tl.fromTo("#w{j}_{n}", {{scale: .55, y: 24, opacity: 0}}, {{scale: 1, y: 0, opacity: 1, duration: .22, ease: "back.out(2.2)"}}, {w["s"]:.2f});')

end = [("Free inspection", "hl"), ("+ written estimate", ""), ("Lifetime workmanship warranty", "sm"), ("Tap Get Quote", "hl sm")]
end_html = "".join(f'<div class="el {c}" id="e{n}">{t}</div>' for n, (t, c) in enumerate(end))
js.append(f'tl.fromTo("#bug", {{opacity: 0, scale: .6}}, {{opacity: 1, scale: 1, duration: .4, ease: "back.out(1.8)"}}, 0.3); tl.set("#bug", {{opacity: 0}}, {CARD});')
js.append(f'tl.fromTo("#endcard", {{opacity: 0}}, {{opacity: 1, duration: .35}}, {CARD});')
js.append(f'tl.fromTo("#logo", {{scale: .4, opacity: 0}}, {{scale: 1, opacity: 1, duration: .6, ease: "back.out(1.8)"}}, {CARD + .15});')
for n in range(4):
    js.append(f'tl.fromTo("#e{n}", {{y: 50, opacity: 0}}, {{y: 0, opacity: 1, duration: .45, ease: "power3.out"}}, {CARD + .45 + .35 * n});')
js.append(f'tl.fromTo("#lic", {{opacity: 0}}, {{opacity: 1, duration: .5}}, {CARD + 2.0});')
js.append(f'tl.to("#logo", {{y: -10, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1}}, {CARD + .8});')

html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width={W_}, height={H}" />
<title>Stellar AI Kinetic Ad</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face {{ font-family: "Anton"; src: url("assets/Anton.ttf"); }}
body {{ margin: 0; background: #000; font-family: "Anton", sans-serif; }}
#root {{ position: relative; width: 100%; height: 100%; overflow: hidden; background: #000; }}
.shot {{ position: absolute; inset: 0; transform-origin: 50% 50%; }}
.shot video {{ position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }}
#flash {{ position: absolute; inset: 0; background: #fff; opacity: 0; }}
.cap {{ position: absolute; left: 30px; right: 30px; top: {CAPTOP}px; text-align: center; font-size: {CAPFS}px; line-height: 1.05; text-transform: uppercase; color: #fff; opacity: 0; }}
.w {{ display: inline-block; -webkit-text-stroke: 12px #000; paint-order: stroke fill; text-shadow: 0 6px 18px rgba(0,0,0,.55); }}
.w.hl {{ color: #ffd400; }}
#disc {{ position: absolute; left: 40px; right: 40px; top: {DISCTOP}px; text-align: center; font-size: 30px; text-transform: uppercase; color: #fff; -webkit-text-stroke: 4px #000; paint-order: stroke fill; line-height: 1.15; }}
#endcard {{ position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 30%, #12307f 0%, #070b24 60%, #02030a 100%); opacity: 0; }}
#logo {{ position: absolute; left: {(W_ - LOGOSZ) // 2}px; top: {LOGOTOP}px; width: {LOGOSZ}px; height: {LOGOSZ}px; }}
#bug {{ position: absolute; left: 36px; top: {BUGTOP}px; width: 170px; height: 170px; filter: drop-shadow(0 4px 10px rgba(0,0,0,.6)); opacity: 0; }}
.el {{ position: absolute; left: 0; right: 0; text-align: center; font-size: 96px; color: #fff; text-transform: uppercase; opacity: 0; }}
.el.hl {{ color: #ffd400; }} .el.sm {{ font-size: 64px; }}
#e0 {{ top: {ETOPS[0]}px; }} #e1 {{ top: {ETOPS[1]}px; }} #e2 {{ top: {ETOPS[2]}px; }} #e3 {{ top: {ETOPS[3]}px; }}
#lic {{ position: absolute; left: 0; right: 0; top: {LICTOP}px; text-align: center; font-size: 34px; color: #cfd6ff; text-transform: uppercase; opacity: 0; letter-spacing: 1px; }}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="{W_}" data-height="{H}" data-duration="{TOTAL}">
{chr(10).join(vids)}
<div id="flash"></div>
<img id="bug" src="assets/logo.png" alt="Stellar Roofing and Restorations" />
{chr(10).join(caps)}
<div id="disc">Illustrative AI footage. Puppy Promise applies to<br>retail roof replacements only.</div>
<div id="endcard"><img id="logo" src="assets/logo.png" alt="Stellar Roofing and Restorations" />{end_html}<div id="lic">Licensed and insured · Nashville and Middle TN</div></div>
<audio id="vo" src="assets/vo.mp3" data-start="0" data-duration="{W[-1]["e"] + 0.1:.2f}" data-track-index="5"></audio>
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
tl.set("#disc", {{opacity: 1}}, 0.1); tl.set("#disc", {{opacity: 0}}, {CARD});
{chr(10).join(js)}
window.__timelines["main"] = tl;
</script>
</body>
</html>'''
open(os.environ.get("OUTDIR", ".") + "/index.html", "w").write(html)
print("index.html written")
