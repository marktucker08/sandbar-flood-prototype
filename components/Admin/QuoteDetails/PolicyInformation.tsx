import React from "react";
import { DetailedQuote } from "@/types/admin";

interface PolicyInformationProps {
  data: DetailedQuote;
}

const PolicyInformation: React.FC<PolicyInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Policy Information</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Property Type</label>
          <p className="form-value">{data.propertyType}</p>
        </div>
        <div>
          <label className="form-label">Flood Zone</label>
          <p className="form-value">{data.floodZone}</p>
        </div>
        <div>
          <label className="form-label">Elevation</label>
          <p className="form-value">{data.elevation}</p>
        </div>
        <div>
          <label className="form-label">Square Footage</label>
          <p className="form-value">{data.squareFootage.toLocaleString()} sq ft</p>
        </div>
        <div>
          <label className="form-label">Year Built</label>
          <p className="form-value">{data.yearBuilt}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyInformation;
