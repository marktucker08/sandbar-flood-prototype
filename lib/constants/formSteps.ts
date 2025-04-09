export interface FormStep {
  label: string;
  sublabel: string;
  isActive: boolean;
}

export const QUOTE_FORM_STEPS: FormStep[] = [
  { label: "Building", sublabel: "Type", isActive: true },
  { label: "Location", sublabel: "Verification", isActive: false },
  { label: "Insured", sublabel: "Information", isActive: false },
  { label: "Property", sublabel: "Details", isActive: false },
  { label: "Foundation", sublabel: "Type", isActive: false },
  { label: "Elevation", sublabel: "Certificate", isActive: false },
  { label: "Construction", sublabel: "Type", isActive: false },
  { label: "Coverage", sublabel: "Options", isActive: false },
]; 