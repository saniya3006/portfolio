# Saniya Mehta — Portfolio

Personal portfolio built with **React 18 + TypeScript + Vite + Tailwind CSS**, animated with **Framer Motion** and using **lucide** icons (shadcn/ui-style setup).

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Project structure

```
src/
  hooks/            useTheme, useActiveSection, useTypewriter, useCountUp, useCopyToClipboard
  lib/
    data.ts         ALL portfolio content (profile, projects, skills, education…)
    utils.ts        cn() class-name helper
  components/ui/    Button, Reveal, GlowCard, SectionHeading, brand icons
  sections/         Navbar, Hero, TechMarquee, About, Experience, Projects,
                    Skills, Education, Contact, Footer, CommandPalette
  App.tsx           Page layout, Ctrl+K shortcut, cursor spotlight, back-to-top
  App.css           Decorative CSS (grid background, glow cards, spotlight)
  index.css         Tailwind layers + light/dark theme tokens
public/
  Saniya_Mehta_Resume.pdf
  favicon.svg
```

## Editing content

Almost everything is in [`src/lib/data.ts`](src/lib/data.ts). Add a project by appending to the `projects` array; it appears in the grid, filters and detail modal automatically.

The résumé link and contact email can also be overridden in `.env`:

```
VITE_RESUME_URL=...
VITE_CONTACT_EMAIL=...
```

## Features

- Light / dark theme (remembered per browser)
- Typewriter role animation, animated stat counters
- Active-section highlight in the navbar and a scroll progress bar
- Filterable project grid with animated layout and a detail modal
- Tabbed skills panel
- **Ctrl / ⌘ + K** command palette for quick navigation and links
- Cursor spotlight and pointer-tracking glow on cards
- Copy-email button, back-to-top button, résumé PDF download
- Responsive down to small phones; respects `prefers-reduced-motion`

## Deploying

**Vercel:** import the repo; framework preset "Vite" is detected automatically (build `npm run build`, output `dist`).

**GitHub Pages:** build and publish the `dist/` folder (for example with the `gh-pages` package or a GitHub Actions workflow). If you deploy to a sub-path like `/portfolio/`, set `base: "/portfolio/"` in `vite.config.ts`.
