# Architecture: D3 Portfolio Single Repo Setup

**Date:** 2026-09-11  
**Goal:** Consolidate multiple D3 & React course modules into a single repository with navigation between visualizations.

---

## The Problem We Solved

Previously, each course module was deployed as a separate GitHub repository:
- `module1-intro-project` → separate repo, separate GitHub Pages site
- `pokemon-cards-app` → separate repo, separate GitHub Pages site
- Each repo had its own Vite config, package.json, build process

**Challenge:** Managing 10+ separate repos is messy. We wanted ONE repo with all modules accessible via navigation.

---

## The Solution: Single Vite App with Client-Side Routing

### Why This Approach?

We chose a **single Vite React app with React Router** because:

1. **Simple to learn** — Focuses on D3 & React, not complex build setups
2. **Easy to add modules** — Just create a new component file, add one route
3. **One deployment** — Single `npm run deploy` builds and deploys everything
4. **Consistent workflow** — Same Vite setup you're already using in the course
5. **Not over-engineered** — No micro-frontend or monorepo complexity needed

### Key Concept: Client-Side Routing

**What it means:** Navigation happens in the browser, not on a server.

- User clicks "Module 1" → React Router switches which component displays
- Page doesn't reload (smooth, fast)
- URL changes (e.g., `/module1`) but it's just JavaScript, not a server request
- Perfect for single-page applications (SPAs)

**Tools used:**
- **React Router** — handles routing (switching between components)
- **BrowserRouter** — wraps the app to enable routing

---

## Architecture Overview

### Folder Structure

```
d3-heart-react-homework/
├── index.html                    ← Single HTML entry point
├── package.json                  ← Lists all dependencies
├── vite.config.js                ← Vite build config (base path set here)
│
├── src/
│   ├── main.jsx                  ← Entry point (mounts React app)
│   ├── App.jsx                   ← Main router component (decides what to show)
│   ├── App.css                   ← Main layout styles (flex: sidebar + content)
│   ├── index.css                 ← Global styles
│   │
│   └── components/
│       ├── LandingPage.jsx        ← Intro page with course explanation
│       ├── Navigation.jsx         ← Left sidebar with module buttons
│       ├── Navigation.css         ← Sidebar styling
│       │
│       ├── module0b-pokemon-cards/  ← One folder per module
│       │   ├── Module0b_PokemonCards.jsx
│       │   ├── PokemonCard.jsx
│       │   └── PokemonCards.css
│       ├── module1-barplot/
│       │   └── Module1_Barplot.jsx
│       └── ...                      (add as you progress)
│
├── public/                        ← Static files (images, fonts, etc.)
└── node_modules/                  ← Downloaded packages (git ignored)
```

### Naming conventions

**One folder per module**, kebab-case, named after its content — `module1-barplot/`,
`module0b-pokemon-cards/`. There is no shared `plots/` folder: a module might be a single
chart or a small interactive app, and either way it gets its own folder at the same level.
Component files inside stay PascalCase, because the capital letter is the usual React signal
for "this file exports a component".

**Numbering:** `module0a`, `module0b`, … are the "Web Foundations" pre-modules (small web
apps, no D3 focus). `module1`–`module10` are the D3/React plotting modules.

*(Earlier versions of this doc put everything in `src/components/plots/`. That was changed
once the first non-chart module arrived.)*

### Component Hierarchy

```
main.jsx
  └── BrowserRouter (enables routing)
      └── App.jsx (main router)
          ├── Navigation.jsx (always visible, left sidebar)
          └── Routes (shows one component at a time)
              ├── LandingPage (path: "/")
              ├── Module0b_PokemonCards (path: "/module0b")
              ├── Module1_Barplot (path: "/module1")
              └── ...
```

---

## How It Works: Step-by-Step

### 1. User opens the app

Browser loads `index.html` → loads `main.jsx` → mounts React app

### 2. React Router initializes

`main.jsx` wraps `App` with `<BrowserRouter basename="/d3-heart-react-homework/">`:
- Basename tells router the base URL is `/d3-heart-react-homework/`
- This is needed because GitHub Pages serves the app in a subdirectory, not root

### 3. App.jsx renders the layout

```jsx
<div className="app-container">
  <Navigation />              {/* Always visible */}
  <main className="main-content">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/module1" element={<Module1_Barplot />} />
      {/* etc. */}
    </Routes>
  </main>
</div>
```

