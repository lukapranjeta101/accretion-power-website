"use client";

import Link from "next/link";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";


const steps: [string, string][] = [
  [
    "Manufacturing, connected.",
    "Our own epoxy manufacturing facility in India, supported by a wider network of manufacturers for porcelain, composite, and copper components. Instead of juggling separate suppliers and purchase orders for every material, you work with one partner who connects the right manufacturing capability to each requirement.",
  ],
  [
    "Closer to your next project.",
    "Locally managed inventory in Pennsylvania helps support shorter lead times and takes pressure off your purchasing team. Standard components don't have to wait on international freight before they reach your project, and your team spends less time chasing order status.",
  ],
  [
    "Built for your requirements.",
    "In-house tooling for epoxy components and custom copper fabrication, cutting, milling, punching, and bending, help turn your drawings into a practical production conversation. Share your application and requirements, and we'll work through what's buildable before it becomes a costly surprise later.",
  ],
  [
    "People, not handoffs.",
    "Work directly with Ben Vietmeier and a team with switchgear experience, not a rotating queue of account reps. The same point of contact follows your request from the first question through delivery, which means fewer repeated explanations and a better chance of catching a mismatched spec before it ships.",
  ],
];

function Arrow() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ButtonLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link className={`button ${className}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}

export default function ApproachPage() {
  usePageMotion();


  return (
    <div id="top">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="section--dark interior-main">
        <section className="catalog-hero wrap">
          <div className="section-marker">OUR APPROACH</div>
          <h1 data-reveal>A Better Way to Source Components</h1>
          <p className="intro-lede" data-reveal data-reveal-delay="100">
            How Accretion Power partners with utilities and OEMs to simplify procurement, shorten lead times, and
            keep requirements connected to the right manufacturing capability.
          </p>
        </section>

        <section className="approach section section--dark">
          <div className="wrap">
            <div className="approach-layout">
              <div className="approach-title" data-reveal>
                <h2>
                  More certainty.
                  <br />
                  Less complexity.
                </h2>
                <p>
                  Your purchasing process should move your business forward. We help connect the right manufacturing
                  capabilities to the right requirements.
                </p>
                <ButtonLink className="button--primary" href="/#contact">
                  Build a better supply chain
                </ButtonLink>
                <Link className="text-link" href="/products">
                  Browse the product catalog
                  <Arrow />
                </Link>
              </div>
              <div className="approach-steps">
                {steps.map(([title, description], i) => (
                  <article className="approach-step" key={title} data-reveal data-reveal-delay={i * 90}>
                    <span className="step-no">0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="help">
          <div className="wrap help-block" data-reveal>
            <h2>Ready to simplify your supply chain?</h2>
            <p>
              Tell us about your purchasing process and we&rsquo;ll help connect the right manufacturing capability to
              the right requirement.
            </p>
            <Link className="button button--primary" href="/#contact">
              Talk to our team
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <ClosingFooter />
    </div>
  );
}
