import type { Metadata } from "next";
import LegalPage from "@/features/information/legal-page";
import { terms } from "@/features/information/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service | Accretion Power",
  description: "Website use, technical resources, and business enquiries at Accretion Power.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage {...terms} />;
}
