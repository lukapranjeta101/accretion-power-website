import { siteUrl } from "./site-config";

// Next.js's documented JSON-LD approach (dangerouslySetInnerHTML) does not
// sanitize for XSS on its own; escaping "<" is the recommended mitigation.
// See: https://nextjs.org/docs/app/guides/json-ld
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Only confirmed facts are included here: no street address (none is
// published anywhere on the site or in project docs), no logo (the wordmark
// is explicitly marked temporary in docs/project-brief.md), no sameAs (no
// confirmed social profiles). Add these once they're confirmed, not before.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Accretion Power",
  legalName: "Accretion Power, LLC",
  url: siteUrl,
  email: "benjamin.vietmeier@accretionpower.com",
  telephone: "+1-412-510-6454",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pittsburgh",
    addressRegion: "PA",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Accretion Power",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export function breadcrumbSchema(pages: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...pages].map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${siteUrl}${path}`,
    })),
  };
}
