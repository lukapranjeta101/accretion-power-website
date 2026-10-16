import type { Metadata } from "next";
import LegalPage from "@/features/information/legal-page";
import { privacy } from "@/features/information/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Accretion Power",
  description: "Information handling, privacy choices, and contacting Accretion Power.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage {...privacy} />;
}
