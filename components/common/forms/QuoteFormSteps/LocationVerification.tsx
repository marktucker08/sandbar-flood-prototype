"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormInput } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface LocationVerificationProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

// let formattedAddress = "";

const locationSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unitAptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string()
    .min(1, "ZIP code is required")
    // .regex(/^[0-9]{5}$/, "ZIP code must contain only numbers"),
});

/**
 * Cleans the address for the National Flood API by removing commas and trailing 'USA'.
 * @param address The full address string.
 * @returns The cleaned address string.
 */
function cleanAddressForFloodApi(address: string): string {
  return address.replace(/,/g, '').replace(/\s*USA\s*$/i, '').trim();
}

type LocationFields = keyof z.infer<typeof locationSchema>;

// Tell TypeScript that google will be available globally at runtime
// This is necessary because Google Maps JS API is loaded dynamically
// and types cannot be imported directly in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

// --- Google Maps Script Loader Hook ---
function useGoogleMapsLoader(src: string, onReady: () => void, maxRetries = 20, retryDelay = 200) {
  useEffect(() => {
    let retries = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    function hasGoogleMaps() {
      return typeof window !== 'undefined' &&
        (window as unknown as { google?: unknown }).google &&
        (window as unknown as { google: { maps?: unknown } }).google.maps &&
        typeof (window as unknown as { google: { maps: { importLibrary?: unknown } } }).google.maps.importLibrary === 'function';
    }

    function checkGoogleMaps() {
      if (hasGoogleMaps()) {
        console.log('[GoogleMapsLoader] google.maps.importLibrary is available.');
        onReady();
      } else if (retries < maxRetries) {
        retries++;
        timeout = setTimeout(checkGoogleMaps, retryDelay);
      } else {
        console.error('[GoogleMapsLoader] Google Maps JS API failed to load after retries.');
      }
    }

    let script = document.querySelector(`script[src='${src}']`) as HTMLScriptElement | null;
    if (script) {
      if (script.getAttribute('data-loaded') === 'true') {
        checkGoogleMaps();
        return;
      }
      script.addEventListener('load', checkGoogleMaps);
      return;
    }
    script = document.createElement("script") as HTMLScriptElement;
    script.src = src;
    script.async = true;
    script.setAttribute('data-loaded', 'false');
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      checkGoogleMaps();
    };
    document.body.appendChild(script);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [src, onReady, maxRetries, retryDelay]);
}

