import { ProductCategory, InstitutionalClient, ValueCard, StatItem, MilestoneItem, BrandPartner, EventItem, HeroSlide } from '../types';

export const COMPANY_INFO = {
  name: "NAFISA TRADERS",
  tagline: "DELIVERING QUALITY HEALTHCARE SOLUTIONS NATIONWIDE",
  taglineShort: "Delivering Quality Healthcare Solutions Nationwide",
  foundedYear: 2010,
  address: "Shop 4, 5 & 6, Kutchi Gali 2, Medicine Market, Densohall, Karachi, Pakistan",
  city: "Karachi",
  country: "Pakistan",
  phonePlaceholder: "+92 21 32473014 / +92 21 32435292",
  whatsappNumber: "923002433552",
  whatsappLink: "https://wa.me/923002433552",
  emailPlaceholder: "info@nafisatraders.com",
  businessHoursPlaceholder: "Mon - Sat: 9:00 AM - 7:00 PM PKT",
  aboutSummary: "Nafisa Traders is a premier importer, manufacturer, and distributor of specialty pharmaceuticals, sterile surgical disposables, and diagnostic supplies in Pakistan. Established in 2010 at the historic Densohall Medicine Market, Karachi, we empower leading government and private hospital networks, healthcare NGOs, and specialized institutes nationwide."
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "ESTABLISHED 2010 • DENSOHALL KARACHI",
    title: "Nationwide Healthcare Distribution & Import",
    highlightText: "Excellence",
    description: "Nafisa Traders provides direct hospital supply of specialty pharmaceuticals, sterile surgical disposables, and diagnostic equipment across all provinces of Pakistan.",
    primaryCtaText: "Explore Divisions",
    primaryCtaLink: "/products",
    secondaryCtaText: "Request Hospital Quote",
    secondaryCtaLink: "/contact",
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "slide-2",
    badge: "SPECIALTY PHARMACEUTICALS",
    title: "Oncology, Cardiology & Critical Care",
    highlightText: "Medicines",
    description: "Cold-chain compliant distribution of anti-cancer targeted therapies, cardiovascular formulations, and emergency ICU therapeutics directly to hospital pharmacies.",
    primaryCtaText: "View Oncology & Pharma",
    primaryCtaLink: "/products/oncology",
    secondaryCtaText: "Tender Compliance",
    secondaryCtaLink: "/quality-compliance",
    bgImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "slide-3",
    badge: "STERILE SURGICAL DISPOSABLES",
    title: "Infusion Therapy, Wound Care &",
    highlightText: "Hospital Supplies",
    description: "High-grade sterile hypodermic needles, IV cannulas, Foley catheters, surgical drapes, and infection control solutions verified for surgical precision.",
    primaryCtaText: "Surgical Disposables",
    primaryCtaLink: "/products/surgical-disposables",
    secondaryCtaText: "Clientele Network",
    secondaryCtaLink: "/clientele",
    bgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80"
  }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "oncology",
    slug: "oncology",
    title: "Oncology & Anti-Cancer Medicines",
    iconName: "Activity",
    departmentCode: "ONC",
    description: "Specialized chemotherapy, targeted anti-cancer pharmaceuticals and supportive oncology disposables.",
    detailedDescription: "Providing essential oncology formulations, monoclonal antibodies, and supportive surgical disposables to tertiary care hospitals and specialized cancer treatment centers across Pakistan.",
    keyProducts: [
      "Targeted Chemotherapy Formulations & Injectables",
      "Supportive Antiemetic & Immunomodulatory Care",
      "Infusion Sets & Chemotherapy Safety Disposables",
      "Specialized Diagnostic & Biopsy Supplies"
    ]
  },
  {
    id: "cardiology",
    slug: "cardiology",
    title: "Cardiology & Vascular Care",
    iconName: "HeartPulse",
    departmentCode: "CARD",
    description: "Cardiovascular therapies, anti-hypertensive formulations, and specialized vascular support products.",
    detailedDescription: "Delivering high-grade cardiovascular medicines, anti-arrhythmic agents, thrombolytic injectables, and interventional cardiology disposables to cardiac units and leading institutes.",
    keyProducts: [
      "Anti-Hypertensive & Beta-Blocker Compounds",
      "Anti-Coagulants & Thrombolytic Therapeutics",
      "Vascular Access & Catheter Disposables",
      "Emergency Cardiac Stabilization Supplies"
    ]
  },
  {
    id: "infusion-catheters",
    slug: "infusion-catheters",
    title: "Infusion",
    iconName: "Syringe",
    departmentCode: "INF",
    description: "",
    detailedDescription: "Engineered for maximum patient safety and painless venous access. Our infusion line components conform strictly to international ISO sterility and non-pyrogenic standards.",
    keyProducts: [
      "FDL",
      "OTSUKA",
      "ASPIL",
      "UNISOL",
      "MEDISOL"
    ]
  },
  {
    id: "medicine",
    slug: "medicine",
    title: "Medicine",
    iconName: "Activity",
    departmentCode: "MED",
    description: "Authorized supply of DRAP-approved critical care medicines, ICU injectables, hospital pharmaceuticals, and cold-chain biologics.",
    detailedDescription: "Extensive institutional portfolio of hospital pharmaceuticals, emergency injectables, cardiology compounds, specialty oncology medicines, and temperature-monitored biologics supplied across Pakistan.",
    keyProducts: [
      "Specialty Oncology & ICU Injections",
      "Cardiovascular & Emergency Therapeutics",
      "Broad-Spectrum Injectable Antibiotics",
      "Cold-Chain Biologics & Vaccines",
      "Critical Care Hospital Medicines"
    ]
  },
  {
    id: "surgical-disposables",
    slug: "surgical-disposables",
    title: "Surgical Disposables",
    iconName: "Package",
    departmentCode: "SURG",
    description: "High-sterility medical disposables, surgical drapes, protective apparel and wound care solutions.",
    detailedDescription: "Comprehensive inventory of hospital-grade surgical disposables engineered for maximum sterility, infection control, and surgical precision in operating theatres.",
    keyProducts: [
      "Sterile Surgical Drapes, Gowns & Packs",
      "Auto-Disable & Hypodermic Syringes",
      "Hemostatic Gauze & Absorbable Sponges",
      "Surgical Latex & Nitrile Sterile Gloves"
    ]
  },
  {
    id: "urology",
    slug: "urology",
    title: "Urology & Catheterization",
    iconName: "Stethoscope",
    departmentCode: "URO",
    description: "Urological pharmaceuticals, irrigation solutions, drainage systems and specialized surgical items.",
    detailedDescription: "A comprehensive range of urological solutions including specialized catheterization systems, irrigation fluids, urine collection bags, and renal care pharmaceutical products.",
    keyProducts: [
      "2-Way & 3-Way Silicone Foley Catheters",
      "Sterile Closed System Urine Drainage Bags",
      "Prostatic & Urological Therapeutics",
      "Endo-Urology Irrigation & Accessories"
    ]
  },
  {
    id: "wound-care-infection",
    slug: "wound-care-infection",
    title: "Wound Care & Infection Control",
    iconName: "Shield",
    departmentCode: "WOUND",
    description: "Antiseptic solutions, advanced wound dressings, sterile bandages, and hospital surface disinfectants.",
    detailedDescription: "Complete hospital infection prevention portfolio ranging from surgical hand scrubs and high-level disinfectant solutions to advanced hydrocolloid dressings.",
    keyProducts: [
      "Chlorhexidine & Povidone Iodine Scrubs",
      "Sterile Non-Adherent & Hydrocolloid Dressings",
      "High-Level Instrument Disinfectants",
      "Elastic Adhesive Bandages & Surgical Tapes"
    ]
  },
  {
    id: "psychiatric-hypertension",
    slug: "psychiatric-hypertension",
    title: "Psychiatric & Neuro Medicines",
    iconName: "Brain",
    departmentCode: "NEURO",
    description: "Neuro-psychiatric pharmaceuticals, mood stabilizers, and chronic blood pressure management drugs.",
    detailedDescription: "Reliable distribution of central nervous system (CNS) agents, neuro-psychiatric treatments, anticonvulsants, and long-term blood pressure control medicines.",
    keyProducts: [
      "Antidepressant & Anxiolytic Medications",
      "Antipsychotic & Mood Stabilizing Compounds",
      "ACE Inhibitors & ARB Anti-Hypertensives",
      "Neuropathic Pain Management Products"
    ]
  },
  {
    id: "gastroenterology-general",
    slug: "gastroenterology-general",
    title: "Gastroenterology & ICU Supplies",
    iconName: "Pill",
    departmentCode: "GASTRO",
    description: "Gastro-intestinal therapies, broad-spectrum anti-infectives, proton pump inhibitors and essential ICU medicines.",
    detailedDescription: "Extensive portfolio of daily essential medicines, anti-ulcerants, broad-spectrum injectable antibiotics, and electrolyte restoration solutions for hospital procurement.",
    keyProducts: [
      "Proton Pump Inhibitors & Anti-Ulcerants",
      "Broad-Spectrum Oral & Injectable Antibiotics",
      "Ringer Lactate & Normal Saline Intravenous Solutions",
      "ICU Emergency Resuscitation Ampoules"
    ]
  }
];

