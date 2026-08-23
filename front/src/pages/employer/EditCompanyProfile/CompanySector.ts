export const CompanySector = {
  AGRICULTURE: 'Agriculture',
  AUTOMOTIVE: 'Automotive',
  AVIATION: 'Aviation',
  BANKING: 'Banking',
  BIOTECHNOLOGY: 'Biotechnology',
  CHEMICALS: 'Chemicals',
  CONSTRUCTION: 'Construction',
  CONSULTING: 'Consulting',
  CONSUMER_GOODS: 'Consumer Goods',
  CYBERSECURITY: 'Cybersecurity',
  EDUCATION: 'Education',
  ENERGY: 'Energy',
  ENTERTAINMENT: 'Entertainment',
  ENVIRONMENTAL_SERVICES: 'Environmental Services',
  FINANCIAL_SERVICES: 'Financial Services',
  FOOD_AND_BEVERAGE: 'Food & Beverage',
  GOVERNMENT: 'Government',
  HEALTHCARE: 'Healthcare',
  HOSPITALITY: 'Hospitality',
  HUMAN_RESOURCES: 'Human Resources',
  INFORMATION_TECHNOLOGY: 'Information Technology',
  INSURANCE: 'Insurance',
  LEGAL_SERVICES: 'Legal Services',
  LOGISTICS: 'Logistics',
  MANUFACTURING: 'Manufacturing',
  MARKETING_AND_ADVERTISING: 'Marketing & Advertising',
  MEDIA_AND_COMMUNICATIONS: 'Media & Communications',
  MINING: 'Mining',
  NON_PROFIT: 'Non-Profit',
  PHARMACEUTICALS: 'Pharmaceuticals',
  REAL_ESTATE: 'Real Estate',
  RETAIL: 'Retail',
  SECURITY_SERVICES: 'Security Services',
  SOFTWARE: 'Software',
  SPORTS_AND_FITNESS: 'Sports & Fitness',
  TELECOMMUNICATIONS: 'Telecommunications',
  TOURISM_AND_TRAVEL: 'Tourism & Travel',
  TRANSPORTATION: 'Transportation',
  UTILITIES: 'Utilities',
  WHOLESALE: 'Wholesale',
  ARCHITECTURE_AND_DESIGN: 'Architecture & Design',
  CREATIVE_SERVICES: 'Creative Services',
  PERSONAL_SERVICES: 'Personal Services',
  REPAIR_AND_MAINTENANCE: 'Repair & Maintenance',
  HOME_SERVICES: 'Home Services',
  BEAUTY_AND_WELLNESS: 'Beauty & Wellness',
  RESEARCH: 'Research',
  E_COMMERCE: 'E-Commerce',
  SOCIAL_SERVICES: 'Social Services',
  OTHER: 'Other',
} as const;

export type CompanySector =
  (typeof CompanySector)[keyof typeof CompanySector];

export interface CompanyProfileForm {
  companyName: string;
  companySector: CompanySector;
  location: string;
  website: string;
  about: string;
}