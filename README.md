# Life Could Be A Dream

> A cinematic sci‑fi web experience: comics, characters, and cosmic conversations — built with modern webcraft.

```sh
     _      __  __        _____          _      ____        _                 
    | |    |  \/  |      / ____|        | |    |  _ \      | |                
    | |    | \  / |_   _| |     ___   __| | ___| |_) | ___ | |_ ___  _ __ ___ 
    | |    | |\/| | | | | |    / _ \ / _` |/ _ \  _ < / _ \| __/ _ \| '__/ _ \
    | |____| |  | | |_| | |___| (_) | (_| |  __/ |_) | (_) | || (_) | | |  __/
    |______|_|  |_|\__, |\_____\___/ \__,_|\___|____/ \___/ \__\___/|_|  \___|
                    __/ |                                                      
                   |___/                                                       
```

- Live URL: coming soon
- Status: in active development

Table of Contents
- Overview
- Features
- Tech Stack
- Quickstart
- Scripts
- Environment
- Project Structure
- Architecture Notes
- Deployment
- Troubleshooting & FAQ
- Contributing

Overview
Life Could Be A Dream (LCBAD) is a science‑fiction comic store and story universe with a sleek, responsive UI. Explore characters, read, chat, and progress through the cosmos — all from your browser. Built with Vite + React + TypeScript, styled with Tailwind and shadcn‑ui, and powered by modern tools like React Router and TanStack Query. Supabase provides the foundation for auth and data.

Features
- Beautiful, responsive UI using Tailwind CSS + shadcn‑ui (Radix under the hood)
- Client‑side routing and protected views via `react-router-dom` and `src/components/ProtectedRoute.tsx`
- Anonymous chat experience in `src/pages/AnonymousChat.tsx`
- Real‑time touches like `src/components/LiveClock.tsx`
- Toasts and feedback with `sonner`
- Data fetching/caching via `@tanstack/react-query`
- Type‑safe forms with `react-hook-form` + `zod`
- Theming support (via `next-themes`)
- Ready for integrations like Supabase, IPFS, and EVM tools (ethers)

Tech Stack
- Vite 5
- React 18 + TypeScript
- Tailwind CSS 3 + tailwindcss-animate + @tailwindcss/typography
- shadcn‑ui components (Radix UI primitives)
- React Router DOM 6
- TanStack React Query 5
- Supabase JS 2
- Zod, React Hook Form, Sonner
- Recharts, Embla Carousel
- ethers, Lit Protocol, ipfs-http-client (available for future features)

Screenshots / Demo
- Add your screenshots to `public/` and link them here, for example:
  - Home: public/screens/home.png
  - Chat: public/screens/chat.png
  - Mobile: public/screens/mobile.png

Quickstart
1) Clone
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

2) Install
```sh
npm install
```

3) Environment
Create a `.env` file in the project root if you plan to use Supabase:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4) Develop
```sh
npm run dev
```
Open the printed local URL (defaults to http://localhost:5173).

Scripts
- dev: Start the Vite dev server
- build: Production build
- build:dev: Development‑mode build (useful for inspecting output)
- preview: Preview the production build locally
- lint: Run ESLint across the project
- commit: Helper for conventional commits
- commit:auto: Single conventional commit using the helper
- commit:watch: Watch and auto‑commit changes (dev loop helper)

Environment
- .env at project root. Do not commit secrets.
- Required for Supabase features:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY

Project Structure
```
LCBAD/
├─ index.html
├─ src/
│  ├─ components/
│  │  ├─ ProtectedRoute.tsx      # Route guard for private pages
│  │  └─ LiveClock.tsx           # Real‑time clock UI
│  ├─ pages/
│  │  └─ AnonymousChat.tsx       # Anonymous chat page
│  ├─ ...                        # App code, UI, hooks, utils
│  
├─ public/                       # Static assets
├─ docs/                         # Optional static site build target
├─ scripts/                      # Commit helpers
├─ tailwind.config.ts
├─ vite.config.ts
├─ package.json
└─ README.md
```

Architecture Notes
- Routing: `react-router-dom` powers navigation; use `ProtectedRoute` for auth‑gated views.
- State & Data: `@tanstack/react-query` manages network state, caching, and revalidation.
- UI System: Tailwind for tokens and utilities; shadcn‑ui for accessible, composable components.
- Forms & Validation: `react-hook-form` + `zod` for typesafe, ergonomic forms.
- Notifications: `sonner` for non‑intrusive toasts.

Deployment
- Vercel (recommended)
  1. Push to GitHub.
  2. Import the repo on Vercel.
  3. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
  4. Add environment variables if using Supabase.

- GitHub Pages
  - Option A: Deploy `dist/` via Actions (see `.github/` workflows if present).
  - Option B: Serve from `docs/` (set Pages source to `docs/`).
  - For subpath hosting, ensure `index.html` includes a correct `<base href="/<your-subpath>/" />`.

Troubleshooting & FAQ
- The page is blank after deploy
  - If hosted under a subpath, ensure `<base href>` in `index.html` matches your subpath.
  - Verify the build output is correctly served (Vite default is `dist/`).

- Styles don’t load
  - Ensure Tailwind is configured and built. Check `tailwind.config.ts` and that your CSS imports include Tailwind layers.

- Supabase requests fail
  - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in the deploy environment.

- Router links 404 on refresh
  - Configure your host to fallback to `index.html` for SPA routes (Vercel handles this automatically).

Contributing
- Issues and ideas are welcome! Please:
  1. Fork the repo and create a feature branch.
  2. Run `npm run lint` before committing.
  3. Open a PR with a clear description and screenshots if UI changes.

Credits
- Built with Vite, React, TypeScript, Tailwind CSS, shadcn‑ui, Radix, and the broader open‑source galaxy.

— End of transmission —