export const INSTITUTIONAL_CLIENTS: InstitutionalClient[] = [
  { id: "1", name: "Indus Hospital & Health Network", shortName: "Indus Hospital", category: "Hospital Network", location: "Nationwide", badge: "Key Supply Partner" },
  { id: "2", name: "Civil Hospital Badin", shortName: "Civil Hosp Badin", category: "Government Healthcare", location: "Badin, Sindh", badge: "Government Tender" },
  { id: "3", name: "Child Aid Association", shortName: "Child Aid", category: "Pediatric Care NGO", location: "Karachi", badge: "Pediatric Supply" },
  { id: "4", name: "NICH (National Institute of Child Health)", shortName: "NICH", category: "Autonomous Medical Institute", location: "Karachi", badge: "Tertiary Care" },
  { id: "5", name: "Patient Aid Foundation", shortName: "Patient Aid", category: "Healthcare Trust", location: "Karachi", badge: "Trust Partner" },
  { id: "6", name: "HELP (Health Education and Literacy Programme)", shortName: "HELP", category: "Healthcare NGO", location: "Pakistan", badge: "NGO Partner" },
  { id: "7", name: "The Kidney Centre", shortName: "Kidney Centre", category: "Specialized Nephrology Institute", location: "Karachi", badge: "Specialty Nephrology" },
  { id: "8", name: "NICVD (National Institute of Cardiovascular Diseases)", shortName: "NICVD", category: "Cardiovascular Institute", location: "Sindh", badge: "Cardiac Care" },
  { id: "9", name: "Ali Medical Centre", shortName: "Ali Medical", category: "Private Healthcare Hospital", location: "Islamabad", badge: "Private Network" },
  { id: "10", name: "OMI (Orthopedic and Medical Institute)", shortName: "OMI Hospital", category: "Multi-Specialty Hospital", location: "Karachi", badge: "Surgical Client" }
];

