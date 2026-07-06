# DESIGN.md
> Place this file in your project root. Antigravity reads this before generating any UI.
> Reference inspiration: runner.now (clean, product-led SaaS)

## Design Style
- Clean, product-led SaaS. Calm and confident, not flashy.
- Light theme only. Off-white background, near-black text, one accent color.
- No glassmorphism, no gradients, no stock illustrations, no default AI-generated look (no cream+terracotta, no dark+neon-green).

## Avoid
- Multiple accent colors
- Heavy drop shadows / neumorphism
- Carousels for testimonials
- Numbered steps (01/02/03) unless the content is a real sequence
- Filler marketing copy ("Stop X. Start Y." repeated per section)
- Icons as decoration where text alone communicates the point

## Use
- Color tokens:
  - `--bg-primary: #FDFDFD`
  - `--bg-secondary: #F5F5F4`
  - `--text-primary: #111111`
  - `--text-secondary: #6B6B6B`
  - `--border: #E5E5E3`
  - `--accent: [SET BRAND COLOR HERE]`
  - `--accent-soft: accent @ 8–12% opacity`
- Typography:
  - Display/H1: geometric sans, weight 600–700, tight line-height (1.05–1.1)
  - Body: same family, weight 400–500, line-height 1.5–1.6, base 16–18px
  - Captions/labels: uppercase, small, `--text-secondary`, +0.04em tracking
  - Scale: 14 / 16 / 18 / 24 / 32 / 48 / 64px only
- Spacing (8px base): 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Cards: 12–16px radius, 1px `--border`, shadow `0 1px 2px rgba(0,0,0,0.04)` max
- Buttons: pill or 8px radius, solid accent for primary, outline for secondary
- Motion: hover lift only (translateY -2px), scroll fade-ins, one orchestrated hero animation max. Respect `prefers-reduced-motion`.

## Component Rules
- **Hero**: must show the product doing something real (live/animated state), not a static banner. For this project: show the actual pipeline in motion — e.g. "Transcribing → Detecting highlights → Rendering clip."
- **Feature cards**: grid or horizontal scroll, bold short title + one plain sentence, no forced icons.
- **Process section**: numbered steps only if truly sequential (e.g. Upload → Transcribe → Auto-clip → Export).
- **Comparison block**: side-by-side generic-tool vs. this-product, showing real tool-call/status output on the product side.
- **Testimonials**: static grid, avatar + name + role + one-line quote. No star ratings.
- **Pricing**: max 3 tiers, one visually emphasized as recommended, plain-language bullets.

## Copy Rules
- Active voice, present tense. "Clips your best moments" not "will be clipped."
- Buttons name the outcome ("Start clipping"), never "Submit."
- No jargon. Name things by what the user controls, not how the system works.
- Errors/empty states: state what happened + what to do next, product's voice.

## Before Building
Confirm these with me before generating final UI:
1. Accent color (hex)
2. Display typeface
3. What the hero's live-demo moment actually shows