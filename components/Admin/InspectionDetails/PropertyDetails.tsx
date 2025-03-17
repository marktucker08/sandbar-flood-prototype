import React from "react";
import { DetailedInspection } from "@/types/admin";

interface PropertyDetailsProps {
  data: DetailedInspection;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Property Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Property Type</label>
          <p className="text-gray-700">{data.propertyType}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Flood Zone</label>
          <p className="text-gray-700">{data.floodZone}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Elevation</label>
          <p className="text-gray-700">{data.elevation}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Square Footage</label>
          <p className="text-gray-700">{data.squareFootage.toLocaleString()} sq ft</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Year Built</label>
          <p className="text-gray-700">{data.yearBuilt}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-500 mb-1">Address</label>
          <p className="text-gray-700">{data.propertyAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 