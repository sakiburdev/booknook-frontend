# BookNook — A Small Online Library (Client)

BookNook is a cozy online library where readers can discover books, borrow
available copies with one click, and manage their own shelf. This repository
contains the **frontend client** — a modern, responsive Next.js application
that talks to a separate Express.js + MongoDB backend.

## Technologies

- **Next.js 16** (App Router) + **JavaScript (JSX)**
- **Tailwind CSS v4** + **Shadcn UI** components
- **Better Auth** — email/password + Google login, JWT (JWKS) issuing
- **Swiper.js** — homepage hero slider
- **Framer Motion** — subtle scroll animations
- **next-themes** — dark / light mode
- **React Toastify** — success/error notifications
- **Fetch API** — all data goes through the Express backend (no direct MongoDB access from the client)

## Main Features

- 🏠 **Homepage** — hero slider, latest 6 books, "Why BookNook?", community section
- 📚 **All Books** (`/books`) — search by title/author, filter by category, sort newest/oldest, load more
- 🔎 **Book Details** (`/books/[id]`) — full book info + borrow flow with return-date picker *(protected)*
- ➕ **Add Book** (`/add-book`) — form with validation, read-only user info *(protected)*
- 📖 **My Books** (`/my-books`) — your books only, edit & delete with confirmation models *(protected)*
- 🔄 **My Borrows** (`/my-borrows`) — borrowed list with return-date tracking and one-click return *(protected)*
- 🔐 **Auth** (`/login`, `/register`) — email/password + Google, protected-route redirect back, custom password rules
- 🌗 **Dark / light theme**, custom **404 page**, full **loading skeleton / empty / error** states on every data page

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local
# then open .env.local and adjust the API URL if needed
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | yes | Base URL of the Express backend, e.g. `http://localhost:8000` |
| `MONGODB_URL` | yes | MongoDB connection string — **used by Better Auth on the server only**, never exposed to the browser |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Needed only for Google login (kept server-side) |

> Never prefix secrets (`MONGODB_URL`, client secrets) with `NEXT_PUBLIC_` —
> `NEXT_PUBLIC_` variables are embedded into client-side JavaScript.

## Run the Client

```bash
npm run dev     # development server → http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint check
```

## Backend Connection

The client expects the existing BookNook Express backend running at
`NEXT_PUBLIC_API_URL` (default `http://localhost:8000`):

```bash
cd ../server
npm run dev
```

All book/borrow data flows through these existing endpoints —
`GET /books`, `GET /books/:id`, and (with a Bearer JWT from Better Auth)
`POST/PATCH/DELETE /books(/:id)`, `POST/GET/DELETE /borrows(/:id)`.
The two apps must run together: the client serves both the UI and the
Better Auth endpoints (session + JWT/JWKS) that the Express middleware
verifies against (`http://localhost:3000/api/auth/jwks`).

## Project Structure

```
src/
  app/            # routes (/, /books, /books/[id], /add-book, /my-books,
                  #        /my-borrows, /login, /register, not-found)
  components/
    layout/       # Navbar, Footer
    home/         # hero slider, sections
    books/        # all-books view, details view
    forms/        # add-book view, shared book form
    my/           # my-books view, my-borrows view
    auth/         # login view, register view
    shared/       # book card, empty/error states, confirm dialog
    ui/           # shadcn/ui primitives
  lib/            # api.js (fetch layer), auth.js, auth-client.js, utils.js
  providers/      # ThemeProvider, ToastProvider
  hooks/          # useRequireAuth guard
```

## Screenshots

<!-- Add screenshots of the homepage, book details, forms, and dark mode here -->

| Homepage | Book Details |
| --- | --- |
| _(screenshot placeholder)_ | _(screenshot placeholder)_ |

## Live Website

<!-- Add your deployed URL here -->

**Live URL:** _coming soon_
