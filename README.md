# Samuel Reka — Portfolio

Personal portfolio built with React + Framer Motion.
Live at: https://smdayone.github.io

## Stack
- React 18
- Framer Motion 11 (animations)
- gh-pages (GitHub Pages deploy)

## Customization
**All content is in `src/data.js`** — edit this file to update:
- Personal info, links, photo path
- Theme colors (`colors` object)
- Skills and proficiency levels
- Projects (add/remove/edit)
- Work experience and education
- All translations (EN / IT / ES)

## Setup

```bash
npm install
npm start          # dev server at localhost:3000
```

## Add your photo

Place your photo at: `public/profile.jpg`

## Deploy to GitHub Pages

```bash
# First time — set remote
git remote add origin https://github.com/smdayone/smdayone.github.io.git

# Deploy
npm run deploy
```

This builds and pushes to the `gh-pages` branch automatically.

## Adding a new project

In `src/data.js`, add to the `projects` array:

```js
{
  id: "my-new-project",
  name: "Project Name",
  tagline: { en: "...", it: "...", es: "..." },
  description: { en: "...", it: "...", es: "..." },
  tags: ["Tag1", "Tag2"],
  stats: [
    { value: "10K", label: "Views" },
  ],
  color: "#ff6b35",   // accent color for the card
  bg: "#0A0A0A",      // card background (used for dark cards)
  link: "https://...", // or null if no link
},
```

## Adding a new experience

In `src/data.js`, add to the `experience` array:

```js
{
  role: { en: "Job Title", it: "Titolo", es: "Título" },
  company: "Company Name",
  period: "Jan 2026 — Present",
  description: { en: "...", it: "...", es: "..." },
  current: true,   // shows green "Now" badge
},
```

## Changing colors

In `src/data.js`, edit the `colors` object:

```js
export const colors = {
  accent: "#111111",      // primary dark
  highlight: "#ff6b35",   // orange accent — change this for a different vibe
};
```

Or change CSS variables directly in `src/index.css` under `:root`.
