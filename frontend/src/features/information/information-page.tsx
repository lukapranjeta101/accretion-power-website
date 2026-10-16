"use client";

import type { ReactNode } from "react";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";



export default function InformationPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  usePageMotion();


  return (
    <div id="top" className="information-page">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="information-main section--dark">
        <div className="wrap">
          <div className="information-heading" data-reveal>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <div className="information-content">{children}</div>
        </div>
      </main>
      <ClosingFooter />
    </div>
  );
}
