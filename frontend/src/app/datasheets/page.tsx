import type { Metadata } from "next";
import DatasheetsPage from "@/features/datasheets/datasheets-page";
import { breadcrumbSchema, jsonLdString } from "@/lib/schema";

const title = "Datasheets & Technical Drawings | Accretion Power";
const description =
  "Browse insulator specifications and download technical drawings for the A20 Series, A30 Series, and individual Accretion Power insulators.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/datasheets" },
  openGraph: { title, description, url: "/datasheets" },
  twitter: { title, description },
};

const breadcrumbs = breadcrumbSchema([{ name: "Datasheets", path: "/datasheets" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }} />
      <DatasheetsPage />
    </>
  );
}
