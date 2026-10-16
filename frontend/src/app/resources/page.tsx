import type { Metadata } from "next";
import Link from "next/link";
import InformationPage from "@/features/information/information-page";

export const metadata: Metadata = { title: "Resources | Accretion Power", description: "Product information, datasheets, and sourcing support from Accretion Power.", alternates: { canonical: "/resources" } };

export default function Page() {
  return <InformationPage title="Resources" intro="The information you need to move your next project forward.">
    <div className="resource-grid">
      {[
        ["Product catalog", "Explore electrical components, materials, and manufacturing capabilities.", "/products"],
        ["Datasheets & drawings", "Find technical information to support your component selection.", "/datasheets"],
        ["Our approach", "Learn how we connect manufacturing capabilities with your requirements.", "/approach"],
        ["Frequently asked questions", "Find answers about products, custom requirements, and contacting our team.", "/faq"],
      ].map(([title, description, href]) => <Link className="resource-link" key={href} href={href}><h2>{title}</h2><p>{description}</p><span>Explore →</span></Link>)}
    </div>
  </InformationPage>;
}
