# Tabaqat

An interactive web app for exploring the lineage and family of the Prophet Muhammad ﷺ, with plans to include the sahaba and tabiʿeen and the relationships between them.

The goal is to help us get to know the Prophet ﷺ and the early generations of Muslims, including the sahaba, tabiʿeen, and caliphs. By showing their lineage in an interactive tree, Tabaqat aims to make their family connections easier to understand. Biographies, quotations, and source references will offer a closer look at their lives.

The tree follows father-to-child connections. Mothers, spouses, and other relationships will be described in profiles rather than drawn as extra connections.

## Current features

- An **Islamic history** landing page with Rashidun, Umayyad, and Abbasid period cards.
- Separate family lineage trees, including ancestor context and the relevant family branches.
- Caliph badges identifying office independently of family membership, with sourced reign details.
- Touch-friendly panning, pinch zoom, Reset view and Fit all controls.
- Person details presented as a phone bottom sheet or a tablet side panel.
- Direct period links, browser Back navigation, and a visible way home.

## Planned features

- Biographies and quotations with source references.
- Search by name and alternative spellings.
- Additional periods after their historical content has been reviewed.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React | Build the interactive interface and person profiles. |
| TypeScript | Define types for people, relationships, and historical content. |
| Vite | Run the development server and build the app for deployment. |
| React Flow (`@xyflow/react`) | Render the graph and support panning, zooming, and person selection. |
| Dagre (`@dagrejs/dagre`) | Automatically position nodes in the initial lineage and family views. |
| Tailwind CSS | Style the interface, graph nodes, and role badges. |
| JSON and TypeScript data files | Store the canonical lineage and sourced period/office metadata. |

The first version will use static content files. A backend or content management system can be introduced later if the editing workflow requires it.

Vercel or Netlify is planned for hosting; a provider has not yet been selected.

## Content approach

People have stable, unique IDs. Relationships are stored separately from biographies and quotations so that the same person can appear in different graph views.

Quotations will include source references, with edition, volume, page, and translation details where applicable. Personal commentary will be distinguished from quoted material.

## Project status

The period lineage explorer uses React Flow and Dagre. Historical additions and source limitations are documented in [the caliph data proposal](docs/research/caliph-data-proposal.md).

## Local development

Install Node.js 22.12 or newer and npm to run both Vite and Vitest. Setup was verified with Node 26.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Changes to the source files appear automatically while the development server is running. Press `Ctrl+C` in the terminal to stop it.

### Direct links and production hosting

The period chooser lives at `/`. The period trees have stable paths:

- `/periods/rashidun`
- `/periods/umayyad`
- `/periods/abbasid`

Vite's development server handles direct requests to these paths. Production hosting must serve the built `index.html` for application routes when no static file matches, while continuing to serve real assets normally. Without this SPA fallback, refreshing or sharing a period URL can return the host's 404 page. A hosting provider has not been selected; configure and verify its fallback before deployment. In-app Back navigation and unknown-route recovery are handled by the application.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Check TypeScript and generate the production app in `dist/`. |
| `npm run lint` | Check the code with Oxlint. |
| `npm test` | Run the automated tests once with Vitest. |
| `npm run preview` | Preview the production build locally after building. |

### Project structure

```text
src/
  App.tsx       Main app component; the starting point for the interface.
  index.css     Global styles and Tailwind and React Flow stylesheet imports.
  main.tsx      Mounts the React app into the page.
tests/          Automated tests, mirroring the relevant src/ subdirectories.
index.html      HTML entry point and page metadata.
vite.config.ts  Vite plugins for React and Tailwind CSS.
```
