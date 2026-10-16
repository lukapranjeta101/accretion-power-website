"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/features/home/content";
import { ButtonLink } from "@/components/ui/primitives";
import { Container } from "./container";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const close = () => setOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return <header ref={header} className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
  }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <Container className="header-inner">
      <a className="wordmark" href="#top" aria-label="Accretion Power home">ACCRETION <span>POWER.</span></a>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}>
        <span>{open ? "Close" : "Menu"}</span><span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="primary-navigation" aria-label="Main navigation" className={`primary-nav ${open ? "is-open" : ""}`}>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <ButtonLink href="#contact" onClick={() => setOpen(false)}>Discuss Your Project</ButtonLink>
      </nav>
    </Container>
  </header>;
}
