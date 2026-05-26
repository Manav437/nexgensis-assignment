# Book Management

Simple Book Management SPA built with React, TypeScript and Vite. It demonstrates basic CRUD
operations against a remote API (MockAPI), client-side filtering and search, and a modal form
for create/update operations.

![Assignment-Image](/nexgensis-mockup.jpg)

Live demo: https://nexgensis-assignment-beta.vercel.app

Repository: https://github.com/Manav437/nexgensis-assignment

## Features
- List books (title, author, genre, publication year)
- Create, update and delete books (API-backed)
- Search by title or author
- Filter by genre (derived from API data)
- Loading and error states

## Tech
- React + TypeScript
- Vite
- Tailwind CSS

## Quick start

1. Install

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Configuration
- The API base URL lives in `src/services/api.ts` as `BASE_URL`.

## Notes
- API: `src/services/api.ts` provides `getAll`, `create`, `update`, `delete`.
- Hook: `src/hooks/useBooks.ts` contains fetch and add/update/delete logic and exposes a simple API.
- Types: `src/types/index.ts` defines `Book` and `BookInput`.
- UI: `src/components/book/` contains components of books.