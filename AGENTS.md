# AGENTS.md

## Project goal
Campus Pay Split is a HackIndia hackathon project for college students in India.
The demo flow is: create a group, add members, add a shared expense in rupees, and show who should pay whom.
Prioritise a working demo over extra features.

## Stack
- Next.js app using the app directory.
- TypeScript for application code.
- Prisma is planned but not installed yet. Do not add it unless asked.
- UI components live in `components/`.
- Shared helpers live in `lib/`.

## Commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build for submission: `npm run build`
- Lint: `npm run lint`
- Run tests: `npm test` (Vitest). Do not claim tests passed without running it.

## Code conventions
- Use TypeScript types for props and data returned from helpers.
- Keep React components small and readable.
- Put expense calculation logic in `lib/settlement.ts`, not inside page components.
- Keep money amounts as integer paise internally (₹900 = 90000).
- Convert to rupees only at the UI boundary, using `formatRupees` from `lib/format.ts` (`₹500`, never `$500`).
- Tests live next to the file they test, as `*.test.ts`.
- Prefer clear variable names like `payerId`, `splitAmount`, and `settlements`.
- Keep UI text simple for Indian college users.
- Do not add paid services or external APIs unless asked.

## Git workflow
- Check git status before changing files.
- Keep changes focused on the requested task.
- Do not edit generated files unless the task requires it.
- For multi-file changes, propose a plan first.

## Before committing
- Run `npm test`, `npm run lint`, and `npm run build`.
- Check `git diff --staged` and stage files by name, not `git add .`.
- Mention any untested area in the commit message or PR notes.

## Environment
- Environment variables are expected in `.env.local`.
- Never read, print, or commit real secrets.
- Use placeholder names when documentation needs to mention env vars.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