- `Navigation` stays on screen always (left sidebar)
- `Routes` shows ONE component based on current URL path
- Styling: flexbox layout with sidebar (250px) + content (flex: 1)

### 4. User clicks a nav button

Navigation component uses React Router's `<Link>` component:
```jsx
<Link to="/module1">Module 1 - Barplot</Link>
```

When clicked:
- URL changes to `.../module1`
- React Router finds matching route
- Component switches to `<Module1_Barplot />`
- Page doesn't reload (smooth UX)

---

## Key Files Explained

### `main.jsx` — Entry Point

```javascript
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/d3-heart-react-homework/">
    <App />
  </BrowserRouter>
)
```

**Why `basename`?**
- GitHub Pages serves your app at `https://username.github.io/repo-name/`
- Not at root (`https://username.github.io/`)
- Basename tells Router: "All my routes start after `/d3-heart-react-homework/`"

### `App.jsx` — Router Component

```javascript
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/module1" element={<Module1_Barplot />} />
          {/* Add more routes here as you add modules */}
        </Routes>
      </main>
    </div>
  )
}
```

**Key concept:** 
- `<Routes>` is a list of path → component mappings
- Only ONE matches at a time
- It displays that component, hides others

### `vite.config.js` — Build Configuration

```javascript
export default defineConfig({
  base: '/d3-heart-react-homework/',  // ← GitHub Pages path
  plugins: [react()],
})
```

**Why `base`?**
- Tells Vite: "Build everything assuming the app lives at this path"
- Assets (images, CSS) get correct URLs in production
- Must match your repo name

### `Navigation.jsx` — Sidebar Navigation

```javascript
import { Link } from "react-router-dom"

export default function Navigation() {
  const modules = [
    { id: "home", label: "🏠 Home", path: "/" },
    { id: "module1", label: "📊 Module 1", path: "/module1" },
    // Add more as you progress
  ]

  return (
    <nav className="navigation">
      {modules.map(module => (
        <Link to={module.path}>{module.label}</Link>
      ))}
    </nav>
  )
}
```

**Key concept:**
- `<Link>` is React Router's way to navigate (like `<a>` but handles routing)
- `to={module.path}` specifies the route path

### `Module1_Barplot.jsx` — Visualization Component

```javascript
import { useMemo } from "react"
import * as d3 from "d3"

export default function Module1_Barplot() {
  const data = [...]
  
  const xScale = useMemo(() => {
    // D3 scale logic
  }, [data, innerWidth])

  return (
    <svg>
      {/* Render visualization */}
    </svg>
  )
}
```

**Key points:**
- Each visualization is just a normal React component
- Can use D3 for data transformation (scales, etc.)
- Renders SVG or HTML
- Self-contained (has its own data, styling, logic)

---

## Deployment Process: How GitHub Pages Works

### What is `gh-pages` package?

`gh-pages` is an npm tool that automates pushing built files to the `gh-pages` branch:

```bash
npm run deploy
```

This command does:
1. `vite build` → builds your app into `/dist` folder
2. `gh-pages -d dist` → pushes `/dist` contents to `gh-pages` branch on GitHub

### GitHub Pages Flow

```
Local (your computer)
  └─ npm run deploy
     ├─ Builds app → /dist folder
     └─ Pushes to gh-pages branch on GitHub
        
GitHub
  └─ gh-pages branch
     └─ GitHub Pages detects it
        └─ Serves at https://username.github.io/repo-name/
```

### Why two branches?

- **`main` branch** — your source code (React, D3, etc.)
- **`gh-pages` branch** — built files only (HTML, CSS, JS from `/dist`)

This keeps your repo clean: source code in `main`, build output in `gh-pages`.

---

## How to Add a New Module

As you progress through the course, follow this pattern:

### 1. Create a new module folder + component

**File:** `src/components/module2-scales/Module2_Scales.jsx`

```javascript
import { useMemo } from "react"
import * as d3 from "d3"
import "./Scales.css"   // only if the module needs its own styles

export default function Module2_Scales() {
  // Your visualization code
  return (
    <div className="module-scales">   {/* scoping wrapper — see step 2 */}
      <svg>{/* content */}</svg>
    </div>
  )
}
```

### 2. If it needs styles: scope them

`src/index.css` owns the **site theme** — colours, fonts and spacing as CSS variables, plus
the dark-mode block. Use `var(--bg)`, `var(--text)` etc. rather than hardcoding colours, or
dark mode breaks.

