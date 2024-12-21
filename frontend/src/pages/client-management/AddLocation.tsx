import React, { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  LoadScript,
  GoogleMap,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { createLocation } from 'api/locations';

const libraries: 'places'[] = ['places']; // Fix for 'readonly' type

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phone: ''
  });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelected = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (place) {
      const addressComponents = place.address_components || [];
      const name = place.name || '';
      const formattedAddress = place.formatted_address || '';
      const phone = place.formatted_phone_number || '';

      // Extract City and State
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

      // Update map center
      if (place.geometry && place.geometry.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        libraries={libraries} // Fixed libraries type
      >
        <Row>
          {/* Search Box and Form */}
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
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-control mb-3"
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="form-control mb-3"
              />
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                className="form-control mb-3"
              />
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleFormChange}
                className="form-control mb-3"
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="form-control mb-3"
              />
              <button className="btn btn-primary" onClick={handleFormSubmit}>
                Save Location
              </button>
              {success && <p style={{ color: 'green' }}>{success}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </Col>

          {/* Map Display */}
          <Col xl={6}>
            <GoogleMap
              center={mapCenter}
              zoom={15}
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
