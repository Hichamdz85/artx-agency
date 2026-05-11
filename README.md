# ArtX — Creative Agency website

Official one-page site for **ArtX Creative Agency** — built on
**React 18 + Vite + Tailwind CSS v4** with **Framer Motion** for
immersive animation.

> Design that makes brands unforgettable.

---

## ✨ What's included

- **Hero** — animated constellation + drifting gradient orbs + custom cursor + magnetic CTAs
- **Services** — four gradient-bordered cards (Brand Identity, Web, Advertising, Social/Motion)
- **Trusted by** — infinite marquee of placeholder client wordmarks
- **CTA** — large "Got a project?" block with mailto link
- **Footer** — brand + contact

All built with the official **ArtX brand tokens** (Pink → Purple → Cyan
gradient, Grift display font + Montserrat body, black canvas, 60/30/10 rule).

## 🚀 Run locally

```bash
cd "Website AI/artx-agency"
npm install
npm run dev       # http://localhost:5173
```

## 📦 Build for production

```bash
npm run build
npm run preview   # http://localhost:4173
```

The static output goes in `dist/` and can be deployed to **Vercel,
Netlify, Cloudflare Pages or any static host**.

## 🎨 Next steps — adding 21st.dev components

Because the project is React + Tailwind, **anything from
[21st.dev/community/components](https://21st.dev/community/components)
drops in cleanly**:

1. Copy the component code from 21st.dev.
2. Save it under `src/components/`.
3. Import where you need it.

Recommended starting points for ArtX:

- **Background patterns:** *Aurora Background*, *Background Beams*,
  *Sparkles*, *Particles* — to upgrade `AnimatedBackground.jsx`.
- **Hero variants:** *Spotlight*, *Macbook Scroll*, *Hero Highlight*.
- **Marquee:** *Logo Cloud Marquee* — to replace `TrustedBy.jsx`.
- **Cards:** *Glowing Effect*, *Card Spotlight* — to upgrade service cards.

## 🗂 Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css                ← Tailwind v4 + brand tokens + font faces
└── components/
    ├── Logo.jsx             ← Full wordmark + standalone X mark
    ├── Navbar.jsx
    ├── CustomCursor.jsx
    ├── AnimatedBackground.jsx
    ├── Hero.jsx
    ├── ServicesSection.jsx
    ├── TrustedBy.jsx
    ├── CTASection.jsx
    └── Footer.jsx

public/
├── favicon.svg              ← Gradient X mark
└── fonts/Grift-*.ttf        ← 18 weights of Grift (your licensed font)
```

## 🎨 Brand tokens (from `index.css`)

| Token | Hex | Use |
|---|---|---|
| `--color-artx-purple` | `#8437F5` | Primary brand |
| `--color-artx-cyan`   | `#00A8FF` | Accent / energy |
| `--color-artx-pink`   | `#FFD0FE` | Warmth / gradient start |
| `--color-artx-violet` | `#6432F5` | Depth |
| `--color-artx-indigo` | `#4B5EFB` | Transition |
| `--color-artx-aqua`   | `#00DFFF` | Light accent |

Signature gradient: `Pink → Purple → Cyan @ 135°`

Fonts: `Grift` (display, 18 weights from local files) +
`Montserrat` (body, via Google Fonts).
