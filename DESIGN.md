---
version: alpha
name: Eddrick Miano Portfolio
description: A developer portfolio presenting real web, mobile, and research work through readable device previews.
colors:
  background: "#090909"
  surface: "#111111"
  surface-raised: "#161616"
  text: "#f2f1eb"
  muted: "#9a9a94"
  border: "#2a2a28"
  primary: "#c9ff45"
typography:
  sans:
    fontFamily: "Inter, system-ui, sans-serif"
  mono:
    fontFamily: "DM Mono, monospace"
rounded:
  DEFAULT: "0px"
  laptop: "12px"
  phone: "34px"
spacing:
  page-max: "1180px"
  project-gap: "64px"
components:
  button:
    minHeight: "44px"
  dialog:
    maxWidth: "1080px"
---

# Eddrick Miano Portfolio Design System

## Overview

### Creative North Star

A software workbench: real application screens take center stage, framed by the established dark canvas, technical captions, and lime actions.

### Product context and register

- Audience: hiring teams evaluating an early-career frontend/mobile developer.
- Register: English-language personal brand and content site; no authenticated product workflow.
- Signature: matching laptop previews for web/research software, an upright iPhone presentation for PAPI.
- Preserve the existing portrait, résumé, personal details, and black-and-lime identity.
- Runtime token owner: `src/styles.css` `:root`. This document mirrors those values; `src/showcase.css` consumes those variables rather than defining a second palette.
- Gallery owner: `src/components/Projects.jsx`; project facts and media order: `src/data/projectStories.js`, with existing contributions retained in `src/data/projects.js`.

## Colors

Lime identifies primary actions, roles, and selected gallery controls. Neutral surfaces and thin borders separate content. Text labels remain visible alongside color. Forced-colors mode uses system scrollbar and border colors.

## Typography

Keep Inter for large display headings and readable prose. Use DM Mono for categories, dates, technology tags, and controls. Keep long technical stories in short paragraphs with comfortable line height.

## Layout

Selected work follows the hero. Desktop features use a device preview beside the project story; at 900px and below they stack vertically. More projects uses three columns on desktop and one on narrow screens. Preview images preserve their aspect ratio; laptop screens use contain rather than cropping. Phone captures retain their original status bar and home indicator, with no added notch overlay.

## Elevation & Depth

Restrained device shadows distinguish the screen from its stage. The project dialog uses a dark backdrop and sticky close header. Avoid perspective that compromises interface readability.

## Shapes

Keep content and action surfaces square. Rounded laptop and phone frames are deliberate device-specific exceptions. They are presentation frames, not live embedded applications.

## Components

### Foundational visual states

Buttons have visible keyboard focus, hover, pressed, selected, and disabled states. Media failures show a readable message. Supporting images load when selected; the video is created only after Watch demo and uses preload none.

### Buttons and actions

View project is the primary lime action. Watch demo is secondary. Source and design links open externally with descriptive accessible text. Controls have at least 44px height.

### Navigation and data display

Preserve existing section navigation and résumé links. Use a compact More projects area. Do not add nonfunctional links or unverified live-demo destinations.

### Forms and overlays

Use the native modal dialog for focus containment and Escape support. Store the opening button explicitly, close the modal, restore document scrolling, and return focus on dismissal. Gallery choices are ordinary pressed-state buttons, not an incomplete tabs implementation.

### Iconography

Retain the site's text arrows for labeled actions. Previous/next arrow buttons have accessible names. No extra icon set is needed.

### Motion

Keep existing one-time reveals and short hover feedback. Device movement is limited to a 4px hover lift. Respect prefers-reduced-motion for reveals, transitions, scrolling, and device motion.

### Content and data visualization

Use verified project facts and original contribution statements. Label the stethoscope as academic research and prototype outputs as unvalidated. PAPI captures span development iterations. Do not fabricate metrics, clinical performance, deployment status, or collaborators' roles.

## Do's and Don'ts

- Do keep software screenshots readable and provide larger gallery views.
- Do keep original supplied files unchanged; optimize only portfolio copies.
- Do use an isolated QueueWise demo database for screenshots.
- Don't place private profile information in the public portfolio media.
- Don't add autoplay, mandatory loaders, scroll hijacking, or fake product screenshots.

## Media provenance

