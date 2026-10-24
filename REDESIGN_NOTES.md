# Local redesign — Anvin Biju

This is an extracted and enhanced copy of `Portfolio-main-Anvin - Copy for astra.zip`, using the original Next.js App Router application. The ZIP is untouched. No repository was initialized in this copy, and no commit, push, or deployment was performed.

## Open and run

The working source is at `D:\CodexPortfolioWorkspace\original-portfolio\source`. The workspace's `original-portfolio` directory links to that location. C: ran out of space during extraction, so assets, installed dependencies, and build output are on D:. Run commands from the physical D: directory; older Next.js tooling cannot reliably resolve dependencies across Windows drives.

```powershell
Set-Location 'D:\CodexPortfolioWorkspace\original-portfolio\source'
npm run dev -- --hostname 127.0.0.1 --port 3100
```

Use `npm run build` for a production build and `npm start -- --hostname 127.0.0.1 --port 3100` to serve it. Dependencies are already installed. The ordinary package and lock files are included so the project remains portable when copied to another machine. Existing domain metadata and `NEXT_PUBLIC_SITE_URL` support are retained.

## Protected hero

The block from `TOTAL_FRAMES` through the image preload and canvas renderer in `components/Hero.tsx` is unchanged from the ZIP. It still uses Framer Motion `useScroll`, offsets `start start` / `end end`, the `[0,1]` to `[1,105]` mapping, `Math.floor`, fullscreen cover rendering, and a 300vh section. The original overlay opacity curves are also retained. Every original frame has been compared with the ZIP using SHA-256.

Changes in that component concern text overlays, their semantic visibility, navigation links, progress display, and loading-screen appearance. The missing `resume.pdf` link was replaced with an actual About link. No portrait generation, new media footage, alternate renderer, scroll library, or autoplay was introduced.

`HeroExperience.tsx` supplies a still-image introduction for reduced-motion users and a meaningful pre-hydration fallback. It leaves the default cinematic component intact. The original eager frame loading and continuous canvas render loop remain inherited behavior; the redesign does not claim to have eliminated their memory or CPU costs. The new System Lab uses CSS geometry and transitions rather than a second continuously rendering WebGL scene.

## Design and functionality

- Dark charcoal, muted violet, restrained cyan; Barlow Condensed display type, DM Sans text, and Instrument Serif accents. Fonts retain system fallbacks.
- New editorial introduction, six interactive capability groups, keyboard-operable System Lab, and distinct Nova / Clipzo / ScanMatrix / WiStream exhibits.
- Six other original projects remain in the archive. All ten projects have real `/projects/[id]` routes, metadata, direct-entry support, related projects, and copy-link controls.
- Original education and both participation records are retained as participation, not awards.
- Original screenshots and the Lock In APK remain available. The APK size label is corrected to 22.4 MiB (displayed as MB).
- Browser-native dialog navigation supports Escape, focus containment and return; the normal pointer and text selection remain available. Cursor hints are supplemental and disabled for touch and reduced motion.
- Native Next.js routing and browser history are retained. Explicit return from a case study can restore the prior featured-project position.
- Contact now opens a prefilled email draft. The original form simulated success without sending anything. Input is retained and the new status explains that sending must happen in the email application. No backend submission or fabricated success is claimed.

## Content and sources

The original eight project records are preserved. Nova Agent comes from the supplied brief; no public repository or exact implementation stack was found, so its project page describes disciplines and does not invent a source link. Clipzo uses the previously verified public QuickDrop README information: temporary phone-to-PC text relay, not unverified general file-transfer claims.

Three old repository paths were corrected using the public GitHub repository list: `LockIn` → `Lock-In`, `CyberScan` → `cyber-scan`, and `IG-Non-Followers` → `Non-Followers`. The original WiStream source URL returns 404 and is not in the public repository list. Its original URL is retained in data with `sourceUnavailable: true`, so the UI does not present it as an available public source. The project itself remains fully represented.

