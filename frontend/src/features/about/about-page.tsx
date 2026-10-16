"use client";

import Image from "next/image";
import Link from "next/link";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";


function Arrow() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function AboutPage() {
  usePageMotion();


  return (
    <div id="top">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="section--dark interior-main">
        <section className="catalog-hero wrap">
          <div className="section-marker">ABOUT US</div>
          <h1 data-reveal>About Accretion Power</h1>
          <p className="intro-lede" data-reveal data-reveal-delay="100">
            Pittsburgh roots, global capabilities. Accretion Power brings electrical products, manufacturing
            expertise, and personal service together for North American utilities and global OEMs.
          </p>
        </section>

        <section className="about section section--dark wrap">
          <div className="about-grid">
            <div className="about-visual" data-reveal>
              <div className="photo photo--mono">
                <Image
                  data-parallax
                  src="/images/grid-landscape.avif"
                  alt="A sensor-equipped survey drone resting on snow-covered ground near a tree line"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 899px) 100vw, 600px"
                />
              </div>
              <p className="about-caption">Small parts. Lasting connections.</p>
            </div>
            <div className="about-copy" data-reveal data-reveal-delay="120">
              <p className="eyebrow">PITTSBURGH ROOTS. GLOBAL CAPABILITIES.</p>
              <h2>Your growth.<br />Our purpose.</h2>
              <p>
                Accretion means growth through the addition of smaller parts. It&rsquo;s also how we think about
                partnership: every component, every conversation, every project adds up.
              </p>
              <p>
                Based in Pittsburgh, Pennsylvania, we supply electrical products with a simple focus&mdash;helping you
                build with confidence.
              </p>
              <Link className="text-link" href="/#contact">
                Meet your next partner
                <Arrow />
              </Link>
              <Link className="text-link" href="/approach">
                See how we partner with utilities and OEMs
                <Arrow />
              </Link>
              <div className="definition">
                <span>ac&middot;cre&middot;tion</span>
                <span>
                  /&#601;&#712;kr&#275;SH&#601;n/ &nbsp; noun
                  <br />
                  Growth through gradual addition.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="help">
          <div className="wrap help-block" data-reveal>
            <h2>Ready to build the next chapter together?</h2>
            <p>Bring your drawings, part list, or next big challenge&mdash;we&rsquo;re ready to help.</p>
            <Link className="button button--primary" href="/#contact">
              Start a conversation
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <ClosingFooter />
    </div>
  );
}
