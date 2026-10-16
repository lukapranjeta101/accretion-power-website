import type { Metadata } from "next";
import ApproachPage from "@/features/approach/approach-page";
import { breadcrumbSchema, jsonLdString } from "@/lib/schema";

const title = "Our Approach | Accretion Power";
const description =
  "How Accretion Power partners with utilities and OEMs to simplify procurement, shorten lead times, and match requirements to manufacturing capability.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/approach" },
  openGraph: { title, description, url: "/approach" },
  twitter: { title, description },
};

const breadcrumbs = breadcrumbSchema([{ name: "Our Approach", path: "/approach" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }} />
      <ApproachPage />
    </>
  );
}
