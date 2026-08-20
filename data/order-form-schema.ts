import { z } from "zod";

export const websiteTiers = ["SPARK", "FORM", "FORGE"] as const;
export const digitalOpsTypes = [
  "DASHBOARD",
  "DIGITAL_ASSISTANT",
  "AI_OPERATIONS",
] as const;

export const digitalOpsTypeLabels: Record<(typeof digitalOpsTypes)[number], string> = {
  DASHBOARD: "Dashboard",
  DIGITAL_ASSISTANT: "Digital Assistant",
  AI_OPERATIONS: "AI Operations",
};

export const goalOptions = [
  "More customers",
  "Generate leads",
  "Collect newsletter subscribers",
  "Showcase work",
  "Sell products",
  "Accept bookings",
  "Take orders",
  "Provide information",
  "Other",
] as const;

export const assetOptions = [
  "Logo",
  "Brand colors",
  "Brand fonts",
  "Photos",
  "Written website content",
  "Social media accounts",
  "Domain",
  "Hosting",
  "Nothing yet",
] as const;

export const functionalFeatureOptions = [
  "Online store",
  "Shopping cart",
  "Checkout",
  "Booking/scheduling",
  "Payment collection",
  "Client login/portal",
  "Interactive calculator/tool",
  "API integration",
  "Database functionality",
  "Other",
] as const;

export const timelineOptions = [
  { value: "ASAP", label: "ASAP" },
  { value: "TWO_WEEKS", label: "Within 2 weeks" },
  { value: "ONE_MONTH", label: "Within 1 month" },
  { value: "NO_DEADLINE", label: "No specific deadline" },
  { value: "SPECIFIC_DATE", label: "Specific launch date" },
] as const;

export const orderFormSchema = z
  .object({
    branch: z.enum(["website", "digitalOps"], {
      error: "Choose website or Digital Ops to continue",
    }),
    tier: z.enum(websiteTiers).optional(),
    wantsFunctionalAddOn: z.boolean().optional(),
    wantsStandardAddOn: z.boolean().optional(),
    digitalOpsType: z.enum(digitalOpsTypes).optional(),

    name: z.string().min(1, "Name is required"),
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z.string().optional(),
    businessWebsite: z.string().optional(),
    socialLinks: z.string().optional(),

    businessDescription: z
      .string()
      .min(10, "Tell me a bit more about your business (10+ characters)"),
    goals: z.array(z.enum(goalOptions)).min(1, "Pick at least one goal"),
    goalsOther: z.string().optional(),

    assets: z
      .array(z.enum(assetOptions))
      .min(1, 'Select at least one option (or "Nothing yet")'),
    assetsNotes: z.string().optional(),

    designStyle: z.string().optional(),
    inspirationLinks: z.string().optional(),

    functionalFeatures: z.array(z.enum(functionalFeatureOptions)).optional(),
    functionalFeaturesOther: z.string().optional(),
    functionalDescription: z.string().optional(),

    digitalOpsCurrentTools: z.string().optional(),
    digitalOpsDesiredOutcome: z.string().optional(),
    digitalOpsExistingAccounts: z.string().optional(),

    preferredLaunch: z.enum(
      ["ASAP", "TWO_WEEKS", "ONE_MONTH", "NO_DEADLINE", "SPECIFIC_DATE"],
      { error: "Choose a preferred timeline" },
    ),
    specificDate: z.string().optional(),

    // Honeypot — real users never fill this in. Left unconstrained here
    // so a bot that does fill it gets a normal-looking 200, not a 400
    // that would tip it off; the route handler checks it and drops
    // the submission silently instead.
    company_website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.branch === "website" && !data.tier) {
      ctx.addIssue({
        code: "custom",
        path: ["tier"],
        message: "Choose a package",
      });
    }
    if (data.branch === "digitalOps" && !data.digitalOpsType) {
      ctx.addIssue({
        code: "custom",
        path: ["digitalOpsType"],
        message: "Choose a Digital Ops type",
      });
    }

    if (needsFunctionalStep(data)) {
      if (data.branch === "website") {
        if (!data.functionalFeatures || data.functionalFeatures.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["functionalFeatures"],
            message: "Select at least one",
          });
        }
        if (!data.functionalDescription) {
          ctx.addIssue({
            code: "custom",
            path: ["functionalDescription"],
            message: "Tell me what it should do",
          });
        }
      } else {
        if (!data.digitalOpsCurrentTools) {
          ctx.addIssue({
            code: "custom",
            path: ["digitalOpsCurrentTools"],
            message: "This helps me scope the project",
          });
        }
        if (!data.digitalOpsDesiredOutcome) {
          ctx.addIssue({
            code: "custom",
            path: ["digitalOpsDesiredOutcome"],
            message: "This helps me scope the project",
          });
        }
      }
    }

    if (data.preferredLaunch === "SPECIFIC_DATE" && !data.specificDate) {
      ctx.addIssue({
        code: "custom",
        path: ["specificDate"],
        message: "Enter your target date",
      });
    }
  });

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export function needsFunctionalStep(
  values: Pick<
    Partial<OrderFormValues>,
    "branch" | "tier" | "wantsFunctionalAddOn"
  >,
) {
  return (
    values.branch === "digitalOps" ||
    (values.branch === "website" &&
      (values.tier === "FORGE" || Boolean(values.wantsFunctionalAddOn)))
  );
}

export type StepId =
  | "build"
  | "client"
  | "goals"
  | "assets"
  | "design"
  | "functional"
  | "timeline"
  | "review";

export const steps: {
  id: StepId;
  title: string;
  fields: (keyof OrderFormValues)[];
}[] = [
  {
    id: "build",
    title: "Choose Your Build",
    fields: [
      "branch",
      "tier",
      "wantsFunctionalAddOn",
      "wantsStandardAddOn",
      "digitalOpsType",
    ],
  },
  {
    id: "client",
    title: "Client Information",
    fields: [
      "name",
      "businessName",
      "email",
      "phone",
      "businessWebsite",
      "socialLinks",
    ],
  },
  {
    id: "goals",
    title: "Business + Goals",
    fields: ["businessDescription", "goals", "goalsOther"],
  },
  {
    id: "assets",
    title: "Existing Assets",
    fields: ["assets", "assetsNotes"],
  },
  {
    id: "design",
    title: "Design Direction",
    fields: ["designStyle", "inspirationLinks"],
  },
  {
    id: "functional",
    title: "Functional Requirements",
    fields: [
      "functionalFeatures",
      "functionalFeaturesOther",
      "functionalDescription",
      "digitalOpsCurrentTools",
      "digitalOpsDesiredOutcome",
      "digitalOpsExistingAccounts",
    ],
  },
  {
    id: "timeline",
    title: "Timeline",
    fields: ["preferredLaunch", "specificDate"],
  },
  {
    id: "review",
    title: "Review + Submit",
    fields: [],
  },
];

export function getActiveSteps(values: Partial<OrderFormValues>) {
  return steps.filter((step) => step.id !== "functional" || needsFunctionalStep(values));
}

export const defaultValues: Partial<OrderFormValues> = {
  goals: [],
  assets: [],
  functionalFeatures: [],
};
