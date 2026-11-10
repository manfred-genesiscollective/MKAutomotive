/**
 * The businesses in the group.
 *
 * This file is the single source for every business name, description and
 * link on the site: the home page, /businesses, each business page, the
 * footer, the contact form and the sitemap all read from it.
 *
 * To add a business, add an entry to `businesses` below. Order matters: the
 * list runs in the order of a car's life in Singapore.
 */

export type BusinessStatus = "live" | "coming-soon";

export type Business = {
  /** URL segment: /businesses/<slug> */
  slug: string;
  /** Brand name exactly as the business writes it. */
  name: string;
  /**
   * Where the business sits in the life of a car. `afterCoe` marks a stage
   * that begins once the car's ten-year Certificate of Entitlement ends.
   */
  stage: { number: string; label: string; afterCoe?: boolean };
  /** Short category, used in labels. */
  category: string;
  /** One line under the name. */
  tagline: string;
  /** What a visitor wants when this is the business they need. */
  need: string;
  /** Two sentences for lists and rows. */
  summary: string;
  /** One sentence for search results and link previews: 155 characters at most. */
  seo: string;
  /** Opening statement on the business page. */
  intro: string;
  /** Body paragraphs on the business page. */
  description: string[];
  status: BusinessStatus;
  /** The business's own website. Leave undefined until that site is open to the public. */
  url?: string;
  /** Domain as shown to visitors. */
  domain: string;
  /** Spec-sheet facts shown beside the hero on the business page. */
  facts: { label: string; value: string }[];
  servicesHeading: string;
  services: { title: string; text: string }[];
  promisesHeading: string;
  promises: { title: string; text: string }[];
  cta: { heading: string; text: string; label: string };
  /** The kind of work the business does, for the Careers page. */
  work: string;
  /** One line on the nature of the business, for the Investors page. */
  model: string;
};

