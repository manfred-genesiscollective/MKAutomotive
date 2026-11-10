# MK Automotive Group website

The group website for MK Automotive Group, the Singapore holding company behind SwiftDrive, RevHub, The Car Lounge, Golden Hour and export.sg.

The site is a hub. It says what the group is, then sends each visitor to the right business. The businesses are presented in the order of a car's life in Singapore: Drive, Upgrade, Maintain, Recover, Export.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home: headline, the five stages, a row per business, group facts, the four habits |
| `/businesses` | Every business, with a link to its own website |
| `/businesses/<slug>` | One page per business, generated from the content file |
| `/about` | What the group is, how it works, mission and vision |
| `/partners` | Who the group works with, and a partnership enquiry form |
| `/careers` | The kinds of work in each business, and an open application form |
| `/investors` | The group thesis, the portfolio, and a deck request form |
| `/contact` | Direct links to each business, and a general enquiry form |
| `/privacy` | Privacy notice |

## Changing the content

Everything a non-developer is likely to change lives in `src/content/`.

- `businesses.ts` holds every business: name, stage, tagline, descriptions, services, promises and website. The home page, `/businesses`, each business page, the footer, the contact form and the sitemap all read from this one list. To add a business, add an entry. To launch one marked `coming-soon`, set `status: "live"` and add its `url`.
- `site.ts` holds group details: tagline, contact details, social links, the four habits and the partner types. Contact details left empty are simply not shown.
- `forms.ts` holds the choices offered in the enquiry forms.

Page-specific wording (About, Careers, Investors and so on) is in each page file under `src/app/`.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build. Fails if any page stops being fully static |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Unit tests for the enquiry form logic |

## Enquiry forms

All four forms post to one server action (`src/app/actions.ts`), which validates the submission and emails it through [Resend](https://resend.com). Set these environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `ENQUIRY_FROM_EMAIL` | Sender on a domain verified in Resend, for example `MK Automotive Group <website@example.sg>` |
| `ENQUIRY_TO_EMAIL` | Where enquiries go. Separate several addresses with commas |
| `NEXT_PUBLIC_SITE_URL` | The live address. Not needed on Vercel, which supplies it |

Until the three email variables are set, nothing is delivered. In development the email is printed to the terminal instead. On a live deployment the visitor is told the message could not be sent, so no enquiry is lost silently.

Spam is limited by a hidden honeypot field and strict server-side validation. For rate limiting, add a rule in the Vercel Firewall for `POST` requests.

## Design rules

The palette is defined once in `src/app/globals.css`:

- **Forged Carbon `#1B1C1F`** is the main colour, shown as the material under dark glass.
  - *The carbon*: a seamless texture of chopped-fibre flakes (`src/assets/forged-carbon.svg`) with a deep carbon tone laid over it. `--veil` sets how solid it is (higher is darker) and `--flake` the size of the flakes.
  - *The glass*: two layers fixed to the screen, between the carbon and the content. One carries soft reflections, blended so they brighten the flakes they fall on. The other is a smoked tint (`--glass-tint`) with a vignette. The page scrolls underneath them.
  - *Glass panels* (`surface-glass`): sheets of darker glass with the carbon faintly visible through them, for the bands that need a calm ground: the stage directory, the group figures and the forms.
- **Pearl White `#EEECE6`** is for type, hairlines and buttons only. There are no light sections.
- **Champagne Gold `#BD9C66`** (`--gold`) is the colour of the logo, and is for small details only: the logo, the headline full stop, short stripes, stage markers. Never a background, a button fill or body text.

Components read surface variables (`--bg`, `--ink`, `--line`), so any component works on the open carbon or inside a glass panel.

### Type

- **Saira** (ExtraBold Italic) for headings, business names and figures, and upright for navigation and buttons. **Geist** for paragraphs, **Geist Mono** for small labels.
- **Forged-metal lettering**: page headlines, section headings, business names and the group figures are filled with a light version of the flake texture (`src/assets/forged-metal.svg`), so the letters look cut from polished forged metal. It is ordinary text with a textured fill: add the class `forged-text` to give anything else the same finish. Smaller headings stay solid Pearl White, because the texture needs size to read.

`node scripts/forged-carbon.mjs` redraws both textures from the same flakes.

### Logo

The MK monogram is one outline, kept in `src/components/logo.tsx` (the header, footer and menu), `src/assets/mk-mark.svg` (the forged emblem beside the home headline), `src/app/icon.svg` (the browser icon) and `src/lib/og-image.tsx` (share images). To replace it with the original artwork, change the path in those four places. `apple-icon.png` and `favicon.ico` are pictures of `icon.svg` and need exporting again if it changes.

Visitors who ask their device for more contrast get no reflections and a heavier veil over the texture.

## How it is built

- [Next.js](https://nextjs.org) 16 App Router with Cache Components. Every page is prerendered; `ensureStatic = "navigation"` in the root layout makes the build fail if a page ever starts depending on request-time data.
- TypeScript and CSS Modules. No UI framework and no client-side data fetching.
- Client JavaScript is limited to the header menu, the forms and the scroll reveal. With JavaScript off, every page still reads in full.
- `sitemap.xml`, `robots.txt`, the favicon and the social-sharing images are generated from the same content.

## Before launch

- [ ] Replace the redrawn monogram with the original logo artwork and confirm the exact gold (see Logo above).
- [ ] Confirm the registered company name in `src/content/site.ts` (used in the copyright line).
- [ ] Add contact details and social links in `src/content/site.ts`.
- [ ] Set the three email variables and send a test enquiry from each form.
- [ ] Review the draft wording: mission, vision and the four habits (`/about`, `/`), the partner types (`/partners`), the investor thesis (`/investors`) and the privacy notice (`/privacy`).
- [ ] Confirm the group facts in `src/content/businesses.ts` (`groupFacts`). The second and third come from goldenhour.sg and export.sg.
- [ ] Point the domain at the deployment and check `sitemap.xml` shows the live address.
