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
    tagline: "Weekly and monthly car\u00a0rental, delivered to your door.",
    need: "Rent a car",
    summary:
      "SwiftDrive rents its own cars by the week or the month and brings each one to your door, anywhere in Singapore and at any hour. One all-in price covers delivery, collection and unlimited kilometres.",
    seo: "SwiftDrive rents its own cars by the week or the month and delivers them anywhere in Singapore, at any hour, for one all-in price.",
    intro:
      "SwiftDrive is the group’s car rental business. It owns its fleet, looks after the cars itself and brings each one to the customer.",
    description: [
      "Cars are delivered to a home, an office, a hotel or the arrivals hall at Changi Airport, at any hour, and collected again when the trip ends. There is no counter to visit.",
      "Many customers rent for weeks or months: between cars, or while their own is in the workshop. The price shown at checkout is all-in, with delivery, collection, roadside assistance and unlimited kilometres included.",
    ],
    status: "live",
    url: "https://www.swiftdrive.sg/",
    domain: "swiftdrive.sg",
    facts: [
      { label: "Business", value: "Car rental" },
      { label: "For", value: "Residents, visitors and anyone between cars" },
      { label: "Coverage", value: "Island-wide, at any hour" },
    ],
    servicesHeading: "What it does",
    services: [
      {
        title: "Weekly and monthly rental",
        text: "Rentals run for a week, a month or longer. Weekly and monthly rates are applied automatically, and a trip can be extended online.",
      },
      {
        title: "Delivery and collection",
        text: "A driver brings the car within a 30-minute window the customer chooses, walks round it with them, and comes back for it when the rental ends.",
      },
      {
        title: "One all-in price",
        text: "Delivery, collection, roadside assistance and unlimited kilometres are part of the daily price. The deposit is shown on its own line.",
      },
      {
        title: "Trips into Malaysia",
        text: "Cars can be driven into Peninsular Malaysia for a daily fee, and each one already carries its own tag for Malaysia’s Vehicle Entry Permit (VEP).",
      },
    ],
    promisesHeading: "What customers can count on",
    promises: [
      {
        title: "The price you see is the price you pay",
        text: "Every line is shown before you book.",
      },
      {
        title: "A credit if the driver is late",
        text: "It is applied automatically. You do not have to ask.",
      },
      {
        title: "A replacement car",
        text: "If yours breaks down through no fault of your own, SwiftDrive brings another.",
      },
      {
        title: "No kilometre limit",
        text: "No daily allowance and no charge per kilometre.",
      },
      {
        title: "24-hour roadside assistance",
        text: "Help on the road for as long as the car is with you.",
      },
      {
        title: "Free cancellation",
        text: "Until 24 hours before the delivery window.",
      },
    ],
    cta: {
      heading: "Find your car.",
      text: "Choose a car and your dates at swiftdrive.sg.",
      label: "Visit swiftdrive.sg",
    },
    work: "Delivering and collecting cars across the island, preparing the fleet between rentals and looking after the customers who book it.",
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
      "RevHub sells car upgrades online and fits them at its own workshop in Singapore. It starts with big brake kits, and every order is checked against the car’s chassis before it ships.",
    seo: "RevHub sells car upgrades online, starting with big brake kits, and fits them at its own workshop in Singapore.",
    intro:
      "RevHub is the group’s online store and fitting workshop for car upgrades.",
    description: [
      "Customers choose their car once and the catalogue shows only the parts that fit. Every order is checked by hand against the chassis before it ships, and the lead time is confirmed before payment.",
      "The range starts with big brake kits, pads, rotors and lines. Rims, headlights, ambient lighting, seats, steering wheels and exterior parts are on the way. RevHub can fit anything it sells at its own workshop.",
    ],
    status: "live",
    url: "https://www.revhub.sg/",
    domain: "revhub.sg",
    facts: [
      { label: "Business", value: "Parts store and fitting workshop" },
      { label: "For", value: "Drivers upgrading their car" },
      {
        label: "Coverage",
        value: "Delivery across Singapore; fitting at RevHub’s workshop",
      },
    ],
    servicesHeading: "What it does",
    services: [
      {
        title: "Online parts store",
        text: "Customers shop by vehicle, and the listings show only the parts that fit their chassis.",
      },
      {
        title: "Big brake kits",
        text: "Brake kits and upgrades with brackets made for the chassis, supplied on their own or supplied and fitted.",
      },
      {
        title: "Fitting at its own workshop",
        text: "RevHub installs what it sells, with the appointment scheduled around the parts arriving.",
      },
      {
        title: "More categories to come",
        text: "Rims, headlights, ambient lighting, seats, steering wheels and exterior modifications.",
      },
    ],
    promisesHeading: "What customers can count on",
    promises: [
      {
        title: "Fitment checked by hand",
        text: "Every order is verified against your chassis before it ships.",
      },
      {
        title: "Lead time before you pay",
        text: "You know how long a part will take before you commit.",
      },
      {
        title: "Fitted in-house",
        text: "Installed by the people who sell the part.",
      },
      {
        title: "Delivered across Singapore",
        text: "Parts are delivered anywhere on the island.",
      },
    ],
    cta: {
      heading: "Shop by vehicle.",
      text: "Choose your car and browse the parts that fit at revhub.sg.",
      label: "Visit revhub.sg",
    },
    work: "Fitting parts in the workshop, checking fitment by hand and running the online store.",
    model: "Online retail with in-house fitting.",
  },
  {
    slug: "the-car-lounge",
    name: "The Car Lounge",
    stage: { number: "03", label: "Maintain" },
    category: "Service booking",
    tagline: "A booking desk for workshops and car services.",
    need: "Book a workshop or service",
    summary:
      "The Car Lounge will be a remote booking desk for workshops and automotive services. It is in development.",
    seo: "The Car Lounge will be a remote booking desk for workshops and automotive services in Singapore. It is in development.",
    intro:
      "The Car Lounge will be the group’s remote booking desk for workshops and automotive services. It is in development.",
    description: [
      "Booking a workshop or a car service should be as easy as booking a place to stay. That is the idea behind The Car Lounge.",
      "For workshops and service providers, it will act as a remote booking desk.",
    ],
    status: "coming-soon",
    domain: "thecarlounge.sg",
    facts: [
      { label: "Business", value: "Booking desk for automotive services" },
      { label: "For", value: "Drivers, workshops and service providers" },
      { label: "Coverage", value: "Singapore" },
    ],
    servicesHeading: "The idea",
    services: [
      {
        title: "Remote booking",
        text: "Drivers will book a workshop or an automotive service remotely.",
      },
      {
        title: "Like booking a place to stay",
        text: "The model is one travellers already know: see what is on offer, then book it.",
      },
      {
        title: "A booking desk for providers",
        text: "Workshops and service providers will take their bookings through The Car Lounge.",
      },
    ],
    promisesHeading: "What customers can count on",
    promises: [],
    cta: {
      heading: "Interested in The Car Lounge?",
      text: "It is still being built. If you are a driver or a workshop and would like to hear more, send us a note.",
      label: "Register your interest",
    },
    work: "Building and launching the booking desk, and bringing workshops and service providers onto it.",
    model: "Booking desk for automotive services, in development.",
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    stage: { number: "04", label: "Recover" },
    category: "Towing and roadside help",
    tagline: "24/7 towing and roadside help, island-wide.",
    need: "Get a tow or roadside help",
    summary:
      "Golden Hour sends tow trucks and roadside help anywhere in Singapore, at any hour. You see an estimate in about a minute, and the price is confirmed before a truck sets off.",
    seo: "Golden Hour sends tow trucks and roadside help anywhere in Singapore, at any hour, and confirms the price before a truck sets off.",
    intro:
      "Golden Hour is the group’s towing, recovery and roadside help business.",
    description: [
      "It operates anywhere in Singapore, 24 hours a day, for cars, vans and small lorries. A request takes a few taps: what happened, where the vehicle is and where it is going. An estimate appears as the questions are answered.",
      "The price is confirmed before a truck is sent, and the driver’s name and plate appear on the customer’s phone. After an accident, Golden Hour takes the vehicle to the owner’s insurer or to a workshop of their choice, and its accident guide sets out what to report and when.",
    ],
    status: "live",
    url: "https://www.goldenhour.sg/",
    domain: "goldenhour.sg",
    facts: [
      { label: "Business", value: "Towing, recovery and roadside help" },
      {
        label: "For",
        value: "Drivers who are stuck, and vehicles that need moving",
      },
      { label: "Coverage", value: "Island-wide, 24 hours, every day" },
    ],
    servicesHeading: "What it does",
    services: [
      {
        title: "Towing",
        text: "Cars that have broken down or will not start, taken wherever the owner chooses. Tows to a workshop, inspection centre or scrapyard can be booked ahead.",
      },
      {
        title: "Accident recovery",
        text: "After a collision, to the owner’s insurer or to a workshop of their choice, with a guide to what to report and when.",
      },
      {
        title: "Car park and specialist recovery",
        text: "Basement and multi-storey car parks, winch-outs and crane recovery.",
      },
      {
        title: "Roadside help",
        text: "Battery jump-starts and replacements, tyre help, lockouts and fuel delivery.",
      },
    ],
    promisesHeading: "What customers can count on",
    promises: [
      {
        title: "No higher than your estimate",
        text: "Unless the job turns out different from what you described, and then only if you agree.",
      },
      {
        title: "ERP and car-park exit charges included",
        text: "They are part of the price you accept, never added afterwards.",
      },
      {
        title: "Free cancellation",
        text: "Until the driver is on the way.",
      },
      {
        title: "You will know it is the right truck",
        text: "The driver’s name, the truck and its plate are on your status page.",
      },
      {
        title: "No chase trucks, no commissions",
        text: "Your car goes wherever you choose. Golden Hour never recommends a workshop for a fee.",
      },
      {
        title: "All four wheels off the ground",
        text: "Every car, every time, with no surcharge for electric vehicles.",
      },
    ],
    cta: {
      heading: "Stuck right now?",
      text: "Request help at goldenhour.sg, at any hour.",
      label: "Visit goldenhour.sg",
    },
    work: "Operating tow trucks, dispatching jobs around the clock and helping drivers at the roadside.",
    model: "On-demand towing and roadside services.",
  },
  {
    slug: "export-sg",
    name: "export.sg",
    stage: { number: "05", label: "Export", afterCoe: true },
    category: "Vehicle export",
    tagline: "Singapore used cars, ready to export.",
    need: "Buy a car for export",
    summary:
      "export.sg sells Singapore used cars to overseas dealers and importers. Every car carries an open FOB price, a video and at least 25 photos, with the landed cost to the buyer’s port on request.",
    seo: "export.sg sells Singapore used cars to overseas dealers and importers, with an open FOB price, a video and at least 25 photos of every car.",
    intro: "export.sg is the group’s vehicle export business.",
    description: [
      "It buys cars at the end of their ten-year Certificate of Entitlement (COE), prepares them in a licensed export processing zone and ships them to dealers and individual buyers in Africa, the Caribbean, Oceania and Europe. Every unit lists its FOB price and the import rules for the buyer’s country; the landed cost to the buyer’s port is quoted on request.",
      "It also buys cars from Singapore owners whose COE is about to expire: send the plate number and an LTA Access Code, and an indicative offer follows within one business day.",
    ],
    status: "live",
    url: "https://www.export.sg/",
    domain: "export.sg",
    facts: [
      { label: "Business", value: "Vehicle export" },
      {
        label: "For",
        value: "Overseas dealers and importers; owners with an expiring COE",
      },
      {
        label: "Coverage",
        value: "Singapore to ports in Africa, the Caribbean, Oceania and Europe",
      },
    ],
    servicesHeading: "What it does",
    services: [
      {
        title: "Export stock with open prices",
        text: "Every unit lists its FOB price, with the CIF cost to your port on request.",
      },
      {
        title: "Shipping and documents",
        text: "Deregistration, export processing, booking the sailing and couriering the bill of lading and export papers.",
      },
      {
        title: "Import rules by country",
        text: "Each destination’s import regulations are checked and shown alongside the car.",
      },
      {
        title: "Buying cars with an expiring COE",
        text: "Owners get an indicative offer within one business day, and export.sg claims the PARF and COE rebates due when the car is deregistered.",
      },
    ],
    promisesHeading: "What buyers can count on",
    promises: [
      {
        title: "An open FOB price on every unit",
        text: "The number comes before the conversation.",
      },
      {
        title: "Video and at least 25 photos",
        text: "Every car is filmed and photographed before it is listed, wear included.",
      },
      {
        title: "Landed cost to your port",
        text: "CIF on request, with the next sailing.",
      },
      {
        title: "Payment only against a proforma invoice",
        text: "export.sg never asks for payment any other way.",
      },
    ],
    cta: {
      heading: "Browse export stock.",
      text: "See live units and open prices at export.sg.",
      label: "Visit export.sg",
    },
    work: "Sourcing and preparing cars, handling export documents and shipping, and working with buyers overseas.",
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
  { value: String(businesses.length), label: "Businesses in the group" },
  { value: "24/7", label: "Towing and roadside help", business: "Golden Hour" },
  { value: "15", label: "Destination countries listed", business: "export.sg" },
];