export const businesses: Business[] = [
  {
    slug: "swiftdrive",
    name: "SwiftDrive",
    stage: { number: "01", label: "Drive" },
    category: "Car rental",
    tagline: "Weekly and monthly car\u00a0rental with door-to-door delivery.",
    need: "Rent a car",
    summary:
      "Fleet rental by the week and the month, delivered and collected anywhere in Singapore at any hour, at one all-in rate.",
    seo: "SwiftDrive offers weekly and monthly car rental, delivered anywhere in Singapore at any hour, at one all-in rate.",
    intro:
      "SwiftDrive is the Group’s car rental business. It owns and maintains its fleet and delivers every vehicle to the customer.",
    description: [
      "Vehicles are delivered to homes, offices, hotels and Changi Airport at any hour, and collected when the rental ends. The all-in rate covers delivery, collection, roadside assistance and unlimited kilometres.",
    ],
    status: "live",
    url: "https://www.swiftdrive.sg/",
    domain: "swiftdrive.sg",
    facts: [
      { label: "Business", value: "Car rental" },
      { label: "Customers", value: "Residents, visitors and drivers between cars" },
      { label: "Coverage", value: "Island-wide, 24 hours" },
    ],
    servicesHeading: "Services",
    services: [
      {
        title: "Weekly and monthly rental",
        text: "Terms from one week, with weekly and monthly rates applied automatically and extensions online.",
      },
      {
        title: "Delivery and collection",
        text: "Delivery within a 30-minute window of the customer’s choosing, with a walk-round inspection at handover.",
      },
      {
        title: "All-in pricing",
        text: "Delivery, collection, roadside assistance and unlimited kilometres are included in the daily rate. The deposit is shown separately.",
      },
      {
        title: "Travel into Malaysia",
        text: "Peninsular Malaysia for a daily fee. Every car carries its own Vehicle Entry Permit (VEP) tag.",
      },
    ],
    promisesHeading: "Customer commitments",
    promises: [
      {
        title: "The price shown is the price paid",
        text: "Every charge is itemised before booking.",
      },
      {
        title: "Credit for late delivery",
        text: "Applied automatically, without a claim.",
      },
      {
        title: "Replacement vehicle",
        text: "Provided after a breakdown that is not the customer’s fault.",
      },
      {
        title: "Unlimited kilometres",
        text: "No daily allowance and no charge per kilometre.",
      },
      {
        title: "24-hour roadside assistance",
        text: "For the full rental period.",
      },
      {
        title: "Free cancellation",
        text: "Up to 24 hours before the delivery window.",
      },
    ],
    cta: {
      heading: "Book with SwiftDrive.",
      text: "Vehicles, rates and availability at swiftdrive.sg.",
      label: "Visit swiftdrive.sg",
    },
    work: "Fleet delivery and collection, vehicle preparation and customer service.",
    model: "Fleet rental by the week and the month.",
  },
  {
    slug: "revhub",
    name: "RevHub",
    stage: { number: "02", label: "Upgrade" },
    category: "Parts and fitting",
    tagline: "Performance parts and accessories, supplied and fitted.",
    need: "Upgrade a car",
    summary:
      "An online store for performance parts with its own fitting workshop in Singapore, starting with big brake kits. Every order is checked against the vehicle’s chassis.",
    seo: "RevHub supplies performance parts online, starting with big brake kits, and fits them at its own workshop in Singapore.",
    intro: "RevHub is the Group’s performance parts retailer and fitting workshop.",
    description: [
      "The catalogue shows only the parts that fit the customer’s vehicle. Every order is checked by hand against the chassis before dispatch, and lead times are confirmed before payment.",
      "The range starts with big brake kits, pads, rotors and lines. Wheels, lighting, seats, steering wheels and exterior parts will follow.",
    ],
    status: "live",
    url: "https://www.revhub.sg/",
    domain: "revhub.sg",
    facts: [
      { label: "Business", value: "Parts retail and fitting" },
      { label: "Customers", value: "Drivers upgrading their vehicles" },
      {
        label: "Coverage",
        value: "Delivery across Singapore; fitting at RevHub’s workshop",
      },
    ],
    servicesHeading: "Services",
    services: [
      {
        title: "A catalogue by vehicle",
        text: "Customers shop by vehicle and see only the parts that fit their chassis.",
      },
      {
        title: "Big brake kits",
        text: "Brake upgrades with chassis-specific brackets, supplied alone or supplied and fitted.",
      },
      {
        title: "In-house fitting",
        text: "Installation at RevHub’s own workshop, scheduled around the arrival of the parts.",
      },
      {
        title: "A widening range",
        text: "Wheels, lighting, seats, steering wheels and exterior parts are to follow.",
      },
    ],
    promisesHeading: "Customer commitments",
    promises: [
      {
        title: "Fitment checked by hand",
        text: "Every order is verified against the chassis before dispatch.",
      },
      {
        title: "Lead time before payment",
        text: "Confirmed before the customer commits.",
      },
      {
        title: "Fitted in-house",
        text: "Installed by the team that supplies the part.",
      },
      {
        title: "Island-wide delivery",
        text: "Parts are delivered anywhere in Singapore.",
      },
    ],
    cta: {
      heading: "Shop by vehicle.",
      text: "Parts matched to your vehicle at revhub.sg.",
      label: "Visit revhub.sg",
    },
    work: "Workshop fitting, fitment checks and online retail.",
    model: "Online retail with in-house fitting.",
  },
  {
    slug: "the-car-lounge",
    name: "The Car Lounge",
    stage: { number: "03", label: "Maintain" },
    category: "Service booking",
    tagline: "A booking desk for workshops and automotive services.",
    need: "Book a workshop or service",
    summary:
      "A remote booking desk for workshops and automotive services, now in development.",
    seo: "The Car Lounge is a remote booking desk for workshops and automotive services in Singapore, now in development.",
    intro:
      "The Car Lounge is the Group’s booking desk for workshops and automotive services. It is in development.",
    description: [
      "Drivers will book workshops and automotive services remotely, as easily as booking accommodation. Workshops and service providers will receive their bookings through it.",
    ],
    status: "coming-soon",
    domain: "thecarlounge.sg",
    facts: [
      { label: "Business", value: "Booking desk for automotive services" },
      { label: "Customers", value: "Drivers, workshops and service providers" },
      { label: "Coverage", value: "Singapore" },
    ],
    servicesHeading: "The proposition",
    services: [
      {
        title: "Remote booking",
        text: "Drivers book a workshop or an automotive service without calling round.",
      },
      {
        title: "A familiar model",
        text: "See what is offered, then book it: the way travellers already book accommodation.",
      },
      {
        title: "A desk for providers",
        text: "Workshops and service providers receive and manage their bookings through The Car Lounge.",
      },
    ],
    promisesHeading: "Customer commitments",
    promises: [],
    cta: {
      heading: "Register your interest.",
      text: "The Car Lounge is in development. Drivers, workshops and service providers can register their interest now.",
      label: "Register your interest",
    },
    work: "Building the platform and bringing workshops and service providers onto it.",
    model: "Booking platform for automotive services, in development.",
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    stage: { number: "04", label: "Recover" },
    category: "Towing and roadside assistance",
    tagline: "24/7 towing and roadside assistance, island-wide.",
    need: "Get a tow or roadside assistance",
    summary:
      "Towing, recovery and roadside assistance anywhere in Singapore, 24 hours a day. An estimate in about a minute, and the price confirmed before dispatch.",
    seo: "Golden Hour provides towing, recovery and roadside assistance anywhere in Singapore, 24 hours a day, with the price confirmed before dispatch.",
    intro:
      "Golden Hour is the Group’s towing, recovery and roadside assistance business.",
    description: [
      "It operates island-wide, around the clock, for cars, vans and small lorries. A request takes a few steps online, an estimate appears as it is made, and the price is confirmed before a truck is dispatched.",
      "After an accident, vehicles go to the owner’s insurer or to a workshop of the owner’s choice.",
    ],
    status: "live",
    url: "https://www.goldenhour.sg/",
    domain: "goldenhour.sg",
    facts: [
      { label: "Business", value: "Towing, recovery and roadside assistance" },
      { label: "Customers", value: "Stranded drivers and vehicles that need moving" },
      { label: "Coverage", value: "Island-wide, 24 hours, every day" },
    ],
    servicesHeading: "Services",
    services: [
      {
        title: "Towing",
        text: "Breakdowns and cars that will not start, taken wherever the owner chooses. Tows to workshops, inspection centres and scrapyards can be booked ahead.",
      },
      {
        title: "Accident recovery",
        text: "To the owner’s insurer or chosen workshop, with guidance on what to report and when.",
      },
      {
        title: "Specialist recovery",
        text: "Basement and multi-storey car parks, winch-outs and crane recovery.",
      },
      {
        title: "Roadside assistance",
        text: "Jump-starts, battery replacement, tyre assistance, lockouts and fuel delivery.",
      },
    ],
    promisesHeading: "Customer commitments",
    promises: [
      {
        title: "Never more than the estimate",
        text: "Unless the job differs from the one described, and then only with the customer’s agreement.",
      },
      {
        title: "ERP and car-park charges included",
        text: "Part of the price accepted, never added afterwards.",
      },
      {
        title: "Free cancellation",
        text: "Until the driver is on the way.",
      },
      {
        title: "The driver and truck, confirmed",
        text: "Name, truck and plate are shown on the customer’s status page.",
      },
      {
        title: "No chase trucks, no commissions",
        text: "Vehicles go wherever the owner chooses. Golden Hour never recommends a workshop for a fee.",
      },
      {
        title: "All four wheels off the ground",
        text: "On every vehicle, with no surcharge for electric vehicles.",
      },
    ],
    cta: {
      heading: "Assistance, 24 hours a day.",
      text: "Requests are taken at goldenhour.sg at any hour.",
      label: "Visit goldenhour.sg",
    },
    work: "Towing operations, round-the-clock dispatch and roadside assistance.",
    model: "On-demand towing and roadside services.",
  },
  {
    slug: "export-sg",
    name: "export.sg",
    stage: { number: "05", label: "Export", afterCoe: true },
    category: "Vehicle export",
    tagline: "Singapore used cars, ready for export.",
    need: "Buy a car for export",
    summary:
      "Singapore used vehicles for overseas dealers and importers, each listed with an open FOB price, a video and at least 25 photographs.",
    seo: "export.sg supplies Singapore used vehicles to overseas dealers and importers, each with an open FOB price, a video and at least 25 photographs.",
    intro: "export.sg is the Group’s vehicle export business.",
    description: [
      "It acquires vehicles at the end of their ten-year Certificate of Entitlement (COE), prepares them in a licensed export processing zone and ships them to buyers in Africa, the Caribbean, Oceania and Europe. Each listing carries its FOB price and the destination’s import rules; the landed cost is quoted on request.",
      "Owners whose COE is about to expire receive an indicative offer within one business day.",
    ],
    status: "live",
    url: "https://www.export.sg/",
    domain: "export.sg",
    facts: [
      { label: "Business", value: "Vehicle export" },
      {
        label: "Customers",
        value: "Overseas dealers and importers; owners with an expiring COE",
      },
      {
        label: "Coverage",
        value: "Singapore to ports in Africa, the Caribbean, Oceania and Europe",
      },
    ],
    servicesHeading: "Services",
    services: [
      {
        title: "Export stock at open prices",
        text: "An FOB price on every unit, with the CIF cost to the buyer’s port on request.",
      },
      {
        title: "Shipping and documentation",
        text: "Deregistration, export processing, sailing bookings and courier of the bill of lading and export papers.",
      },
      {
        title: "Import rules by country",
        text: "Each destination’s import regulations are checked and shown with the vehicle.",
      },
      {
        title: "Vehicle acquisition",
        text: "Indicative offers to owners within one business day, with the PARF and COE rebates claimed on deregistration.",
      },
    ],
    promisesHeading: "Buyer commitments",
    promises: [
      {
        title: "An open FOB price",
        text: "On every unit, before any conversation.",
      },
      {
        title: "A video and at least 25 photographs",
        text: "Every vehicle is documented before listing, wear included.",
      },
      {
        title: "Landed cost on request",
        text: "CIF to the buyer’s port, quoted with the next sailing.",
      },
      {
        title: "Payment against a proforma invoice only",
        text: "export.sg never requests payment any other way.",
      },
    ],
    cta: {
      heading: "View export stock.",
      text: "Current units and open prices at export.sg.",
      label: "Visit export.sg",
    },
    work: "Vehicle sourcing and preparation, export documentation and shipping, and work with overseas buyers.",
    model: "Cross-border trade in used vehicles.",
  },
];

