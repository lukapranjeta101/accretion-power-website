// Source PDFs live in public/datasheets/. Filenames here must match that folder exactly —
// see the "verify filenames" check in datasheets-page.tsx / the project README before editing.

export type DatasheetFile = {
  /** Exact filename as stored in public/datasheets/. */
  fileName: string;
  /** Browser-facing, URL-encoded path under the public folder. */
  href: string;
};

function toFile(fileName: string): DatasheetFile {
  return { fileName, href: `/datasheets/${encodeURIComponent(fileName)}` };
}

export type SeriesRow = {
  id: string;
  heightIn: number;
  creepageIn: number;
  highestSystemVoltageKv: number;
  impulseVoltageKv: number;
};

export type SeriesSection = {
  id: string;
  navLabel: string;
  name: string;
  marker: string;
  intro: string;
  file: DatasheetFile;
  rows: SeriesRow[];
};

export const a20Series: SeriesSection = {
  id: "a20-series",
  navLabel: "A20 Series",
  name: "A20 Series Epoxy Insulators",
  marker: "01 / A20 SERIES EPOXY INSULATORS",
  intro:
    "Nine A20 Series epoxy insulator models spanning 4.8 kV to 48.3 kV highest system voltage (60-200 kV impulse), in heights from 3.5 in to 14 in. One datasheet covers the full model range; expand the model list to see each identification number.",
  file: toFile("Accretion Power - A20 Epoxy Insulators Rev1.pdf"),
  rows: [
    { id: "N-005-0115", heightIn: 3.5, creepageIn: 4.53, highestSystemVoltageKv: 4.8, impulseVoltageKv: 60 },
    { id: "N-008-0162", heightIn: 4.5, creepageIn: 6.41, highestSystemVoltageKv: 8.3, impulseVoltageKv: 75 },
    { id: "N-015-0230", heightIn: 6, creepageIn: 9.06, highestSystemVoltageKv: 15, impulseVoltageKv: 95 },
    { id: "N-020-0311", heightIn: 7.5, creepageIn: 12.26, highestSystemVoltageKv: 20, impulseVoltageKv: 110 },
    { id: "N-025-0394", heightIn: 8.75, creepageIn: 15.51, highestSystemVoltageKv: 25, impulseVoltageKv: 125 },
    { id: "N-035-0485", heightIn: 10.5, creepageIn: 19.1, highestSystemVoltageKv: 38, impulseVoltageKv: 150 },
    { id: "N-035-0496", heightIn: 11, creepageIn: 19.55, highestSystemVoltageKv: 38, impulseVoltageKv: 150 },
    { id: "N-035-0562", heightIn: 12.75, creepageIn: 22.13, highestSystemVoltageKv: 38, impulseVoltageKv: 170 },
    { id: "N-045-0639", heightIn: 14, creepageIn: 25.17, highestSystemVoltageKv: 48.3, impulseVoltageKv: 200 },
  ],
};

export const a30Series: SeriesSection = {
  id: "a30-series",
  navLabel: "A30 Series",
  name: "A30 Series Epoxy Insulators",
  marker: "02 / A30 SERIES EPOXY INSULATORS",
  intro:
    "Eight A30 Series epoxy insulator models spanning 8.3 kV to 48.3 kV highest system voltage (75-200 kV impulse), in heights from 4.5 in to 14 in. One datasheet covers the full model range; expand the model list to see each identification number.",
  file: toFile("Accretion Power - A30 Epoxy Insulators.pdf"),
  rows: [
    { id: "N-008-0158", heightIn: 4.5, creepageIn: 6.23, highestSystemVoltageKv: 8.3, impulseVoltageKv: 75 },
    { id: "N-015-0239", heightIn: 6, creepageIn: 9.45, highestSystemVoltageKv: 15, impulseVoltageKv: 95 },
    { id: "N-020-0295", heightIn: 7.5, creepageIn: 11.62, highestSystemVoltageKv: 20, impulseVoltageKv: 110 },
    { id: "N-025-0373", heightIn: 8.75, creepageIn: 14.68, highestSystemVoltageKv: 25, impulseVoltageKv: 125 },
    { id: "N-035-0462", heightIn: 10.5, creepageIn: 18.18, highestSystemVoltageKv: 38, impulseVoltageKv: 150 },
    { id: "N-035-0468", heightIn: 11, creepageIn: 18.44, highestSystemVoltageKv: 38, impulseVoltageKv: 150 },
    { id: "N-035-0556", heightIn: 12.75, creepageIn: 21.91, highestSystemVoltageKv: 38, impulseVoltageKv: 170 },
    { id: "N-045-0608", heightIn: 14, creepageIn: 23.96, highestSystemVoltageKv: 48.3, impulseVoltageKv: 200 },
  ],
};

