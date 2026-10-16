"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { productFamilies } from "@/features/products/families";
import { useScrolled } from "@/lib/hooks/use-scrolled";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsToggle = useRef<HTMLButtonElement>(null);
  const closeMenus = () => { setOpen(false); setProductsOpen(false); };
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const scrolled = useScrolled(50);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 900px)");
    const close = () => { setOpen(false); setProductsOpen(false); };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) close();
    };
    desktop.addEventListener("change", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  return <>
    <Link className="skip-link" href="#main-content" onNavigate={() => document.getElementById("main-content")?.focus({ preventScroll: true })}>Skip to content</Link>
    <header ref={header} className={`site-header${scrolled ? " is-scrolled" : ""}`} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
    }} onKeyDown={event => {
      if (event.key === "Escape" && productsOpen) { setProductsOpen(false); productsToggle.current?.focus(); event.stopPropagation(); return; }
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="header-inner">
        <Link className="brand" href={pathname === "/" ? "#top" : "/"} aria-label="Accretion Power home">ACCRETION POWER</Link>
        <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="primary-nav" onClick={() => { setOpen(!open); setProductsOpen(false); }}>{open ? "Close" : "Menu"}</button>
        <nav id="primary-nav" aria-label="Main navigation" className={open ? "nav-open" : ""}>
          <div className="nav-links">
            <div className="nav-products" onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false);
            }}>
              <div className="nav-products-control">
                <Link href="/products" aria-current={pathname === "/products" ? "page" : undefined} data-active={pathname.startsWith("/products")} onClick={closeMenus}>Products</Link>
                <button ref={productsToggle} type="button" aria-label="Toggle product pages" aria-expanded={productsOpen} aria-controls="product-pages" onClick={() => setProductsOpen(!productsOpen)} onKeyDown={event => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setProductsOpen(true);
                    requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#product-pages a")?.focus());
                  }
                }}>
                  <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>
                </button>
              </div>
              <ul id="product-pages" className="nav-products-list" hidden={!productsOpen}>
                {productFamilies.map(product => <li key={product.slug}><Link href={`/products/${product.slug}`} aria-current={pathname === `/products/${product.slug}` ? "page" : undefined} onClick={closeMenus}>{product.name}</Link></li>)}
              </ul>
            </div>
            {[["Datasheets", "/datasheets"], ["Our approach", "/approach"], ["About us", "/about"]].map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={closeMenus}>{label}</Link>)}
          </div>
          <Link className="nav-contact" href="#contact" onClick={closeMenus}>Let&rsquo;s talk</Link>
        </nav>
      </div>
    </header>
  </>;
}