- QueueWise: actual local application at `C:/Users/PREDATOR/Documents/QueueWise`; customer and staff captures use a separate demo database. No QueueWise source changes were needed.
- Stethoscope: the five original interface PNGs from `https://portfolio-site-lilen-s-cave.vercel.app/projects/smart-stethoscope-system`, retrieved from its public image URLs. Attribution remains in the project detail panel.
- PAPI: selected original screenshots supplied by Eddrick from Downloads. The demo is a silent nine-second excerpt (23–32 seconds) of the supplied recording, excluding registration and profile details. Original files remain untouched.

## Technology icons

Technical-stack labels use locally stored Devicon original brand-color SVGs, with Simple Icons fallbacks and Lucide Network for REST API integration. GitHub and Expo use white marks for the dark surface; REST is neutral gray. React Native shares the React mark; TensorFlow Lite shares the TensorFlow mark. Icons are decorative and text labels remain visible. Assets are sourced from the official simple-icons/simple-icons and lucide-icons/lucide repositories. Lucide is ISC licensed; see public/icons/LUCIDE-LICENSE. Simple Icons assets are CC0, with brand trademarks retained by their owners.

Devicon originals: https://github.com/devicons/devicon (MIT; public/icons/DEVICON-LICENSE). Preserve multicolor marks rather than applying CSS masks or a uniform tint.

Airtable's multicolor mark is sourced from gilbarbara/logos (logos/airtable.svg). MySQL retains its original blue on a light backing for dark-background readability.

## HealthTap design preview

HealthTap joins the featured projects with an upright phone preview and the shared accessible gallery. Original PNGs were exported through Figma’s view-only export controls: file glmbJdbHpGpiywvWcWKx1j, Availability 46:421, Manage Appointment 1:2525, Sign In 1:2620. Preserve its UI/UX-concept label and original contribution description. Do not imply live booking or a deployed healthcare service.

## Hero and preview interactions

The hero enters once over roughly 800ms, using two clipped name lines and a restrained stagger for portrait, role, introduction, buttons, and facts. Reduced-motion disables the entrance entirely. Device previews offer labeled previous/next controls and screenshot choices without autoplay. Their controls are siblings of the gallery-opening button, never nested buttons. Opening the device passes the selected screenshot to the accessible gallery. A decorative three-pixel lime progress line beneath the fixed header follows document scroll; its requestAnimationFrame updates and ResizeObserver are cleaned up on unmount.

## Action arrow feedback

CTA, navigation, contact, project, and gallery arrows move three pixels in their indicated direction over 180ms on pointer hover or keyboard focus. They retain their layout footprint and do not move on disabled controls. Pointer hover is limited to fine pointers; reduced-motion disables arrow movement. Arrow glyphs are decorative and hidden from assistive technology.

## Heart and lung model workflows

The Smart Stethoscope project contains two separate, thesis-grounded model lanes and a shared pressed-button switch between training and on-device inference. Keep both model identities visible: heart is a LeNet-style CNN, normal/murmur, 16 kHz mono; lung is a four-class CNN, normal/crackles/wheezes/both, 8 kHz mono. Both use Mel-spectrogram features and separate TFLite artifacts. Source: final final for bind.pdf, printed pp. 33–46 (PDF pp. 46–59). The user approved correcting the previous CRNN terminology on 2026-10-17. The heart inference figure on printed p. 37 contains lung labels and an inconsistent sample rate; the diagram uses its explanatory text on pp. 38–39 instead. Lung filter bounds differ between figures; the portfolio omits exact lung filter bounds. Do not publish the source thesis or personal/signature pages as public assets.

## QueueWise technical breakdown

QueueWise details use a semantic request-path diagram and concise engineering notes grounded in the local QueueWise source. Cover cookie-based Sanctum authentication, server role middleware, transactional booking and the unique service/slot constraint, polling with stale-response guards, and existing feature-test scope. Three architecture columns stack on mobile. Reuse existing tokens and dialog behavior; do not imply push-based updates or claim a new QueueWise test run.

## Coordinated portfolio motion

Hero uses clipped name reveals, a portrait wipe, a single lime rule sweep, and a restrained decorative ring. Shared section headings use aria-hidden oversized labels drifting up to 45px horizontally and divider reveals. Device stages rise once; fine-pointer hover tilts frames by at most 2.5 degrees each axis. MotionEffects owns one requestAnimationFrame-throttled scroll listener and cleans up pointer/media listeners. Reduced-motion removes all added transforms and animations, including preference changes at runtime. No scroll interception or content gate.

