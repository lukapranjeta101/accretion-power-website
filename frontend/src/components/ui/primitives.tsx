import type { ComponentProps, ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ButtonLink({ children, className = "", variant = "primary", ...props }: ComponentProps<"a"> & { variant?: "primary" | "secondary" }) {
  return <a className={`button button--${variant} ${className}`} {...props}>{children}<Arrow /></a>;
}

export function TextLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return <a className={`text-link ${className}`} {...props}>{children}<Arrow diagonal /></a>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionIntro({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="section-intro"><div><Eyebrow>{label}</Eyebrow><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}
