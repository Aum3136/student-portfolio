# Student Portfolio — React + Vite + React Router

Built for **Advanced Web Development Frameworks (ITUE301)**.

## Practical 1 — Component Architecture
Reusable, prop-driven components: Header, About, Skills, Projects, Footer, NavBar.

## Practical 2 — Routing & State Management
- Added **React Router v6** with client-side routes: `/` (Home), `/projects`, `/contact`, plus a catch-all `*` 404 route.
- `NavBar` uses `<Link>` (not `<a>`) so navigating between routes never triggers a full page reload.
- Two meaningful `useState` variables:
  - `message` in `Contact.jsx` — a controlled textarea with a live character count.
  - `showHelp` in `Contact.jsx` — toggles a help tooltip's visibility.
- Supplementary tasks completed:
  - Custom 404 page (`NotFound.jsx`) for undefined paths.
  - Dark/light theme toggle (`theme` state in `App.jsx`) applying a `theme-light` class to the root element.

## Component / Route Tree
```
App.jsx (wrapped in <BrowserRouter> from main.jsx)
 ├── NavBar.jsx           (Link-based nav, highlights active route, theme toggle)
 ├── Route "/"        → pages/Home.jsx      → Header, About, Skills
 ├── Route "/projects"→ pages/ProjectsPage.jsx → Projects
 ├── Route "/contact" → pages/Contact.jsx    (controlled input, useState)
 ├── Route "*"        → pages/NotFound.jsx
 └── Footer.jsx
```

## Run it
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Customize
Edit the data arrays inside `src/pages/Home.jsx` and `src/pages/ProjectsPage.jsx`, and the props passed to `Header`/`Footer` in those files and `App.jsx`.
