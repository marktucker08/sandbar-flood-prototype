import React from "react";
import { DetailedQuote } from "@/types/admin";
import { Home, MapPin, Ruler, Square, Calendar } from "lucide-react";

interface PolicyInformationProps {
  data: DetailedQuote;
}

const PolicyInformation: React.FC<PolicyInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header flex items-center gap-2">
        Policy Information
      </h3>
      <div className="form-group">
        <div>
          <label className="form-label flex items-center gap-2">
            <Home className="icon-sm" />
            Property Type
          </label>
          <p className="form-value">{data.propertyType}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <MapPin className="icon-sm" />
            Flood Zone
          </label>
          <p className="form-value">{data.floodZone}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Ruler className="icon-sm" />
            Elevation
          </label>
          <p className="form-value">{data.elevation}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Square className="icon-sm" />
            Square Footage
          </label>
          <p className="form-value">{data.squareFootage.toLocaleString()} sq ft</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Calendar className="icon-sm" />
            Year Built
          </label>
          <p className="form-value">{data.yearBuilt}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyInformation;
