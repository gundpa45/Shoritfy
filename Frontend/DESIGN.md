# SHORTIFY - AI SaaS Frontend Design System & UI Specifications

## 1. Vision & Brand Personality
Design a world-class AI SaaS application. The experience must feel like:
- **Apple**
- **Vercel**
- **Arc Browser**
- **Nordcraft**
- **Framer**
- **Linear**

The interface communicates intelligence, speed, trust, and premium craftsmanship. Users immediately feel that the AI is actively processing, analyzing, and working—never a static form filler. Everything should feel cinematic, premium, and alive.

### Brand Personality
- Modern | Minimal | Futuristic | Premium | Elegant | Fast | Confident | Professional | Creator-first

---

## 2. Design Language & Tokens
- **Large Typography**: Clean geometric sans-serif (Inter / Outfit / Plus Jakarta Sans) with compact tracking on headlines and monospaced font (JetBrains Mono) for technical readouts, scores, and timestamps.
- **Huge Whitespace**: Generous breathing room between sections (`80px` to `160px` vertical gaps). No visual clutter.
- **Floating Glass Panels**: Translucent surfaces (`rgba(13, 13, 13, 0.7)`) with backdrop blur (`16px` to `24px`).
- **Soft Gradients**: Smooth 135-degree gradients transitioning from Primary Cyan (`#00E5FF`) to Accent Purple (`#8B5CF6`).
- **Dark Surfaces**: Deep layered monochromatic dark surfaces that create infinite depth.
- **Glowing Borders**: Subtle `1px` borders (`rgba(255, 255, 255, 0.08)`) that illuminate with cyan/purple glow on hover or active state.
- **Smooth Shadows**: Multi-layered ambient shadows (`0 20px 50px rgba(0, 0, 0, 0.6)`).
- **Rounded Corners**: Compact-to-generous curvature:
  - Standard interactive elements (buttons, inputs): `12px` (`rounded-xl`) to `16px` (`rounded-2xl`) or fully rounded pill shape for primary CTAs.
  - Cards, modals, floating panels, video player: `16px` to `24px`.

---

## 3. Color Palette (Strict Tokens)
```css
:root {
  --color-bg: #050505;
  --color-surface: #0D0D0D;
  --color-card: #141414;
  --color-primary: #00E5FF;
  --color-accent: #8B5CF6;
  --color-success: #3DDC84;
  --color-text: #FFFFFF;
  --color-text-secondary: #9CA3AF;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-glow: rgba(0, 229, 255, 0.4);
  --color-glass-bg: rgba(20, 20, 20, 0.55);
}
```
- **Background (`#050505`)**: Deepest near-black void.
- **Surface (`#0D0D0D`)**: Primary elevation layer for sections and sidebars.
- **Card (`#141414`)**: Elevated containers, floating AI cards, and data panels.
- **Primary (`#00E5FF`)**: Cyan neon highlight for active AI states, current pipeline steps, playheads, and primary CTAs.
- **Accent (`#8B5CF6`)**: Purple accent for AI scores, viral detection highlights, and gradient transitions.
- **Success (`#3DDC84`)**: Vibrant emerald green for completed pipeline nodes and high-confidence metrics.
- **Text (`#FFFFFF`)**: Crisp white for primary headings and active text.
- **Secondary Text (`#9CA3AF`)**: Muted gray for subtitles, timestamps, and metadata.
- **Border (`rgba(255,255,255,0.08)`)**: Hairline borders defining structural edges.

---

## 4. Hero Section & Animation System
- **Centerpiece**: One large cinematic video player in the center (no stock images; real footage feel).
- **Floating AI Elements (Parallax)**:
  - **Transcript Card**: Typing animation with highlighted words.
  - **AI Score Card**: Glowing badge with viral potential score (e.g., `98/100`).
  - **Viral Detection Card**: Highlighted viral hook moment.
  - **Timeline Card**: Live waveform with clip segments separating.
  - **Clip Preview Card**: Floating thumbnail card with duration badge.
  - **Confidence Score Card**: Live gauge indicating transcription & hook accuracy.

