import { Section } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/primitives";
import { homeContent } from "../content";

function DocumentIcon() {
  return <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true"><path d="M5 2h9l6 6v18H5V2Z M14 2v7h6M9 15h7m-7 5h7" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
}

export function CutSheets() {
  return <Section id="cut-sheets" className="cut-sheets"><div className="split-layout">
    <div className="section-copy"><Eyebrow>02 / Technical resources</Eyebrow><h2>{homeContent.cutSheets.title}</h2><p>{homeContent.cutSheets.description}</p><div className="resource-note"><span aria-hidden="true">↗</span><div><strong>Information without barriers.</strong><span>Public access is part of the plan.</span></div></div></div>
    <div className="library-preview" aria-label="Noninteractive preview of the future cut-sheet library"><div className="preview-heading"><span>Cut-sheet library</span><span className="status-label">COMING LATER</span></div>
      <div className="search-preview"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" /></svg><span>Product name or part number</span><span className="search-tag">PREVIEW</span></div>
      <p className="preview-caption">DOCUMENT CATEGORIES</p><ul className="document-list">{homeContent.products.categories.map((category) => <li key={category.name}><DocumentIcon /><span>{category.name}<small>Documentation to be added</small></span><span className="document-type">PDF</span></li>)}</ul>
      <p className="preview-disclaimer">Design preview only. Search and downloads are not yet available.</p>
    </div>
  </div></Section>;
}
