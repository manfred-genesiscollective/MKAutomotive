/**
 * The choices offered in the site's enquiry forms. The server accepts only
 * these values, so the forms and the validation can never drift apart.
 */

import { businesses } from "./businesses";
import { partnerTypes } from "./site";

const businessNames = businesses.map((business) => business.name);

/** Contact page: "What is this about?" */
export const contactTopics: string[] = [
  ...businessNames,
  "Partnership",
  "Investing",
  "Careers",
  "Something else",
];

/** Partners page: "Partnership type" */
export const partnershipOptions: string[] = [
  ...partnerTypes.map((type) => type.title),
  "Something else",
];

/** Careers page: "Which business interests you?" */
export const careerInterests: string[] = [...businessNames, "Not sure yet"];
