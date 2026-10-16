import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productFamilies } from "@/features/products/families";
import ProductDetailPage from "@/features/products/product-detail-page";
import { breadcrumbSchema, jsonLdString } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productFamilies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productFamilies.find(item => item.slug === slug);
  if (!product) notFound();
  const title = `${product.name} | Accretion Power`;
  const url = `/products/${slug}`;
  return {
    title, description: product.intro, alternates: { canonical: url },
    openGraph: { title, description: product.intro, url, images: [product.image] },
    twitter: { title, description: product.intro },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = productFamilies.find(item => item.slug === slug);
  if (!product) notFound();
  const breadcrumbs = breadcrumbSchema([
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${slug}` },
  ]);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }} />
    <ProductDetailPage product={product} />
  </>;
}
