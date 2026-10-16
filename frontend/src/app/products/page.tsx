import type { Metadata } from "next";
import ProductsPage from "@/features/products/products-page";
import { breadcrumbSchema, jsonLdString } from "@/lib/schema";

const title = "Electrical Components & Insulators | Accretion Power";
const description =
  "Explore epoxy, porcelain, and composite insulators, copper bus bar, bus boots, and OEM-specific castings from Accretion Power.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: "/products" },
  twitter: { title, description },
};

const breadcrumbs = breadcrumbSchema([{ name: "Products", path: "/products" }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }} />
      <ProductsPage />
    </>
  );
}
