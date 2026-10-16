import type { MetadataRoute } from "next";
import { productFamilies } from "@/features/products/families";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/products", changeFrequency: "monthly", priority: 0.9 },
    { path: "/datasheets", changeFrequency: "monthly", priority: 0.8 },
    { path: "/approach", changeFrequency: "yearly", priority: 0.6 },
    { path: "/resources", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  ];

  routes.push(...productFamilies.map(family => ({ path: `/products/${family.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })));

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
