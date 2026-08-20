export const serviceRules = {
  payment: {
    depositPercent: 50,
    summary:
      "A 50% deposit is required to begin the project. The remaining 50% is due before the website goes live.",
  },
  revisions: {
    SPARK: 1,
    FORM: 2,
    FORGE: 2,
    summary:
      "A revision round means one consolidated list of requested changes, not individual edits counted separately.",
  },
  content: {
    summary:
      "You provide final business information, text, images, logos, contact details, and social links. I can format and organize what you send, but writing new content isn't automatically included.",
  },
  timeline: {
    range: "1–3 weeks",
    summary:
      "Typical timeline is 1–3 weeks. The clock starts once I have your content/assets and the initial payment — delays getting materials to me can extend it.",
  },
  domain: {
    summary:
      "You own and maintain your domain and hosting accounts. I can help with setup, connection, configuration, and deployment.",
  },
  scopeChanges: {
    summary:
      "Anything outside your selected package is quoted separately before work begins. New pages, functionality, or major changes may need an updated quote.",
  },
  thirdParty: {
    summary:
      "You're responsible for subscription, hosting, domain, payment-processing, booking, newsletter, and email costs. I can help configure these when they're part of the project scope.",
  },
} as const;
