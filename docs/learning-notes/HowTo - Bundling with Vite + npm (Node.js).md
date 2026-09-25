Bundle = transform code so that the browser can run it. Reason: we can write React components using JSX (human readable), but the browser cannot read JSX -> bundling makes all these files browser-readable

See other [[Concepts]] .

## 1. Install Node.js
To do only once: 
* Head to [nodejs.org](https://nodejs.org) and download the **LTS** version (Long Term Support — the stable one). Install it like any other app.
* Verify installation: 
```
node --version
npm --version
```
If If both commands print a version number = all good.

Try: run JS in the Terminal.
* type `node` : opens a `node` session
* run `1+1` JS will return `2`

## 2. Create a "starter" App
Use Vite to create a default simple React app:
* In Terminal, run:
	`npm create vite@latest`
* Answer the following questions to Vite (intreactive screen)
	* **Project name** : chose whatever (e.g., `my-first-app`)
	* **Framework** : select `React`
	* **Variant** : select `JavaScript` (but 👉`TypeScript` will be used later in the course!)

🤿 Note: running `npm create vite@latest` already installs packages, and starts and serves the app in `localhost:5173` ... 

## 3. Run app locally in dev mode
Run on local server in dev mode.
In the Terminal:
* Change dir to the app folder: `cd my-first-app`
* Install packages (👉 the ones listed in `/package.json` as dependencies): 
	`npm install` 
		🚨Whenever you clone a project from GitHub, the first thing to do is run `npm install` to download all its dependencies!
* Initiate/start/kick off the dev mode: 
	`npm run dev` <- ( _not_ production-ready! For that, run : `npm run build` instead, see [[HowTo - Deploy to GitHub Pages]] )

 See: hot reload works automatically (page updated at each save).

---

## Folder structure
Should look something like this:
```
my-first-app/
├── index.html          ← the single HTML page
├── package.json        ← your project's config (list of deps packages!)
|── package-lock.js     ← pins every single deps and sub-deps to an exact version 
├── vite.config.js      ← Vite's config
├── node_modules/       ← downloaded libraries (don't touch, don't commit!)
├── public/             ← static files (images, fonts)
└── src/
    ├── App.jsx         ← your root component ← start here!
    ├── App.css         ← styles for App
    ├── main.jsx        ← entry point (mounts App into the DOM)
    └── index.css       ← global styles
```