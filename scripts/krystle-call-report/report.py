#!/usr/bin/env python3
"""Daily cold-call report for Krystle (GHL).

Reads call records and the "Cold Calls - Krystle" pipeline from GoHighLevel and
prints one row per day (Central time):
  dials, answered, talks over 1 minute, talk time, first and last call,
  hours on the phone (first to last call), and how many leads she moved
  into each pipeline stage that day.

It also writes the same table to "Krystle Call Report.csv" on the Desktop.

Usage:
  python3 scripts/krystle-call-report/report.py          # last 14 days
  python3 scripts/krystle-call-report/report.py 30       # last 30 days

No customer names or phone numbers are printed or saved. The token is read from
.env.local (never printed).
"""
import csv
import json
import os
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CT = ZoneInfo("America/Chicago")
KRYSTLE = "h2SoDgp5J2G1LytaWtoU"
PIPELINE = "P7k2PbCusnQ9tYt48LQl"  # Cold Calls - Krystle
OUT = os.path.expanduser("~/Desktop/Krystle Call Report.csv")


def env():
    vals = {}
    for line in open(os.path.join(ROOT, ".env.local")):
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            vals[k] = v.strip('"').strip("'")
    return vals["GHL_API_TOKEN"], vals["GHL_LOCATION_ID"]


TOKEN, LOC = env()


def get(path, ver="2021-07-28"):
    req = urllib.request.Request(
        "https://services.leadconnectorhq.com" + path,
        headers={"Authorization": "Bearer " + TOKEN, "Version": ver,
                 "Accept": "application/json", "User-Agent": "Mozilla/5.0"})
    try:
        return json.loads(urllib.request.urlopen(req, timeout=60).read())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"GHL API error {e.code} on {path.split('?')[0]}: {e.read().decode()[:200]}")


def parse(ts):
    return datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone(CT)


def calls(since):
    """All call records since `since` (newest first from the API)."""
    out, cursor = [], None
    while True:
        q = f"/conversations/messages/export?locationId={LOC}&channel=Call&limit=100"
        if cursor:
            q += "&cursor=" + cursor
        r = get(q, ver="2021-04-15")
        msgs = r.get("messages", [])
        out += msgs
        cursor = r.get("nextCursor")
        if not msgs or not cursor or parse(msgs[-1]["dateAdded"]) < since:
            return out


def stage_moves(since):
    """Count, per day and stage, the pipeline cards whose stage last changed that day."""
    stages = {}
    for p in get(f"/opportunities/pipelines?locationId={LOC}")["pipelines"]:
        if p["id"] == PIPELINE:
            stages = {s["id"]: s["name"] for s in p["stages"]}
    moves = defaultdict(lambda: defaultdict(int))
    page, after_id, after_ts = 0, None, None
    while True:
        q = f"/opportunities/search?location_id={LOC}&pipeline_id={PIPELINE}&limit=100"
        if after_id:
            q += f"&startAfterId={after_id}&startAfter={after_ts}"
        r = get(q)
        ops = r.get("opportunities", [])
        for o in ops:
            ts = o.get("lastStageChangeAt")
            name = stages.get(o.get("pipelineStageId"), "?")
            if ts and name != "Not Called Yet":
                d = parse(ts)
                if d >= since:
                    moves[d.date()][name] += 1
        meta = r.get("meta", {})
        after_id, after_ts = meta.get("startAfterId"), meta.get("startAfter")
        page += 1
        if not ops or not after_id or page > 200:
            break
    order = [n for n in stages.values() if n != "Not Called Yet"]
    return moves, order


def main():
    days = int(sys.argv[1]) if len(sys.argv) > 1 else 14
    today = datetime.now(CT).date()
    since = datetime.combine(today - timedelta(days=days - 1), datetime.min.time(), CT)

    per_day = defaultdict(list)
    for m in calls(since):
        if m.get("userId") != KRYSTLE:
            continue
        d = parse(m["dateAdded"])
        if d >= since:
            per_day[d.date()].append(m)

    moves, order = stage_moves(since)

    rows = []
    for i in range(days):
        day = today - timedelta(days=i)
        cs = sorted(per_day.get(day, []), key=lambda m: m["dateAdded"])
        out = [m for m in cs if m.get("direction") == "outbound"]
        dur = [((m.get("meta") or {}).get("call") or {}).get("duration") or 0 for m in cs]
        answered = sum(1 for m in out if m.get("status") == "completed")
        talks = sum(1 for d in dur if d >= 60)
        first = parse(cs[0]["dateAdded"]) if cs else None
        last = parse(cs[-1]["dateAdded"]) if cs else None
        early = sum(1 for m in out if parse(m["dateAdded"]).hour < 8)
        late = sum(1 for m in out if parse(m["dateAdded"]).hour >= 21)
        row = {
            "Date": day.isoformat(),
            "Day": day.strftime("%a"),
            "Dials": len(out),
            "Answered": answered,
            "Talks 1 min+": talks,
            "Talk time (min)": round(sum(dur) / 60, 1),
            "Inbound calls": len(cs) - len(out),
            "First call (CT)": first.strftime("%-I:%M %p") if first else "",
            "Last call (CT)": last.strftime("%-I:%M %p") if last else "",
            "Hours on phone": round((last - first).total_seconds() / 3600, 1) if first else 0,
            "Dials before 8 AM / after 9 PM CT": early + late,
        }
        for name in order:
            row[name] = moves.get(day, {}).get(name, 0)
        rows.append(row)

    cols = list(rows[0].keys())
    show = ["Date", "Day", "Dials", "Answered", "Talks 1 min+", "Talk time (min)",
            "First call (CT)", "Last call (CT)", "Hours on phone"] + order
    widths = {c: max(len(c), *(len(str(r[c])) for r in rows)) for c in show}
    print("  ".join(c.ljust(widths[c]) for c in show))
    for r in rows:
        print("  ".join(str(r[c]).ljust(widths[c]) for c in show))
    flagged = sum(r["Dials before 8 AM / after 9 PM CT"] for r in rows)
    if flagged:
        print(f"\nWarning: {flagged} dial(s) before 8 AM or after 9 PM Central. "
              "Telemarketing calls must stay between 8 AM and 9 PM in the lead's time zone.")
    print("\nHours on phone = first to last call of the day, not clocked hours.")

    with open(OUT, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)
    print(f"Saved: {OUT}")


if __name__ == "__main__":
    main()
