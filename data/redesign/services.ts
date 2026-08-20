import {
  Monitor,
  Workflow,
  FlaskConical,
  Headset,
  Settings,
  Database,
  Brain,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type OrbitNode = {
  icon: LucideIcon;
  label: string;
};

export const orbitNodes: OrbitNode[] = [
  { icon: Monitor, label: "Website" },
  { icon: Workflow, label: "Workflows" },
  { icon: Settings, label: "Automation" },
  { icon: Database, label: "Data" },
  { icon: Brain, label: "AI & Tools" },
  { icon: TrendingUp, label: "Growth" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Monitor,
    title: "Web Design",
    description:
      "Beautiful, strategic websites that reflect your brand and convert your visitors.",
  },
  {
    icon: Workflow,
    title: "Business Operations",
    description:
      "Streamline your processes and create systems that save you time and sanity.",
  },
  {
    icon: FlaskConical,
    title: "Automation",
    description:
      "Automate the repetitive tasks so you can focus on what you do best.",
  },
  {
    icon: Headset,
    title: "Tech Support",
    description:
      "Reliable, human support for when technology gets weird (and it will).",
  },
];
