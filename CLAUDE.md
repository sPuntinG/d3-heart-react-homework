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
- `src/App.jsx` — routes (`/` → LandingPage, `/module1` → Module1_Barplot)
- `src/components/Navigation.jsx` — left sidebar nav
- `src/components/LandingPage.jsx` — home page (see to-do #3 below, it's an AI-drafted placeholder)
- `src/components/plots/Module1_Barplot.jsx` — first D3 visualization module

## To-do list (things to not forget when resuming)

1. **Migrate the older standalone projects into this repo as new modules/routes:**
   - `docs/old-projects-to-migrate-here/pokemon-cards-app` (source: https://github.com/sPuntinG/pokemon-cards-app)
   - `docs/old-projects-to-migrate-here/module1-intro-project`
   - "Flashy portfolio" landing page — **not yet copied into this repo**:
     https://github.com/sPuntinG/portfolio
   - Follow the "How to Add a New Module" pattern in the architecture doc referenced above.

2. **Improve the UI** — current styling and layout are minimal/default. Revisit spacing,
   layout, and overall visual polish once there's more content to arrange.

3. **Rewrite the Home page text** (`src/components/LandingPage.jsx`) — current copy is an
   AI-generated placeholder/draft, needs to be rewritten in my own voice.
