import React from "react";
import { DetailedInspection } from "@/types/admin";
import { Home, MapPin, Ruler, Square, Calendar, Building2 } from "lucide-react";

interface PropertyDetailsProps {
  data: DetailedInspection;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Property Details</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <Home className="icon-sm" />
            Property Type
          </label>
          <p className="form-value">{data.propertyType}</p>
        </div>
        <div>
          <label className="form-label">
            <MapPin className="icon-sm" />
            Flood Zone
          </label>
          <p className="form-value">{data.floodZone}</p>
        </div>
        <div>
          <label className="form-label">
            <Ruler className="icon-sm" />
            Elevation
          </label>
          <p className="form-value">{data.elevation}</p>
        </div>
        <div>
          <label className="form-label">
            <Square className="icon-sm" />
            Square Footage
          </label>
          <p className="form-value">{data.squareFootage.toLocaleString()} sq ft</p>
        </div>
        <div>
          <label className="form-label">
            <Calendar className="icon-sm" />
            Year Built
          </label>
          <p className="form-value">{data.yearBuilt}</p>
        </div>
        <div className="form-group-full">
          <label className="form-label">
            <Building2 className="icon-sm" />
            Address
          </label>
          <p className="form-value">{data.propertyAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 