# Price-hook script (v4), same format as the reference ad

STATUS: do not run until the price is confirmed. `{PRICE}` below is a placeholder. The text "$5,999" is Brandon's example, not a confirmed Stellar price. Nate must confirm a real number he will honor, for what roof size and shingle.

Voiceover (about 22s, ElevenLabs "Brian", fast):

> {PRICE} for a new roof? How?
> Well... it depends on the size of your roof.
> A bigger roof costs more. A smaller, simpler roof costs less.
> So here's what we do. We inspect it for free.
> Then you get a written estimate with your exact number, before you sign.
> Found a comparable written quote? We'll match it.
> Every replacement comes with a lifetime workmanship warranty.
> Licensed and insured. Family owned.
> Tap Get Quote.

On-screen text, always visible in small print while the price shows:
> Example starting price for a {SIZE} roof with {SHINGLE} shingles. Your price depends on roof size, pitch and materials. Retail replacements only.

Visuals (same fast style as v3): AI snap intro (old roof to new roof) under the big yellow price slam, then real Stellar crew and roof clips, the logo door, and the end card.

Rules this keeps: price is real and qualified ("example starting price", size and shingle named); it says price match, never "beat"; every other claim is a confirmed one. Free gutters and the dog day stay out of this ad (they are separate offers).

Meta ad copy to go with it:
> {PRICE} for a new roof? It depends on your roof's size. Get a free inspection and a written estimate with your exact number before you sign. We'll match a comparable written quote. Lifetime workmanship warranty on every replacement. Licensed and insured, family owned.

## Needed from Brandon / Nate
1. The real example price, the roof size (square feet or squares) and the shingle type it is for.
2. Whether Nate is OK with the price appearing in a paid ad.

---
## Built 2026-10-20 (no-price version, v4)
Brandon chose no number. Voiceover: "A new roof? How much? It depends on the size. A bigger roof costs more. A smaller, simpler roof costs less. So we inspect it for free. Then you get a written estimate with your exact number, before you sign. Found a comparable written quote? We'll match it. Every replacement comes with a lifetime workmanship warranty. Licensed and insured. Family owned. Tap Get Quote."
Files: `meta-ad-clips/stellar-v4-{916,45,11,169}.mp4` (26.7s). Build: `hyperframes-v3/gen4.py` (`ASPECT=916 python3 gen4.py`, then `npx hyperframes@0.8.181 render`). Voice: ElevenLabs Brian. Clips swapped out where a crew member's shirt showed another company's name.
