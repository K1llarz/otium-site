# Reverance by Otium

Marketing website for **Reverance**, a premium residential complex on Batumi's
Black Sea coast, developed by Otium Development.

Built with React 19 + Vite 8, Tailwind CSS v4 (CSS-first config), React Router v7
(SPA mode), Motion, and react-i18next for trilingual content.

## Stack

| Concern        | Tool                                    |
| -------------- | --------------------------------------- |
| Framework      | React 19.2 + TypeScript 5.9 (strict)    |
| Build          | Vite 8                                  |
| Styling        | Tailwind CSS v4 via `@tailwindcss/vite` |
| Routing        | `react-router` v7 (SPA, no `-dom`)      |
| Animation      | `motion` (`motion/react`)               |
| i18n           | `i18next` + `react-i18next` + detector  |
| Icons          | `lucide-react`                          |

> Tailwind v4 has **no** `tailwind.config.js` and **no** `postcss.config.js`.
> All configuration lives in `src/index.css` inside `@theme` and `@utility`.

## Languages

Three locales served under a URL prefix: `/ka` (default), `/en`, `/ru`.
Visiting `/` redirects to `/ka`. The selection persists to `localStorage`
and `<html lang>` is updated on every locale change. An unknown locale or
unknown path renders the 404 page.

## Routes

| Path                            | Page              |
| ------------------------------- | ----------------- |
| `/`                             | → redirect `/ka`  |
| `/:locale`                      | Home (long-scroll)|
| `/:locale/apartments`           | Residences list   |
| `/:locale/apartments/:slug`     | Residence detail  |
| `/:locale/investment`           | Investment + ROI  |
| `/:locale/gallery`              | Gallery + lightbox|
| `*`                             | 404               |

## Getting started

```bash
cd reverance
npm install
npm run dev
```

Then open the dev URL printed in the terminal (default http://localhost:5173).

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) + production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
├── main.tsx                # StrictMode + RouterProvider
├── App.tsx                 # route definitions
├── index.css               # Tailwind v4 @import + @theme + @utility
├── i18n/                   # i18next config + ka/en/ru locale JSON
├── routes/                 # page-level route components
├── components/
│   ├── layout/             # header, footer, language switcher, mobile menu
│   ├── sections/           # home page sections
│   └── ui/                 # button, section header, lightbox
├── data/                   # apartment + gallery + location mock data
├── hooks/                  # useLocale + localePath helpers
└── lib/                    # cn() = clsx + tailwind-merge
```

## TODO (not in scope of this build)

- Replace `.ph-image` placeholder divs with real photography in `public/images/`.
- Wire up the contact form to Formspree / EmailJS / a backend (see the TODO in
  `src/components/sections/contact.tsx`). It currently POSTs to `/api/contact`
  and logs the payload to the console.
- Embed a Google Map in the Location section.
- Native-speaker review of the Georgian and Russian translations.
