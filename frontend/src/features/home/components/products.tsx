import { Section } from "@/components/layout/container";
import { SectionIntro, TextLink } from "@/components/ui/primitives";
import { homeContent } from "../content";
import { CategoryArt } from "./technical-art";

export function ProductCategory({ category, index }: { category: typeof homeContent.products.categories[number]; index: number }) {
  return <article className="product-category">
    <div className="product-image"><span className="product-index">0{index + 1}</span><CategoryArt kind={category.illustration} /></div>
    <h3>{category.name}</h3><p>{category.description}</p>
  </article>;
}

export function Products() {
  const content = homeContent.products;
  return <Section id="products" className="products"><SectionIntro label="01 / Product categories" title={content.title} description={content.description} />
    <div className="product-grid">{content.categories.map((category, index) => <ProductCategory key={category.name} category={category} index={index} />)}</div>
    <div className="section-footnote"><p>Category preview · Illustrations are conceptual. Product range to be confirmed.</p><TextLink href="#contact">Discuss a product requirement</TextLink></div>
  </Section>;
}
