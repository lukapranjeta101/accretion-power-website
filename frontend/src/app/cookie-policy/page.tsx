import type { Metadata } from "next";
import LegalPage from "@/features/information/legal-page";
import { cookies } from "@/features/information/legal-content";

export const metadata: Metadata = {
  title: "Cookie Policy | Accretion Power",
  description: "Cookies, browser storage, and tracking technologies on the Accretion Power website.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage {...cookies} />;
}
