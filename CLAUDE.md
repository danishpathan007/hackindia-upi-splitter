# CLAUDE.md

## Project goal
Campus Pay Split is a HackIndia hackathon project for college students in India.
The demo flow is: create a group, add members, add a shared expense in rupees, and show who should pay whom.
Prioritise a working demo over extra features.

## Stack
- Next.js app using the app directory.
- TypeScript for application code.
- Prisma for database models and queries.
- UI components live in `components/`.
- Shared helpers live in `lib/`.

## Commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build for submission: `npm run build`
- Lint: `npm run lint`
- There is no test script yet. Do not claim tests passed unless a test command is added.

## Code conventions
- Use TypeScript types for props and data returned from helpers.
- Keep React components small and readable.
- Put expense calculation logic in `lib/settlement.ts`, not inside page components.
- Use rupees for displayed amounts. Format as `₹500`, not `$500`.
- Prefer clear variable names like `payerId`, `splitAmount`, and `settlements`.

## Git workflow
- Check git status before changing files.
- Keep changes focused on the requested task.
- Do not edit generated files unless the task requires it.

## Environment
- Environment variables are expected in `.env.local`.
- Never read, print, or commit real secrets.
- Use placeholder names when documentation needs to mention env vars.