Nova, Clipzo and WiStream interactive scenes are illustrations. Clipzo's local preview does not transmit data. ScanMatrix visuals are existing UI design exports with sample data; visible captions identify them. They are not represented as device recordings or verified scan results.

Next.js and its ESLint configuration were patched from 14.2.5 to 14.2.35 within the existing release line, following https://nextjs.org/blog/security-update-2025-12-11. This is not a migration to a different framework generation or a claim that all inherited dependencies have been comprehensively audited. Build workers are capped at two for this machine.

## Second motion and showcase refinement

The second pass adapts the earlier Digital Space portfolio's scroll storytelling, photographic interlude, and interaction rhythm. It adds a three-chapter native-scroll manifesto, a fanning gallery of actual Lock In screenshots with a modal viewer, character/word masks on selected headings, pointer and scroll depth in the product scenes, magnetic icon feedback, menu entrance choreography, and a spring-driven reading indicator and cursor. Clipzo and ScanMatrix use opposite split layouts on wide screens; WiStream uses a panoramic scene. Phones retain stacked layouts and large touch targets; the later mobile parity pass restores pinned chapters and a phone-scale screenshot fan.

Project entry uses the native View Transitions API where available, waiting for the Next.js route commit before taking its new snapshot. The selected product visual can move into the case study. Native Next.js navigation remains the fallback, including for reduced motion; links retain modified-click behavior, real URLs and browser history. Illustrative preview labels and the original hero core remain unchanged. There is no new scrolling library, WebGL renderer, generated media, or production dependency.

Back/Forward interrupts an unfinished decorative transition. A capture-phase history listener marks the saved project position before the router remounts the homepage, and return-position consumption happens only after the restoration actually runs (including React Strict Mode).

These visual goals are creative direction, not a claim that the website has won an award. No Git write or production deployment is part of this local refinement.

## Floating work / editorial interaction refinement

A six-project visual index now precedes the detailed project stories. Desktop hover or keyboard focus changes the selected project; three layered screenshots fan out and follow fine-pointer movement through damped springs. Titles roll from condensed sans to italic serif. A separate next-image button cycles actual screenshots. Lock In and ClickForge use original application captures; ScanMatrix uses its labeled UI design exports. Nova, Clipzo and WiStream use clearly labeled code-inspired concept compositions, not invented screenshots or purported application source.

At 900px and below, project selection becomes a wrapping set of animated tap targets. The preview stays in normal flow, with scroll- and touch-driven depth replacing mouse-hover input. Reduced-motion selection remains functional without the animated transitions. The existing Lock In gallery adds pointer-hover lift and depth while retaining its native dialog, keyboard controls and touch carousel. Original detailed project scenes, all ten case-study routes, APK download, contact handoff and cinematic hero remain intact. No new dependency, Git write or deployment is introduced.

## Mobile motion parity

The visual motion language now works across phone, tablet and desktop: pinned three-chapter typography on portrait screens, spring-driven floating project depth, animated image changes, rolling project names, product-scene parallax, and the fanning Lock In screenshots. Touch presses provide the hover-like fan/lift treatment; horizontal swipes change project preview images and full-screen gallery images. Vertical touch scrolling and pinch zoom are not intercepted. System Lab accepts touch tilt as well as pointer input. Short landscape screens show all chapters in natural flow to avoid cropping; reduced-motion preferences retain readable still alternatives and working controls. The original 105-frame hero renderer is unchanged. This is touch adaptation, not a claim of literal mouse-hover input on a phone or measured performance on every physical device.

## Verification artifacts

QA artifacts live in `D:\CodexPortfolioWorkspace\qa`. Browser checks use the existing temporary Playwright Core installation and installed Microsoft Edge, not a production dependency. Local measurements and screenshots do not establish field Core Web Vitals, an award, or a guaranteed frame rate on every device.
