export const navigation = [
  { label: "Products", href: "#products" },
  { label: "Cut Sheets", href: "#cut-sheets" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const homeContent = {
  hero: {
    eyebrow: "Electrical components",
    title: "The right components. A clear path forward.",
    description: "Explore electrical components, access technical information, and connect with Accretion Power about your project requirements.",
  },
  products: {
    title: "Find the right fit for your application.",
    description: "Start with the component. Get into the details. Let’s discuss what your project needs.",
    categories: [
      { name: "Current Transformers", description: "Components for current measurement and protection applications.", illustration: "transformer" },
      { name: "Bushings & Insulators", description: "Components for electrical isolation, connection, and support.", illustration: "insulator" },
      { name: "Electrical Accessories", description: "Supporting components to bring your assembly together.", illustration: "accessories" },
    ],
  },
  cutSheets: {
    title: "Technical details, easy to find.",
    description: "Find the information you need, without the extra steps. The planned cut-sheet library will let you locate documentation by product name or part number. No login required.",
  },
  estimates: {
    title: "From parts to a conversation.",
    description: "A straightforward way to bring your requirements together. Here’s how the estimate builder will work.",
    steps: [
      { title: "Select your parts and quantities.", description: "Build a list around your project requirements." },
      { title: "Submit your estimate for availability review.", description: "Ben will review your selected components and check stock." },
      { title: "Discuss your final quote with Accretion Power.", description: "Confirm pricing and availability directly before moving forward." },
    ],
  },
  about: {
    title: "Behind every part, a conversation.",
    description: "Accretion Power is an electrical component supplier. We’re building a straightforward way to explore parts, find technical information, and discuss your requirements directly.",
    support: "Have a part in mind or a requirement to work through? Talk with Ben, the owner, about the details of your project.",
  },
  contact: {
    title: "Let’s talk about your next project.",
    description: "Bring your part list, application details, or questions. Start a conversation about what you need.",
    // Add only Ben-approved contact details. Null keeps the honest preview visible.
    email: null as string | null,
    phone: null as { label: string; href: string } | null,
  },
};