### Hero Animation Sequence
1. Background fades in (dark void + aurora glow).
2. Logo appears in navbar.
3. Headline types itself smoothly.
4. Cinematic Video fades upward with subtle scale-in.
5. Transcript begins typing automatically below/beside player.
6. Words become highlighted as the playhead advances.
7. AI scanning laser effect sweeps across the transcript.
8. Timeline lights up with clip markers.
9. Five clips separate from the timeline.
10. Clip cards fly outward into floating parallax cards.
11. CTAs become interactive.

---

## 5. AI Pipeline Visualization (Live Workflow)
Replace static "How it works" diagrams with an interactive, live AI workflow pipeline:
```
YouTube  ──►  Download  ──►  Whisper  ──►  Transcript  ──►  AI Analysis  ──►  Clip Detection  ──►  Rendering  ──►  Ready
```
- **Active Node**: Pulses with cyan glow (`#00E5FF`).
- **Completed Node**: Glows vibrant green (`#3DDC84`) with a checkmark badge.
- **Future Nodes**: Muted dark (`#141414` surface, `#9CA3AF` dimmed text).
- **Connector Lines**: Animated gradient particle streams flowing from left to right.

---

## 6. Upload & AI Processing Experience
### Upload Card
- Large floating glass drop zone with `rgba(255, 255, 255, 0.08)` border.
- Interactive hover state: border illuminates with cyan glow (`#00E5FF`).
- Particle effects react to cursor movement.
- Upon drop, transforms smoothly into **"Processing..."** state without a jarring reload.

### AI Processing Screen ("Watching an AI Think")
- **Animated Terminal**: Real-time streaming log messages (`[AI-ENGINE] Highlighting viral hook at 01:14...`).
- **Live Transcript**: Text appearing word by word with sentiment & viral scores.
- **Waveform & Confidence Graph**: Dynamically rendering audio waveform and viral spike chart.
- **Node Graph**: Showing independent model execution:
  - `Whisper (Speech-to-Text)` ──► `Qwen (Context & Hook AI)` ──► `FFmpeg (Vertical Render)`
- Live percentages for each sub-process.

---

## 7. Generated Clips Cards
- **Card Structure**: Floating glass card (`#141414`) with `16px` rounding and `rgba(255,255,255,0.08)` border.
- **Hover Behaviors**:
  - Video auto-previews smoothly.
  - Border transitions to glowing cyan/purple gradient.
  - Card lifts (`-4px` Y-axis) with expanded shadow.
  - AI score (`98 Viral Score`) and Duration badge appear prominently.
  - Action row reveals: **Download**, **Share**, **Copy Link** buttons.

---

## 8. Dashboard Layout (Linear / Apple Aesthetic)
- **Left Navigation**: Collapsible sidebar aligned to an 8px spacing grid.
  - Items: **Processing Queue**, **Projects**, **Usage**, **Credits**, **Recent Videos**, **Analytics**.
- **Header**: Transparent glass navbar with blur effect that elevates on scroll.
- **Empty States**: Animated AI orb illustration with helpful suggested prompts and an instant Upload CTA.

---

## 9. Motion, Background & Performance
- **Motion System**: Apple-grade cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`), 300ms–500ms durations. Micro-animations on all interactive elements.
- **Background Effects**:
  - Very subtle animated coordinate grid.
  - Tiny floating ambient dust particles.
  - Subtle noise texture overlay.
  - Aurora glow (`rgba(0, 229, 255, 0.07)` and `rgba(139, 92, 246, 0.07)`).
  - Interactive mouse spotlight effect.
- **Cursor**: Custom subtle glow with interactive magnet effect on buttons and cards.
- **Performance**: 60fps GPU-accelerated CSS transforms (`translate3d`, `opacity`, `scale`), lazy-loaded assets, and skeleton screens.
