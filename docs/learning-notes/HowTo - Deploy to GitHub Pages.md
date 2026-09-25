Deploy = make an app work available and live on the internet.
GitHub Pages offers this for free.
## 1. Build a production-ready app
The app created with `npm run dev` only works locally.
To make it work on the internet, everything (React components, JSX, ... ) must translated to the equivalent in plain HTML, CSS and JS.

To do this, run:
	`npm run build`
which creates the content of the 📁 `/dist` folder ← the folder to be uploaded to GitHub Pages!

## 2. Deploy to GitHub Pages

### 2.0 Push project to GitHub
Like any project, nothing new here.

Note: `.gitignore` is also created so it already ignores files and folder that should only live locally (e.g. the heavy `/node_modules`)

### 2.1 Tell Vite to which path to deploy
GitHub Pages serves the app as a site at `https://username.github.io/{repo-name}/`. 
This is where we want to deploy, so let's tell Vite to deploy to this path → open `vite.config.js` and edit as below:
```
import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    base: '/{repo-name}}/',      <-- ✍🏽 ADD THIS line (use actual repo name)!
    plugins: [react()],
  })
```

### 2.2 Install `gh-pages`
1. Install using npm: `npm install -D gh-pages`  ← 🤌🏼 NOT IDEA WHAT `-D` IS FOR ... (not in --help) 
2. Specify how to deploy = use Vite & gh-pages. Modify `packege.json` as below:
```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "deploy": "vite build && gh-pages -d dist" <-- ✍🏽 ADD THIS line
}
```

### 2.3 Deploy
Run: `npm run deploy`.
Might take a couple of mins for the app to be live, at:
`https://{MY_USERNAME}.github.io/{REPO_NAME}/`

To update: just run again `npm run deploy`

Important: no need to already have the `gh-pages` branch in the remote repo! Running `npm run deploy`  does it. Specifically it does:
1. Build the app
2. Create the `gh-pages` branch **automatically**
3. Push the built files to it

## 3. Push the source code
Deploying in this way only pushes to the `gh-pages` branch! Therefore the source code is not versioned in the remote repo. For this, commit and push the source code to `main`.

Important: only works if Pages set to Deploy from the correct branch! See [[HowTo - Deploy to GitHub Pages#2.0.0 Set up Pages te Deploy from branch `gh-pages`]]