A module's own stylesheet holds only what's specific to that module — and it must be
**scoped**, because CSS is global: a bare `body` or `h1` rule in one module's file leaks into
every other page of the site. Wrap the whole file in one uniquely-named class matching the
wrapper `<div>`, using native CSS nesting:

```css
.module-scales {
  max-width: 1200px;     /* the wrapper's own styling */

  h1 { ... }             /* → .module-scales h1, this module only */
  .axis-label { ... }    /* → .module-scales .axis-label */
}
```

One prefix on the outside protects everything inside, so short readable class names stay safe.
(Why this approach rather than one big global stylesheet, or CSS Modules — see
`Decision - CSS Strategy (theme-global + module-scoped).md`.)
Note that a class selector beats a bare tag selector, so `.module-scales h1` reliably overrides
the theme's global `h1` — but only for the properties it actually sets.

### 3. Add a route in App.jsx

```javascript
import Module2_Scales from "./components/module2-scales/Module2_Scales"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/module1" element={<Module1_Barplot />} />
      <Route path="/module2" element={<Module2_Scales />} />  {/* NEW */}
    </Routes>
  )
}
```

### 4. Add a nav button in Navigation.jsx

```javascript
const modules = [
  { id: "home", label: "🏠 Home", path: "/" },
  { id: "module1", label: "📊 Module 1", path: "/module1" },
  { id: "module2", label: "📈 Module 2", path: "/module2" },  {/* NEW */}
]
```

### 5. Deploy

```bash
npm run deploy
```

That's it! Your new module is now live.

---

## Key Concepts Summary

| Concept | Meaning | Why it matters |
|---------|---------|----------------|
| **Vite** | Build tool that bundles React code for browsers | Powers your dev server and production build |
| **React Router** | Library for client-side navigation | Switches components without page reloads |
| **BrowserRouter** | Wraps app to enable routing | Makes `<Route>` and `<Link>` work |
| **Client-side routing** | Navigation happens in browser, not server | Fast, smooth UX; no server requests needed |
| **SPA (Single Page App)** | One HTML file that loads different components | What your app is; efficient and interactive |
| **gh-pages branch** | Special GitHub branch for GitHub Pages | Stores built files that get served to users |
| `basename` in router | Base path for all routes | Needed because GitHub Pages serves in subdirectory |
| `base` in vite.config | Base path for asset URLs | Tells Vite where app will be deployed |

---

## Common Questions

### Q: Can modules share code/utilities?

**A:** Yes! Create a `src/utils/` folder for shared D3 helpers, data processing, etc.

Example:
```javascript
// src/utils/d3Helpers.js
export const createScales = (data, width, height) => { ... }

// src/components/module1-barplot/Module1_Barplot.jsx
import { createScales } from "../../utils/d3Helpers"
```

### Q: How do I update a deployed visualization?

**A:** 
1. Make changes locally
2. Run `npm run dev` to test
3. Run `npm run deploy` when ready
4. Takes 1-2 minutes to update on GitHub Pages

### Q: What if I want to reorganize the folder structure?

**A:** Just make sure:
- Import paths are correct (e.g., `"./components/module1-barplot/Module1_Barplot"`)
- Routes in `App.jsx` import from correct paths
- Run `npm run dev` to verify before deploying

Use `git mv` rather than dragging files in the file explorer — it tells git the file *moved*
rather than "deleted, plus a new unrelated one", so `git log --follow` keeps its history.
A wrong import path fails loudly at dev-server startup, so this is hard to get subtly wrong.

### Q: Can I add images/assets?

**A:** Put them in `public/` folder, then reference in code:
```javascript
<img src="/images/my-image.png" />
```

---

## Next Steps When Resuming

1. `cd c:\Users\giuli\Documents\GitHub\Personal\d3-heart-react-homework`
2. `npm install` (if starting fresh)
3. `npm run dev` (to test locally)
4. Create new module folder + component in `src/components/moduleN-name/`
5. Add route in `App.jsx` and nav button in `Navigation.jsx`
6. `npm run deploy` (when ready to go live)

---

## Resources

- [[HowTo - Bundling with Vite + npm (Node.js)]] — Vite basics
- [[HowTo - Deploy to GitHub Pages]] — Deployment details
- [React Router Docs](https://reactrouter.com/) — Official routing guide
- [D3 Docs](https://d3js.org/) — Data visualization library
