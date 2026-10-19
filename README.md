# Tabaqat

An interactive web app for exploring the lineage and family of the Prophet Muhammad ﷺ, with plans to include the sahaba and tabiʿeen and the relationships between them.

<!-- Opening description is a draft to refine together. -->

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

Planning and initial setup. The application has not been scaffolded yet.
