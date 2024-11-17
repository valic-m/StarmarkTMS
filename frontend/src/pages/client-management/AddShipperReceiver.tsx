import React, { useState } from 'react';
import { Col, Row, Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker
} from '@react-google-maps/api';
import { createShipperReceiver } from 'api/shippersReceivers';

const AddShipperReceiver: React.FC = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone_number: '',
    email: '',
    address: ''
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'primary'
  });

  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const location = place.geometry.location;
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setFormData({
          ...formData,
          address: place.formatted_address || ''
        });
      }
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'company_name',
      'contact_person',
      'phone_number',
      'email',
      'address'
    ] as const; // Ensure TypeScript inference.

    const missingFields = requiredFields.filter(
      field => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      setAlert({
        show: true,
        message: `Please complete the required fields: ${missingFields.join(', ')}`,
        variant: 'warning'
      });
      return;
    }

    try {
      await createShipperReceiver(formData);
      setAlert({
        show: true,
        message: 'Shipper/Receiver added successfully!',
        variant: 'success'
      });
      setFormData({
        company_name: '',
        contact_person: '',
        phone_number: '',
        email: '',
        address: ''
      });
    } catch (error) {
      console.error('Failed to add shipper/receiver:', error);
      setAlert({
        show: true,
        message: 'Failed to add shipper/receiver. Please try again.',
        variant: 'danger'
      });
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Client Management' },
          { label: 'Add Shipper/Receiver' }
        ]}
      />
      <h2 className="fs-5 mb-4 mb-xl-5">Add Shipper/Receiver</h2>
      <Row className="gx-0 gx-xl-5">
        {/* Left Panel */}
        <Col md={4}>
          <Form>
            <FloatingLabel
              controlId="shipperName"
              label="Company Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={e =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="contactPerson"
              label="Contact Person"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter contact person"
                value={formData.contact_person}
                onChange={e =>
                  setFormData({ ...formData, contact_person: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="phoneNumber"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={formData.phone_number}
                onChange={e =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId="address" label="Address" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={e =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </FloatingLabel>
            <Button variant="primary" onClick={handleSubmit}>
              Save Shipper/Receiver
            </Button>
          </Form>
          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ ...alert, show: false })}
              dismissible
              className="mt-3"
            >
              {alert.message}
            </Alert>
          )}
        </Col>

        {/* Right Panel */}
        <Col md={8}>
          <LoadScript
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
            libraries={['places']}
          >
            <Autocomplete
              onLoad={autoCompleteInstance =>
                setAutocomplete(autoCompleteInstance)
              }
              onPlaceChanged={handlePlaceChanged}
            >
              <Form.Control
                type="text"
                placeholder="Search location"
                className="mb-3"
              />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={mapCenter}
              zoom={14}
              onClick={event =>
                setMarkerPosition({
                  lat: event.latLng?.lat() || 0,
                  lng: event.latLng?.lng() || 0
                })
              }
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </div>
  );
};

export default AddShipperReceiver;
