import Link from "next/link";
import Image from "next/image";

const email = "benjamin.vietmeier@accretionpower.com";

export function ClosingFooter() {
  return (
    <footer className="footer closing-footer">
      <section className="closing-contact" id="contact" aria-labelledby="contact-heading">
        <div className="wrap closing-card">
          <div className="closing-copy" data-reveal>
            <h2 id="contact-heading">Great things start<br />with a connection.</h2>
            <p>Bring your drawings, part list, or next big challenge.<br />Let&rsquo;s put the right pieces together.</p>
            <Link className="button closing-button" href={`mailto:${email}?subject=Project%20enquiry`}>Start a conversation<span className="arrow-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></Link>
          </div>
          <div className="closing-globe" aria-hidden="true">
            <Image src="/images/earth-blue-marble.jpg" alt="" width={1024} height={1024} sizes="(max-width: 600px) 260px, 440px" />
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="closing-footer-grid">
          <div className="closing-company">
            <Link className="brand" href="/" aria-label="Accretion Power home">ACCRETION POWER</Link>
            <p>Quality components.<br />Stronger connections.</p>
            <p>Pittsburgh, Pennsylvania<br />Serving North America &amp; global OEMs</p>
            <address className="closing-details">
              <div><span>Phone number</span><a href="tel:+14125106454">+1 412 510 6454</a></div>
              <div><span>Email</span><a href={`mailto:${email}`}>{email}</a></div>
            </address>
          </div>
          <nav className="closing-links" aria-label="Footer company links">
            <h3>Quick links</h3>
            <Link href="/products">Products</Link>
            <Link href="/datasheets">Datasheets</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/approach">Our approach</Link>
            <Link href="/about">About us</Link>
            <a href={`mailto:${email}`}>Contact us</a>
          </nav>
          <nav className="closing-links" aria-label="Legal links">
            <h3>Legal</h3>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </nav>
        </div>
        <div className="closing-copyright">&copy; {new Date().getFullYear()} Accretion Power, LLC. All rights reserved.</div>
      </div>
    </footer>
  );
}