export const BRAND_PARTNERS: BrandPartner[] = [
  { id: "b1", name: "AccuMed Global", country: "Germany", category: "Surgical Disposables", logoText: "ACCUMED" },
  { id: "b2", name: "PharmaCare Intl", country: "United Kingdom", category: "Specialty Therapeutics", logoText: "PHARMACARE" },
  { id: "b3", name: "SterilePlus Health", country: "Japan", category: "Infusion & Catheters", logoText: "STERILEPLUS" },
  { id: "b4", name: "Nafisa Manufactured", country: "Pakistan", category: "Licensed Disposables", logoText: "NAFISA PHARMA" },
  { id: "b5", name: "BioLife Diagnostics", country: "Switzerland", category: "Diagnostic Reagents", logoText: "BIOLIFE" },
  { id: "b6", name: "CardioPulse Care", country: "United States", category: "Vascular Devices", logoText: "CARDIOPULSE" }
];

export const MILESTONES: MilestoneItem[] = [
  {
    year: "2010",
    title: "Inception at Densohall Karachi",
    description: "Nafisa Traders commenced operations in Densohall Wholesale Medicine Market, establishing a direct supply link for essential pharmaceuticals.",
    badge: "Founding Era"
  },
  {
    year: "2014",
    title: "Specialty Pharma & Oncology Division",
    description: "Expanded portfolio into specialized oncology injectables, cardiology formulations, and temperature-controlled storage logistics.",
    badge: "Pharma Expansion"
  },
  {
    year: "2018",
    title: "Nationwide Hospital Tender Supply",
    description: "Secured major institutional procurement agreements with leading government tertiary hospitals and philanthropic healthcare networks.",
    badge: "Institutional Growth"
  },
  {
    year: "2022",
    title: "Direct Import & Brand Agreements",
    description: "Partnered directly with international accredited manufacturers for high-grade sterile disposable imports and catheterization kits.",
    badge: "Global Imports"
  },
  {
    year: "2026",
    title: "Digital Procurement & Supply Chain Hub",
    description: "Integrated digital order tracking, instant hospital quotation engine, and optimized nationwide express distribution network.",
    badge: "Modernization"
  }
];

