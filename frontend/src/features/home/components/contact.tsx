import { Section } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/primitives";
import { homeContent } from "../content";

export function Contact() {
  const content = homeContent.contact;
  return <Section id="contact" className="contact"><div className="contact-grid"><div><Eyebrow>05 / Start a conversation</Eyebrow><h2>{content.title}</h2><p>{content.description}</p></div>
    <div className="contact-details"><span className="contact-plus" aria-hidden="true">+</span><h3>Connect with Accretion Power</h3>{content.email || content.phone ? <address>{content.email && <a href={`mailto:${content.email}`}>{content.email}</a>}{content.phone && <a href={content.phone.href}>{content.phone.label}</a>}</address> : <><span className="status-label">CONTACT DETAILS PENDING</span><p>Verified email and phone details will appear here once confirmed by Ben.</p><small>Development preview</small></>}</div>
  </div></Section>;
}
