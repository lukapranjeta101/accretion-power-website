import { navigation } from "@/features/home/content";
import { Container } from "./container";

export function Footer() {
  return <footer className="site-footer"><Container>
    <div className="footer-main"><div><a className="wordmark" href="#top">ACCRETION <span>POWER.</span></a><p>Electrical components.<br />Straightforward conversations.</p></div>
      <nav aria-label="Footer navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    </div>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} Accretion Power. All rights reserved.</small><span className="eyebrow">Components. Clarity. Connection.</span></div>
  </Container></footer>;
}
