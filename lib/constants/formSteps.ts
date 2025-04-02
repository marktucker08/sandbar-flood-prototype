export const QUOTE_FORM_STEPS = [
  { label: "Location", sublabel: "Verification", isActive: true },
  { label: "Insured", sublabel: "Information", isActive: false },
  { label: "Property", sublabel: "Details", isActive: false },
  { label: "Foundation", sublabel: "Type", isActive: false },
  { label: "Elevation", sublabel: "Certificate", isActive: false },
  { label: "Construction", sublabel: "Type", isActive: false },
  { label: "Coverage", sublabel: "Options", isActive: false },
] as const;

export type FormStep = typeof QUOTE_FORM_STEPS[number]; 