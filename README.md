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

## Live Website

<!-- Add your deployed URL here -->

**Live URL:** _coming soon_
