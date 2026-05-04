# Portfolio Gazette — Issue 01

A high-end, editorial-style personal portfolio designed as a digital newspaper ("Gazette"). This project escapes the typical "SaaS sameness" of modern web design by presenting a developer's career through rigorous layout grids, vintage typography, and abstract plates.

## 📰 Concept & Design
The site is built around the concept of a printed publication, blending physical constraints (halftone imagery, ink borders, classified ads) with digital interactivity (magnetic cursors, scroll reveals, modal overlays).

- **Theme**: Retro / Editorial Newspaper
- **Focus**: Full Stack Engineering, Machine Learning, and Generative AI
- **Vibe**: Rigorous logic meets hand-crafted layout

## ✨ Key Features
- **Editorial Layout**: Sections are designed as "Pages" (Cover, Feature Article, Lead Reports, Classified Advertisements, Archive Ledger).
- **Custom Design System**: Pure CSS architecture utilizing CSS Variables for consistent theming (`--paper`, `--ink`, `--red`).
- **Micro-Interactions**: 
  - Magnetic cursor that expands on actionable items (`.mag-target`).
  - Subtle noise/grain and vignette overlays for a textured "printed" feel.
  - Intersection Observer-based scroll reveals (`.reveal-up`).
- **Dynamic Content Modal**: Project case studies open in a beautifully structured `<dialog>` element, injecting data dynamically via JavaScript.
- **Hidden Features**: Includes a secret Konami code interaction.

## 🛠 Tech Stack
Built entirely without heavy frontend frameworks to maintain absolute control over the DOM, layout, and performance.
- **HTML5**: Semantic tags, accessible landmarks, structured `.sheet` grids.
- **CSS3**: Custom properties, Grid layouts, `mix-blend-mode` effects, and complex halftone filters.
- **Vanilla JavaScript**: DOM manipulation, Intersection Observers, and cursor tracking.

## 📂 Architecture
- `index.html`: The complete single-page publication structure.
- `styles.css`: The styling engine, maintaining the strict typographic rhythm and color palette.
- `main.js`: Interaction logic, scroll progress tracking, and dynamic dialog rendering.

## 🚀 Running Locally
Because it's a static site, you can run it simply by opening `index.html` in your browser, or by using any local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js / npx
npx serve .
```

## 📜 Credits
Designed and Engineered by **Sumit Dubey**. 
Edition 01 · Printed on the open web.
