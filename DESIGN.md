# Design

## Theme
Dreamy blush & pastel. A soft, slowly-drifting gradient sky (blush → lilac → peach-cream) with blurred bokeh blobs and hearts floating up. Content sits on near-white "paper" cards with rounded corners and a soft pink glow. The mood: a folded love-note made of light.

## Color (OKLCH)
- `--bg`: oklch(0.985 0.014 350) — blush white
- gradient stops: blush `oklch(0.95 0.04 350)`, lilac `oklch(0.93 0.05 312)`, peach-cream `oklch(0.96 0.045 60)`
- `--surface`: oklch(0.995 0.006 350) — paper white card
- `--ink`: oklch(0.30 0.05 350) — deep plum-rose (≥7:1 on surface)
- `--muted`: oklch(0.50 0.045 350) — soft plum
- `--primary`: oklch(0.62 0.17 22) — warm rose (white text on fills)
- `--primary-strong`: oklch(0.55 0.18 22)
- `--accent`: oklch(0.74 0.11 312) — soft lilac (white text on fills)
- `--gold`: oklch(0.86 0.10 92) — champagne sparkle highlight

Strategy: full palette / lightly drenched — the dreamy surface is part of the brand.

## Typography
- **Caveat** (handwritten) — the heartfelt lines, the "Dear …", the signature. Carries the personal, folded-note voice.
- **Quicksand** (geometric rounded sans) — body, UI, buttons. Soft and legible.
- Pairing axis: handwritten script vs. rounded geometric sans (true contrast, not two similar sans).

## Motion
- Easing: ease-out-expo / quint `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce except one deliberate springy "Yes".
- Envelope: seal pulse → flap opens on rotateX → letter rises and settles.
- Page turns: 3D flip with soft shadow.
- Between pages: a heart-tinted wipe overlay.
- Celebration: confetti + heart burst, springy.
- Every animation has a `prefers-reduced-motion: reduce` crossfade/instant fallback.

## Layout
Single dominant idea per viewport, centered, phone-first. Generous breathing room; rounded everything; soft layered shadows in the rose hue (no harsh gray box-shadows).
