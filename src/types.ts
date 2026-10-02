export interface ProductCategory {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  description: string;
  detailedDescription?: string;
  keyProducts?: string[];
  departmentCode: string;
}

export interface InstitutionalClient {
  id: string;
  name: string;
  shortName?: string;
  category: string;
  location?: string;
  badge?: string;
}

export interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface EnquiryFormData {
  fullName: string;
  companyOrHospital: string;
  phone: string;
  email: string;
  enquiryType: string;
  productDepartment: string;
  message: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  country: string;
  category: string;
  logoText: string;
}

export interface EventItem {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  location: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImage: string;
}

