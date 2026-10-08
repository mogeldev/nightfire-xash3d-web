# Agent guide — Nightfire on Xash3D website

## Scope and source of truth

- This repository (`mogeldev/nightfire-xash3d-web`) contains only the standalone public website. The Nightfire engine/game project is separate and currently private.
- Work only in this website repository unless the user explicitly asks otherwise. Never copy in game data, original game artwork/audio/video, retail captures, binaries, credentials, or private project files.
- Exception: the Gallery contains only the in-game screenshots of the port that the user selected and approved for publication (2026-10-09). The News page also includes the user-selected first sneak-preview recording of the port (2026-10-11), converted to 1920×1080 at 30 fps, with a poster taken from that recording. Add or replace media only on the user's explicit selection; never retail comparison captures, raw game files or menu/movie frames taken from the retail assets without approval.
- Keep the site static and dependency-free: no build step, external fonts, CDN, analytics, or trackers. Pages should continue to work from GitHub Pages and from `file://` where practical.
- Verify status claims against the current project source, especially `working-directory/xash3d-nightfire/STATUS.md`, `docs/overview.html`, `docs/playthrough.md`, and `docs/levels/README.md`. `docs/overview.html` is generated; read it, do not edit it. Mark or qualify claims that have only offline or assumed evidence.
- Keep progress honest: a map loading is not the same as being inspected; inspecting a map is not a full playthrough. Do not describe a mission as playable until it has been completed from start to its changelevel. Never invent completion percentages or make release/distribution promises.

## Content and presentation

- The site is for Nightfire players, not engine developers. Use clear, natural English and explain technical terms or avoid them in public copy.
- Present the project as an unofficial fan port, not an official Bond/Nightfire product, remake, or replacement for the community patches.
- The chosen project name is **Nightfire on Xash3D**. Keep the public site focused on the port; brief mention of the community patches belongs on the home page.
- Keep the menu-inspired look: warm orange/amber light, black edges and tabs, dark translucent panels. Prioritize readable system sans-serif fonts; do not bring back condensed/italic display typography for body text, navigation, or buttons.
- Keep the layout responsive and accessible: semantic headings, working keyboard focus, readable contrast, descriptive links, and respect for reduced-motion preferences.
- The public repository intentionally has no `README.md`; these rules live in this file.

## Pages, links, and progress visuals

- Gallery images are grouped by the level they were taken on. If a level was not recorded, say so instead of guessing; captions must describe the test, not claim a finished or playable mission. Keep a small WebP thumbnail plus a full-size WebP (max 1600 px wide) under `assets/gallery/`, with width/height, descriptive alt text and lazy loading.
- The current site is a small set of standalone HTML pages. When adding or removing a page, update the header/footer navigation and all internal links; avoid links to removed pages or anchors.
- Video sharing copies the canonical HTTPS MP4 URL, not the News page or embed HTML. Keep a manual direct-link fallback and accessible copy feedback; Discord controls whether the pasted link gets a video preview.
- Progress bars must represent a defined count with a real denominator. Their `data-pct` values must agree with the displayed counts and the JavaScript that sets bar widths.
- The overall evidence count on the Progress page uses each project status row's strongest evidence tag, not completed features. Preserve the explanation that partial tests and rejected experiments can have in-game evidence. Use concrete examples and limitations for individual systems rather than area-level completion percentages.
- Campaign client-check chips follow the playthrough tracker, not a count applied to the first maps of a mission. Keep explicit checked-map indices and distinguish recorded client checks from focused feature tests elsewhere. Loading evidence is a dedicated-server check, not proof of visible geometry.
- Keep the hosting files `CNAME` (`nightfire-xash3d.dev`) and `.nojekyll` in the repository root. GitHub Pages publishes `main` from `/`; HTTPS is enabled. Do not remove or overwrite these settings.

## Validation and publishing

- Before publishing, parse all HTML pages and check local `href`/`src` paths and fragment IDs. Check progress-bar values against their displayed counts and ensure the expected scripts/stylesheets load.
- Smoke-test with `python -m http.server` and request the home, Progress, FAQ, CSS, and JavaScript files. After publishing, verify the Pages build and the live HTTPS URL.
- Keep the website repository history squashed to the single published site snapshot, as requested by the user. Before any force-push, fetch and inspect remote-only commits; preserve any user changes and GitHub Pages custom-domain configuration.
- Do not commit game data or unrelated workspace files. Include the required `Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>` trailer in commits unless the user asks otherwise.
