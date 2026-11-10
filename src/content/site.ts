/**
 * Group-level content and settings.
 *
 * Anything left as an empty string or empty list is simply not shown on the
 * site, so details can be filled in as they are confirmed.
 */

export const site = {
  name: "MK Automotive Group",
  /** Registered company name for the copyright line. */
  legalName: "MK Automotive Group",
  tagline: "Automotive specialists.",
  description:
    "MK Automotive Group is a Singapore holding company with specialist businesses across every aspect of automotive, from rental and parts to export and software.",
  country: "Singapore",

  /** Shown on the Contact page and in the footer when filled in. */
  contact: {
    /** For example "hello@example.sg" */
    email: "",
    /** For example "+65 6123 4567" */
    phone: "",
    /** Digits only with country code, for example "6581234567" */
    whatsapp: "",
    /** One line per entry, for example ["1 Example Road", "Singapore 123456"] */
    address: [] as string[],
  },

  /** For example { label: "LinkedIn", href: "https://www.linkedin.com/company/..." } */
  social: [] as { label: string; href: string }[],
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Businesses", href: "/businesses" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "Investors", href: "/investors" },
];

export const contactNav = { label: "Contact", href: "/contact" };

/**
 * The operating principles the group's businesses share, listed in one
 * sentence on the About page. The sentence is built from these titles, so
 * write each title as a short noun phrase.
 */
export const habits: { title: string; text: string }[] = [
  {
    title: "Transparent pricing.",
    text: "Prices are stated before commitment: an all-in rate at SwiftDrive, a confirmed price at Golden Hour, an open FOB price at export.sg.",
  },
  {
    title: "Service at the customer’s location.",
    text: "Rental cars are delivered, tow trucks attend anywhere on the island, and export vehicles are shipped to the buyer’s port.",
  },
  {
    title: "In-house operations.",
    text: "SwiftDrive owns its fleet, RevHub fits what it sells, and export.sg prepares and ships every vehicle itself.",
  },
  {
    title: "Documentation at every step.",
    text: "Photographs at every rental handover, the driver and plate confirmed before every tow, and a video with at least 25 photographs of every export unit.",
  },
];

/**
 * Who the group works with. Shown on the Partners page and offered as the
 * choices in its form. Each entry should describe something a business in
 * the group actually offers today, or say plainly that it does not yet.
 */
export const partnerTypes: { title: string; text: string }[] = [
  {
    title: "Workshops and service providers",
    text: "Receive bookings through The Car Lounge when it launches. Expressions of interest are open now.",
  },
  {
    title: "Overseas dealers and importers",
    text: "Source Singapore used vehicles through export.sg, with an open FOB price on every unit and the landed cost to your port on request.",
  },
  {
    title: "Vehicle owners",
    text: "Sell a vehicle with an expiring Certificate of Entitlement (COE) to export.sg. SwiftDrive is also considering leasing owners’ cars into its fleet; this is not yet offered, but interest can be registered.",
  },
  {
    title: "Companies and fleets",
    text: "Monthly rental from SwiftDrive, and towing and recovery from Golden Hour, for business vehicles.",
  },
];
