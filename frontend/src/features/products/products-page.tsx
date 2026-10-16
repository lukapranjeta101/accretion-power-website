"use client";

import styles from "./products-page.module.css";
import Image from "next/image";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";
import Link from "next/link";
import { productFamilies } from "./families";

export default function ProductsPage() {
  usePageMotion();

  return <div id="top" className={`products-catalog ${styles.redesign}`}>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <header className="pc-heading wrap">
        <div className={styles.introduction}>
          <div>
            <p className={styles.introLabel}>Our products</p>
            <h1>Components for<br />your next connection.</h1>
          </div>
          <p className={styles.introCopy}>Explore electrical components for utilities and OEMs, from insulators and bushings to copper bus bar and castings. Select a product family below to view available options and discuss your requirements with our team.</p>
        </div>
      </header>
      <section className={styles.productSection} aria-label="Product families">
        <div className={`wrap ${styles.familyGrid}`}>
          {productFamilies.map((family, index) => <Link
            className={styles.family}
            key={family.name}
            href={`/products/${family.slug}`}
            aria-label={`Explore ${family.name}`}
          >
            <div className={styles.familyImage}>
              <Image src={family.image} alt={family.name} width={900} height={600} sizes="(max-width: 580px) 90vw, (max-width: 900px) 44vw, 30vw" priority={index < 3} />
              <h2>{family.name}</h2>
            </div>
          </Link>)}
        </div>
      </section>
    </main>
    <ClosingFooter />
  </div>;
}
