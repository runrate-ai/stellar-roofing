#!/usr/bin/env python3
"""Schedule Nate's finished reels on the Facebook Page "Stellar Roofing Nashville" through the GoHighLevel Social Planner.

    python3 ghl_reels.py plan              show what would be scheduled (nothing is sent)
    python3 ghl_reels.py schedule [n ...]  upload and schedule (all, or the numbers given); skips ones already done
    python3 ghl_reels.py list              scheduled posts now in GHL

Reads GHL_API_TOKEN / GHL_LOCATION_ID from the project's .env.local through ghl_fb.py; never prints the token.
Record of what was scheduled: reels-scheduled.json (beside this file).
"""
import json, subprocess, sys, tempfile
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "fb-posts-src"))
_argv, sys.argv = sys.argv, [sys.argv[0]]          # ghl_fb runs main() only under __main__, but keep argv clean
import ghl_fb                                        # noqa: E402
sys.argv = _argv

CT = ZoneInfo("America/Chicago")
REELS = Path.home() / "Desktop/Stellar videos/1 - Finished Reels"
LINK = "https://www.thestellarroofing.com/goodlettsville?utm_source=facebook&utm_medium=social"
TAGS = "#NashvilleRoofing #Goodlettsville #RoofReplacement #MiddleTennessee"
TIME = "18:00"
MAX_MB = 24            # GHL media uploads above about 25 MB are refused, so larger files are re-encoded first

def cap(body):
    return f"{body.strip()}\n\n📞 (629) 356-4290\n👉 Free inspection and written estimate: {LINK}\n\n{TAGS}"

PLAN = {
 1: ("stellar-nate-3-questions-51s-style3-916.mp4", "2026-11-17", cap("""Before you sign a roofing contract, ask these 3 questions. ✋

1️⃣ Who is actually doing my roof?
2️⃣ What does my warranty cover?
3️⃣ What exactly is included in this quote?

If a contractor can't answer those in writing, that's not a proper quote.

At Stellar, every quote is listed line by line, so you know exactly what we're doing before you decide.""")),
 2: ("stellar-nate-compare-quotes-58s-style3-916.mp4", "2026-11-19", cap("""Why would one roofer quote you $10,000 and another $15,000 for the same roof? 🤔

Because those quotes almost never cover the same work. One might use lesser materials, skip the synthetic underlayment or leave the old drip edge. The other might be replacing all your flashing.

🚩 And if your quote is one line that just says "roof replacement"... run.

Send us the quotes you have. We'll break them down apples to apples next to ours. If another written quote really is the same work and the same value, we'll match it and beat it by $250. 💪""")),
 3: ("stellar-nate-30-year-shingle-45s-style3-916.mp4", "2026-11-21", cap("""Does a 30-year shingle really last 30 years? 🏠

We wish it were that simple. That rating comes from perfect test conditions. It doesn't count the heat, the expanding and contracting, or the ice storms we get here in Nashville.

Nate's rule of thumb: once your roof is around 10 to 15 years old, start getting it inspected.

We'll do that inspection for free and give you a photo report showing exactly what condition your roof is in, plus a free estimate. No obligation.""")),
 4: ("stellar-nate-walkthrough-60s-style3-916.mp4", "2026-11-24", cap("""Ever wonder how a roofer actually comes up with your price? 🤔 Most won't show you. Nate will.

In this video he walks through a real estimate: the roof area, the eaves, the pitch, and the material you choose. That's what sets the price.

It's how one roof ends up with three clear options: Good, Better and Best. (The roof in the video is an example. Your price depends on your roof.)

No hassle, no sitting at your dinner table for two hours, no obligation.""")),
 5: ("stellar-nate-waiting-costs-thousands-44s-style3-916.mp4", "2026-11-28", cap("""Waiting another year on that roof might cost you thousands. ⏳

A roof that's 15, 20, 25 years old with no leaks sounds fine. But as shingles wear down they get thinner and thinner, and once you can see the matting, that's the last line of defense before water gets in.

Then it's not just a roof anymore. It's drywall, decking, and maybe mold.

Let us take an honest look. The roof inspection is free.""")),
 6: ("stellar-nate-know-what-you-pay-for-42s-style3-916.mp4", "2026-12-01", cap("""Would you spend $15,000 or $20,000 on something without knowing what you're paying for? 😳

Of course not. So when you collect roofing quotes, make sure everything is listed line by line: exactly what's being done to your roof and your property.

Your roof is the number one thing protecting you and your family. This is your castle. 🏰

Every Stellar quote is written out that way. Every package, every line, no guessing.""")),
 7: ("stellar-nate-estimate-30s-916.mp4", "2026-12-03", cap("""How much should a new roof actually cost? 🤔 Most homeowners don't know, and some roofers count on that.

At Stellar we wanted to change that whole process. Tell us about your roof and we'll send you a custom written estimate.

❌ No sales visit
❌ No sitting at your dinner table for hours
❌ No pressure
❌ No obligation

Your price comes down to a few things: the square footage, the eaves, the material you pick, and how steep the roof is. That's it.""")),
}
REC = HERE / "reels-scheduled.json"


