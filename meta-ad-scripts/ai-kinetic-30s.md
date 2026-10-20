# Meta ad: "What to look for" AI kinetic video (about 30s, 9:16 and 4:5)

Remake of the reference ad's format (fast cuts of roofing and drone shots, big captions with a yellow highlight word, voiceover), with AI-generated b-roll. Retail (non-insurance) replacement audience, Nashville / Middle TN only.

Guardrails (from CLAUDE.md):
- No price claim (the reference's "$6,299" hook is out). The hook is a checklist instead.
- Every claim is a confirmed one: free inspection, written estimate, licensed and insured, lifetime workmanship warranty on replacements, family owned, phone answered 24/7, Puppy Promise (retail only).
- AI footage shows generic roofs and crews. It is not presented as Stellar's jobs: small on-screen "Illustrative AI footage" line, and turn on Meta's "AI info" label when uploading.
- No logos, readable text, real brands, or close-up faces in generated shots. No fake testimonials.

## Voiceover (about 55 words, about 24s read)

> Getting quotes to replace your roof? Here's what to look for. A free inspection. A written estimate you can compare. Licensed and insured. A lifetime workmanship warranty. And a local, family-owned crew that answers the phone. That's Stellar Roofing. We'll even send your dog to a spa day while we work. Tap Get Quote.

Voice options (pick one):
1. **Nate records it himself on his phone** (free, real, my pick). Same voice as the first ad.
2. Kokoro `am_michael` from `~/ig-carousels/tools/voice` (free, sounds like AI).
3. Higgsfield speech, about 2 credits (ElevenLabs is out of characters until Nov 8).

## Shot list (each generated at 5s, trimmed to the beat)

| # | VO / caption (yellow = highlight) | Shot prompt |
|---|---|---|
| 1 | Getting **QUOTES** to replace your roof? | Low drone push over a Tennessee suburban neighborhood at golden hour, one house with an old worn shingle roof |
| 2 | Here's what to **LOOK FOR** | Close macro of weathered asphalt shingles, soft side light, shallow depth of field |
| 3 | A **FREE** inspection | Two roofers in hard hats and harnesses seen from behind, walking a pitched roof, clipboard in hand, blue sky |
| 4 | A **WRITTEN** estimate | Hands holding a clipboard with a blank paper form on a sunny driveway, no readable text |
| 5 | **LICENSED** and insured | Work truck (no logo) pulling up to a brick home, crew unloading ladders |
| 6 | A **LIFETIME** warranty | Slow orbit drone shot of a finished dark charcoal shingle roof, clean lines |
| 7 | A local **FAMILY-OWNED** crew | Crew on a roof from behind, laying shingles with nail guns, warm light |
| 8 | That **ANSWERS** the phone | Hand picking up a smartphone on a truck hood, screen not readable |
| 9 | That's **STELLAR ROOFING** | Wide sunrise drone reveal of a completed roof on a two-story home |
| 10 | We'll send your **DOG** to a spa day | Happy golden retriever being brushed at a grooming salon, soft bright interior |
| 11 | While we **WORK** | Same style: dog playing in a fenced grass yard with other dogs, sunny |
| 12 | Tap **GET QUOTE** | End card: logo + "Free inspection + written estimate", licensed and insured (same as ad 1) |

Small print: "Illustrative AI footage. Puppy Promise applies to retail roof replacements only."

## Cost (preflighted, no jobs submitted)

| Model | Per 5s clip | 11 clips | With about 2 tries each |
|---|---|---|---|
| Kling 3.0 | 10 credits | 110 | about 250 |
| Seedance 2.5 | 35 credits | 385 | about 850 |

Plan: generate shots 1-11 on Kling first; re-run only weak shots on Seedance. Budget **about 250 credits**. Not generated yet; the Higgsfield balance on the API key is unverified.

## Needs Brandon's OK before anything is spent
1. The script and shot list above.
2. Voice option (1, 2 or 3).
3. Confirm the API account balance is at least about 250 credits.
