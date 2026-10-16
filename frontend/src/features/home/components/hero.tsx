import { Container } from "@/components/layout/container";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { homeContent } from "../content";
import { TechnicalArt } from "./technical-art";

export function Hero() {
  const content = homeContent.hero;
  return <section className="hero" aria-labelledby="hero-title"><Container>
    <div className="hero-grid">
      <div className="hero-copy"><Eyebrow><span className="label-line" />{content.eyebrow}</Eyebrow>
        <h1 id="hero-title">{content.title.split(". ")[0]}.<br /><span>{content.title.split(". ").slice(1).join(". ")}</span></h1>
        <p>{content.description}</p><div className="hero-actions"><ButtonLink href="#products">Explore Products</ButtonLink><ButtonLink href="#cut-sheets" variant="secondary">Find Cut Sheets</ButtonLink></div>
      </div>
      <figure className="hero-figure"><TechnicalArt /><figcaption><span>FORM / CONNECTION</span><span>Abstract component study</span></figcaption></figure>
    </div>
    <div className="hero-bottom"><span>Built around your requirements.</span><a href="#products">Discover Accretion Power <span aria-hidden="true">↓</span></a></div>
  </Container></section>;
}