## Project border light

The portrait orbit was removed after user feedback. Project previews receive a short, single-pass lime glint confined to their perimeter as they enter view. Hover adds a restrained border glow. Screenshots stay unobscured; reduced motion disables the sweep. No new controls or continuous animation.
## Magnetic hero actions

The two hero links use stable outer hit areas and translate their inner buttons by at most 6px horizontally and 4px vertically for a fine mouse pointer. Leaving the target springs the button back. Focus, click, pointer cancellation, and capability changes clear offsets. Keyboard focus, touch, and reduced motion keep buttons stationary. Existing link destinations remain unchanged.

## Portrait scroll reveal
The portrait moves from muted to full color as it enters the viewport; four lime frame edges extend using the same clamped progress value. MotionEffects owns the scroll measurement. Reduced motion displays the full-color completed frame; the image remains visible at every stage.

## Transparent portrait
Hero and header use profile-photo-transparent.png, a background-extracted version of the original graduation portrait. Keep profile-photo.jpg unchanged. The hero backing is transparent so the dark page is visible behind the cutout.

## Profile presentation restored

Removed the interactive portrait switch, biography badge, and photo booth controls at the user’s request. The hero uses the transparent graduation portrait with its existing scroll reveal. Other site interactions remain unchanged.

The large decorative hero background circle and its scroll drift were removed at the user’s request.

## Editorial selected work
Featured projects use full-width oversized titles and a category/date masthead above the device/story composition. Wide screens alternate the larger device column left and right; narrow screens preserve heading, preview, then story order. Larger previews, restrained whitespace and existing black/lime tokens establish rhythm. Galleries, real media, technical details, link targets and preview controls are preserved.

## Trial project color fields
Isolated project-colors.css adds full-width dark teal, navy, warm yellow-black, and turquoise fields for QueueWise, Stethoscope, PAPI, and HealthTap. Existing typography and lime actions are preserved. This is a user-requested visual trial; remove its import to revert. Colors are presentation accents, not claims about official product branding.

Project color fields now fade back to black as each project scrolls upward out of view. The background alone fades, reaching black after 80% of the project height passes above the viewport. Scrolling back restores color; reduced motion keeps fields static.

## Project color placement revised
Replaced full-width color fields and their scroll fade with static project-colored device stages only. Text, titles, preview controls, and page canvas retain the original black background. Removed the trial body container and overflow overrides and field-opacity scroll calculations.

## Contact finale
The closing section uses a three-line oversized headline, offset typography, lime final line, and a quiet opportunity indicator. Email is the primary contact action, with copy and résumé links beneath. GitHub, LinkedIn, phone, and back-to-top remain available. Existing personal details are preserved. Copy feedback uses React state and a polite live status with a clear failure message. Mobile stacks the invitation and actions; no new motion or decorative circles.

## Service concept illustrations
Each service heading pairs with a small code-native SVG concept: resizing browser, API packet, phone boot, ML nodes, and passing test. Decorative illustrations loop slowly only onscreen and in a visible tab. A shared pause/resume control gives user control; reduced motion uses completed static illustrations. No animation covers the text or adds fabricated project functionality.

Service illustrations use natural interface colors instead of uniform lime: blue browser and phone UI, green API packet and passing check, purple ML nodes, and neutral device frames. The site’s lime actions remain unchanged.

## Experience timeline and highlights
A vertical lime timeline fills with document scrolling; ResizeObserver accounts for expanded native details. Reduced motion displays the completed line. Responsibilities and tools expand by native details/summary, with visible focus and organization-specific accessible names. Preserve original dates, organizations and roles; ML highlights use the user-confirmed two-CNN thesis workflow. Related project links target stable project anchors. No invented metrics or achievements.

## Experience organization logos
Official Bluebeans white/cyan wordmark (bluebeanssystems.com/assets/bb-logo/BBSystemswhite.png) and Silliman seal (su.edu.ph/wp-content/uploads/2017/06/cropped-su-logo-whitebg-270x270.png) are stored locally in public/organizations. Logos appear beneath each timeline date and category, link to their official sites, retain original aspect ratios and colors, and have descriptive alt text. Silliman denotes academic affiliation for the project entry, not employment.

