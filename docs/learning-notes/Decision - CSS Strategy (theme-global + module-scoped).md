# Decision: CSS strategy — theme-global + module-scoped

**Date:** 2026-09-25
**Came up while:** migrating the pokemon-cards-app into this repo as `module0b`.

---

## The problem that forced the decision

Each course module used to be its own standalone app, with its own `App.css` that styled
*everything* — `body`, `h1`, `h2`, the lot. That's fine when the app is alone on a page.

Once several modules live in one site, it breaks, because **CSS is global**. Unlike a
JavaScript `import`, which only brings a thing into the file that asked for it, an
`import "./Something.css"` dumps those rules into one big stylesheet for the whole site.
Every rule then applies to every page, no matter which component imported it.

The pokemon app's stylesheet had three concrete collisions with this repo:

| Old rule | What it broke |
|---|---|
| `.app-container { max-width: 1200px }` | This repo already uses `.app-container` for the sidebar+content flex layout. Same name, different meaning. |
| `body { padding: 30px; background: #f4f5f7 }` | Applied to every page, including ones with a completely different design. |
| bare `h1` / `h2` / `h3` rules | Recoloured and recentred headings site-wide. |

So the question was: what's the rule for where styles live?

---

## Options considered

**1. One global stylesheet for the whole site.**
Everything in `index.css`, no per-module files.

The risk is *not* file size — a stylesheet has to get into the hundreds of KB before a
browser cares. The real costs are:
- **Collisions.** There's exactly one `.card` in the universe. When a later module wants a
  different-looking card, you end up with `.card-2`, which is how stylesheets rot.
- **Fear of editing.** Six modules in, you want to nudge `h2`. You can't tell which pages
  use it without checking all of them, so you either don't touch it or you break something
  and don't notice. Every edit becomes a site-wide edit.

**2. A separate stylesheet per module, with every class name hand-prefixed.**
`.pokemon-card`, `.pokemon-type-badge`, `.pokemon-grid`… Safe, but tedious, and you have to
keep remembering to do it — one forgotten prefix and you're back to option 1's problems.

**3. CSS Modules / styled-components.**
Tooling that does the scoping automatically. This is what bigger React projects use, and
it's the "proper" answer. Rejected *for now* on the grounds that it's another layer of build
magic to learn on top of everything else — worth revisiting later, not while the point is to
understand what CSS is actually doing.

---

## What we chose

> **Global for the things that *should* be consistent. Local for the things specific to one module.**

- `src/index.css` owns the **theme**: colours, fonts, spacing, dark mode. This stuff *should*
  apply everywhere — that's what makes a portfolio look like one site rather than eight.
- Each module's stylesheet holds only its own oddities (the pokemon type colours, the card grid).

And the trick that makes option 2 painless: **wrap the module in one uniquely-named container
and nest everything under it**, using native CSS nesting.

```css
.pokemon-cards {
  max-width: 1200px;      /* the wrapper's own styling */

  h1 { ... }              /* → .pokemon-cards h1  */
  .type-badge { ... }     /* → .pokemon-cards .type-badge */
}
```

One prefix, on the outside, protects everything inside. Short readable class names, no
collision risk, one edit instead of twenty. This is essentially the manual version of what
option 3 automates — which makes it a decent stepping stone *to* option 3 later.

---

## Two mechanics worth remembering

**Specificity.** When two rules set the same property on the same element, the more specific
selector wins — regardless of which file came first.

- `h1` → one tag = weak
- `.pokemon-cards h1` → one class + one tag = stronger

That's why a module can override the global theme locally without either one knowing about
the other. **But it only applies per property**: `.pokemon-cards h1` doesn't set `font-size`,
so the theme's global `h1 { font-size: 56px }` still comes through. Properties nobody
overrides just inherit from the theme. (This caught us out immediately — the pokemon `h1`
rendered huge.)

**`rem` units are relative to the root font size.** The theme sets root to `18px`
(`index.css`), where the standalone app had the browser default of `16px`. So the pokemon
`h3 { font-size: 1.25rem }` renders at 22.5px here instead of 20px. Same CSS, bigger result.
That's `rem` working as intended — it's the mechanism that makes the whole site scale
together — but it means copied-in styles won't look identical to their old home.

---

## Consequences / follow-ups

- Use `var(--bg)`, `var(--text)`, `var(--shadow)` instead of hardcoded colours, or dark mode
  silently breaks. The pokemon cards still hardcode `background: white` — outstanding.
- New modules: see the "How to Add a New Module" section in
  `Architecture - D3 Portfolio Single Repo Setup.md`, step 2.
- Revisit CSS Modules if the number of modules gets large enough that the manual wrapper
  starts feeling like busywork.
