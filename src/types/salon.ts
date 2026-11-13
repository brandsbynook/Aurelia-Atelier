export type ServiceCategory =
  | 'All'
  | 'Hair & Colour'
  | 'Skin & Facial'
  | 'Nail & Grooming';

export interface ServiceItem {
  id: string;
  category: Exclude<ServiceCategory, 'All'>;
  name: string;
  note: string;
  durationMins: number;
  priceInr: number;
}

export interface StudioHours {
  days: string;
  time: string;
}

export interface StudioHighlight {
  label: string;
  value: string;
}

export interface TimeWindowOption {
  id: string;
  label: string;
  range: string;
  note: string;
}

export interface StylistProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
}

export interface StudioInfo {
  name: string;
  shortName: string;
  neighborhood: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  instagram: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  apothecaryImage: string;
  apothecaryImageAlt: string;
  facialSuiteImage: string;
  facialSuiteImageAlt: string;
}

export interface SalonConfig {
  studio: StudioInfo;
  hours: StudioHours[];
  closedWeekdays: number[];
  highlights: StudioHighlight[];
  categories: ServiceCategory[];
  timeWindows: TimeWindowOption[];
  stylists: StylistProfile[];
  services: ServiceItem[];
}

export interface DayOption {
  id: string;
  shortLabel: string;
  fullLabel: string;
  dayName: string;
}
