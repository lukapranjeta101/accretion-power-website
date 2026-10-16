export type ProductEntryData = {
  name: string;
  /** Short note for an application example or variant mentioned in the product presentation — not a separate confirmed product. */
  note?: string;
  /** Application labels shown as small tags on the entry (e.g. Trip / Close / Wipe). */
  tags?: string[];
};

export type ProductSubgroup = {
  heading?: string;
  entries: ProductEntryData[];
};

export type ProductCategory = {
  id: string;
  name: string;
  label?: string;
  intro: string;
  subgroups: ProductSubgroup[];
  /** Short paragraph shown after the lists (e.g. bus bar lengths). */
  supportingNote?: string;
  /** Bullet list shown after the lists (e.g. fiberglass color options). */
  supportingDetails?: string[];
  /** Representative product photo/drawing from the supplied catalog assets, when one exists. */
  image?: string;
};

export const catalog: ProductCategory[] = [
  {
    id: "epoxy-components",
    name: "Epoxy Components",
    label: "Cast Resin Insulators, Bushings, and Components",
    image: "/images/epoxycomponents.jpg",
    intro:
      "Browse cast resin components, including post insulators, voltage detecting insulators, bushings, and miscellaneous epoxy components.",
    subgroups: [
      {
        heading: "Epoxy Insulators",
        entries: [
          { name: "Low Voltage Post Insulators" },
          {
            name: "Medium Voltage Post Insulators",
            note: "Application examples shown in the product presentation: Support Insulators, Tubular Insulators.",
          },
          { name: "Voltage Detecting Insulators — Resistive and Capacitive Types" },
        ],
      },
      {
        heading: "Epoxy Bushings",
        entries: [
          { name: "Epoxy Terminal Bushings" },
          { name: "Epoxy Oil Seal Bushings" },
          { name: "Transformer Bushings" },
          { name: "Primary Roof Bushings" },
          { name: "RMU Bushings" },
          { name: "Three-Phase Bushings" },
        ],
      },
      {
        heading: "Other Epoxy Components",
        entries: [
          { name: "R Y B Phase Spouts" },
          {
            name: "Epoxy Oil Insulator Component",
            note: "Related application shown in the product presentation: OIP Condenser Bushing Application.",
          },
          { name: "Miscellaneous Epoxy Components" },
        ],
      },
    ],
  },
  {
    id: "porcelain-products",
    name: "Porcelain Products",
    label: "Transmission and Distribution Insulators and Bushings",
    image: "/images/Porcelainproducts.png",
    intro: "Explore porcelain products for transmission and distribution, organized by component type.",
    subgroups: [
      {
        heading: "Transmission",
        entries: [
          { name: "Porcelain Hollow Core Insulators" },
          { name: "Porcelain Solid Core Post Insulators" },
          { name: "Porcelain Line Post Insulators" },
          { name: "Porcelain Long Rod / Disc Insulators" },
        ],
      },
      {
        heading: "Distribution",
        entries: [
          { name: "Porcelain Railway Insulators" },
          { name: "Porcelain Standoff Insulators" },
          { name: "Porcelain Spool Insulators" },
          { name: "Porcelain Guy Strain Insulators" },
          { name: "Porcelain Transformer Bushings" },
          { name: "Porcelain Pin Insulators" },
          { name: "Porcelain Suspension Insulators" },
          { name: "Porcelain Wall Bushings" },
        ],
      },
    ],
  },
  {
    id: "composite-insulators",
    name: "Composite Insulators",
    image: "/images/compositeinsulator.png",
    intro: "Browse composite insulators for transmission, railway, and metro applications.",
    subgroups: [
      {
        entries: [
          { name: "Composite Solid Core Post Insulators" },
          { name: "Composite Line Post Insulators" },
          {
            name: "Composite Long Rod Insulators",
            note: "Available for AC and DC applications, per the product presentation.",
          },
          { name: "Composite Railway and Metro Insulators" },
        ],
      },
    ],
  },
  {
    id: "copper-bus-bar",
    name: "Copper Bus Bar",
    image: "/images/copper.png",
    intro:
      "Bus bar options include bare copper, plated, and insulated configurations, with designs accommodating OEM-specific requirements.",
    subgroups: [
      {
        entries: [
          { name: "Silver-Plated Bus Bar" },
          { name: "Tin-Plated Bus Bar" },
          { name: "Bare Copper Bus Bar" },
          { name: "Insulated Bus Bar" },
        ],
      },
    ],
    supportingNote:
      "Standard 12-foot lengths in varying sizes are listed in the product presentation. Contact Accretion Power to discuss dimensions and OEM-specific requirements.",
  },
  {
    id: "oem-specific-castings",
    name: "OEM-Specific Castings",
    image: "/images/castingsimage.png",
    intro: "OEM-specific A356-T6 aluminum castings using Gravity Die Casting (GDC) and Low Pressure Die Casting (LPDC).",
    subgroups: [
      {
        entries: [
          { name: "Flanges for Switchgear and In-Tank Tap Changers" },
          { name: "Interrupter Mounts" },
          { name: "Front / End Covers" },
        ],
      },
    ],
    // Internal placeholder — do not publish. Bus Boots are in scope for the site but are not
    // documented in the supplied product presentation. Add a confirmed entry (name, description,
    // category placement) once Ben supplies product information. Until then: "Bus Boots — product
    // information needed." Keep out of the public catalog below.
  },
  {
    id: "fiberglass-insulation-barriers",
    name: "Fiberglass Insulation Barriers",
    intro: "GPO-3 fiberglass insulation barriers with designs accommodating OEM-specific requirements.",
    subgroups: [{ entries: [{ name: "GPO-3 Fiberglass Insulation Barriers" }] }],
    supportingDetails: [
      "OEM-specific dimensions and withstand-voltage requirements",
      "Color options referenced in the presentation include red and gray",
    ],
  },
  {
    id: "springs",
    name: "Springs",
    intro:
      "Cold-wound springs for trip, close, and wipe applications, with designs accommodating OEM-specific requirements.",
    subgroups: [
      {
        entries: [
          {
            name: "Cold-Wound Springs",
            tags: ["Trip Applications", "Close Applications", "Wipe Applications"],
          },
        ],
      },
    ],
  },
];

export const engineeringSupport = [
  "Substation Construction Support — Below-Grade and Above-Grade",
  "Drawing and Product Revisions",
  "Title Block Revisions",
  "Drawing Detail and Note Updates",
  "Conversion to 3D Models",
];

const email = "benjamin.vietmeier@accretionpower.com";

export function requestInfoHref(productName: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(`Request Information: ${productName}`)}`;
}

/** Collapses formatting variants (bus bar / busbar, three-phase / 3-phase, GPO-3 / GPO3) to one token. */
export function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bthree\b/g, "3")
    .replace(/[^a-z0-9]/g, "");
}

export function entryHaystack(category: ProductCategory, subgroup: ProductSubgroup, entry: ProductEntryData): string {
  return [
    category.name,
    category.label,
    category.intro,
    subgroup.heading,
    entry.name,
    entry.note,
    ...(entry.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}
