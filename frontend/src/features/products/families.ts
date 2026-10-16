import { catalog, type ProductCategory } from "./content";

export type ProductFamily = ProductCategory & { slug: string; image: string };

const definitions = [
  { id: "epoxy-components", slug: "epoxy-components" },
  { id: "porcelain-products", slug: "porcelain-products" },
  { id: "composite-insulators", slug: "composite-insulators" },
  { id: "copper-bus-bar", slug: "copper", name: "Copper" },
  { id: "bus-boots", slug: "bus-boots" },
  { id: "oem-specific-castings", slug: "castings", name: "Castings" },
];

const busBoots: ProductCategory = {
  id: "bus-boots",
  name: "Bus Boots",
  image: "/images/busboots.png",
  intro: "Explore bus boots for your switchgear assembly. Share your application and drawings with our team to discuss the right configuration.",
  subgroups: [],
};

export const productFamilies: ProductFamily[] = definitions.map(definition => {
  const category = definition.id === "bus-boots" ? busBoots : catalog.find(item => item.id === definition.id)!;
  return { ...category, slug: definition.slug, name: definition.name ?? category.name, image: category.image! };
});
