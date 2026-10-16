"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingFooter } from "@/components/layout/closing-footer";
import { usePageMotion } from "@/lib/hooks/use-page-motion";

const categories = [
  { name: "Getting started", items: [
    ["What does Accretion Power do?", "We bring electrical products, manufacturing expertise, and personal service together for North American utilities and global OEMs. Our team helps connect your component requirements with the right manufacturing capabilities."],
    ["Where are you based?", "We are based in Pittsburgh, Pennsylvania, serving North American utilities and OEM customers around the world."],
    ["How do I discuss a project?", "Email Benjamin Vietmeier at benjamin.vietmeier@accretionpower.com or call +1 412 510 6454. Share your drawings, part list, and application requirements so we can understand what you need."],
    ["What should I include in my enquiry?", "Start with the product or part name, your application, and any available drawings or specifications. Include the quantity and timing you are working toward so our team can discuss your requirements."],
  ] },
  { name: "Products & capabilities", items: [
    ["What products do you supply?", "Our product families include epoxy components, porcelain products, composite insulators, copper, bus boots, and castings. Browse our product catalog for the available component types and capabilities."],
    ["Where are your epoxy components manufactured?", "Our epoxy components are manufactured at our facility in India, with in-house tooling for custom designs and inventory managed locally in Pennsylvania."],
    ["What copper fabrication options do you offer?", "Our capabilities include custom cutting, milling, punching, and bending. We offer C110 copper bus bar in bare, tin-plated, or silver-plated finishes. Share your drawing to discuss the configuration you need."],
  ] },
  { name: "Custom requirements", items: [
    ["Can you help with custom components?", "Yes. We offer in-house tooling for epoxy components and custom copper fabrication. Share your drawings and application requirements so our team can discuss the right manufacturing capabilities."],
    ["Can you work from our drawings?", "Send your drawing or specification to start a conversation. We will discuss the materials, dimensions, application, and manufacturing requirements with you before confirming the next steps."],
    ["Do you offer engineering support?", "Our listed support capabilities include drawing and product revisions, title block updates, drawing detail and note updates, conversion to 3D models, and substation construction support. Contact us to discuss the scope of your project."],
  ] },
  { name: "Quotes & component selection", items: [
    ["What information should I provide when requesting a quote?", "Share the electrical ratings, dimensions, application details, and any drawings or specifications you have. The more detail you provide, the faster our team can evaluate your component and respond with options."],
    ["How do I choose the right insulator or bushing for my application?", "Start with your voltage and current requirements, then confirm creepage distance, mounting dimensions, and the operating environment. Share these details with our team and we will help match them to the right component."],
    ["What voltage and current ratings are available?", "Ratings vary by product family and configuration. Share your application's voltage and current requirements and our team will identify components that meet your specification."],
    ["Are your insulation components suitable for indoor or outdoor use?", "We supply components for both indoor and outdoor service. Let us know your operating environment, including exposure to weather and contamination, so we can recommend the right product."],
    ["Can you help identify a replacement for an existing or discontinued component?", "Yes. Send us the part number, drawing, or physical dimensions of the component you are replacing and our team will help identify a matching or retrofit option."],
    ["What testing and standards apply to the component I'm ordering?", "Testing and standards requirements depend on the product and your application. Share your specification with our team and we will confirm what applies to your order."],
    ["What are your payment terms and typical delivery times?", "Payment terms and delivery times vary by product and order volume. Contact our team with your part list and quantity so we can provide specifics for your order."],
  ] },
  { name: "Technical resources", items: [
    ["Where can I find datasheets and drawings?", "Visit our Datasheets page to browse available technical drawings and PDF resources. You can view or download the listed files directly from the site."],
    ["How do I find a specific component?", "Use the search on our Products page to look for a product name or application. The Datasheets page also has a search to help you find technical resources."],
    ["What if I cannot find the information I need?", "Contact our team with the part name, drawing reference, or specification you are looking for. We can discuss your requirements and help identify the next step."],
  ] },
];

export default function FaqPage() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  usePageMotion();
  const category = categories[categoryIndex];

  return <div id="top" className="faq-page">
    <SiteHeader />
    <main id="main-content" tabIndex={-1} className="faq-main section--dark">
      <div className="wrap faq-layout">
        <div className="faq-intro" data-reveal>
          <h1>FAQs</h1>
          <p>Everything you need to know about our components, capabilities, and working with us.</p>
          <div className="faq-categories" role="group" aria-label="FAQ categories">
            {categories.map((item, index) => <button key={item.name} type="button" aria-pressed={categoryIndex === index} aria-controls="faq-questions" onClick={() => { setCategoryIndex(index); setOpenIndex(0); }}>{item.name}</button>)}
          </div>
          <Link className="faq-resource-link" href="/resources">Explore our resources <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="faq-right">
          <section id="faq-questions" aria-label={`${category.name} questions`}>
            <p className="visually-hidden" role="status">{category.name}: {category.items.length} questions</p>
            {category.items.map(([question, answer], index) => {
              const open = openIndex === index;
              const id = `faq-${categoryIndex}-${index}`;
              return <div className="faq-item" key={id}>
                <h2><button id={`${id}-question`} className="faq-question" type="button" aria-expanded={open} aria-controls={`${id}-answer`} onClick={() => setOpenIndex(open ? null : index)}><span>{question}</span><span className="faq-symbol" aria-hidden="true">{open ? "−" : "+"}</span></button></h2>
                <div id={`${id}-answer`} className="faq-answer" role="region" aria-labelledby={`${id}-question`} hidden={!open}><p>{answer}</p></div>
              </div>;
            })}
          </section>
          <aside className="faq-support" aria-labelledby="faq-support-heading">
            <h2 id="faq-support-heading">Still have questions?</h2>
            <p>Bring us your drawing, part list, or next project. Our team is here to help you find the right next step.</p>
            <a className="button button--primary" href="mailto:benjamin.vietmeier@accretionpower.com?subject=Product%20question">Talk to our team <span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </div>
    </main>
    <ClosingFooter />
  </div>;
}
