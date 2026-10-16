"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePageMotion } from "@/lib/hooks/use-page-motion";
import {
  a20Series,
  a30Series,
  datasheetSections,
  individualDrawings,
  individualRowHaystack,
  normalizeForSearch,
  seriesRowHaystack,
  type DatasheetFile,
  type IndividualDrawing,
  type SeriesRow,
  type SeriesSection,
} from "./content";

function Arrow() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function PdfActions({ file, label }: { file: DatasheetFile; label: string }) {
  return (
    <div className="datasheet-actions">
      <a href={file.href} target="_blank" rel="noopener noreferrer" aria-label={`View PDF for ${label}`}>
        View PDF
      </a>
      <a href={file.href} download={file.fileName} aria-label={`Download PDF for ${label}`}>
        Download PDF
      </a>
    </div>
  );
}

export default function DatasheetsPage() {
  const [query, setQuery] = useState("");
  usePageMotion();


  const normalizedQuery = normalizeForSearch(query.trim());
  const isSearching = normalizedQuery.length > 0;

  const seriesRowMatches = (section: SeriesSection, row: SeriesRow) =>
    !isSearching || normalizeForSearch(seriesRowHaystack(section, row)).includes(normalizedQuery);

  const individualRowMatches = (row: IndividualDrawing) =>
    !isSearching || normalizeForSearch(individualRowHaystack(row)).includes(normalizedQuery);

  const a20Match = a20Series.rows.some((row) => seriesRowMatches(a20Series, row));
  const a30Match = a30Series.rows.some((row) => seriesRowMatches(a30Series, row));
  const individualMatch = individualDrawings.some((row) => individualRowMatches(row));
  const noResults = isSearching && !a20Match && !a30Match && !individualMatch;

  return (
    <div id="top" className="datasheet-library">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="section--dark interior-main">
        <div className="datasheet-banner wrap" aria-hidden="true">
          {["/images/epoxycomponents.jpg", "/images/Porcelainproducts.png", "/images/castingsimage.png"].map(src => <Image key={src} src={src} alt="" width={800} height={260} sizes="33vw" />)}
        </div>
        <div className="datasheet-breadcrumb wrap"><Link href="/">Home</Link><span>/</span><span>Datasheets</span></div>
        <div className="datasheet-library-layout wrap">
          <aside className="datasheet-sidebar">
            <p className="eyebrow">Document library</p>
            <nav aria-label="Datasheet sections">
              {datasheetSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.navLabel}<span aria-hidden="true">↗</span></a>)}
            </nav>
            <div className="datasheet-sidebar-help"><p>Need a specific drawing?</p><Link href="/#contact">Talk to our team<Arrow /></Link></div>
            <Link className="datasheet-catalog-link" href="/products">Explore all products</Link>
          </aside>
          <div className="datasheet-library-content">
        <section className="datasheet-library-heading">
          <h1>Datasheets &amp; Technical Drawings</h1>
          <p>Search 12 downloadable PDFs by part number or series. Compare model dimensions and ratings, then view or download the drawing you need.</p>
          <div className="catalog-nav">
            <div className="search-field-wrap">
              <label className="visually-hidden" htmlFor="datasheet-search">
                Search by part number or series
              </label>
              <input
                id="datasheet-search"
                type="search"
                className="search-field"
                placeholder="Search by part number or series"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {isSearching && (
                <button type="button" className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                  Clear
                </button>
              )}
            </div>

          </div>
          <p className="no-results" hidden={!noResults} role="status">
            No datasheets matched &ldquo;{query}&rdquo;.{" "}
            <Link className="text-link" href="/#contact">
              Contact Accretion Power
            </Link>{" "}
            and we&rsquo;ll help you find the right drawing.
          </p>
        </section>

        {[a20Series, a30Series].map((series) => (
          <section className="section section--dark datasheet-group" id={series.id} key={series.id} hidden={isSearching && !series.rows.some((row) => seriesRowMatches(series, row))}>
            <div className="wrap">
              <div className="section-marker">{series.marker}</div>
              <div className="category-head">
                <div>
                  <h2>{series.name}</h2>
                  <p className="category-intro">{series.intro}</p>
                </div>
              </div>
              <div className="table-scroll" role="region" aria-label="Datasheet downloads" tabIndex={0}>
                <table className="spec-table">
                  <caption className="visually-hidden">{series.name} datasheet</caption>
                  <thead>
                    <tr>
                      <th scope="col">Datasheet</th>
                      <th scope="col">Models included</th>
                      <th scope="col">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{series.name}</th>
                      <td>
                        {series.rows.length} models in one PDF
                      </td>
                      <td><PdfActions file={series.file} label={series.name} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <details className="model-specifications" open>
                <summary>Compare model specifications</summary>
                <div className="table-scroll" role="region" aria-label={`${series.name} model specifications`} tabIndex={0}>
                  <table className="model-table">
                    <thead><tr><th scope="col">Model</th><th scope="col">Height (in)</th><th scope="col">Creepage (in)</th><th scope="col">System voltage (kV)</th><th scope="col">Impulse (kV)</th></tr></thead>
                    <tbody>{series.rows.filter(row => seriesRowMatches(series, row)).map(row => <tr key={row.id}><th scope="row">{row.id}</th><td>{row.heightIn}</td><td>{row.creepageIn}</td><td>{row.highestSystemVoltageKv}</td><td>{row.impulseVoltageKv}</td></tr>)}</tbody>
                  </table>
                </div>
              </details>
            </div>
          </section>
        ))}

        <section className="section section--dark datasheet-group" id="individual-drawings" hidden={isSearching && !individualMatch}>
          <div className="wrap">
            <div className="section-marker">03 / INDIVIDUAL INSULATOR DRAWINGS</div>
            <div className="category-head">
              <div>
                <h2>Individual Insulator Drawings</h2>
                <p className="category-intro">
                  Ten individual insulator drawings covering standoff, support, and indoor/outdoor applications, rated
                  from 2.5 kV to 75 kV, with insert-option variants noted where confirmed in the source drawing. Each
                  entry links to one PDF.
                </p>
              </div>
            </div>
            <div className="table-scroll" role="region" aria-label="Datasheet downloads" tabIndex={0}>
              <table className="spec-table">
                <caption className="visually-hidden">Individual insulator drawings</caption>
                <thead>
                  <tr>
                    <th scope="col">Part / Family Identifier</th>
                    <th scope="col">Description</th>
                    <th scope="col">Rated Voltage (kV)</th>
                    <th scope="col">Drawing</th>
                  </tr>
                </thead>
                <tbody>
                  {individualDrawings.map((row) => (
                    <tr key={row.id} hidden={isSearching && !individualRowMatches(row)}>
                      <th scope="row">
                        <a
                          className="part-link"
                          href={row.file.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View PDF for ${row.id}`}
                        >
                          {row.id}
                        </a>
                      </th>
                      <td>{row.description}</td>
                      <td>{row.ratedVoltageKv === null ? <span className="see-drawing">See drawing</span> : row.ratedVoltageKv}</td>
                      <td>
                        <PdfActions file={row.file} label={row.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section--dark datasheet-help" id="help">
          <div className="wrap help-block" data-reveal>
            <h2>Need help finding a drawing?</h2>
            <p>Contact Accretion Power with your part number or application requirements.</p>
            <Link className="button button--primary" href="/#contact">
              Contact Accretion Power
              <Arrow />
            </Link>
            <Link className="text-link" href="/products">
              Browse the full product catalog
              <Arrow />
            </Link>
          </div>
        </section>
          </div>
        </div>
      </main>
      <ClosingFooter />
    </div>
  );
}
