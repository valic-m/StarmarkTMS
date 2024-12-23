import React, { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  LoadScript,
  GoogleMap,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import LocationForm from 'components/forms/tmsforms/locations/LocationForm';
import { createLocation } from 'api/locations';
import { Location } from 'types/Location';

const libraries: Array<'places'> = ['places'];

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Location>>({
    company_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    contact_person: '',
    phone_number: '',
    email: '',
    shipping_hours: '',
    load_time: '',
    shipping_manager_name: '',
    shipping_manager_phone: '',
    shipping_manager_email: '',
    rating: 0,
    comments: '',
    directions: '',
    do_not_load: false
  });

  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [zoom, setZoom] = useState(15);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelected = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place) {
      const addressComponents = place.address_components || [];
      const streetNumber = addressComponents.find(comp =>
        comp.types.includes('street_number')
      )?.long_name;
      const route = addressComponents.find(comp => comp.types.includes('route'))
        ?.long_name;
      const subpremise = addressComponents.find(comp =>
        comp.types.includes('subpremise')
      )?.long_name;
      const city = addressComponents.find(comp =>
        comp.types.includes('locality')
      )?.long_name;
      const state = addressComponents.find(comp =>
        comp.types.includes('administrative_area_level_1')
      )?.short_name;
      const zipCode = addressComponents.find(comp =>
        comp.types.includes('postal_code')
      )?.long_name;

      const fullAddress = [streetNumber, route].filter(Boolean).join(' ');

      setFormData(prev => ({
        ...prev,
        company_name: place.name || '',
        address_line1: fullAddress,
        address_line2: subpremise || '',
        city: city || '',
        state: state || '',
        zip_code: zipCode || '',
        phone_number: place.formatted_phone_number || ''
      }));

      if (place.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setZoom(18);
      }
    }
  };

  const handleFormSubmit = async () => {
    try {
      await createLocation(formData as Location); // Cast formData to Location
      setSuccess('Location added successfully!');
      setFormData({
        company_name: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        contact_person: '',
        phone_number: '',
        email: '',
        shipping_hours: '',
        load_time: '',
        shipping_manager_name: '',
        shipping_manager_phone: '',
        shipping_manager_email: '',
        rating: 0,
        comments: '',
        directions: '',
        do_not_load: false
      });
      setError(null);
    } catch (err) {
      console.error('Error adding location:', err);
      setError('Failed to add location');
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Client Management' },
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
            <LocationForm formData={formData} setFormData={setFormData} />
            <button
              className="btn btn-primary"
              onClick={handleFormSubmit}
              disabled={!formData.address_line1 || !formData.company_name}
            >
              Save Location
            </button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Col>
          <Col xl={6}>
            <GoogleMap
              center={mapCenter}
              zoom={zoom}
              mapContainerStyle={{ width: '100%', height: '400px' }}
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
