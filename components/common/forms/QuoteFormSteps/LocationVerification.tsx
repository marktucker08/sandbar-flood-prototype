"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormInput } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";
import { MapPin } from "lucide-react";

interface LocationVerificationProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

const locationSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unitAptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string()
    .min(1, "ZIP code is required")
    // .regex(/^\d{5}$/, "ZIP code must contain only numbers"),
});

type LocationFields = keyof z.infer<typeof locationSchema>;

// Tell TypeScript that google will be available globally at runtime
// This is necessary because Google Maps JS API is loaded dynamically
// and types cannot be imported directly in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

// --- Google Maps Script Loader Hook ---
function useGoogleMapsLoader(src: string, onReady: () => void) {
  useEffect(() => {
    let script = document.querySelector(`script[src='${src}']`) as HTMLScriptElement | null;
    if (script) {
      if (script.getAttribute('data-loaded') === 'true') {
        onReady();
        return;
      }
      script.addEventListener('load', onReady);
      return;
    }
    script = document.createElement("script") as HTMLScriptElement;
    script.src = src;
    script.async = true;
    script.setAttribute('data-loaded', 'false');
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      onReady();
      console.log('Google Maps script Loaded:', src);
    };
    document.body.appendChild(script);
    // Do not remove the script on unmount
  }, [src, onReady]);
}

const LocationVerification: React.FC<LocationVerificationProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
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
    if (!mapsReady || map || !mapRef.current || typeof google === 'undefined' || !google.maps.importLibrary) return;
    (async () => {
      const { Map } = await google.maps.importLibrary('maps');
      // Use formData coordinates if available, else default
      const initialLatLng = { lat: 39.5873284, lng: -74.225578 }; // NJ default
      const gMap = new Map(mapRef.current, {
        center: formData.latLng ? formData.latLng : initialLatLng,
        zoom: 16,
        mapId: 'DEMO_MAP_ID',
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

      // Add dragend event listener
      marker.addListener('dragend', () => {
        const newPosition = marker.getPosition();
        if (newPosition) {
          const lat = newPosition.lat();
          const lng = newPosition.lng();
          const geocoder = new google.maps.Geocoder();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          geocoder.geocode({ location: { lat, lng } }, (results: any, status: string) => {
            if (status === 'OK' && results && results[0]) {
              const address = results[0];
              console.log(results[0]);
              const getComponent = (type: string) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                address.address_components.find((c: any) => c.types.includes(type))?.long_name || '';
              updateFormData({
                streetAddress: (getComponent('street_number') + " " + getComponent('route')) || "",
                city: getComponent('locality'),
                state: getComponent('administrative_area_level_1'),
                zipCode: getComponent('postal_code'),
                latLng: { lat, lng },
              });
              // Update the autocomplete input value
              // const autocompleteEl = autocompleteContainerRef.current?.querySelector('gmp-place-autocomplete');
              // if (autocompleteEl) {
              //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
              //   (autocompleteEl as any).value = (address.formatted_address) || "";
              // }
            }
          });
        }
      });
      console.log('Map and marker initialized');
    })();
  }, [mapsReady, map, updateFormData, formData]);

  // Setup new PlaceAutocompleteElement widget
  useEffect(() => {
    if (!mapsReady || !map || typeof google === 'undefined' || !google.maps.importLibrary) {
      console.log('Waiting for mapsReady and map:', { mapsReady, map });
      return;
    }
    (async () => {
      const { PlaceAutocompleteElement } = await google.maps.importLibrary('places');
      if (autocompleteContainerRef.current && !autocompleteContainerRef.current.querySelector('gmp-place-autocomplete')) {
        const autocomplete = new PlaceAutocompleteElement();
        autocomplete.id = "new-places-autocomplete";
        autocomplete.placeholder = "Enter your street address";
        autocomplete.setAttribute('placeholder', "Enter your street address");
        autocomplete.style.width = "100%";
        autocompleteContainerRef.current.innerHTML = "";
        autocompleteContainerRef.current.appendChild(autocomplete);
        console.log('Autocomplete widget created and appended to DOM');

        // Attach the correct event listener for the new API
        // const domEl = autocompleteContainerRef.current.querySelector('gmp-place-autocomplete');
        // if (domEl) {
        //   domEl.addEventListener('gmp-select', async (event: Event) => {
        //     const customEvent = event as CustomEvent;
        //     const { placePrediction } = customEvent.detail;
        //     if (!placePrediction) {
        //       console.error('No placePrediction in event detail');
        //       return;
        //     }
        //     const place = placePrediction.toPlace();
        //     await place.fetchFields({ fields: ['formattedAddress', 'location', 'addressComponents'] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        autocomplete.addEventListener('gmp-select', async ({ placePrediction }: { placePrediction: any }) => {
          const place = placePrediction.toPlace();
          await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'addressComponents', 'location', 'viewport'] });
            console.log('Selected place (from DOM event):', place);

            updateFormData({
              streetAddress: place.displayName || "",
              city: place.addressComponents[2].longText || "",
              state: place.addressComponents[4].shortText || "",
              zipCode: place.addressComponents[6].shortText || "",
              latLng: place.location,
            });
            if (place.viewport) {
              map.fitBounds(place.viewport);
              } else {
              map.setCenter(place.location);
              map.setZoom(16);
          }  
            // if (place.location && map) {
            //   const latLng = { lat: place.location.lat, lng: place.location.lng };
            //   map.setCenter(latLng);
            //   map.setZoom(16);
              if (markerRef.current) {
                markerRef.current.setPosition(place.location);
              }
            // }
          // });
          console.log('Event listener attached to DOM element');
        // } else {
        //   console.error('Could not find gmp-place-autocomplete DOM element');
        // }
      });
    }})();  
  }, [mapsReady, map, updateFormData]);
  console.log(formData);

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

  const handleNext = () => {
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

  return (
    <FormStepLayout 
      title="Property Location"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >     
      <div className="space-y-6">
        {/* Google Map */}
        <div className="w-full h-70 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center">
          <div className="w-full h-full" ref={mapRef} />
          {!mapsReady && (
            <div className="absolute text-center w-full">
              <MapPin className="w-12 h-12 text-sky-400 mx-auto mb-2" />
              <p className="text-sky-600 text-sm">Loading map...</p>
            </div>
          )}
        </div>

        {/* New Google Maps PlaceAutocompleteElement widget */}
        <label htmlFor="new-places-autocomplete" className="block text-sm font-medium text-gray-700 mb-1">
          Enter a location
        </label>
        <div ref={autocompleteContainerRef} />

        {/* Read-only field to show the selected address */}
        {/* <FormInput
          label="Selected Address"
          placeholder="No address selected"
          type="text"
          value={formData?.streetAddress || ""}
          readOnly
        /> */}

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