export type IndividualDrawing = {
  /** Full part / family identifier, including any suffix. Never truncate or infer from this. */
  id: string;
  description: string;
  /** kV, or null when the source drawing carries conflicting voltage labels (see notes below). */
  ratedVoltageKv: number | null;
  file: DatasheetFile;
  /** Insert-option part numbers confirmed present in the source drawing's own table — for search only. */
  aliases?: string[];
};

export const individualDrawings: IndividualDrawing[] = [
  {
    id: "N-002-0082",
    description: "Epoxy insulator — UNC and metric insert options",
    ratedVoltageKv: 2.5,
    file: toFile("Accretion Power - N-002-0082.pdf"),
    // Confirmed in the drawing's UNC/metric thread-style table (aluminum and steel inserts).
    aliases: [
      "N-002-0082-AAR-101",
      "N-002-0082-ASR-101",
      "N-002-0082-AAR-201",
      "N-002-0082-ASR-201",
      "N-002-0082-AAR-301",
      "N-002-0082-ASR-301",
      "N-002-0082-AAR-501",
      "N-002-0082-ASR-501",
      "N-002-0082-AAR-601",
      "N-002-0082-ASR-601",
      "N-002-0082-AAR-701",
      "N-002-0082-ASR-701",
    ],
  },
  {
    id: "N-015-0239-ASG-004",
    description: "Indoor / outdoor insulator",
    ratedVoltageKv: 15,
    file: toFile("Accretion Power - N-015-0239-ASG-004.pdf"),
  },
  {
    id: "N-015-0240-BBB-101",
    description: "Cycloaliphatic epoxy insulator",
    ratedVoltageKv: 13.5,
    file: toFile("Accretion Power - N-015-0240-BBB-101.pdf"),
  },
  {
    id: "N-015-0241-ASR",
    description: "Support insulator — stainless steel insert options",
    ratedVoltageKv: 13.5,
    file: toFile("Accretion Power - N-015-0241-ASR.pdf"),
    // Confirmed in the drawing's UNC thread-style table (SS 304 inserts).
    aliases: ["N-015-0241-ASR-101", "N-015-0241-ASR-301"],
  },
  {
    id: "N-020-0295-BSG-004",
    description: "Indoor / outdoor insulator",
    ratedVoltageKv: 20,
    file: toFile("Accretion Power - N-020-0295-BSG-004.pdf"),
  },
  {
    id: "N-025-0348-BAG-105",
    description: "Insulator",
    ratedVoltageKv: 25,
    file: toFile("Accretion Power - N-025-0348-BAG-105.pdf"),
  },
  {
    id: "N-025-0413-BSG-004",
    description: "Standoff insulator",
    ratedVoltageKv: 25,
    file: toFile("Accretion Power - N-025-0413-BSG-004.pdf"),
  },
  {
    id: "N-035-0555-BBB-1C3",
    description: "Support insulator",
    // Data accuracy: the source drawing's title reads "33KV Support Insulator" while its
    // rated-voltage note reads 36kV. Values conflict within the document itself — display
    // "See drawing" until the business confirms which figure is authoritative.
    ratedVoltageKv: null,
    file: toFile("Accretion Power - N-035-0555-BBB-1C3.pdf"),
  },
  {
    id: "N-035-0720-BSG-405",
    description: "Support insulator",
    // Data accuracy: the source drawing's title reads `15" - 35KV Support Insulator` while its
    // rated-voltage note reads 34.5kV. Values conflict within the document itself — display
    // "See drawing" until the business confirms which figure is authoritative.
    ratedVoltageKv: null,
    file: toFile("Accretion Power - N-035-0720-BSG-405.pdf"),
  },
  {
    id: "N-075-0800-BSG-405",
    description: "Support insulator",
    ratedVoltageKv: 75,
    file: toFile("Accretion Power - N-075-0800-BSG-405.pdf"),
  },
];

export const datasheetSections: { id: string; navLabel: string }[] = [
  { id: a20Series.id, navLabel: a20Series.navLabel },
  { id: a30Series.id, navLabel: a30Series.navLabel },
  { id: "individual-drawings", navLabel: "Individual Drawings" },
];

/** Collapses case and strips all non-alphanumeric characters, so hyphenation never affects matching. */
export function normalizeForSearch(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function seriesRowHaystack(section: SeriesSection, row: SeriesRow): string {
  return [section.name, section.navLabel, row.id].join(" ");
}

export function individualRowHaystack(row: IndividualDrawing): string {
  return [row.id, row.description, ...(row.aliases ?? [])].join(" ");
}
