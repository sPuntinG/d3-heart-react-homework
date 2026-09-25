# CLAUDE.md

This file gives Claude Code context for working in this repo.

## Who's working on this

The owner is a **data analyst, not a web developer**. This project exists specifically to learn
web dev fundamentals + D3 & React — the learning is the point, not just the finished app.

When helping here:
1. **Use plain, everyday language.** Avoid unexplained jargon. If a technical term is
   necessary, explain it in a sentence.
2. **Don't just implement things for me.** For anything beyond a trivial fix: first explain
   the logic/concept/reasoning in plain terms, then guide me step by step so *I* make the
   edits. Tell me which file to open, what to change, and why — don't jump ahead and write
   large or advanced chunks of code on my behalf. It's fine (and expected) to write code
   for genuinely small/mechanical things, but the goal is for me to do most of the typing
   and thinking.
3. If I ask a "how does X work" question, treat it as a real question to answer, not a cue
   to go implement X.

## What this repo is

A single Vite + React app that consolidates multiple D3/React course modules into one site
with client-side navigation (React Router), instead of one separate repo per module.
Deployed to GitHub Pages via the `gh-pages` npm package (`npm run deploy`).

Full architecture writeup (folder structure, routing, why this approach, how to add a new
module, deployment flow): `docs/learning-notes/Architecture - D3 Portfolio Single Repo Setup.md`.

Note: `docs/` is git-ignored (see `.gitignore`) — it holds personal notes and old project
folders, so it exists on disk but isn't pushed to GitHub. This file (CLAUDE.md) lives at the
repo root specifically so it *is* tracked and travels with the repo.

Quick shape, as of now:
- `src/App.jsx` — routes (`/` → LandingPage, `/module0b` → Module0b_PokemonCards, `/module1` → Module1_Barplot)
- `src/components/Navigation.jsx` — left sidebar nav (the `modules` array is the source of truth for links)
- `src/components/LandingPage.jsx` — home page (see to-do #3 below, it's an AI-drafted placeholder)
- `src/components/module0b-pokemon-cards/` — Pokémon cards mini-app (migrated from its own repo)
- `src/components/module1-barplot/Module1_Barplot.jsx` — first D3 visualization module

## Conventions

**Module numbering.** `module0a`, `module0b`, … are the "Web Foundations" pre-modules (small
web apps, no D3 plotting focus). `module1`–`module10` are the actual D3/React plotting modules.

**One folder per module**, kebab-case, named after its content — `module0b-pokemon-cards/`.
Component files inside stay PascalCase (`Module0b_PokemonCards.jsx`). There is no shared
`plots/` folder — every module, chart or mini-app, gets its own folder at the same level.

**CSS: theme-global + module-scoped.** `src/index.css` owns the site theme — colours, fonts and
spacing as CSS variables, plus the dark-mode block. Modules do *not* redefine `body` or bare
`h1`/`h2` selectors, because CSS is global and that would leak into every other page.
Instead each module's stylesheet is wrapped in one uniquely-named class matching a wrapper
`<div>` in its JSX, using native CSS nesting:

```css
.pokemon-cards {
  /* wrapper styling */
  h1 { ... }          /* → .pokemon-cards h1, scoped to this module only */
  .type-badge { ... }
}
```

Prefer `var(--bg)`, `var(--text)` etc. over hardcoded colours so dark mode keeps working.

## To-do list (things to not forget when resuming)

1. **Migrate the older standalone projects into this repo as new modules/routes:**
   - ~~`pokemon-cards-app`~~ — **done**, now `src/components/module0b-pokemon-cards/` at `/module0b`
   - `docs/old-projects-to-migrate-here/module1-intro-project` → becomes `module0a-*`
   - "Flashy portfolio" landing page — **not yet copied into this repo**:
     https://github.com/sPuntinG/portfolio
   - Follow the "How to Add a New Module" pattern in the architecture doc referenced above,
     plus the Conventions section above.

2. **Improve the UI** — current styling and layout are minimal/default. Revisit spacing,
   layout, and overall visual polish once there's more content to arrange. Known specifics:
   - `#root` in `index.css` (fixed 1126px width, `text-align: center`) fights `.app-container`
     in `App.css` (full-width flex sidebar layout). Leftover from the Vite starter template.
   - Global `h1 { font-size: 56px }` in `index.css` is oversized inside module pages.
   - Pokémon cards hardcode `background: white` / `color: #333`, so they don't follow dark mode.
   - `Navigation.jsx` still lists "Coming Soon" entries for `/module2` and `/module3`, which
     have no route — clicking them renders a blank page. Either remove them or add a
     catch-all `<Route path="*">` fallback.

3. **Rewrite the Home page text** (`src/components/LandingPage.jsx`) — current copy is an
   AI-generated placeholder/draft, needs to be rewritten in my own voice.
