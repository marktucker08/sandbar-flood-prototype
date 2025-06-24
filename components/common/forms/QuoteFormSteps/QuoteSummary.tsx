"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { BuildingType, QuoteFormData, FoundationType as FoundationTypeOptions } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { formatCurrency } from "@/lib/utils/format";
import { useQuote } from "@/context/QuoteContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/button";
import { Pencil } from "lucide-react";
import { calculateBaseRatePremium, RateCalcInput } from "@/lib/rateCalc";
import { createClient } from "@/lib/supabase/client";

interface QuoteSummaryProps {
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
  setCurrentStep: (step: number) => void;
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  onBack,
  formData,
  updateFormData,
  progressSteps,
  setCurrentStep,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const router = useRouter();
  const { clearQuoteData } = useQuote();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to map formData.foundationType to FoundationType
  const mapFoundationType = (type: string) => {
    switch (type?.toLowerCase()) {
      case "pilings-enclosure":
      case "pilings":
        return "pilings-enclosure";
      case "crawlspace":
        return "crawlspace";
      case "full-wall":
      case "foundation wall":
        return "full-wall";
      case "slab":
        return "slab";
      case "raised":
        return "raised";
      case "unfinished":
        return "unfinished";
      case "finished":
        return "finished";
      default:
        throw new Error("Unknown foundation type: " + type);
    }
  };

  // Helper to determine if properly vented (assume boolean in formData, adjust if needed)
  const isProperlyVented = Boolean(formData.isFoundationVented);

  // Prepare input for rate calculation
  const rateInput: RateCalcInput = {
    propertyElevation: Number(formData.propertyElevation),
    baseFloodElevation: Number(formData.baseFloodElevation),
    certificateElevation: formData.certificateElevation ? Number(formData.certificateElevation) : undefined,
    numberOfSteps: formData.stepsToFrontDoor ? Number(formData.stepsToFrontDoor) : undefined,
    foundationType: mapFoundationType(formData.foundationType || ''),
    isProperlyVented,
    floodZone: formData.floodZone || '',
    occupancyType: formData.occupancyType || '',
    deductible: Number(formData.deductible) as 1500 | 2500 | 5000 | 10000,
    buildingCoverage: Number(formData.buildingCoverage) || 0,
    contentsCoverage: Number(formData.contentsCoverage) || 0,
    replacementCost: Number(formData.buildingReplacementCost) || 0,
  };

  const rateResult = calculateBaseRatePremium(rateInput);
  const totalPremium = rateResult.buildingPremium + rateResult.contentsPremium;

