import { Section } from "@/components/layout/container";
import { SectionIntro } from "@/components/ui/primitives";
import { homeContent } from "../content";

export function Estimates() {
  return <Section className="estimates" id="estimates"><SectionIntro label="03 / A simple next step" title={homeContent.estimates.title} description={homeContent.estimates.description} />
    <div className="process-heading"><span className="status-label">PLANNED ESTIMATE WORKFLOW</span><span className="muted">Not yet available</span></div>
    <ol className="process-grid">{homeContent.estimates.steps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
    <p className="estimate-note"><span aria-hidden="true">i</span> An estimate is preliminary, not an order or a final quote. Final pricing and availability are confirmed directly.</p>
  </Section>;
}
