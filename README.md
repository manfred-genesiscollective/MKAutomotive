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
| `NEXT_PUBLIC_SITE_URL` | The address written into canonical links, the sitemap and link previews. Set in the Vercel project (see Domain below) |
| `SITE_PRELAUNCH` | `true` keeps the site out of search engines until launch (see Search engines below) |

Until the three email variables are set, nothing is delivered. In development the email is printed to the terminal instead. On a live deployment the visitor is told the message could not be sent, so no enquiry is lost silently. If a request fails outright (no connection, or a server error), the form stays on the page with what was typed and says so.

Spam is limited in three ways: a hidden honeypot field, strict server-side validation, and a brake of five enquiries per sender every ten minutes (60 overall). Set `ENQUIRY_RATE_LIMIT` to change the per-sender figure. The brake counts in memory, so on a host that runs several copies of the server each keeps its own count: add a firewall rule for `POST` requests as well.

## Design rules

The palette is defined once in `src/app/globals.css`:

- **Forged Carbon `#1B1C1F`** is the main colour, shown as the material under dark glass. On screen it is kept close to black, so that the platinum and Pearl White on it stand out.
  - *The carbon*: a seamless texture of chopped-fibre flakes (`src/assets/forged-carbon.svg`) with a deep carbon tone laid over it. `--carbon-deep` is that tone and `--veil` sets how much of it covers the flakes (higher is darker): change these two to lighten or darken the whole site. `--flake` sets the size of the flakes.
  - *The glass*: two layers fixed to the screen, between the carbon and the content. One carries soft reflections, blended so they brighten the flakes they fall on. The other is a smoked tint (`--glass-tint`) with a vignette. The page scrolls underneath them.
  - *Glass panels* (`surface-glass`): sheets of darker glass with the carbon faintly visible through them, for the bands that need a calm ground: the group figures and the forms.
- **Pearl White `#EEECE6`** is for type, hairlines and buttons only. There are no light sections.
- **Champagne Gold `#BD9C66`** (`--gold`) is for small details only: the headline full stop, short stripes, stage markers. Never a background, a button fill or body text.
- **Platinum** is a finish, not a flat colour: a light version of the flake texture (`src/assets/forged-metal.svg`), so a shape looks cut from polished forged metal. The logo, the emblem beside the home headline and the large headings are made of it. `--platinum` (`#E5E4E2`) is the flat colour used where the texture cannot be shown, such as in print.

Components read surface variables (`--bg`, `--ink`, `--line`), so any component works on the open carbon or inside a glass panel.

### Type

- **Saira** (ExtraBold Italic) for headings, business names and figures, and upright for navigation and buttons. **Geist** for paragraphs, **Geist Mono** for small labels.
- **Forged-metal lettering**: page headlines, section headings, business names and the group figures are filled with the platinum finish, so the letters look cut from polished forged metal. It is ordinary text with a textured fill: add the class `forged-text` to give anything else the same finish. Smaller headings stay solid Pearl White, because the texture needs size to read.

`node scripts/forged-carbon.mjs` redraws the three textures (carbon, metal, and the light and shade laid over the business logos) from the same flakes.

### Logo

The MK monogram is one outline, kept in `src/lib/mk-mark.ts` (used by the header, footer, menu and share images), `src/assets/mk-mark.svg` (the shape the platinum finish is cut to, for the logo and for the emblem beside the home headline) and `src/app/icon.svg` (the browser icon). To replace it with the original artwork, change the path in those three places. `apple-icon.png` and `favicon.ico` are pictures of `icon.svg` and need exporting again if it changes.

The logo is platinum in the header, the menu, the footer and the share images (`src/components/logo.module.css`, `src/lib/og-image.tsx`). The browser icon is the one place it keeps the Champagne Gold of the original artwork, on a dark tile.

In the header and the phone menu the monogram has the group's name beside it, "MK Automotive Group" in spaced capitals behind a hairline (`Wordmark` in `src/components/header-view.tsx`).

### Business logos

Each business is shown by its own logo, in its own colours: in the rows on the home page and Our businesses, as the headline of its page, in the stage list on About, in the lists on Careers and Investors, in the previous and next links, and in its share image.

- The artwork is in `src/assets/logos`, one SVG per business. It was traced from the logo files the group supplied, lettering included. Two changes from those files: Golden Hour's words sit to the right of its monogram rather than under it, in the monogram's orange rather than black, and the "Drive" of SwiftDrive is white rather than navy. Black and navy would disappear against the carbon. The Car Lounge is as supplied, words on the right.
- The forged finish (`src/components/business-logo.module.css`): the carbon's flakes are laid over each logo as light and shade (`src/assets/forged-shade.svg`), cut to its shape, and the logo is slightly see-through. The strength, the transparency and each logo's relative size are in `src/lib/business-logos.ts`, which the share images read too.
- To use the businesses' own vector artwork instead, replace the five SVG files (keep the names). Each needs a `viewBox` and solid fills.

Visitors who ask their device for more contrast get no reflections and a heavier veil over the texture.

### Copy protection

At the group's request, text cannot be selected (highlighted) to copy, and pictures cannot be dragged off the page, saved from a long press or opened from the right-click menu (`globals.css`, "Protection", and `src/components/content-guard.tsx`). Form fields can still be selected, and links keep their right-click menu. This deters copying; it cannot prevent it, since anything shown on a screen can be captured.

The ring that shows keyboard focus appears only when someone moves round the page with the keyboard, never for a click or a tap. On the header logo it is a gold underline under the name. Keyboard users need it to see where they are, so it should stay.

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

Until launch, every page asks search engines not to list it (a `noindex` mark on each page and on every file). Two things keep it that way:

- The address. While the site lives on a `vercel.app` address, or on a developer's machine, it is never listable.
- `SITE_PRELAUNCH=true`, set in the Vercel project. With it, the site stays unlisted even on its own domain, so the domain can be connected before the wording is approved.

To launch: remove `SITE_PRELAUNCH` (or set it to `false`) in Vercel and redeploy. The next build drops the mark and adds the sitemap to `robots.txt`. The rule is `isIndexable()` in `src/lib/site-url.ts`.

### Domain

`NEXT_PUBLIC_SITE_URL` in the Vercel project is the address written into canonical links, the sitemap and link previews. It must be an address that already works: change it to the site's own domain only once that domain's DNS points at Vercel, then redeploy.

## Before launch

- [ ] Replace the redrawn monogram with the original logo artwork and confirm the exact gold (see Logo above).
- [ ] Replace the traced business logos with each business's own vector files, if they have them, and confirm SwiftDrive's white "Drive" and Golden Hour's orange words (see Business logos above).
- [ ] Confirm the registered company name in `src/content/site.ts` (used in the copyright line).
- [ ] Add contact details and social links in `src/content/site.ts`.
- [ ] Set the three email variables and send a test enquiry from each form.
- [ ] Add a firewall rule that limits `POST` requests (on Vercel: Firewall, rate limiting), as a second brake behind the built-in one.
- [ ] Open all four business addresses in a signed-out browser. At the time of writing goldenhour.sg sends the public to a Vercel login, and revhub.sg and export.sg show placeholder contact details.
- [ ] Point the domain's DNS at Vercel, set `NEXT_PUBLIC_SITE_URL` to it, redeploy, and check that `sitemap.xml` shows the live address (see Domain above).
- [ ] When the wording is approved, remove `SITE_PRELAUNCH` and redeploy, then check that `robots.txt` names the sitemap (see Search engines above).

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