def shrink(src, tmp):
    """Return a file no bigger than MAX_MB (re-encodes only when needed)."""
    if src.stat().st_size <= MAX_MB * 1024 * 1024:
        return src
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(src)],
                               capture_output=True, text=True).stdout)
    kbps = int((MAX_MB - 1) * 8 * 1024 / dur) - 128
    out = Path(tmp) / src.name
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-c:v", "libx264", "-preset", "slow", "-b:v", f"{kbps}k",
                    "-maxrate", f"{int(kbps * 1.3)}k", "-bufsize", f"{kbps * 2}k", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
                    "-movflags", "+faststart", str(out)], check=True)
    return out


def upload_video(path, name):
    out = subprocess.run(
        ["curl", "-s", "-K", "-", "-X", "POST", f"{ghl_fb.API}/medias/upload-file", "-H", "Version: 2021-07-28",
         "-H", "Accept: application/json", "-A", "stellar-roofing/1.0", "-F", f"file=@{path};type=video/mp4",
         "-F", f"name={name}", "-F", "hosted=false", "-w", "\n%{http_code}"],
        input=f'header = "Authorization: Bearer {ghl_fb.TOKEN}"\n', capture_output=True, text=True, check=True).stdout
    body, status = out.rsplit("\n", 1)
    if status not in ("200", "201"):
        raise SystemExit(f"Upload failed for {Path(path).name}: HTTP {status} {body[:300]}")
    return json.loads(body)


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "plan"
    LOC = ghl_fb.LOC
    if cmd == "list":
        res = ghl_fb.call("POST", f"/social-media-posting/{LOC}/posts/list", {"type": "scheduled", "skip": "0", "limit": "50",
                          "fromDate": "2026-11-01T00:00:00.000Z", "toDate": "2027-01-31T00:00:00.000Z", "includeUsers": "false"})
        for p in sorted(res["results"]["posts"], key=lambda p: p.get("scheduleDate", "")):
            when = datetime.fromisoformat(p["scheduleDate"].replace("Z", "+00:00")).astimezone(CT)
            kinds = ",".join(sorted({(m.get("type") or "?").split("/")[0] for m in p.get("media", [])}))
            print(when.strftime("%a %b %d %I:%M %p CT"), "|", p.get("status"), "|", p.get("type"), "|", kinds, "|",
                  (p.get("summary") or "")[:58].replace("\n", " "), "| id", p.get("_id"))
        return
    nums = [int(x) for x in sys.argv[2:] if x.isdigit()] or sorted(PLAN)
    rec = json.loads(REC.read_text()) if REC.exists() else {}
    _, fb = ghl_fb.fb_account()
    match = [a for a in fb if a["name"].strip().lower() == ghl_fb.PAGE_NAME.lower()]
    if len(match) != 1:
        sys.exit(f"Expected exactly one Facebook account named {ghl_fb.PAGE_NAME!r}")
    acct = match[0]
    user_id = ghl_fb.call("GET", f"/users/?locationId={LOC}")["users"][0]["id"]
    for n in nums:
        fn, day, text = PLAN[n]
        src = REELS / fn
        when = datetime.fromisoformat(f"{day}T{TIME}").replace(tzinfo=CT)
        print(f"#{n} {when.strftime('%a %b %d %I:%M %p CT')} | {fn} | {src.stat().st_size / 1e6:.0f} MB | caption {len(text)} chars")
        if cmd == "plan":
            continue
        if str(n) in rec:
            print(f"   already scheduled (GHL id {rec[str(n)]['ghlPostId']}); skipping")
            continue
        if when < datetime.now(CT) + timedelta(minutes=20):
            sys.exit(f"#{n} time is too soon")
        try:                       # full quality first; shrink only if GHL refuses the size
            res = upload_video(src, f"reel-{fn}")
            print("   uploaded at full quality")
        except SystemExit as e:
            print(f"   full-size upload refused ({str(e)[:120]}); re-encoding to {MAX_MB} MB")
            with tempfile.TemporaryDirectory() as tmp:
                res = upload_video(shrink(src, tmp), f"reel-{fn}")
        media = [{"url": res["url"], "type": "video/mp4", "caption": ""}]
        sched = when.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%S.000Z")
        kind = sys.argv[sys.argv.index("--as") + 1] if "--as" in sys.argv else "reel"
        body = {"accountIds": [acct["id"]], "userId": user_id, "summary": text, "media": media, "status": "scheduled",
                "scheduleDate": sched, "type": kind, "facebookPostDetails": {"type": kind}}
        post = ghl_fb.call("POST", f"/social-media-posting/{LOC}/posts", body)["results"]["post"]
        rec[str(n)] = {"ghlPostId": post["_id"], "at": when.isoformat(), "video": fn, "media": media, "type": kind}
        REC.write_text(json.dumps(rec, indent=2) + "\n")
        print(f"   scheduled as {kind}, GHL id {post['_id']}, media accepted: {len(post.get('media', []))}")


if __name__ == "__main__":
    main()
