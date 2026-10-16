import Link from "next/link";
import InformationPage from "./information-page";

export type LegalSection = { id: string; title: string; paragraphs: string[]; bullets?: string[] };
export type LegalContent = { title: string; intro: string; sections: LegalSection[] };

export default function LegalPage({ title, intro, sections }: LegalContent) {
  return <InformationPage title={title} intro={intro}>
    <div className="legal-status"><span>Draft for review</span><p>Prepared October 8, 2026. These terms and disclosures are awaiting company review and are not yet the final published policy.</p></div>
    <div className="legal-layout">
      <nav className="legal-contents" aria-label={`${title} contents`}>
        <h2>On this page</h2>
        {sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
        <a href="#legal-contact">Contact us</a>
      </nav>
      <article className="legal-body">
        {sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>)}
        <section id="legal-contact" aria-labelledby="legal-contact-heading">
          <h2 id="legal-contact-heading">Contact us</h2>
          <p>For questions about this policy or a privacy request, contact Accretion Power, LLC.</p>
          <address>Pittsburgh, Pennsylvania, United States<br /><a href="mailto:benjamin.vietmeier@accretionpower.com">benjamin.vietmeier@accretionpower.com</a><br /><a href="tel:+14125106454">+1 412 510 6454</a></address>
          <p>Please include the name of this policy and enough information for us to understand your request. Do not send passwords, payment-card numbers, or sensitive personal information.</p>
        </section>
        <nav className="legal-related" aria-label="Related policies"><Link href="/terms-of-service">Terms of Service</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/cookie-policy">Cookie Policy</Link></nav>
      </article>
    </div>
  </InformationPage>;
}
