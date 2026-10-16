import { Section } from "@/components/layout/container";
import { Eyebrow, TextLink } from "@/components/ui/primitives";
import { homeContent } from "../content";

export function About() {
  return <Section id="about" className="about"><div className="about-grid">
    <figure className="about-visual"><div className="architectural-lines" aria-hidden="true"><span /><span /><span /><span /><span /></div><div className="about-monogram" aria-hidden="true">AP<span> / </span></div><figcaption><span>A direct connection.</span><small>Company / team photography to come</small></figcaption></figure>
    <div className="section-copy"><Eyebrow>04 / About Accretion Power</Eyebrow><h2>{homeContent.about.title}</h2><p>{homeContent.about.description}</p><p>{homeContent.about.support}</p><TextLink href="#contact">Let’s discuss your requirements</TextLink></div>
  </div></Section>;
}
