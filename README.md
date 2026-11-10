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

- `businesses.ts` holds every business: name, stage, tagline, descriptions, services, promises and website. The home page, `/businesses`, each business page, the footer, the contact form and the sitemap all read from this one list. To add a business, add an entry. To launch one marked `coming-soon`, set `status: "live"`, add its `url`, and rewrite the wording that says it is in development (`summary`, `seo`, `intro`, `description`, `services`, `cta`, `work`, `model`). `npm test` checks the rules the pages rely on, such as unique names and a website for every open business.
- A few sentences name the stages in words ("rent, upgrade, recover and export"): the group description in `site.ts`, and the opening lines of the home, About and Investors pages. Update them by hand when a business is added or opens.
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
| `npm test` | Unit tests: the enquiry logic, the rate limit and the rules the content files must keep |

## Enquiry forms

All four forms post to one server action (`src/app/actions.ts`), which validates the submission and emails it through [Resend](https://resend.com). Set these environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `ENQUIRY_FROM_EMAIL` | Sender on a domain verified in Resend, for example `MK Automotive Group <website@example.sg>` |
| `ENQUIRY_TO_EMAIL` | Where enquiries go. Separate several addresses with commas |
| `NEXT_PUBLIC_SITE_URL` | The live address. Not needed on Vercel, which supplies it |

Until the three email variables are set, nothing is delivered. In development the email is printed to the terminal instead. On a live deployment the visitor is told the message could not be sent, so no enquiry is lost silently. If a request fails outright (no connection, or a server error), the form stays on the page with what was typed and says so.

Spam is limited in three ways: a hidden honeypot field, strict server-side validation, and a brake of five enquiries per sender every ten minutes (60 overall). Set `ENQUIRY_RATE_LIMIT` to change the per-sender figure. The brake counts in memory, so on a host that runs several copies of the server each keeps its own count: add a firewall rule for `POST` requests as well.

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
- Client JavaScript is limited to the header menu, the forms and the scroll reveal. With JavaScript off, every page still reads in full and the forms still send.
- `sitemap.xml`, `robots.txt` and the social-sharing images are generated from the same content. The browser icons (`src/app/icon.svg`, `apple-icon.png`, `favicon.ico`) are files.
- Security headers, including a Content-Security-Policy that allows only this site's own scripts, styles, fonts and images, are set in `next.config.ts`. A third-party script or embed added later must be allowed there.
- Business pages are complete in the HTML that is served, so they read without JavaScript. Scroll animations never hide anything that is already on screen.

## Deployment

The site is deployed on Vercel as the project `mkautomotive`, linked to this repository. Every push to the repository's default branch is built and published at https://mkautomotive.vercel.app.

Set the enquiry variables (see Enquiry forms) in the project's settings on Vercel, under Environment Variables, then redeploy. Until then the forms tell visitors their message could not be sent.

### Search engines

While the site lives on a `vercel.app` address, or on a developer's machine, every page asks search engines not to list it (a `noindex` mark on each page and on every file). Nothing has to be switched: the first build after the site's own domain is connected, or after `NEXT_PUBLIC_SITE_URL` is set to it, removes the mark and adds the sitemap to `robots.txt`. The rule is `isIndexable()` in `src/lib/site-url.ts`.

## Before launch

- [ ] Replace the redrawn monogram with the original logo artwork and confirm the exact gold (see Logo above).
- [ ] Confirm the registered company name in `src/content/site.ts` (used in the copyright line).
- [ ] Add contact details and social links in `src/content/site.ts`.
- [ ] Set the three email variables and send a test enquiry from each form.
- [ ] Add a firewall rule that limits `POST` requests (on Vercel: Firewall, rate limiting), as a second brake behind the built-in one.
- [ ] Open all four business addresses in a signed-out browser. At the time of writing goldenhour.sg sends the public to a Vercel login, and revhub.sg and export.sg show placeholder contact details.
- [ ] Connect the domain to the Vercel project, redeploy, and check that `sitemap.xml` shows the live address and that `robots.txt` now names the sitemap (see Search engines below).

### Wording to approve

These were drafted for the site and have no source beyond it. Approve, change or remove each one.

- [ ] The tagline "The whole life of a car." and the five stage names: Drive, Upgrade, Maintain, Recover, Export.
- [ ] The group description, the About page statements, and the mission and vision (`src/content/site.ts`, `src/app/about/page.tsx`).
- [ ] The four habits (`habits` in `src/content/site.ts`).
- [ ] The partner types (`partnerTypes` in `src/content/site.ts`). Two more were drafted and left out until confirmed: parts brands and distributors supplying RevHub, and founders bringing a business into the group.
- [ ] The Careers page: whether open applications are wanted, and the kinds of work listed for each business (`work` in `src/content/businesses.ts`).
- [ ] The Investors page: whether investor enquiries are wanted in public, and whether there is a deck to offer. The page currently takes enquiries and offers no document.
- [ ] The privacy notice (`/privacy`), including the registered name and a data protection contact.
- [ ] The Car Lounge page. It says only that a remote booking desk for workshops and automotive services is in development.

### Facts to confirm

- [ ] The home page figures (`groupFacts` in `src/content/businesses.ts`). "24/7" is from goldenhour.sg and "15" from export.sg.
- [ ] Golden Hour: whether it handles accident claims, and who pays its service fee. Its own website describes accident recovery and promises "no commissions", so the page here says the same and does not mention claims.
- [ ] SwiftDrive: the Partners page says leasing owners' cars is not on offer yet, as swiftdrive.sg does.
