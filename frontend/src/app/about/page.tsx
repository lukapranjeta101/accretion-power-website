import type { Metadata } from "next";
import AboutPage from "@/features/about/about-page";
import { breadcrumbSchema, jsonLdString } from "@/lib/schema";

const title = "About Accretion Power | Pittsburgh Electrical Manufacturer";
const description =
  "Accretion Power brings electrical products, manufacturing expertise, and personal service together for North American utilities and global OEMs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { title, description },
};

const breadcrumbs = breadcrumbSchema([{ name: "About", path: "/about" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }} />
      <AboutPage />
    </>
  );
}
