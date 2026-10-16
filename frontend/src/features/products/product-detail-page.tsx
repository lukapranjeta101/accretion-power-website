"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { usePageMotion } from "@/lib/hooks/use-page-motion";
import { productFamilies, type ProductFamily } from "./families";
import { requestInfoHref } from "./content";
import styles from "./product-detail-page.module.css";

export default function ProductDetailPage({ product }: { product: ProductFamily }) {
  usePageMotion();
  return <div id="top" className={`products-catalog ${styles.page}`}>
    <SiteHeader />
    <main id="main-content" tabIndex={-1} className="wrap">
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/products">All products</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span>
      </nav>
      <header className={styles.hero}>
        <div className={styles.copy}>
          <h1>{product.name}</h1>
          {product.label && <p className={styles.subtitle}>{product.label}</p>}
          <p className={styles.intro}>{product.intro}</p>
          <a className="button button--primary" href={requestInfoHref(product.name)}>Enquire about {product.name}</a>
        </div>
        <div className={styles.image}>
          <Image src={product.image} alt={product.name} width={1000} height={750} priority sizes="(max-width: 800px) 90vw, 52vw" />
        </div>
      </header>
      {product.subgroups.length > 0 && <section className={styles.options} aria-labelledby="options-heading">
        <div className={styles.sectionHeading}><h2 id="options-heading">Product options</h2><Link href="/datasheets">Browse datasheets</Link></div>
        {product.subgroups.map((group, index) => <div className={styles.group} key={group.heading ?? index}>
          {group.heading && <h3>{group.heading}</h3>}
          <ul>{group.entries.map(entry => <li key={entry.name}>
            <div><h4>{entry.name}</h4>{entry.note && <p>{entry.note}</p>}{entry.tags && <p>{entry.tags.join(" · ")}</p>}</div>
            <a href={requestInfoHref(entry.name)} aria-label={`Enquire about ${entry.name}`}>Enquire</a>
          </li>)}</ul>
        </div>)}
        {product.supportingNote && <p className={styles.note}>{product.supportingNote}</p>}
        {product.supportingDetails && <ul className={styles.note}>{product.supportingDetails.map(detail => <li key={detail}>{detail}</li>)}</ul>}
      </section>}
      {product.slug === "bus-boots" && <section className={styles.application} aria-labelledby="application-heading">
        <h2 id="application-heading">Discuss your application</h2>
        <div><p>Send your switchgear assembly drawings and project requirements to our team to discuss a bus boot configuration for your application.</p><a href={requestInfoHref(product.name)}>Send an enquiry</a></div>
      </section>}
      <nav className={styles.otherProducts} aria-label="Other product families">
        <h2>Explore other products</h2>
        <div>{productFamilies.filter(item => item.slug !== product.slug).map(item => <Link key={item.slug} href={`/products/${item.slug}`}>{item.name}</Link>)}</div>
      </nav>
    </main>
    <ClosingFooter />
  </div>;
}
