import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site-config";
import { jsonLdString, organizationSchema, websiteSchema } from "@/lib/schema";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "@/styles/globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const title = "Accretion Power | Powering progress. Part by part.";
const description = "Electrical components, epoxy manufacturing, and supply-chain support for North American utilities and global OEMs. Based in Pittsburgh, Pennsylvania.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Accretion Power",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(websiteSchema) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
