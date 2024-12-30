// src/pages/client-management/AddLocation.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Button, Alert, Form } from 'react-bootstrap';
import {
  LoadScript,
  GoogleMap,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import LocationForm from 'components/forms/tmsforms/locations/LocationForm';
import { createLocation } from 'api/locations';
import { getAllCategories } from 'api/categories';
import { Location, Category } from 'types/Location';

const libraries: Array<'places'> = ['places'];

/**
 * Maps Google's numeric day to a string key.
 * Google: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 */
function googleDayIndexToKey(dayNumber: number): string {
  switch (dayNumber) {
    case 0:
      return 'SUN';
    case 1:
      return 'MON';
    case 2:
      return 'TUE';
    case 3:
      return 'WED';
    case 4:
      return 'THU';
    case 5:
      return 'FRI';
    case 6:
      return 'SAT';
    default:
      return '';
  }
}

/** Converts Google's 'HHmm' (e.g. "0800") to "HH:MM". */
function formatGoogleTime(timeStr: string): string {
  if (timeStr?.length === 4) {
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
  }
  return timeStr;
}

/**
 * Interface for form errors, including nested errors for operating_hours.
 */
interface FormErrors {
  name?: string[];
  address_line1?: string[];
  address_line2?: string[];
  city?: string[];
  state?: string[];
  zip_code?: string[];
  phone_number?: string[];
  email?: string[];
  shipping_hours_from?: string[];
  shipping_hours_to?: string[];
  load_time?: string[];
  directions?: string[];
  do_not_load?: string[];
  no_reefers?: string[];
  charges_lumper?: string[];
  lumper_fee?: string[];
  categories?: string[];
  comments?: string[];
  website?: string[];
  plus_code?: string[];
  operating_hours?: { [index: number]: string[] };
  // Allow any other fields without TypeScript errors
  [key: string]: string[] | { [index: number]: string[] } | undefined;
}

const AddLocation: React.FC = () => {
  // Base fields for a location
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    phone_number: '',
    email: '',
    shipping_hours_from: '',
    shipping_hours_to: '',
    load_time: '',
    directions: '',
    do_not_load: false,
    no_reefers: false,
    charges_lumper: false,
    lumper_fee: 0,
    categories: [],
    operating_hours: [] // Initialize as empty array
  });

  // Additional fields from Google
  const [plusCode, setPlusCode] = useState('');
  const [website, setWebsite] = useState('');

  // Google map states
  const [mapCenter, setMapCenter] = useState({
    lat: 39.78373,
    lng: -100.445882
  });
  const [zoom, setZoom] = useState(4);

  // Alerts
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Autocomplete ref
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Error messages
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Fetch categories from backend on mount
    const fetchCategoriesData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories');
      }
    };
    fetchCategoriesData().catch(console.error);
  }, []);

  const handlePlaceSelected = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place) return;

    const addressComponents = place.address_components || [];

    // Street / City / State / Zip / Subpremise
    const streetNumber = addressComponents.find(comp =>
      comp.types.includes('street_number')
    )?.long_name;
    const route = addressComponents.find(comp => comp.types.includes('route'))
      ?.long_name;
    const subpremise = addressComponents.find(comp =>
      comp.types.includes('subpremise')
    )?.long_name;
    const city = addressComponents.find(comp => comp.types.includes('locality'))
      ?.long_name;
    const state = addressComponents.find(comp =>
      comp.types.includes('administrative_area_level_1')
    )?.short_name;
    const zipCode = addressComponents.find(comp =>
      comp.types.includes('postal_code')
    )?.long_name;

    // Build address line 1
    const addressLine1 = [streetNumber, route].filter(Boolean).join(' ');

    // Phone
    const phoneNumber =
      place.formatted_phone_number || place.international_phone_number || '';

    // Attempt to parse opening_hours -> build operatingHours array
    let newOperatingHours: NonNullable<Location['operating_hours']> = [];
    // ^ ensures it's always an array

    if (place.opening_hours?.periods) {
      const googlePeriods = place.opening_hours.periods;

      // Create a day -> { open_time, close_time } map
      const map: Record<string, { open_time: string; close_time: string }> = {};

      googlePeriods.forEach(period => {
        const openDayKey = googleDayIndexToKey(period.open.day);
        const openTime = formatGoogleTime(period.open.time);
        const closeTime = period.close?.time
          ? formatGoogleTime(period.close.time)
          : '';

        map[openDayKey] = {
          open_time: openTime,
          close_time: closeTime
        };
      });

      // Convert map into an array of { day, open_time, close_time }
      newOperatingHours = [
        { day: 'SUN', open_time: '', close_time: '' },
        { day: 'MON', open_time: '', close_time: '' },
        { day: 'TUE', open_time: '', close_time: '' },
        { day: 'WED', open_time: '', close_time: '' },
        { day: 'THU', open_time: '', close_time: '' },
        { day: 'FRI', open_time: '', close_time: '' },
        { day: 'SAT', open_time: '', close_time: '' }
      ].map(item => {
        if (map[item.day]) {
          return {
            day: item.day,
            open_time: map[item.day].open_time,
            close_time: map[item.day].close_time
          };
        }
        return item;
      });
    }

    // If place has plus_code
    if (place.plus_code?.compound_code) {
      setPlusCode(place.plus_code.compound_code);
    }

    // If place has website
    if (place.website) {
      setWebsite(place.website);
    }

    // If place has geometry
    if (place.geometry?.location) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      setZoom(16);
    }

    // Update formData
    setFormData(prev => ({
      ...prev,
      name: place.name || '',
      address_line1: addressLine1,
      address_line2: subpremise || '',
      city: city || '',
      state: state || '',
      zip_code: zipCode || '',
      phone_number: phoneNumber,
      // Overwrite operating_hours if we found any new ones
      operating_hours:
        newOperatingHours.length > 0 ? newOperatingHours : prev.operating_hours
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSuccess(null);
    setError(null);
    try {
      const locationData = {
        ...formData,
        plus_code: plusCode,
        website: website,
        lat: mapCenter.lat,
        lng: mapCenter.lng
      };

      await createLocation(locationData as Location);
      setSuccess('Location added successfully!');
      setError(null);
      setFormErrors({});

      // Reset form
      setFormData({
        name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        phone_number: '',
        email: '',
        shipping_hours_from: '',
        shipping_hours_to: '',
        load_time: '',
        directions: '',
        do_not_load: false,
        no_reefers: false,
        charges_lumper: false,
        lumper_fee: 0,
        categories: [],
        operating_hours: []
      });
      setPlusCode('');
      setWebsite('');
      setMapCenter({ lat: 39.78373, lng: -100.445882 });
      setZoom(4);
    } catch (err: any) {
      console.error('Error adding location:', err);
      if (err.response && err.response.data) {
        const data = err.response.data;
        const fieldErrors: FormErrors = {};

        // Iterate over error fields
        for (const key in data) {
          if (key === 'operating_hours' && Array.isArray(data[key])) {
            // Assuming operating_hours errors are sent as an array of objects with field, index, and errors
            // Example: operating_hours: [{ field: 'operating_hours', index: 0, errors: ['open_time is invalid'] }, ...]
            if (!fieldErrors['operating_hours']) {
              fieldErrors['operating_hours'] = {};
            }
            data[key].forEach((item: any) => {
              if (item.field === 'operating_hours') {
                if (
                  typeof item.index === 'number' &&
                  Array.isArray(item.errors)
                ) {
                  // Initialize operating_hours if not already
                  if (!fieldErrors['operating_hours']) {
                    fieldErrors['operating_hours'] = {};
                  }
                  // Assign errors to the specific index
                  fieldErrors['operating_hours'][item.index] = item.errors;
                }
              }
            });
          } else if (Array.isArray(data[key])) {
            fieldErrors[key] = data[key];
          }
        }

        setFormErrors(fieldErrors);
        setError('Please correct the errors below and try again.');
        setSuccess(null);
      } else {
        setError('Failed to add location. Please try again.');
      }
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Client Management', url: '/client-management' },
          { label: 'Add Location' }
        ]}
      />
      <h2 className="fs-5 mb-4 mb-xl-5">Add New Location</h2>

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
        libraries={libraries}
      >
        <Row>
          <Col xl={6}>
            <div className="mb-4">
              <Autocomplete
                onLoad={ref => (autocompleteRef.current = ref)}
                onPlaceChanged={handlePlaceSelected}
              >
                <input
                  type="text"
                  placeholder="Search for a location or address"
                  className="form-control"
                />
              </Autocomplete>
            </div>

            <form onSubmit={handleFormSubmit}>
              <LocationForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                errors={formErrors}
              />

              {/* Website input */}
              <div className="mb-3">
                <label className="form-label">Website</label>
                <input
                  type="url"
                  className={`form-control ${
                    formErrors.website ? 'is-invalid' : ''
                  }`}
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                />
                {formErrors.website && (
                  <div className="invalid-feedback">
                    {Array.isArray(formErrors.website)
                      ? formErrors.website.join(', ')
                      : 'Invalid website format.'}
                  </div>
                )}
              </div>

              {/* Plus Code input */}
              <div className="mb-3">
                <label className="form-label">Plus Code</label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.plus_code ? 'is-invalid' : ''
                  }`}
                  value={plusCode}
                  onChange={e => setPlusCode(e.target.value)}
                />
                {formErrors.plus_code && (
                  <div className="invalid-feedback">
                    {Array.isArray(formErrors.plus_code)
                      ? formErrors.plus_code.join(', ')
                      : 'Invalid plus code format.'}
                  </div>
                )}
              </div>

              {/* Operating Hours Options */}
              <div className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Open 24 Hours All 7 Days"
                  checked={
                    formData.operating_hours?.every(
                      oh =>
                        oh.open_time === '00:00' && oh.close_time === '23:59'
                    ) || false
                  }
                  onChange={e => {
                    if (e.target.checked) {
                      // Set operating hours to 24h for all days
                      const allDays = [
                        'MON',
                        'TUE',
                        'WED',
                        'THU',
                        'FRI',
                        'SAT',
                        'SUN'
                      ];
                      const newOperatingHours = allDays.map(day => ({
                        day,
                        open_time: '00:00',
                        close_time: '23:59'
                      }));
                      setFormData(prev => ({
                        ...prev,
                        operating_hours: newOperatingHours
                      }));
                    } else {
                      // Clear operating hours
                      setFormData(prev => ({
                        ...prev,
                        operating_hours: []
                      }));
                    }
                  }}
                />
              </div>

              <div className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Closed on Weekends"
                  checked={
                    formData.operating_hours?.some(
                      oh =>
                        (oh.day === 'SAT' || oh.day === 'SUN') &&
                        !oh.open_time &&
                        !oh.close_time
                    ) || false
                  }
                  onChange={e => {
                    if (e.target.checked) {
                      // Set operating hours to closed for weekends
                      const updatedOperatingHours = [
                        ...(formData.operating_hours || [])
                      ];
                      ['SAT', 'SUN'].forEach(day => {
                        const index = updatedOperatingHours.findIndex(
                          oh => oh.day === day
                        );
                        if (index !== -1) {
                          updatedOperatingHours[index] = {
                            day,
                            open_time: '',
                            close_time: ''
                          };
                        } else {
                          updatedOperatingHours.push({
                            day,
                            open_time: '',
                            close_time: ''
                          });
                        }
                      });
                      setFormData(prev => ({
                        ...prev,
                        operating_hours: updatedOperatingHours
                      }));
                    } else {
                      // Remove operating hours for weekends
                      const updatedOperatingHours = (
                        formData.operating_hours || []
                      ).filter(oh => oh.day !== 'SAT' && oh.day !== 'SUN');
                      setFormData(prev => ({
                        ...prev,
                        operating_hours: updatedOperatingHours
                      }));
                    }
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={!formData.address_line1 || !formData.name}
                className="mt-3"
              >
                Save Location
              </Button>
            </form>

            {success && (
              <Alert variant="success" className="mt-3">
                {success}
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Col>

          <Col xl={6}>
            <GoogleMap
              center={mapCenter}
              zoom={zoom}
              mapContainerStyle={{ width: '100%', height: '750px' }}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </Col>
        </Row>
      </LoadScript>
    </div>
  );
};

export default AddLocation;