export function getBusiness(slug: string): Business | undefined {
  return businesses.find((business) => business.slug === slug);
}

/** The business before and after this one in the life of a car. */
export function getNeighbours(slug: string): {
  previous?: Business;
  next?: Business;
} {
  const index = businesses.findIndex((business) => business.slug === slug);
  if (index === -1) return {};
  return { previous: businesses[index - 1], next: businesses[index + 1] };
}

/**
 * The words shown beside a business that is not open yet. Businesses that
 * are open carry no label: the site makes no claim about how they trade.
 */
export const IN_DEVELOPMENT = "In development";

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

/** "five" for 5, so copy stays right when a business is added. */
export function countWord(count: number = businesses.length): string {
  return NUMBER_WORDS[count] ?? String(count);
}

/** "Five" from "five": for a count at the start of a sentence. */
export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "SwiftDrive, RevHub, The Car Lounge, Golden Hour and export.sg" */
export function businessNameList(): string {
  const names = businesses.map((business) => business.name);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * Figures on the home page.
 *
 * Only real, checkable figures belong here. The second and third are single
 * businesses' own figures, taken from goldenhour.sg and export.sg, so each
 * one names its business. Replace or extend the list as group-level
 * numbers (year founded, team size, vehicles handled) become available.
 */
export const groupFacts: {
  value: string;
  label: string;
  /** The business the figure belongs to, when it is not a figure for the whole group. */
  business?: string;
}[] = [
  { value: String(businesses.length), label: "Businesses in the portfolio" },
  { value: "24/7", label: "Towing and roadside assistance", business: "Golden Hour" },
  { value: "15", label: "Export destination countries listed", business: "export.sg" },
];
