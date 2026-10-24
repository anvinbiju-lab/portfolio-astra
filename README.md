# Anvin Biju — Portfolio

A Next.js portfolio with a 105-frame scroll-driven cinematic hero, interactive project showcases, floating screenshot stacks, and responsive scroll/touch animations.

## Run locally

Requires Node.js 18.17 or later and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js.

## Production build

```sh
npm run build
npm start
```

Optionally set `NEXT_PUBLIC_SITE_URL` to the intended public site URL before building to configure canonical and social metadata. No secrets are required for the local portfolio. The contact form opens an email draft; it does not send email through a backend.

## Included

- Application source in `app/`, `components/`, and `lib/`.
- Original hero frames, project screenshots, and the Lock In Android APK in `public/`.
- Touch-adapted floating previews, typography, pinned chapter transitions, image swipes, and reduced-motion alternatives.
- Ten individual project pages with metadata and project links.

Some product scenes are labeled interactive illustrations or UI design exports, not live device recordings. See `REDESIGN_NOTES.md` for design decisions and verification context.

Generated output (`.next/`), dependencies (`node_modules/`), environment files, and local QA artifacts are not included. Pushing this source does not itself deploy the website.
