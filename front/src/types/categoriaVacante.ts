export const CategoriaVacante = {
  TECHNOLOGY_IT: {
    value: 1,
    text: "Technology & IT",
  },
  ENGINEERING_TECHNICAL: {
    value: 2,
    text: "Engineering & Technical",
  },
  CONSTRUCTION_SKILLED_TRADES: {
    value: 3,
    text: "Construction & Skilled Trades",
  },
  HEALTHCARE_WELLNESS: {
    value: 4,
    text: "Healthcare & Wellness",
  },
  EDUCATION_TRAINING: {
    value: 5,
    text: "Education & Training",
  },
  BUSINESS_FINANCE_ADMINISTRATION: {
    value: 6,
    text: "Business, Finance & Administration",
  },
  SALES_CUSTOMER_SERVICE: {
    value: 7,
    text: "Sales & Customer Service",
  },
  MARKETING_MEDIA_CREATIVE: {
    value: 8,
    text: "Marketing, Media & Creative",
  },
  HOSPITALITY_FOOD_TOURISM: {
    value: 9,
    text: "Hospitality, Food & Tourism",
  },
  TRANSPORTATION_LOGISTICS: {
    value: 10,
    text: "Transportation & Logistics",
  },
  RETAIL_COMMERCE: {
    value: 11,
    text: "Retail & Commerce",
  },
  SECURITY_PUBLIC_SAFETY: {
    value: 12,
    text: "Security & Public Safety",
  },
  AGRICULTURE_ENVIRONMENTAL: {
    value: 13,
    text: "Agriculture & Environmental",
  },
  SCIENCE_RESEARCH: {
    value: 14,
    text: "Science & Research",
  },
  LEGAL_GOVERNMENT: {
    value: 15,
    text: "Legal & Government",
  },
  CLEANING_MAINTENANCE: {
    value: 16,
    text: "Cleaning & Maintenance",
  },
  PERSONAL_COMMUNITY_SERVICES: {
    value: 17,
    text: "Personal & Community Services",
  },
  OTHER: {
    value: 18,
    text: "Other",
  },
} as const;

export type CategoriaVacante =
  (typeof CategoriaVacante)[keyof typeof CategoriaVacante];