  const handleSubmit = async () => {
    const supabase = createClient();
    // Get userId from Supabase session
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) {
      alert('You must be logged in to submit a quote.');
      return;
    }
    // Build the payload for the API
    const payload = {
      insuredClient: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        insuredType: formData.insuredType?.toUpperCase() === 'BUSINESS' ? 'BUSINESS' : 'INDIVIDUAL',
        businessName: formData.businessName,
        entityType: formData.entityType,
        additionalInsuredName: formData.additionalInsured,
        address: formData.streetAddress || '',
        addressLine2: formData.unitAptSuite,
        city: formData.city || '',
        state: formData.state || '',
        zipCode: formData.zipCode || '',
      },
      property: {
        address: formData.streetAddress || '',
        addressLine2: formData.unitAptSuite,
        city: formData.city || '',
        state: formData.state || '',
        zipCode: formData.zipCode || '',
        latitude: formData.latLng?.lat ? String(formData.latLng.lat) : undefined,
        longitude: formData.latLng?.lng ? String(formData.latLng.lng) : undefined,
        floodZone: formData.floodZone,
        floodZoneVerified: formData.floodZoneVerified,
        correctedFloodZone: formData.correctedFloodZone,
        bfe: formData.baseFloodElevation ? Number(formData.baseFloodElevation) : undefined,
        propertyElevation: formData.propertyElevation ? Number(formData.propertyElevation) : undefined,
        buildingType: formData.buildingType || '',
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
        squareFootage: formData.squareFootage ? Number(formData.squareFootage) : undefined,
        numberOfFloors: formData.numberOfStories ? Number(formData.numberOfStories) : undefined,
        occupancyType: formData.occupancyType,
        numberOfStories: formData.numberOfStories ? Number(formData.numberOfStories) : undefined,
        numberOfFamilies: formData.numberOfFamilies ? Number(formData.numberOfFamilies) : undefined,
        numberOfUnits: formData.numberOfUnits ? Number(formData.numberOfUnits) : undefined,
        condoType: formData.condoType,
        commercialOccupancy: formData.commercialOccupancy,
        numberOfResidentialUnits: formData.numberOfResidentialUnits ? Number(formData.numberOfResidentialUnits) : undefined,
        numberOfCommercialUnits: formData.numberOfCommercialUnits ? Number(formData.numberOfCommercialUnits) : undefined,
        foundationType: formData.foundationType,
        isProperlyVented: formData.isFoundationVented,
        certificateElevation: formData.certificateElevation,
        numberOfSteps: formData.stepsToFrontDoor ? Number(formData.stepsToFrontDoor) : undefined,
        constructionType: formData.constructionType,
      },
      quote: {
        userId,
        status: 'PENDING',
        coverageAmount: Number(formData.buildingCoverage || 0) + Number(formData.contentsCoverage || 0),
        premium: totalPremium,
        effectiveDate: formData.effectiveDate || new Date().toISOString().split('T')[0],
        expirationDate: new Date(new Date(formData.effectiveDate || new Date()).setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        waitingPeriodType: formData.waitingPeriod?.toUpperCase() === 'LOAN' ? 'LOAN' : 'STANDARD',
      },
      coverage: {
        buildingReplacementCost: Number(formData.buildingReplacementCost || 0),
        contentsReplacementCost: Number(formData.contentsReplacementCost || 0),
        buildingCoverage: Number(formData.buildingCoverage || 0),
        contentsCoverage: Number(formData.contentsCoverage || 0),
        lossOfUseCoverage: formData.lossOfUseCoverage ? Number(formData.lossOfUseCoverage) : undefined,
        deductible: formData.deductible ? Number(formData.deductible) : 0,
      },
    };

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        alert('Error submitting quote: ' + (error.error || 'Unknown error'));
        return;
      }
      const result = await res.json();
      updateFormData?.({ premium: totalPremium.toString() });
      if (result.quoteId) {
        router.push(`/quote/results?quoteId=${result.quoteId}`);
      } else {
        router.push('/quote/results');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    clearQuoteData();
    updateFormData({}); // Reset all form fields
    router.push("/");
  };

  const getStepIndex = (stepLabel: string) => {
    return progressSteps.findIndex(step => step.label.toLowerCase().includes(stepLabel.toLowerCase()));
  };

  return (
    <FormStepLayout
      title="Review Quote Details"
      progressSteps={progressSteps}
      onNext={handleSubmit}
      onBack={onBack}
      nextLabel="Submit Quote"
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
    >
      <div className="max-w-4xl mx-auto">
        {/* Estimated Premium Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-8 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Total Estimated Premium</h2>
            <p className="text-3xl font-extrabold text-blue-700 mb-4">{formatCurrency(totalPremium)}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Building Premium */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800">Building Premium</h3>
              <p className="text-2xl font-bold text-gray-900 my-2">{formatCurrency(rateResult.buildingPremium)}</p>
              <div className="text-xs text-gray-600 whitespace-pre-wrap">{rateResult.buildingDetails}</div>
            </div>
            {/* Contents Premium */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800">Contents Premium</h3>
              <p className="text-2xl font-bold text-gray-900 my-2">{formatCurrency(rateResult.contentsPremium)}</p>
              <div className="text-xs text-gray-600 whitespace-pre-wrap">{rateResult.contentsDetails}</div>
            </div>
          </div>
          {rateResult.minimumApplied && (
            <div className="text-xs text-blue-600 mt-4 text-center">Minimum premium for A zone applied and distributed proportionally.</div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-8">
            {/* Property Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Property Information</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentStep(getStepIndex("property"))}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modify
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Property Address</h3>
                  <p className="text-gray-900">
                    {formData.streetAddress}
                    {formData.unitAptSuite && `, ${formData.unitAptSuite}`}
                    <br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Property Type</h3>
                  <p className="text-gray-900">{BuildingType.find(type => type.value === formData.buildingType)?.label}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Year Built</h3>
                  <p className="text-gray-900">{formData.yearBuilt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Square Footage</h3>
                  <p className="text-gray-900">{formData.squareFootage} sq ft</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Foundation Type</h3>
                  <p className="text-gray-900">{
                    FoundationTypeOptions.find(type => type.value === formData.foundationType)?.label || formData.foundationType || "N/A"
                  }</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Construction Type</h3>
                  <p className="text-gray-900">{formData.constructionType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Flood Zone</h3>
                  <p className="text-gray-900">{formData.floodZone || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Insured Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Insured Information</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentStep(getStepIndex("insured"))}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modify
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.insuredType === "individual" ? (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                    <p className="text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Business Name</h3>
                      <p className="text-gray-900">{formData.businessName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Entity Type</h3>
                      <p className="text-gray-900">{formData.entityType}</p>
                    </div>
                  </>
                )}
                {formData.phoneNumber && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                    <p className="text-gray-900">{formData.phoneNumber}</p>
                  </div>
                )}
                {formData.email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p className="text-gray-900">{formData.email}</p>
                  </div>
                )}
                {!formData.sameAsPropertyAddress && (
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Mailing Address</h3>
                    <p className="text-gray-900">
                      {formData.mailingAddress}
                      {formData.mailingAddressLine2 && <br />}
                      {formData.mailingAddressLine2}
                      <br />
                      {formData.mailingCity}, {formData.mailingState} {formData.mailingZipCode}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Coverage Details</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentStep(getStepIndex("coverage"))}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modify
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Building Coverage</h3>
                  <p className="text-gray-900">
                    {formatCurrency(Number(formData.buildingCoverage))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contents Coverage</h3>
                  <p className="text-gray-900">
                    {formatCurrency(Number(formData.contentsCoverage))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Loss of Use Coverage</h3>
                  <p className="text-gray-900">
                    {formData.lossOfUseCoverage === undefined || formData.lossOfUseCoverage === null || formData.lossOfUseCoverage === "" || Number(formData.lossOfUseCoverage) === 0
                      ? "$0"
                      : formatCurrency(Number(formData.lossOfUseCoverage))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Deductible</h3>
                  <p className="text-gray-900">
                    {formatCurrency(Number(formData.deductible))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Effective Date</h3>
                  <p className="text-gray-900">{formatDate(formData.effectiveDate)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Waiting Period</h3>
                  <p className="text-gray-900">
                    {formData.waitingPeriod === "standard" ? "Standard" : "Loan Closing"}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            {/* <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Risk Assessment</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Risk Factor</h3>
                  <p className="text-gray-900">{calculateRiskFactor().toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Premium</h3>
                  <p className="text-gray-900">
                    {formatCurrency(calculatePremium(calculateRiskFactor()))}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-end mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="md:w-auto w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </FormStepLayout>
  );
};

export default QuoteSummary; 