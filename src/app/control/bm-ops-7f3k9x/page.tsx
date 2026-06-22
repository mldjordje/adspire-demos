import type { Metadata } from "next";
import { ControlDashboard } from "@/components/control-dashboard";
import { leads } from "@/data/leads";

export const metadata: Metadata = {
  title: "Outreach Control — Bad Mergentheim",
  robots: { index: false, follow: false },
};

export default function ControlPage() {
  return <ControlDashboard leads={leads} />;
}
