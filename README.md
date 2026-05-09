# Portfolio Gazette - Issue 01

A high-end, editorial-style personal portfolio designed as a digital newspaper ("Gazette"). The experience has been migrated from vanilla HTML/CSS/JS to a production-ready Next.js App Router architecture while preserving the original editorial identity.

## Concept & Design

The site is built around the concept of a printed publication, blending physical constraints like halftone imagery, ink borders, and classified ads with restrained digital interactivity.

- **Theme**: Retro / Editorial Newspaper
- **Focus**: Full Stack Engineering, Machine Learning, and Generative AI
- **Vibe**: Rigorous logic meets hand-crafted layout

## Key Features

- **Single-page editorial narrative**: Cover, Feature, Projects, Skills, Focus, Archive, and Contact remain in one smooth scroll.
- **Next.js App Router**: Static homepage plus prepared `/projects/[slug]` and `/blog/[slug]` architecture.
- **Preserved global design system**: CSS variables maintain paper, ink, crimson, borders, grain, and typography rhythm.
- **Framer Motion restraint**: Loader, reveal animations, cursor smoothing, and headline micro-animation only.
- **Evening Edition**: ThemeContext with localStorage persistence and CSS-variable dark mode.
- **SEO ready**: Metadata API, Open Graph, Twitter cards, canonical URL, and JSON-LD Person/Website/Project data.
- **Secure contact form**: Web3Forms is handled through a Next.js Server Action with the API key kept in environment variables.

## Tech Stack

- **Next.js App Router**
- **React**
- **Framer Motion**
- **next/image**
- **next/font**
- **Server Actions**
- **Vercel Analytics**

## Architecture

- `app/`: App Router pages, metadata, project routes, blog placeholders, and server actions.
- `components/sections/`: Editorial page sections.
- `components/ui/`: Reusable interaction and layout primitives.
- `context/`: Theme persistence.
- `data/`: Profile, project, and planned blog data.
- `public/`: Migrated visual assets.
- `styles/globals.css`: Preserved editorial design system.

## Running Locally

```bash
npm install
npm run dev
```

For production verification:

```bash
npm run lint
npm run build
npm run start
```

## Contact Form

Create a local environment file with the server-side Web3Forms key:

```bash
WEB3FORMS_ACCESS_KEY=your-key
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Credits

Designed and Engineered by **Sumit Dubey**.
Edition 01 - Printed on the open web.
