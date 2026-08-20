import { Gauge, Bot, Workflow } from "lucide-react";
import type { Tier } from "@/data/website-packages";

export const digitalOpsPackages: Tier[] = [
  {
    icon: Gauge,
    name: "DASHBOARD",
    price: "$750+",
    tagline: "See your business.",
    features: [
      "Custom business dashboard",
      "One primary data source for the starting tier",
      "KPI cards, charts, and basic filters",
      "Responsive interface",
      "Deployment",
      "1 revision round",
    ],
    note: "Examples: Sales, operations, marketing, customer success, project tracking, inventory, reporting, security/threat intelligence.",
    pricingNote:
      "Driven primarily by data sources, data cleanup, integrations, user roles, refresh requirements, and custom logic.",
  },
  {
    icon: Bot,
    name: "DIGITAL ASSISTANT",
    price: "$1,200+",
    tagline: "Ask your business.",
    features: [
      "Custom AI assistant designed around the business",
      "Custom instructions and business context",
      "Knowledge/document integration where appropriate",
      "Defined assistant workflows",
      "Basic automation",
      "Deployment + testing",
      "Basic handoff documentation",
    ],
    note: "Examples: Internal knowledge assistant, FAQ assistant, document assistant, lead qualification assistant, customer-facing helper.",
    pricingNote:
      "Increases with knowledge sources, integrations, authentication, automation, and custom interfaces.",
  },
  {
    icon: Workflow,
    name: "AI OPERATIONS",
    price: "$3,500+",
    tagline: "Automate your business.",
    features: [
      "End-to-end operational workflow design",
      "AI-powered processing and decision steps",
      "Multiple connected tools or systems as scoped",
      "APIs / databases / automation integrations as needed",
      "Notifications, routing, reporting, or follow-up steps",
      "Testing + deployment",
      "Handoff documentation",
    ],
    note: "Examples: Lead intake, customer requests, reporting, document processing, support triage, CRM workflows, security workflows, recurring operational tasks.",
    pricingNote:
      "Increases with workflow complexity, number of connected systems, AI processing, APIs, data handling, and required reliability.",
  },
];

export const digitalOpsDisclaimer =
  "All Digital Ops pricing is a starting price — final pricing is confirmed after the project is scoped. Third-party subscriptions, API usage, hosting, and model usage fees are paid by the client unless otherwise agreed.";
