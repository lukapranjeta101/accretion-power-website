import type { NextConfig } from "next";
import path from "node:path";

// 'unsafe-inline' is required for script-src/style-src because the App
// Router injects inline RSC hydration bootstrap scripts and this codebase
// uses React inline style={{}} throughout (e.g. the hero video). A stricter
// nonce-based CSP is possible via middleware but isn't configured here.
//
// 'unsafe-eval' is added to script-src ONLY in development: Next/React's dev
// mode uses eval() for HMR and call-stack reconstruction (React's own error
// message is explicit that "React will never use eval() in production
// mode"), so omitting it broke every dev-mode page with a CSP console error
// without weakening the production policy at all.
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
