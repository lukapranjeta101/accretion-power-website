"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ClosingFooter } from "@/components/layout/closing-footer";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";
import { useHeroIntro } from "@/lib/hooks/use-hero-intro";
import { useReadingReveal } from "@/lib/hooks/use-reading-reveal";

const products = [
  { name: "Epoxy components", label: "ENGINEERED INSULATION", title: "Small components.\nCritical performance.", description: "Standoffs, insulators, thru bushings, and wall bushings for switchgear applications. Manufactured at our facility in India, with in-house tooling for custom designs.", tags: ["Standoffs", "LV / MV insulators", "Bushings"], image: "/images/epoxycomponents.jpg" },
  { name: "Porcelain products", label: "PROVEN MATERIALS", title: "Built to insulate.\nMade to endure.", description: "Porcelain standoffs, outdoor distribution insulators, ceramics, and transformer bushings. Find the right fit for your electrical application.", tags: ["Standoffs", "Outdoor distribution", "Transformer bushings"], image: "/images/Porcelainproducts.png" },
  { name: "Composite insulators", label: "OUTDOOR APPLICATIONS", title: "Insulation for\nthe world outside.", description: "Composite insulators for outdoor electrical applications. Work directly with our team to align your component selection with your project requirements.", tags: ["Composite insulation", "Outdoor applications"], image: "/images/compositeinsulator.png" },
  { name: "Copper", label: "CONDUCTIVITY, CONFIGURED", title: "Your connection.\nYour configuration.", description: "C110 copper bus bar in bare, tin-plated, or silver-plated finishes. Custom cutting, milling, punching, and bending to suit your design.", tags: ["C110 copper", "Bus bar", "Custom fabrication"], image: "/images/copper.png" },
  { name: "Bus boots", label: "SWITCHGEAR COMPONENTS", title: "The details that\ncomplete the system.", description: "Explore bus boots for your switchgear assembly. Share your application and drawings with our team to discuss the right configuration.", tags: ["Bus boots", "Application support"], image: "/images/busboots.png" },
  { name: "Castings", label: "MANUFACTURED TO YOUR DESIGN", title: "Complex requirements.\nConsidered solutions.", description: "Aluminum permanent mold and die castings for electrical applications, including current-carrying and pressure-retaining designs to OEM requirements.", tags: ["Permanent mold", "Die casting", "OEM designs"], image: "/images/castingsimage.png" },
];

function Arrow() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

function ButtonLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <Link className={`button ${className}`} href={href}>{children}<Arrow /></Link>;
}

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Keep the component index in sync with the card crossing the reading position.
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".product-story-card"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingPosition = window.innerHeight * .4;
      let current = 0;
      cards.forEach((card, index) => {
        if (card.getBoundingClientRect().top <= readingPosition) current = index;
      });
      setActiveIndex(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const heroRef = useRef<HTMLElement>(null);
  usePageMotion();
  useHeroIntro(heroRef);
  const testimonialQuoteRef = useRef<HTMLParagraphElement>(null);
  useReadingReveal(testimonialQuoteRef);


  const heroVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = heroVideo.current;
    if (!video) return;
    let inView = true;
    const updatePlayback = () => {
      if (inView && !document.hidden) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, []);

  return <div id="top" className="home-page">
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-heading" ref={heroRef}>
        <div className="hero-media">
          <video ref={heroVideo} src="/images/herosectionbackground.mp4" autoPlay muted loop playsInline aria-hidden="true" style={{ position: "absolute", inset: 0, objectPosition: "center bottom" }} />
        </div>
        <div className="hero-content">
          <div className="hero-bottom">
            <div className="hero-headline">
              <p className="eyebrow">THE COMPONENTS BEHIND YOUR POWER.</p>
              <h1 id="hero-heading">Powering <span className="accent">progress.</span><br />Part by part.</h1>
            </div>
            <div className="hero-cta">
              <p>Electrical components. Reliable partnerships.<br />A stronger supply chain for what comes next.</p>
              <ButtonLink className="button--primary" href="#products">Discover our products</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="intro section section--dark wrap" id="intro">
        <div className="intro-main">
          <h2 data-reveal>Progress starts with the right <span className="accent accent--highlight" data-highlight>partner.</span></h2>
          <div className="intro-copy">
            <p data-reveal-lines>Behind every reliable power system are components you can count on. And people who understand what&rsquo;s at stake. Accretion Power brings electrical products, manufacturing expertise, and personal service together for North American utilities and global OEMs. Whether you need a catalog standoff or a part built to your drawing, we help connect the right manufacturing capability to the requirement in front of you. From our base in Pittsburgh, Pennsylvania, we serve North American utilities and OEM customers around the world.</p>
          </div>
        </div>
        <div className="value-strip">
          <div data-reveal><span>01</span><h3>Quality components.</h3><p>Standard products. Custom capabilities. From stock bushings and insulators to parts built to your drawing.</p></div>
          <div data-reveal data-reveal-delay="80"><span>02</span><h3>A resilient supply chain.</h3><p>Global manufacturing. Local inventory. Epoxy components manufactured at our facility in India, with inventory managed locally in Pennsylvania.</p></div>
          <div data-reveal data-reveal-delay="160"><span>03</span><h3>A direct connection.</h3><p>Real expertise. Personal accountability. Work directly with a team that understands switchgear requirements.</p></div>
        </div>
      </section>
      <section className="testimonial section section--dark wrap" aria-labelledby="testimonial-heading">
        <div className="testimonial-layout">
          <div className="testimonial-details" data-reveal>
            <h2 className="testimonial-label" id="testimonial-heading">Testimonial</h2>
            <div className="testimonial-attribution">
              <span className="testimonial-monogram" aria-hidden="true">“</span>
              <p className="testimonial-name">Customer name</p>
              <p className="testimonial-role">Title / role</p>
              <p className="testimonial-company">Company name</p>
              <p className="testimonial-status">Placeholder — approved testimonial coming soon</p>
            </div>
          </div>
          <blockquote className="testimonial-quote">
            <span className="testimonial-quote-mark" aria-hidden="true">“</span>
            <p ref={testimonialQuoteRef}>An approved customer quote will appear here, sharing their experience with Accretion Power&rsquo;s components, manufacturing expertise, and personal service.</p>
          </blockquote>
        </div>
      </section>
      <section className="products section section--dark wrap" id="products" aria-labelledby="products-heading">
        <div className="product-story-layout">
          <div className="product-story-sidebar">
            <h2 id="products-heading">Every part.<br />A bigger purpose.</h2>
            <p>From insulation to conduction.<br />The building blocks of your next project.</p>
            <nav className="product-story-nav" aria-label="Product families">
              {products.map((item, index) => (
                <a key={item.name} href={`#product-card-${index}`} aria-current={activeIndex === index ? "location" : undefined}>
                  <span className="product-story-marker" aria-hidden="true" />{item.name}
                </a>
              ))}
            </nav>
            <Link className="text-link" href="/products">Browse the full catalog<Arrow /></Link>
          </div>
          <div className="product-story-cards">
            {products.map((item, index) => (
              <article className="product-story-card" id={`product-card-${index}`} aria-labelledby={`product-title-${index}`} key={item.name}>
                <div className="product-story-visual">
                  <Image src={item.image} alt="" fill sizes="(max-width: 899px) 90vw, 55vw" />
                </div>
                <div className="product-story-register"><span>{String(index + 1).padStart(2, "0")} / 06</span><span>{item.name}</span></div>
                <div className="product-story-copy">
                  <p className="eyebrow">{item.label}</p>
                  <h3 id={`product-title-${index}`}>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="custom-note-band">
        <div className="wrap custom-note">
          <span>Have a drawing? Let&rsquo;s make it a conversation.</span>
          <Link className="text-link" href="#contact">Talk to our team<Arrow /></Link>
        </div>
      </div>
      <section id="approach" className="approach section section--dark">
        <div className="wrap">
          <div className="approach-layout">
            <div className="approach-title" data-reveal>
              <h2>More certainty.<br />Less complexity.</h2>
              <p>Your purchasing process should move your business forward. We help connect the right manufacturing capabilities to the right requirements.</p>
              <ButtonLink className="button--primary" href="#contact">Build a better supply chain</ButtonLink>
            </div>
            <div className="approach-steps">
              {[
                ["Manufacturing, connected.", "Our own epoxy manufacturing facility in India, supported by a wider network of manufacturers. One partner to help simplify procurement."],
                ["Closer to your next project.", "Locally managed inventory in Pennsylvania helps support shorter lead times and takes pressure off your purchasing team."],
                ["Built for your requirements.", "In-house tooling for epoxy components and custom copper fabrication help turn your drawings into a practical production conversation."],
                ["People, not handoffs.", "Work directly with Ben Vietmeier and a team with switchgear experience. Clear communication from the first requirement to the next step."],
              ].map(([title, description], i) => <article className="approach-step" key={title} data-reveal data-reveal-delay={i * 90}><span className="step-no">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="about section section--dark wrap">
        <div className="about-grid">
          <div className="about-visual" data-reveal>
            <div className="photo photo--mono">
              <Image src="/images/Downtown-Pittsburgh-Pennsylvania-Fort-Pitt-Bridge-Monongahela.webp" alt="Downtown Pittsburgh and the Fort Pitt Bridge over the Monongahela River" width={1920} height={1080} sizes="(max-width: 899px) 100vw, 600px" />
            </div>
            <p className="about-caption">Small parts. Lasting connections.</p>
          </div>
          <div className="about-copy" data-reveal data-reveal-delay="120">
            <p className="eyebrow">PITTSBURGH ROOTS. GLOBAL CAPABILITIES.</p>
            <h2>Your growth.<br />Our purpose.</h2>
            <p>Accretion means growth through the addition of smaller parts. It&rsquo;s also how we think about partnership: every component, every conversation, every project adds up.</p>
            <p>Based in Pittsburgh, Pennsylvania, we supply electrical products with a simple focus&mdash;helping you build with confidence.</p>
            <Link className="text-link" href="#contact">Meet your next partner<Arrow /></Link>
            <div className="definition"><span>ac&middot;cre&middot;tion</span><span>/&#601;&#712;kr&#275;SH&#601;n/ &nbsp; noun<br />Growth through gradual addition.</span></div>
          </div>
        </div>
      </section>

    </main>
    <ClosingFooter />
  </div>;
}
