import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface CoverageDetailsProps {
  data: DetailedPolicy;
}

const CoverageDetails: React.FC<CoverageDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Coverage Details</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Coverage Amount</label>
          <p className="form-value">{data.coverageAmount}</p>
        </div>
        <div>
          <label className="form-label">Deductible</label>
          <p className="form-value">{data.deductible}</p>
        </div>
        <div>
          <label className="form-label">Contents Coverage</label>
          <p className="form-value">{data.contentsCoverage}</p>
        </div>
        <div>
          <label className="form-label">Building Coverage</label>
          <p className="form-value">{data.buildingCoverage}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverageDetails; 