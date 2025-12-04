# GRIDWATCH - Project Instructions

## Project Overview
Gridwatch is a modern, responsive energy monitoring dashboard built with React 19, Vite 6 and Tailwind CSS. It shows real-time and historical energy consumption data using Highcharts visualizations and is designed as a demo-ready project with accessibility and performance optimizations.

## Tech Stack
- **Frontend:** React 19
- **Build:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Charts:** Highcharts 12.x
- **Routing:** React Router (HashRouter used for GitHub Pages)
- **Icons:** Heroicons

## Quick Start

Prerequisites: Node.js 18+ and `npm`.

```bash
# Install dependencies
npm install

# Start development server (HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server normally runs at `http://localhost:3000`. The preview server runs on `http://localhost:4173` by default.

## Project Structure (important files)

```
src/
├── components/
│   ├── charts/          # Highcharts components and ChartTheme
│   ├── dashboard/       # Dashboard-specific UI
│   ├── layout/          # Header, Sidebar, Layout
│   └── ui/              # Small UI primitives (Button, Card, Select)
├── context/             # Theme context
├── hooks/               # Custom hooks (useEnergyData)
├── pages/               # Route pages (Dashboard, Devices, History)
├── services/            # mockData and business logic
├── styles/              # globals.css
└── utils/               # constants and formatters
```

## Highcharts / ChartTheme
- Charts use `highcharts` + the official React wrapper `@highcharts/react`.
- A global `ChartTheme.js` applies colors, fonts and the Highcharts accessibility module.
- To reduce bundle size consider lazy-loading chart components or moving `ChartTheme.js` into per-chart lazy imports.

### STRICT PACKAGE RULE (READ CAREFULLY)

- **ALWAYS** use the official React integration package `@highcharts/react` (the v4+ integration maintained by Highcharts).
- **NEVER** fall back to or install the legacy package named `highcharts-react-official` under any circumstances.
- If a dependency or example suggests `highcharts-react-official`, replace it with `@highcharts/react` and update imports accordingly.
- When updating dependencies or scaffolded examples, confirm `@highcharts/react` is present in `package.json` and referenced in code imports.

This rule ensures we keep the modern component-based API, prevent subtle API drift, and avoid maintenance/deprecation issues.

- When importing in components, use the named export (example):

```javascript
import { Chart as HighchartsChart } from '@highcharts/react';
import Highcharts from 'highcharts';
```

This rule is mandatory to avoid build-time import errors and runtime adapter issues; the project has been standardized around the `@highcharts/react` v4 API.

## Routing & GitHub Pages
- The app uses `HashRouter` so it can be hosted under a subpath (GitHub Pages).
- Vite is configured with `base: './'` to ensure relative asset loading for Pages.

## Accessibility
- Project follows WCAG 2.1 AA patterns for keyboard navigation and focus indicators.
- The Highcharts accessibility module is enabled; charts expose keyboard navigation and screen-reader-friendly descriptions.

## Important Config Notes
- `vite.config.js` includes `resolve.dedupe: ['react','react-dom']` to avoid duplicate React instances.
- If using Highcharts, import modules (solid-gauge, streamgraph, dependency-wheel, accessibility) where needed.
- Avoid `title: null` in Highcharts options — prefer `title: { text: undefined }` to avoid runtime adapter errors.

## Deployment (GitHub Pages)

- A GitHub Actions workflow is included at `.github/workflows/deploy.yml` that builds and deploys to GitHub Pages.
- Ensure the repository is public and the `gh-pages`/Pages settings are configured to use GitHub Actions as source (the workflow will publish to `https://<your-org>.github.io/<repo>/`).

Quick push steps:

```bash
git add .
git commit -m "Deploy: update"
git push origin main
```

After pushing, check the Actions tab in GitHub to monitor the build & deployment.

## Local Production Testing

```bash
npm run build
npm run preview
# Open http://localhost:4173 to inspect the production bundle
```

## Troubleshooting
- Build fails: check Node version and that `npm install` completed successfully.
- Highcharts import/runtime errors: ensure you import the `Chart` named export from `@highcharts/react` and initialize required modules before rendering.
- EBUSY / cache errors on Windows: close interfering apps (Dropbox sync), clear Vite cache (`node_modules/.vite` or `.vite` caches) and retry.

## Next Steps / Recommendations
- Consider splitting `ChartTheme.js` into smaller, chart-specific modules to reduce the initial bundle.
- Add a small script or README section that describes how to run Lighthouse accessibility audits and where to find Action logs.

---

**Location**: place this file under `.github/instructions/Gridwatch.instructions.md`