export const EVENTS_NEWS: EventItem[] = [
  {
    id: "e1",
    date: "August 2026",
    title: "Expanded Cold-Chain Facility at Densohall HQ",
    category: "Infrastructure",
    description: "Upgraded our central warehouse with state-of-the-art temperature monitoring for oncology and cardiac biological products.",
    location: "Karachi, Pakistan"
  },
  {
    id: "e2",
    date: "July 2026",
    title: "DRAP Batch Compliance & Verification Audit",
    category: "Regulatory",
    description: "Successfully cleared annual DRAP guidelines inspection with 100% compliance across all medicine and surgical disposable categories.",
    location: "DRAP Sindh Region"
  },
  {
    id: "e3",
    date: "June 2026",
    title: "Annual Hospital Procurement Partnership Summit",
    category: "Corporate",
    description: "Welcomed procurement directors from leading health networks to discuss long-term sterile disposable supply agreements.",
    location: "Karachi, Pakistan"
  }
];

export const WHY_US_CARDS: ValueCard[] = [
  {
    id: "nationwide-distribution",
    title: "Nationwide Express Supply",
    description: "A robust logistics network providing timely deliveries to tertiary care hospitals and local clinics across all provinces.",
    iconName: "Truck"
  },
  {
    id: "trusted-partnerships",
    title: "Trusted Institutional Client Base",
    description: "Long-standing supply partnerships with Indus Hospital, NICVD, Civil Hospitals, and major healthcare trusts.",
    iconName: "ShieldCheck"
  },
  {
    id: "quality-products",
    title: "DRAP Compliant Quality",
    description: "Every product batch undergoes strict inspection and batch tracking to guarantee absolute authenticity and patient safety.",
    iconName: "Award"
  },
  {
    id: "dedicated-support",
    title: "24/7 Hospital Tender Support",
    description: "Dedicated desk for processing urgent hospital procurement quotes, tender documentation, and emergency ICU dispatches.",
    iconName: "Headphones"
  }
];

export function getYearsOfExperience(): number {
  const currentYear = new Date().getFullYear();
  return Math.max(16, currentYear - 2010);
}

export const GET_STATS = (): StatItem[] => [
  {
    value: `${getYearsOfExperience()}+ Years`,
    label: "Industry Leadership",
    sublabel: "Serving Pakistan since 2010"
  },
  {
    value: "Nationwide",
    label: "Distribution Reach",
    sublabel: "Covering all major provinces"
  },
  {
    value: "Multi-Specialty",
    label: "Healthcare Catalog",
    sublabel: "Pharma, Surgical, Disposables"
  },
  {
    value: "Trusted By",
    label: "Leading Hospital Networks",
    sublabel: "Government, Private & NGOs"
  }
];