## Experience reference layout
Experience now follows the user-supplied résumé-style reference: small organization logo beside role, organization, dates and location; summary and contribution bullets stay visible. Removed the large timeline and expandable details. Thesis entry uses Apr 2025–Mar 2026, Silliman University, Dumaguete, and role/contributions from the supplied reference. Preserve the previously confirmed LeNet-style heart CNN and four-class lung CNN terminology rather than its older CRNN text. Internship dates and responsibilities remain as recorded; no location was invented.

The user’s internship reference corrects the entry to Software Developer Intern, Bluebeans Systems Inc., May–July 2025 (3 months), Dumaguete/on-site. Its short introduction is taken from that reference. CSS displays the symbol area of the official Bluebeans wordmark; the original downloaded asset is unchanged.

User clarified internship ownership: built the complete React Native/Expo frontend, including login, authentication flows and backend API integration. Experience copy now states this directly rather than describing frontend work as assistance.

## Gallery and page polish
GalleryScreen holds the previous real screenshot until its successor loads, then crossfades in 280ms; failures are explicit and reduced motion removes transitions. Enlarge opens a native fullscreen dialog with fit/actual-size controls, Escape support, focus containment and return to the opener. About pairs an oversized verified introduction with location, focus and approach facts. Experience/Stack/About use full-width revealing dividers. Mobile refines 44px controls, typography, gaps and gallery sizing. No personal interests or achievements were invented.

## Engineering field journal with Motion for React
AboutJournal uses Motion for React for one-time staggered photo reveals, spring hover/focus, animated album entry/exit and crossfades, and a scroll-linked lime journal rail. MotionConfig and useReducedMotion honor user preferences. Five photo chapters preserve supplied dates: hard-hatting May 19 2025, internship May–July 2025, thesis April 2025–March 2026 (explicitly overlapping), Ring Hop March 19 2026, graduation March 2026 (no invented day). Twenty distinct supplied photos are optimized as local WebP images and thumbnails; original sources remain untouched. Professional camera credit remains on the Ring Hop image. Native modal albums offer Escape, arrow keys, previous/next, thumbnail buttons and opener focus restoration. The internship video is an 11-second silent derived copy, controls only, preload none, mounted only on selection. No clinical performance claims are drawn from experimental training images. No push or deployment is authorized for this addition.

Journal image sharpness correction: main photo cards and albums now use full supplied resolution encoded at WebP quality 95; 720px thumbnails are restricted to small album selectors. Original files remain unchanged. No generative enhancement, face reconstruction, or artificial detail was applied.

## Stacked photo albums
Multi-photo journal chapters use a single accessible album button: the real cover photo sits above two supporting photos with paper edges. Motion spring variants gently fan the stack on fine-pointer hover or keyboard focus. Touch opens the existing album directly; reduced motion leaves the resting stack static. The hard-hatting single photo remains unchanged. Full-resolution sources are retained; the gallery still exposes every supplied photo and optional internship video.

Stack refinement after user feedback: supporting photos now use 1-degree resting angles and 3px horizontal offsets, with only 7–14px vertical separation. Hover/focus increases gently to 2 degrees and 7px. Borders are thinner and back photos subdued to keep the main cover dominant.

User reference refinement: photo albums use straight, equal-size cards with consistent diagonal steps toward the upper right. No rotation or fan. Motion gently expands the same diagonal on hover/focus; click and keyboard retain the existing album dialog.
Stack interaction: photo button cycles through every chapter photo with Motion position transitions and wraps to the first. Separate Open album button opens the existing dialog; keyboard buttons and reduced-motion support are retained.
Source optimization: removed 29 obsolete selectors for retired layouts and unused metadata; use Motion LazyMotion/domAnimation without changing supported animations. Project gallery/zoom and technical breakdown modules load on demand with accessible loading feedback. Stacks mount only three visible photos; journal chapter photo lists resolve once. Preserve supplied originals and icon licenses. Production build and desktop/mobile gallery, keyboard, stack, navigation and pause checks passed; no console errors observed.

## Unique visitor badge
A small muted outline person icon and count sits beside the header name, outside the home link. It reports unique anonymous browser IDs since setup, with repeat visits deduplicated by an atomic Redis operation. Local/dev/preview visits only read; owner exclusion is opt-in per browser. Loading/unavailable states show an em dash and accessible status, never made-up counts. The backend uses server-only Upstash REST credentials; no new runtime dependency. The new database is not connected yet and live deduplication remains unverified. See VISITOR-COUNTER.md.
