# Sarthak Madan — Developer Portfolio

A personal portfolio built to present my work, technical interests, and open-source contributions in one place. The site brings together a project showcase, an overview of my skills, GitHub activity, and ways to get in touch.

**Live portfolio:** [sarthakmadan.dev](https://sarthakmadan.dev)

**GitHub:** [Sarthak-madan334](https://github.com/Sarthak-madan334)

## Overview

This portfolio is built with Next.js and TypeScript. It is designed to work across screen sizes, support both light and dark themes, and keep motion and visual effects considerate of reduced-motion preferences.

The content reflects my current focus as a computer science student: learning core engineering foundations while building and sharing useful software.

## What’s included

- **Introduction and résumé** — a concise overview with links to my résumé and professional profiles.
- **About and activity** — background, current focus, portfolio statistics, and a contribution heatmap for the recent five-month period.
- **Technical stack** — technologies and concepts grouped by area, from frontend and backend development to databases and core computer science.
- **Selected projects** — details, technology choices, and repository or live links for projects including Grillr, MigrationY, and DEADLOCK.
- **Open-source work** — selected contributions and links to the related repositories and pull requests.
- **Achievements and contact** — additional highlights and direct ways to reach me.
- **Bloop** — an optional, portfolio-focused chat assistant for questions about my background, work, skills, and contact details.
- **Responsive interactions** — navigation, animations, and visual effects that adapt to the viewport and respect reduced-motion settings.

## Technology

- [Next.js](https://nextjs.org/) with the App Router
- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for interface animation
- [Lucide React](https://lucide.dev/) for icons
- [Groq API](https://console.groq.com/) for Bloop’s responses

## Configuration

The portfolio pages and public GitHub activity do not require a secret key. Bloop requires `GROQ_API_KEY` to generate answers. Set this variable through the hosting provider’s environment-variable settings, and keep the key private. `.env.example` documents the variable name.

## GitHub data

The GitHub activity card is populated by server-side routes in `app/api/`:

- `/api/github-contributions` reads the public contribution calendar and returns the recent five-month date range for the heatmap.
- `/api/github-stats` retrieves public repository and pull-request information used for the supporting statistics.

These routes use the portfolio’s configured GitHub username. The contribution calendar is based on activity GitHub makes visible publicly; it is not a private or account-authenticated feed. GitHub attribution rules apply to which commits appear in the calendar.

## Project layout

```text
app/
  api/                      Server routes for GitHub data and Bloop
  privacy/                  Privacy information
  globals.css               Global styles and theme foundations
  layout.tsx                Root layout and metadata
  page.tsx                  Portfolio page composition
components/                 Page sections and interactive UI
lib/
  data.ts                   Portfolio links, projects, and stack data
  github-stats.ts            GitHub statistics types and helpers
public/                      Static assets, including the résumé
```

## Deployment

The project is a standard Next.js application and can be deployed to a Next.js-compatible host. Install dependencies and run the production build as part of deployment. Configure `GROQ_API_KEY` in the host environment if the chat assistant should be available; the rest of the portfolio can run without it.

## Contact

- **GitHub:** [github.com/Sarthak-madan334](https://github.com/Sarthak-madan334)
- **LinkedIn:** [Sarthak Madan](https://www.linkedin.com/in/sarthak-madan-5b002235b/)
- **Email:** [sarthakmadan88@gmail.com](mailto:sarthakmadan88@gmail.com)
