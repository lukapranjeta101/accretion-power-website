import type { Metadata } from "next";
import FaqPage from "@/features/faq/faq-page";

export const metadata: Metadata = { title: "Frequently Asked Questions | Accretion Power", description: "Answers about Accretion Power’s electrical components, manufacturing, and project enquiries.", alternates: { canonical: "/faq" } };

export default function Page() { return <FaqPage />; }
