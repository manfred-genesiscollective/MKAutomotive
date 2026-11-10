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
  tagline: "The whole life of a car.",
  description:
    "MK Automotive Group is a Singapore holding company. Its businesses look after how a car is rented, upgraded, serviced, recovered and exported.",
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

/** The four habits the group's businesses share. Shown on the home page. */
export const habits: { title: string; text: string }[] = [
  {
    title: "The price comes first.",
    text: "SwiftDrive shows one all-in price before you book. Golden Hour confirms the cost before a truck sets off. export.sg publishes the FOB price on every car.",
  },
  {
    title: "We come to you.",
    text: "Rental cars are delivered to your door, tow trucks reach you anywhere on the island, and export cars are shipped to your port.",
  },
  {
    title: "We do the work ourselves.",
    text: "SwiftDrive rents its own cars. RevHub fits what it sells in its own workshop. export.sg prepares and ships each car itself.",
  },
  {
    title: "Proof before promises.",
    text: "Photos at every rental handover. The driver's name and plate on your phone before a tow. Video and at least 25 photos of every export car.",
  },
];

/** Who the group works with. Shown on the Partners page and in its form. */
export const partnerTypes: { title: string; text: string }[] = [
  {
    title: "Workshops and service providers",
    text: "Take bookings through The Car Lounge when it opens. Tell us what you offer and we will be in touch before launch.",
  },
  {
    title: "Parts brands and distributors",
    text: "Reach drivers in Singapore through RevHub, where every part is checked for fitment and can be fitted in-house.",
  },
  {
    title: "Overseas dealers and importers",
    text: "Source Singapore used cars through export.sg, with an open FOB price on every unit and the landed cost to your port.",
  },
  {
    title: "Car owners",
    text: "Lease your car to SwiftDrive, or sell a car with an expiring COE through export.sg.",
  },
  {
    title: "Companies and fleets",
    text: "Monthly rentals from SwiftDrive, and towing and recovery from Golden Hour, for the vehicles your business depends on.",
  },
  {
    title: "Founders and operators",
    text: "If you run an automotive business that would be stronger inside a group, we would like to hear about it.",
  },
];
