# Bad Mergentheim Demo Hub

Data-driven Next.js demo hub for local outreach. It contains five neutral landing-page families and twelve non-indexed prospect routes.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Routes

- `/` — neutral hub information page; no prospect directory.
- `/demo/[slug]` — static prospect demo selected from `src/data/leads.ts`.
- `/control/bm-ops-7f3k9x` — unlisted control board with QR codes and browser-local status tracking.

All routes are blocked through `robots.txt`; each demo additionally emits `noindex, nofollow` metadata and a visible unofficial-concept notice.

## Adding a lead

1. Complete `docs/lead-brief-template.txt` using verified facts only.
2. Add one `LeadProfile` object to `src/data/leads.ts`.
3. Use a slug ending in six random lowercase alphanumeric characters.
4. Leave optional arrays absent when information is not verified.
5. Run tests, lint and build before deployment.

The approved reusable prompts are in `docs/agent-prompts.md`. Operational guidance is in `docs/week-playbook.md`.

## Content safety

- Do not reuse source-client photography or brand assets.
- Do not invent services, prices, reviews, awards, statistics or certifications.
- Booking/contact controls remain non-submitting until a client approves an implementation.
- A source URL is mandatory for every lead.