const LocationVerification: React.FC<LocationVerificationProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [mapsReady, setMapsReady] = useState(false);
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);

  // Load Google Maps JS API
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&v=weekly`;
  useGoogleMapsLoader(scriptSrc, () => setMapsReady(true));

  // Initialize map and legacy Marker
  useEffect(() => {
    if (!mapsReady) {
      console.log('[MapInit] Waiting for mapsReady');
      return;
    }
    if (map) {
      console.log('[MapInit] Map already initialized');
      return;
    }
    if (!mapRef.current) {
      console.log('[MapInit] mapRef not ready');
      return;
    }
    if (typeof google === 'undefined' || !google.maps.importLibrary) {
      console.log('[MapInit] google.maps.importLibrary not available');
      return;
    }
    (async () => {
      try {
        const { Map } = await google.maps.importLibrary('maps');
        const initialLatLng = { lat: 39.5873284, lng: -74.225578 }; // NJ default
        const gMap = new Map(mapRef.current, {
          center: formData.latLng ? formData.latLng : initialLatLng,
          zoom: 12,
          mapId: 'DEMO_MAP_ID',
          mapTypeId: google.maps.MapTypeId.HYBRID,
        });
        setMap(gMap);
        // Use legacy Marker for draggable functionality
        const marker = new google.maps.Marker({
          map: gMap,
          position: formData.latLng ? formData.latLng : initialLatLng,
          draggable: true,
          title: 'Selected Location',
        });
        markerRef.current = marker;
        marker.addListener('dragend', () => {
          const newPosition = marker.getPosition();
          if (newPosition) {
            const lat = newPosition.lat();
            const lng = newPosition.lng();
            const geocoder = new google.maps.Geocoder();
  
            geocoder.geocode({ location: { lat, lng } }, (results: unknown, status: string) => {
              if (status === 'OK' && results && (results as Array<unknown>)[0]) {
                const address = (results as Array<any>)[0]; // eslint-disable-line @typescript-eslint/no-explicit-any
                const getComponent = (type: string) => {
                  // Type guard for address component
                  const component = address.address_components.find((c: unknown) => {
                    if (typeof c === 'object' && c !== null && 'types' in c && Array.isArray((c as { types: unknown }).types)) {
                      return (c as { types: string[] }).types.includes(type);
                    }
                    return false;
                  });
                  return component && typeof component === 'object' && component !== null && 'long_name' in component
                    ? (component as { long_name: string }).long_name
                    : '';
                };
                updateFormData({
                  streetAddress: (getComponent('street_number') + " " + getComponent('route')) || "",
                  city: getComponent('locality'),
                  state: getComponent('administrative_area_level_1'),
                  zipCode: getComponent('postal_code'),
                  latLng: { lat, lng },
                  formattedAddress: address.formatted_address,
                });
              }
            });
          }
        });
        console.log('[MapInit] Map and marker initialized');
      } catch (err) {
        console.error('[MapInit] Error initializing map:', err);
      }
    })();
  }, [mapsReady, map, updateFormData, formData]);

  // Setup new PlaceAutocompleteElement widget
  useEffect(() => {
    if (!mapsReady) {
      console.log('[AutocompleteInit] Waiting for mapsReady');
      return;
    }
    if (!map) {
      console.log('[AutocompleteInit] Waiting for map');
      return;
    }
    if (typeof google === 'undefined' || !google.maps.importLibrary) {
      console.log('[AutocompleteInit] google.maps.importLibrary not available');
      return;
    }
    (async () => {
      try {
        const { PlaceAutocompleteElement } = await google.maps.importLibrary('places');
        if (autocompleteContainerRef.current && !autocompleteContainerRef.current.querySelector('gmp-place-autocomplete')) {
          const autocomplete = new PlaceAutocompleteElement();
          autocomplete.id = "new-places-autocomplete";
          autocomplete.style.width = "100%";
          autocomplete.style.height = "60px";
          autocomplete.style.borderRadius = "0.5rem";
          autocomplete.style.border = "1px solid #e0e7ef";
          autocomplete.style.padding = "0.75rem 1rem";
          autocomplete.style.fontSize = "1rem";
          autocomplete.style.background = "#f8fafc";
          autocompleteContainerRef.current.innerHTML = "";
          autocompleteContainerRef.current.appendChild(autocomplete);
          autocomplete.addEventListener('gmp-select', async (event: unknown) => {
            try {
              const { placePrediction } = event as { placePrediction: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
              const place = placePrediction.toPlace();
              await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'addressComponents', 'location', 'viewport'] });
              updateFormData({
                streetAddress: place.displayName || "",
                city: place.addressComponents[2].longText || "",
                state: place.addressComponents[4].shortText || "",
                zipCode: place.addressComponents[6].shortText || "",
                latLng: place.location,
                formattedAddress: place.formattedAddress || "",
              });
              if (place.viewport) {
                map.fitBounds(place.viewport);
              } else {
                map.setCenter(place.location);
                map.setZoom(18);
              }
              if (markerRef.current) {
                markerRef.current.setPosition(place.location);
              }
              console.log('[AutocompleteInit] Place selected and map/fields updated');
            } catch (err) {
              console.error('[AutocompleteInit] Error handling place selection:', err);
            }
          });
          console.log('[AutocompleteInit] Autocomplete widget created and event attached');
        }
      } catch (err) {
        console.error('[AutocompleteInit] Error initializing autocomplete:', err);
      }
    })();
  }, [mapsReady, map, updateFormData]);
  

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    if (field in locationSchema.shape) {
      try {
        locationSchema.shape[field as LocationFields].parse(newValue);
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    }
  };

  // Prepare address for National Flood API (no commas, no trailing USA)
  const addressForFloodApi = cleanAddressForFloodApi(formData.formattedAddress || "");
  console.log("Address for Flood API:", addressForFloodApi); // TODO: Use this value when calling the National Flood API

  // --- National Flood API Key ---
  const floodApiKey = process.env.NEXT_PUBLIC_NATIONAL_FLOOD_API_KEY;

  // --- Async handleNext with API call ---
  const handleNext = async () => {
    const locationFields = {
      streetAddress: formData?.streetAddress,
      unitAptSuite: formData?.unitAptSuite,
      city: formData?.city,
      state: formData?.state,
      zipCode: formData?.zipCode,
      latLng: formData?.latLng,
    };

    try {
      locationSchema.parse(locationFields);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        searchtype: 'addressparcel',
        address: addressForFloodApi,
        elevation: 'True',
        property: 'True',
      });
      const response = await fetch(`https://api.nationalflooddata.com/v3/data?${params.toString()}`, {
        headers: {
          'x-api-key': floodApiKey || '',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch flood data');
      }
      const data = await response.json();
      console.log("Full Flood API response", data);
      // Extract fields safely
      const floodZone = data?.result?.['flood.s_fld_haz_ar']?.[0]?.fld_zone || '';
      // Use BFE as elevation for quoting
      const propertyElevation = data?.result?.elevation?.propertyelevation || '';
      const bfe = data?.result?.elevation?.['flood.basefloodelevation']?.[0]?.elevation || '';
      const squareFootage = data?.result?.property?.sqft || '';
      const yearBuilt = data?.result?.property?.yearbuilt || '';
      const numberOfStories = data?.result?.property?.storiescount || '';
      console.log("Flood API values", {
        propertyElevation,
        floodZone,
        bfe,
        squareFootage,
        yearBuilt,
        numberOfStories,
      });
      updateFormData({
        propertyElevation: propertyElevation?.toString() || "",
        floodZone: floodZone?.toString() || "",
        baseFloodElevation: bfe?.toString() || "",
        squareFootage: squareFootage?.toString() || "",
        yearBuilt: yearBuilt?.toString() || "",
        numberOfStories: numberOfStories?.toString() || "",
      });
      console.log("Called updateFormData with above values");
      setLoading(false);
      onNext();
    } catch (err) {
      setLoading(false);
      alert('Error fetching flood data. Please verify the address and try again.');
      console.error('[FloodAPI] Error:', err);
    }
  };

  return (
    <FormStepLayout 
      title="Property Location"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
      nextDisabled={loading}
    >     

      {/* Autocomplete input with label and wrapper for consistent spacing */}
      <div className="mb-4">
            <label htmlFor="new-places-autocomplete" className="block text-sm font-medium text-gray-700 mb-1">
              Enter a location
            </label>
            <div ref={autocompleteContainerRef} />
      </div>

      <div className="space-y-6">
        {/* Google Map */}
        <div className="w-full h-80 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center relative">
          <div className="w-full h-full" ref={mapRef} />
          {(!mapsReady || !map) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-10">
              <svg className="animate-spin h-10 w-10 text-sky-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span className="text-sky-600 text-sm">Loading map...</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <p>
            * Please verify the address below is correct. Drag the pin to the correct location if needed.
          </p>
        </div>

        {/* Read-only field to show the selected address */}
        <FormInput
          label="Verify Address"
          placeholder="No address selected"
          type="text"
          value={formData?.formattedAddress || ""}
          readOnly
        />

        <FormInput
          label="Street Address"
          placeholder="Enter your street address"
          type="text"
          value={formData?.streetAddress || ""}
          onChange={handleInputChange("streetAddress")}
          error={errors.streetAddress}
          required
        />

        <FormInput
          label="Unit/Apt/Suite"
          placeholder="Optional"
          type="text"
          value={formData?.unitAptSuite || ""}
          onChange={handleInputChange("unitAptSuite")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="City"
            placeholder="Enter city"
            type="text"
            value={formData?.city || ""}
            onChange={handleInputChange("city")}
            error={errors.city}
            required
          />
          
          <FormInput
            label="State"
            placeholder="Enter state"
            type="text"
            value={formData?.state || ""}
            onChange={handleInputChange("state")}
            error={errors.state}
            required
          />
          
          <FormInput
            label="ZIP Code"
            placeholder="Enter ZIP"
            type="text"
            maxLength={5}
            value={formData?.zipCode || ""}
            onChange={handleInputChange("zipCode")}
            error={errors.zipCode}
            required
          />
        </div>
      </div>
    </FormStepLayout>
  );
};

export default LocationVerification;

