# Doniyor — Portfolio Website

Built with **Astro.js** in the style of n8n — dark theme, geometric grid, monospace accents, clean typography.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321`

## 📁 Structure

```
src/
├── layouts/
│   └── Layout.astro       # Base HTML layout
├── components/
│   ├── Nav.astro          # Fixed navigation
│   └── Hero.astro         # Hero section
└── pages/
    └── index.astro        # Main page (About, Skills, Projects, Contact)

public/
├── styles/
│   └── global.css         # Design tokens & shared styles
└── scripts/
    └── main.js            # Scroll animations & nav
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--accent` | `#ff6b35` (orange) |
| `--bg` | `#0e0e10` |
| `--mono` | DM Mono |
| `--sans` | Syne |

## ✏️ Customization

1. **Personal info** → `src/pages/index.astro` (name, bio, contacts)
2. **Projects** → edit the `projects` array in `index.astro`
3. **Colors** → change CSS variables in `public/styles/global.css`
4. **Hero card stats** → `src/components/Hero.astro`

## 📦 Deploy

```bash
npm run build    # outputs to /dist
```

Works with Netlify, Vercel, Cloudflare Pages — zero config.
