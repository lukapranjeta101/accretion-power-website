import Link from "next/link";

export function SiteFooter() {
  return <footer className="footer"><div className="wrap">
    <div className="footer-top">
      <Link className="brand" href="/" aria-label="Accretion Power home">ACCRETION POWER</Link>
      <p>Quality components.<br />Stronger connections.</p>
      <div><span className="eyebrow">GET IN TOUCH</span><a href="mailto:benjamin.vietmeier@accretionpower.com">benjamin.vietmeier@accretionpower.com</a><a href="tel:+14125106454">+1 412 510 6454</a></div>
      <a className="back-top" href="#top">Back to top ↑</a>
    </div>
    <nav className="footer-nav" aria-label="Footer navigation"><Link href="/products">Products</Link><Link href="/datasheets">Datasheets</Link><Link href="/#about">About us</Link><Link href="/#contact">Contact</Link></nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Accretion Power, LLC.</span><span>Pittsburgh, Pennsylvania · Serving North America &amp; global OEMs</span></div>
  </div></footer>;
}
