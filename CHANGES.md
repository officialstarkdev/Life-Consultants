# Requested UI/UX changes

Implemented:

1. Added `LoadingScreen` and connected it to `React.lazy` + `Suspense` route loading.
2. Reworked Home transitions to lightweight transform/opacity spring animations with staggered headline words; removed expensive blur-filter transitions and remote hero image loading.
3. Fixed Navbar overflow: Institutions removed from the top-level desktop nav, More is right-aligned and viewport-constrained, desktop navigation now starts at `xl`, and horizontal page overflow is clipped.
4. Replaced remote image references with local `/public/images/...` assets. Staff, CEO, gallery, institutions, certifications and success-story media are wired to their appropriate pages. Blog/destination fallbacks are local SVG artwork rather than remote links.
5. Added Institutions to More. Rebuilt institution listings with reusable image-led `InstitutionCard` cards, also used in destination detail pages and on Home.

Extra cleanup:
- Local CEO/team photos are named cleanly in `public/images/owner_team`.
- Certifications page displays the 18 local certificate images.
- Success Stories displays the local success media with lazy-loaded images.
- Gallery uses local files only.
- All local image references were checked against `public/`; no missing referenced image files were found.

Validation:
- TypeScript/TSX syntax transpile check passed for all source files.
- A full dependency-aware build could not be executed in the editing environment because the uploaded archive did not contain `node_modules` and package installation is unavailable offline. Run `npm install` followed by `npm run build` in a normal development environment.

## September 2026 smoothness + navbar pass

- Home navbar is now transparent over the hero at the top of `/` and becomes a solid white fixed header after scrolling.
- Inner-page navbar remains solid white, with an 80px content offset so page content is not hidden under the fixed header.
- Removed the old hide/show-on-scroll header behavior that was causing visual jitter.
- Fixed the About/More hover gap. Dropdowns now stay open while the pointer travels into them, include a short close grace period, and are constrained to the viewport with no horizontal overflow.
- Added nav route preloading on hover/focus for faster-feeling route changes.
- Removed route-level AnimatePresence exit/enter animation; lazy routes still use the loading component, but navigation no longer waits on a page-exit animation.
- Simplified the Home hero animation: all three local images are pre-rendered and cross-fade with opacity only; removed 3D word animation and continuous hero image scaling.
- Removed heavy backdrop blur from hero proof cards and the secondary hero button.
- Replaced the continuously moving destination marquee with a native horizontal scroll rail, snap points, and previous/next controls to eliminate a large constant repaint workload.
- Destination card images now use real `<img>` elements with lazy loading/async decode rather than CSS background images.
- Removed all generated blue destination SVG placeholders.
- Added optimized local WebP destination assets under `public/images/destinations/photos/` and wired every destination card to local files.
- Verified all `/images/...` references in `src` resolve to files in `public` (0 missing references).

## Infinite destination marquee fix
- Replaced the manual/swipe destination rail on Home with a seamless CSS-transform marquee.
- Duplicated the destination card group once so the loop has no visible jump.
- Pauses on hover/focus so cards remain easy to interact with.
- Uses `translate3d`/`will-change` for GPU-friendly motion and keeps reduced-motion accessibility.
- Removed the previous arrow controls and scroll-ref code from Home.

## Premium motion integration (September 2026)
- Added pointer-driven SpotlightCard surfaces for service, process, metric, testimonial and contact information cards.
- Added GlareHover treatments to important About/leadership imagery without affecting layout or touch interaction.
- Added a specular primary-action component for consultation and form-submit CTAs while preserving real links/buttons.
- Replaced the basic mobile dropdown with an animated route-aware card navigation using the project's existing Framer Motion stack.
- Added subtle route transitions for a smoother app-wide experience.
- Kept destination, institution, gallery, blog and success-media image cards on their existing image-led hover language to avoid excessive effects.
- Preserved reduced-motion behavior and disabled hover-only visual layers on touch devices.
- No new runtime dependencies were added; the integration reuses the existing Framer Motion dependency and lightweight CSS/pointer effects.
