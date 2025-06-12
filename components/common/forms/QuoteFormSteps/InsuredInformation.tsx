"use client";
import React from "react";
import { FormInput, FormRadioGroup, FormToggle } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface InsuredInformationProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const baseInsuredSchema = z.object({
  insuredType: z.enum(["individual", "business"]),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  phoneNumber: z.string().min(1, "Phone number is required").optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  businessName: z.string().min(1, "Business name is required").optional(),
  entityType: z.enum(["llc", "corporation", "partnership", "other"], {
    required_error: "Entity type is required",
  }).optional(),
  additionalInsured: z.string().optional(),
  sameAsPropertyAddress: z.boolean(),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  mailingAddressLine2: z.string().optional(),
  mailingCity: z.string().min(1, "Mailing city is required"),
  mailingState: z.string().min(1, "Mailing state is required"),
  mailingZipCode: z.string().min(1, "Mailing ZIP code is required")
  // .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});

const insuredSchema = baseInsuredSchema.refine((data) => {
  if (data.insuredType === "individual") {
    return data.firstName && data.lastName;
  }
  return data.businessName && data.entityType;
}, {
  message: "Business name and entity type are required for business accounts",
  path: ["businessName"],
});

type InsuredFields = keyof z.infer<typeof baseInsuredSchema>;

const InsuredInformation: React.FC<InsuredInformationProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    // Validate the field if it's part of the insured schema
    if (field in baseInsuredSchema.shape) {
      try {
        baseInsuredSchema.shape[field as InsuredFields].parse(newValue);
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    }
  };

  const handleInsuredTypeChange = (value: string) => {
    updateFormData?.({ insuredType: value as "individual" | "business" });
    
    try {
      baseInsuredSchema.shape.insuredType.parse(value);
      setErrors(prev => ({ ...prev, insuredType: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, insuredType: error.errors[0].message }));
      }
    }
  };

  const handleSameAsPropertyAddressChange = (value: string) => {
    const isSame = value === "true";
    updateFormData?.({ sameAsPropertyAddress: isSame });

    if (isSame && formData) {
      // Copy property address to mailing address
      updateFormData?.({
        mailingAddress: formData.streetAddress || "",
        mailingAddressLine2: formData.unitAptSuite || "",
        mailingCity: formData.city || "",
        mailingState: formData.state || "",
        mailingZipCode: formData.zipCode || "",
      });
    } else {
      // Clear mailing address fields
      updateFormData?.({
        mailingAddress: "",
        mailingAddressLine2: "",
        mailingCity: "",
        mailingState: "",
        mailingZipCode: "",
      });
    }
  };

  const handleNext = () => {
    // Validate all insured fields
    const insuredFields = {
      insuredType: formData?.insuredType, 
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      businessName: formData?.businessName,
      entityType: formData?.entityType,
      additionalInsured: formData?.additionalInsured,
      sameAsPropertyAddress: formData?.sameAsPropertyAddress || false,
      mailingAddress: formData?.mailingAddress,
      mailingAddressLine2: formData?.mailingAddressLine2,
      mailingCity: formData?.mailingCity,
      mailingState: formData?.mailingState,
      mailingZipCode: formData?.mailingZipCode,
    };

    try {
      insuredSchema.parse(insuredFields);
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const insuredTypeOptions = [
    { value: "individual", label: "Individual" },
    { value: "business", label: "Business" },
  ];

  const entityTypeOptions = [
    { value: "llc", label: "LLC" },
    { value: "corporation", label: "Corporation" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ];

  const sameAsPropertyOptions = [
    { value: "true", label: "Same as Property Address" },
    { value: "false", label: "Different Address" },
  ];

  return (
    <FormStepLayout 
      title="Insured Information"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
    >
      <div className="space-y-6">
        <FormToggle
          label="Insured Type"
          options={insuredTypeOptions}
          value={formData?.insuredType}
          onChange={handleInsuredTypeChange}
          error={errors.insuredType}
          required
        />

        {formData?.insuredType === "individual" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              type="text"
              value={formData?.firstName || ""}
              onChange={handleInputChange("firstName")}
              error={errors.firstName}
              required
            />
            <FormInput
              label="Last Name"
              placeholder="Enter last name"
              type="text"
              value={formData?.lastName || ""}
              onChange={handleInputChange("lastName")}
              error={errors.lastName}
              required
            />
          </div>
        ) : (
          <div className="space-y-4">
            <FormInput
              label="Business Name"
              placeholder="Enter business name"
              type="text"
              value={formData?.businessName || ""}
              onChange={handleInputChange("businessName")}
              error={errors.businessName}
              required
            />
            <FormRadioGroup
              label="Entity Type"
              name="entityType"
              options={entityTypeOptions}
              value={formData?.entityType || ""}
              onChange={(value) => updateFormData?.({ entityType: value as "llc" | "corporation" | "partnership" | "other" })}
              error={errors.entityType}
              required
            />
          </div>
        )}

        <FormInput
          label="Additional Insured"
          placeholder="Optional"
          type="text"
          value={formData?.additionalInsured || ""}
          onChange={handleInputChange("additionalInsured")}
        />

        <FormInput
          label="Phone Number"
          placeholder="Enter phone number"
          type="text"
          value={formData?.phoneNumber || ""}
          onChange={handleInputChange("phoneNumber")}
        />

        <FormInput
          label="Email"
          placeholder="Enter email"
          type="email"
          value={formData?.email || ""}
          onChange={handleInputChange("email")}
          error={errors.email}
          required
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mailing Address</h3>
          <FormToggle
            label="Address Type"
            options={sameAsPropertyOptions}
            value={formData?.sameAsPropertyAddress ? "true" : "false"}
            onChange={handleSameAsPropertyAddressChange}
            required
          />

          {!formData?.sameAsPropertyAddress && (
            <>
              <FormInput
                label="Street Address"
                placeholder="Enter mailing address"
                type="text"
                value={formData?.mailingAddress || ""}
                onChange={handleInputChange("mailingAddress")}
                error={errors.mailingAddress}
                required
              />
              <FormInput
                label="Address Line 2"
                placeholder="Optional"
                type="text"
                value={formData?.mailingAddressLine2 || ""}
                onChange={handleInputChange("mailingAddressLine2")}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  label="City"
                  placeholder="Enter city"
                  type="text"
                  value={formData?.mailingCity || ""}
                  onChange={handleInputChange("mailingCity")}
                  error={errors.mailingCity}
                  required
                />
                <FormInput
                  label="State"
                  placeholder="Enter state"
                  type="text"
                  value={formData?.mailingState || ""}
                  onChange={handleInputChange("mailingState")}
                  error={errors.mailingState}
                  required
                />
                <FormInput
                  label="ZIP Code"
                  placeholder="Enter ZIP"
                  type="text"
                  value={formData?.mailingZipCode || ""}
                  onChange={handleInputChange("mailingZipCode")}
                  error={errors.mailingZipCode}
                  required
                />
              </div>
            </>
          )}
        </div>
      </div>
    </FormStepLayout>
  );
};

export default InsuredInformation;

