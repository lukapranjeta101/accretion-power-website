// Falls back to localhost so metadata/sitemap/robots still resolve to absolute
// URLs in local dev. Set NEXT_PUBLIC_SITE_URL once the production domain is known.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
