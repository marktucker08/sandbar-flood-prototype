"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { BuildingType, QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { formatCurrency } from "@/lib/utils/format";
import { useQuote } from "@/context/QuoteContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/button";
import { Pencil } from "lucide-react";
import { calculateBaseRatePremium, RateCalcInput, FoundationType } from "@/lib/rateCalc";

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
  const { setQuoteData, clearQuoteData } = useQuote();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to map formData.foundationType to FoundationType
  const mapFoundationType = (type: string): FoundationType => {
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
  };

  const rateResult = calculateBaseRatePremium(rateInput);

  const handleSubmit = async () => {
    // Use the calculated premium
    const premium = rateResult.premium;
    const quoteData = {
      quoteId: `Q-${Date.now()}`,
      propertyAddress: `${formData?.streetAddress}, ${formData?.city}, ${formData?.state} ${formData?.zipCode}`,
      coverageAmount: Number(formData?.buildingCoverage) + Number(formData?.contentsCoverage),
      premium,
      deductible: Number(formData?.deductible),
      effectiveDate: formData?.effectiveDate || new Date().toISOString().split('T')[0],
      expirationDate: new Date(new Date(formData?.effectiveDate || new Date()).setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      status: 'Pending Review',
      riskFactor: 0, // required by QuoteDetails, not used
      buildingCoverage: Number(formData?.buildingCoverage),
      contentsCoverage: Number(formData?.contentsCoverage),
      lossOfUseCoverage: Number(formData?.lossOfUseCoverage),
      buildingReplacementCost: Number(formData?.buildingReplacementCost),
      contentsReplacementCost: Number(formData?.contentsReplacementCost),
      yearBuilt: formData?.yearBuilt || '',
      squareFootage: formData?.squareFootage || '',
      numberOfStories: formData?.numberOfStories || '',
      numberOfFamilies: formData?.numberOfFamilies || '',
      occupancyType: formData?.occupancyType || '',
      commercialOccupancy: formData?.commercialOccupancy || '',
      foundationType: formData?.foundationType || '',
      constructionType: formData?.constructionType || '',
      floodZone: formData?.floodZone || '',
      condoType: formData?.condoType || '',
      numberOfUnits: formData?.numberOfUnits || '',
    };

    updateFormData?.({
      premium: premium.toString(),
    });

    setQuoteData(quoteData);
    router.push("/quote/processing");
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
                  <p className="text-gray-900">{formData.foundationType}</p>
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
                    {formatCurrency(Number(formData.lossOfUseCoverage))}
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
                <div className="col-span-2 mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Premium</h3>
                  <p className="text-gray-900 font-bold text-lg">
                    {formatCurrency(rateResult.premium)}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    {rateResult.details}
                    {rateResult.minimumApplied && <><br/>Minimum premium applied for A zone.</>}
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