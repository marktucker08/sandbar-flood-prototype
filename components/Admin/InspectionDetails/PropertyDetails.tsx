import React from "react";
import { DetailedInspection } from "@/types/admin";
import { Home, MapPin, Ruler, Square, Calendar, Building2 } from "lucide-react";

interface PropertyDetailsProps {
  data: DetailedInspection;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Property Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Property Type
          </label>
          <p className="text-gray-700">{data.propertyType}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Flood Zone
          </label>
          <p className="text-gray-700">{data.floodZone}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            Elevation
          </label>
          <p className="text-gray-700">{data.elevation}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Square className="w-4 h-4" />
            Square Footage
          </label>
          <p className="text-gray-700">{data.squareFootage.toLocaleString()} sq ft</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Year Built
          </label>
          <p className="text-gray-700">{data.yearBuilt}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            Address
          </label>
          <p className="text-gray-700">{data.propertyAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 