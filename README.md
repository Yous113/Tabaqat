# Tabaqat

An interactive web app for exploring the lineage and family of the Prophet Muhammad ﷺ, with plans to include the sahaba and tabiʿeen and the relationships between them.

The goal is to help us get to know the Prophet ﷺ and the early generations of Muslims, including the sahaba, tabiʿeen, and caliphs. By showing their lineage in an interactive tree, Tabaqat aims to make their family connections easier to understand. Biographies, quotations, and source references will offer a closer look at their lives.

The tree follows father-to-child connections. Mothers, spouses, and other relationships will be described in profiles rather than drawn as extra connections.

## Current features

- The existing lineage from ʿAdnān to the Prophet Muhammad ﷺ, arranged vertically.
- Person cards showing names, honorifics, and aliases where provided.
- A starting view focused on the Prophet ﷺ, with panning and zoom controls.
- Reset view to return to the starting focus, and Fit all to see the whole tree.

## Planned features

- A zoomable graph of people and their relationships.
- Clickable names that open biographies, quotations, and source references.
- Role badges and a legend to help visitors explore the graph.
- Search by name and alternative spellings.
- A layout that works on desktop and mobile.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React | Build the interactive interface and person profiles. |
| TypeScript | Define types for people, relationships, and historical content. |
| Vite | Run the development server and build the app for deployment. |
| React Flow (`@xyflow/react`) | Render the graph and support panning, zooming, and person selection. |
| Dagre (`@dagrejs/dagre`) | Automatically position nodes in the initial lineage and family views. |
| Tailwind CSS | Style the interface, graph nodes, and role badges. |
| JSON | Store people, relationships, biographies, quotations, and source references. |

The first version will use static content files. A backend or content management system can be introduced later if the editing workflow requires it.

Vercel or Netlify is planned for hosting; a provider has not yet been selected.

## Content approach

People have stable, unique IDs. Relationships are stored separately from biographies and quotations so that the same person can appear in different graph views.

Quotations will include source references, with edition, volume, page, and translation details where applicable. Personal commentary will be distinguished from quoted material.

## Project status

The first interactive lineage tree is implemented with React Flow and Dagre. Person profiles and additional historical content are planned next.

## Local development

Install Node.js 22.12 or newer and npm to run both Vite and Vitest. Setup was verified with Node 26.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Changes to the source files appear automatically while the development server is running. Press `Ctrl+C` in the terminal to stop it.

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
