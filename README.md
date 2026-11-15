# Zynintell: Landing Page

A single-page marketing site for **Zynintell**, a digital studio for branding, web, SaaS, AI and mobile products. It's built with **Next.js (App Router)** and **SCSS**, and is designed to feel like a polished web page on desktop and a native app on phones (floating bottom app bar, bottom-sheet menu, swipeable rows).

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 15 (App Router), React 19 |
| Styling | SCSS (Dart Sass), object-oriented architecture with partials, mixins and placeholders |
| Fonts | SUSE (headings), DM Sans (body), Instrument Serif (italic accents), loaded from Google Fonts |
| Icons | Hand-written inline SVG components, no icon library |
| Animation | CSS transitions/keyframes plus small vanilla JS scroll handlers, no animation library |

There are no other runtime dependencies.

---

## Getting started

Requirements: **Node.js 18.18+** (developed on Node 24) and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |

To preview the mobile layout, open your browser dev tools (F12) and switch to device mode (Ctrl + Shift + M).

---

## Project structure

```
zynintell/
├── app/
│   ├── layout.js          # <html> shell, metadata, Google Fonts, global SCSS import
│   ├── page.js            # The landing page: all sections and their content data
│   ├── icon.svg           # Favicon (served automatically by Next.js)
│   └── styles/            # SCSS (see "Styles" below)
├── components/
│   ├── Logo.js            # Animated logo (mark + wordmark)
│   ├── Icons.js           # Inline SVG icon set
│   ├── TechBackdrop.js    # Decorative background for "What We Do"
│   ├── TechStack.js       # "Our Tech Stack" marquee section + AI card
│   ├── CtaBanner.js       # Full-bleed CTA with scroll-driven expand + parallax
│   └── MockSite.js        # Fallback mock website for Recent Work cards
├── public/
│   └── images/            # Photos, team portraits, project screenshots
├── package.json
└── README.md
```

---

## Page sections

In order of appearance:

1. **Header**: logo, menu with icons and a scroll-aware active state, WhatsApp pill, "Let's Talk" button.
2. **Hero**: headline, photo in an arched mask with a notch for the reviews card.
3. **About**: animated stat counters, photo in a leaf-shaped mask with a rotating text badge.
4. **Recent Work**: staggered two-column grid of browser-framed, full-page screenshots that scroll on hover.
5. **What We Do**: bento grid of service cards with a cursor-following border glow.
6. **Our Tech Stack**: two opposing marquee rows of technology badges with tooltips, plus an AI card.
7. **Our Process**: black two-column band with three fanned step cards and a quote panel.
8. **Team**: dark gallery with leadership cards and portrait cards (Facebook links).
9. **Testimonials**: client review cards.
10. **CTA banner**: photo frame that widens to full width as you scroll, with parallax.
11. **Footer**: email CTA, WhatsApp, links, newsletter field, brand watermark, back-to-top.

The **Blog** section is built but hidden. Set `SHOW_BLOG = true` in `app/page.js` to bring it back, together with its menu links.

### Mobile experience (≤ 767px)

- Floating glass **bottom app bar** with a sliding active indicator and a raised centre "Talk" button. It hides while you scroll down and returns when you scroll up.
- **Bottom-sheet** menu from the top-right menu button.
- Swipeable rows for the process cards and team portraits.
- Hover-only effects are switched off on touch screens.

---

## Editing content

Almost all copy lives as plain data at the top of **`app/page.js`**:

| Constant | Controls |
| --- | --- |
| `NAV` | Menu items (header, bottom bar, sheet) |
| `WHATSAPP` | WhatsApp number and link used in the header and footer |
| `STATS` | About-section counters |
| `PROJECTS` | Recent Work cards (title, type, address-bar URL, screenshot) |
| `SERVICES` | What We Do cards (title, text, tags, `tech` chips, photo, icon) |
| `SVC_AREA` | Where each service card sits in the bento grid |
| `STEPS` | Our Process step cards |
| `TEAM` | Team members (name, role, photo file, Facebook URL, fallback colour) |
| `TESTIMONIALS` | Testimonial cards |
| `SHOW_BLOG` | Show or hide the Blog section |

Other content:

- **Tech stack badges and AI chips**: `ROW_TOP`, `ROW_BOTTOM` and `AI` in `components/TechStack.js`.
- **CTA banner text and button**: `components/CtaBanner.js`.
- **Footer email**: the `mailto:` button in the footer of `app/page.js`.

### Images

| Folder / file | Used for |
| --- | --- |
| `public/images/*.jpg` | Hero, about, services, process, CTA photos |
| `public/images/team/` | Team portraits, named in each `TEAM` entry's `photo` field (`.jpg` or `.png`) |
| `public/images/recent -work/` | Full-page project screenshots for Recent Work (900 × 2400 works best) |

- **Team photos:** if a team photo is missing, that member automatically shows a coloured initials tile instead.
- **Recent Work screenshots:** to add a project, drop a tall full-page screenshot into the folder and add an entry to `PROJECTS`. A project without a `shot` falls back to a mock site drawn by `MockSite.js`.

---

## Styles

SCSS lives in `app/styles/` and is loaded once through `app/styles/main.scss`:

```
styles/
├── main.scss         # Entry point, imports every partial in order
├── abstracts/        # Design tokens, mixins ("methods"), %placeholders ("base classes")
├── base/             # Reset, root custom properties, keyframes, scroll reveal
├── layout/           # Container, header, footer, bottom app bar, bottom sheet
├── components/       # Buttons, chips, logo, section head, avatar
├── sections/         # One partial per page section, each with its own breakpoints
└── utilities/        # Overrides and helpers (loaded last)
```

**Conventions:**
- **Tokens:** colours, fonts, radii, breakpoints and easings are defined once in `abstracts/_variables.scss`.
- **Breakpoints:** use the `mq()` mixin, `@include mq(tablet)` (≤ 991px) or `@include mq(mobile)` (≤ 767px), inside the component they affect.
- **Shared looks:** come from placeholders such as `%pill`, `%card` and `%dark-panel` via `@extend` (not inside media queries).
- **Reduced motion:** every animation respects `prefers-reduced-motion`.

**Brand colours:**

| Token | Value | Use |
| --- | --- | --- |
| `$primary` | `#ff4d00` | Brand orange, accents, active states |
| `$ink` | `#1c1a1e` | Text, dark panels |
| `$ink-deep` | `#0f0e11` | Team and AI dark surfaces |
| `$soft` | `#f0f0f0` | Light section backgrounds |
| (accent) | `#F4CE86` | Gold half-circle decorations |

---

## Deployment

The site is a static-friendly Next.js app and deploys to any Node host or to Vercel:

```bash
npm run build
npm run start     # serves on port 3000 by default
```

On Vercel, import the repository and keep the default Next.js settings.

---

## Credits

- **Photos:** stock photography from [Unsplash](https://unsplash.com/) (free to use under the Unsplash License). Team portraits and project screenshots are supplied by the Zynintell team.
- **Technology icons:** simplified line glyphs drawn for this site. They are not official brand logos, and the product names belong to their respective owners.
