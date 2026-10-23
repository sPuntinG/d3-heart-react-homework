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

Note: `docs/learning-notes/` **is** tracked by git (my learning notes travel with the repo).
Only folders/files starting with `old-` are git-ignored — e.g.
`docs/old-projects-to-migrate-here/` holds old project dumps that live on disk only.

Quick shape, as of now:
- `src/App.jsx` — routes (`/` → LandingPage, `/module0b` → Module0b_PokemonCards, `/module1` → Module1_Barplot)
- `src/modules.js` — **the list of modules** (`id`, `num`, `label`, `path`, `description`,
  `soon: true` for upcoming ones). Single source of truth: both the sidebar and the home
  page cards import it.
- `src/components/Navigation.jsx` + `.css` — left sidebar. Uses `NavLink` (adds `class="active"`
  to the current page's link → sticky-note highlight). `soon` entries render as grey,
  non-clickable text.
- `src/components/LandingPage.jsx` + `.css` — home page: title, intro, grid of module cards
  built from `modules.js` (small `CardContent` helper component). Intro text is still a
  placeholder (to-do #3).
- `src/components/module0b-pokemon-cards/` — Pokémon cards mini-app (migrated from its own repo)
- `src/components/module1-barplot/Module1_Barplot.jsx` — first D3 visualization module

## Conventions

**Module numbering.** `module0a`, `module0b`, … are the "Web Foundations" pre-modules (small
web apps, no D3 plotting focus). `module1`–`module10` are the actual D3/React plotting modules.

**One folder per module**, kebab-case, named after its content — `module0b-pokemon-cards/`.
Component files inside stay PascalCase (`Module0b_PokemonCards.jsx`). There is no shared
`plots/` folder — every module, chart or mini-app, gets its own folder at the same level.

**Adding a module** = new folder + component, a `<Route>` in `App.jsx`, and one entry in
`src/modules.js` (that entry feeds both the sidebar and the home page card).

**CSS: theme-global + module-scoped.** `src/index.css` owns the site theme — colours, fonts and
spacing as CSS variables (no dark-mode block for now, see design section). Modules do *not* redefine `body` or bare
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

Prefer the theme variables over hardcoded colours, so a future dark mode only needs to
redefine the variables. Current names (top of `src/index.css`):
- paper: `--bg`, `--sidebar-bg`, `--rule-line`, `--rule-gap`, `--margin-rule`, `--border`
- ink: `--text-h` (headings), `--text` (body), `--muted`, `--label`
- accents: `--accent` (red), `--blue`, `--sticky` (yellow)
- cards: `--card-text-bg` (translucent), `--card-chart-bg` (opaque), `--code-bg`
- fonts: `--heading` (Caveat), `--body` (Lora), `--mono` (IBM Plex Mono)

## To-do list (things to not forget when resuming)

1. **Migrate the older standalone projects into this repo as new modules/routes:**
   - ~~`pokemon-cards-app`~~ — **done**, now `src/components/module0b-pokemon-cards/` at `/module0b`
   - `docs/old-projects-to-migrate-here/module1-intro-project` → becomes `module0a-*`
   - "Flashy portfolio" landing page — **not yet copied into this repo**:
     https://github.com/sPuntinG/portfolio
   - Follow the "How to Add a New Module" pattern in the architecture doc referenced above,
     plus the Conventions section above.

2. **Improve the UI** — **in progress**, implementing the "notebook" design (see "Visual
   design: notebook look" below, incl. progress + next steps). Of the original known problems:
   - ~~`#root` vs `.app-container` conflict~~ — **fixed** (starter `#root` rule deleted).
   - ~~Oversized global `h1 { font-size: 56px }`~~ — **fixed** (now 60px Caveat, tuned for handwriting).
   - ~~"Coming Soon" nav links to routes that don't exist~~ — **fixed** (`soon` entries aren't links).
   - ~~Pokémon cards hardcode `background: white` / `color: #333`~~ — **resolved**: white
     cards are kept on purpose (see Progress step 5), `#333` is badge text and stays.
   - Small leftover: `Navigation.jsx` still has the old `modules` array commented out
     (moved to `src/modules.js`) — safe to delete.

3. **Rewrite the site text in my own voice** — all of it is still placeholder:
   - home page intro paragraph (`LandingPage.jsx`)
   - sidebar title + subtitle ("Giulia's D3 notebook" / "a data analyst learns the web",
     in `Navigation.jsx`) — copied from the prototype
   - module card descriptions (`description` fields in `src/modules.js`) — copied from the prototype

## Visual design: notebook look (decided 2026-09-25, implementation in progress)

The site should look like a **hand-kept notebook**: the page is the paper, the charts are
what's pinned onto it. Prototypes live on a private Claude design canvas:
<https://claude.ai/artifact/8nT3gocqqCZasFyDHdkwih> — artboards A, B, C were the first three
options, **D** was my own mix of A and B, and **D2 is the agreed final direction**. Open it
and look at D2 before implementing anything.

**D2 in words:** cream ruled paper, a red vertical margin rule separating the left nav from
the page, Caveat handwriting for headings and nav, a plain serif for body text, mono for
small metadata labels.

Palette (light mode; dark mode deliberately not designed yet — paper texture in dark is
awkward, decide later):

| role | value |
|---|---|
| paper / page background | `#FAF4E6` |
| sidebar background | `rgba(246,238,220,0.87)` |
| ruled lines | `rgba(27,58,107,0.13)`, repeating every 32px |
| margin rule (sidebar right border) | `#C86F66`, 2px |
| heading ink | `#2B2A26` |
| body ink | `#3A382F` |
| muted / secondary text | `#5B584D`, and `#8A8172` for labels |
| red accent (highlight, annotations) | `#A8433B` |
| blue (chart bars, links) | `#1B3A6B` |
| sticky-note yellow (active nav item, notes) | `#FFF4C2` |
| text card background | `#FFFDF6BF` (75% opaque — ruled lines show through on purpose) |
| chart card background | `#FCF7EA` (**fully opaque**) |

Fonts (Google Fonts, one `<link>` in `index.html`):
- **Caveat** 500/700 — headings, nav links, handwritten annotations
- **Lora** 400/600 + italic — body text
- **IBM Plex Mono** 400/500 — small uppercase labels, module numbers, axis ticks

Rules that came out of the prototyping, worth keeping:
- **Handwriting for things you'd shout across a desk, normal type for things you'd read
  sitting down.** Caveat never gets used for paragraphs or for tiny letter-spaced uppercase.
- **Cards with their own lines (charts, tables) are opaque; text-only cards are translucent**
  — otherwise the ruled background tangles with the plot's axes.
- **Line-height 1.45** on body text (I like it compact; this is a deliberate choice, not an
  oversight — don't "fix" it back to 1.6).
- Module numbers (`00`, `0a`, `01`) in mono are the sidebar's visual system as modules pile up.
- Per chart: one bar colour (`#1B3A6B`), red (`#A8433B`) only on the bar being pointed at,
  plus a short handwritten Caveat annotation saying what I noticed. The chart states the
  fact, the handwriting says the insight.

**Progress (as of 2026-10-23):**
1. ✅ Google Fonts `<link>` in `index.html`.
2. ✅ Theme variables in `src/index.css` replaced with the palette + fonts; ruled lines on
   `body` (a `repeating-linear-gradient`); old dark-mode block removed and
   `color-scheme: light`; `App.css` white background + system font override removed.
3. ✅ Sidebar (`Navigation.jsx` + `.css`): title block, "Contents" label, mono module
   numbers, sticky-note active item via `NavLink`, grey "soon" entries, red margin rule.
4. ✅ (mostly) Landing page: global `h1`/`h2` resized for Caveat, `.main-content` padding
   set to D2's margins, module list moved to `src/modules.js`, card grid (`auto-fill`
   columns, translucent text cards, dashed "soon" card, small tilt on hover — my addition,
   not in D2).
5. ✅ Pokémon cards (`module0b`), done 2026-10-23. Decisions:
   - Cards stay **white** (not a theme colour): they read as real cards pinned onto the paper.
   - Rule for colours: notebook things (paper, ink, headings) use theme variables; Pokémon
     things (type badge colours and their white/`#333` text) keep their own colours.
   - The Pokémon parts (`.pokemon-grid`, `.filter-container`, card `h2` names, `.filter-btn`)
     use a retro **VT323** font; the page title stays in the notebook style. `h2` and
     buttons need their own `font-family` (global `h2` rule / buttons don't inherit).

6. ✅ Barplot (`module1`), done 2026-10-23. New `Module1_Barplot.css`, scoped under
   `.barplot`; all inline SVG styling moved to CSS classes. Opaque `.chart-card`; bars
   `.bar` (`--blue`) / `.bar.highlight` (`--accent`); `.country-label` / `.value-label` in
   mono; `.chart-note` handwritten note below the chart (size/wording are my own choice).
   The red bar is picked **at random** on each page load (`highlighted` const, via
   `Math.random()`), and the note jokes about it. Debugging trick learned along the way →
   `docs/learning-notes/Tricks - Debugging & Dev Tools.md` (add future tricks there).
   Leftover: commented-out `// fontSize` / `// fill` lines in the JSX, safe to delete.

**Next steps when resuming (agreed order):**
1. **Rest of the landing page from D2:** the "LATEST" card (opaque, shows the real
   barplot, not a drawing) and the small mono footer line ("last entry — date · source on
   GitHub"). Heads-up: `Module1_Barplot` currently bundles its own `h2` + intro `<p>` with
   the chart, so showing just the chart on the home page probably means splitting the chart
   into its own small component first — explain that idea before doing it.
2. **Tilted yellow "Note to self" sticky note** at the bottom of the sidebar — deliberately
   parked for the very end. Key trick to explain: `margin-top: auto` inside the sidebar's
   flex column pushes it to the bottom; `transform: rotate(-1.2deg)` tilts it.
3. Possible polish, not decided: the ruled lines are on `body`, but the page content scrolls
   inside `.main-content`, so the lines stay still while text scrolls past them. Moving the
   background onto `.main-content` (with `background-attachment: local`) would make them
   scroll with the page, like D2 intends.
4. Later: dark mode (needs designing first).
