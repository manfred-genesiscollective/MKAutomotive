/**
 * The choices offered in the site's enquiry forms. The server accepts only
 * these values, so the forms and the validation can never drift apart.
 */

import { businesses } from "./businesses";
import { partnerTypes } from "./site";

const businessNames = businesses.map((business) => business.name);

/** Contact page: "Subject" */
export const contactTopics: string[] = [
  ...businessNames,
  "Partnership",
  "Investment",
  "Careers",
  "Other",
];

/** Partners page: "Partnership type" */
export const partnershipOptions: string[] = [
  ...partnerTypes.map((type) => type.title),
  "Other",
];

/** Careers page: "Business of interest" */
export const careerInterests: string[] = [...businessNames, "Open to any"];
