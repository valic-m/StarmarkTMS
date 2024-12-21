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

// Google Maps Libraries
const libraries: Array<'places'> = ['places'];

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phone: ''
  });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }); // Default center (New York)
  const [zoom, setZoom] = useState(15); // Default zoom level
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handle Google Place selection
  const handlePlaceSelected = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place) {
      const addressComponents = place.address_components || [];
      const name = place.name || '';
      const formattedAddress = place.formatted_address || '';
      const phone = place.formatted_phone_number || '';

      // Extract city and state from address components
      const city = addressComponents.find(component =>
        component.types.includes('locality')
      )?.long_name;
      const state = addressComponents.find(component =>
        component.types.includes('administrative_area_level_1')
      )?.short_name;

      setFormData({
        name,
        address: formattedAddress,
        city: city || '',
        state: state || '',
        phone: phone || ''
      });

      // Update map center and zoom in
      if (place.geometry && place.geometry.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setZoom(18); // Set zoom level to focus closely on the location
      }
    }
  };

  const handleFormSubmit = async () => {
    try {
      await createLocation(formData);
      setSuccess('Location added successfully!');
      setFormData({ name: '', address: '', city: '', state: '', phone: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding location:', err);
      setError('Failed to add location');
      setSuccess(null);
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
              disabled={!formData.address}
            >
              Save Location
            </button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Col>
          <Col xl={6}>
            <GoogleMap
              center={mapCenter}
              zoom={zoom} // Use the dynamic zoom state
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
