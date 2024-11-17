import React, { useState } from 'react';
import { Col, Row, Form, FloatingLabel, Button } from 'react-bootstrap';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker
} from '@react-google-maps/api';
import { Buffer } from 'buffer';

// Fix for Buffer is not defined
globalThis.Buffer = Buffer;

const AddShipperReceiverWithMap: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState('');

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const location = place.geometry.location;
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setAddress(place.formatted_address || '');
      }
    }
  };

  return (
    <Row>
      {/* Left Panel */}
      <Col md={4}>
        <h3 className="mb-4">Add New Shipper/Receiver</h3>
        <Form>
          <FloatingLabel
            controlId="shipperName"
            label="Company Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter company name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="contactPerson"
            label="Contact Person"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter contact person" />
          </FloatingLabel>
          <FloatingLabel
            controlId="phoneNumber"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter phone number" />
          </FloatingLabel>
          <FloatingLabel controlId="email" label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Enter email" />
          </FloatingLabel>
          <FloatingLabel controlId="address" label="Address" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Save Shipper/Receiver
          </Button>
        </Form>
      </Col>

      {/* Right Panel: Map */}
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
  );
};

export default AddShipperReceiverWithMap;
