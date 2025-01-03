// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\TruckDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Nav, Alert } from 'react-bootstrap';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

// Import your Truck interface and getTruckById helper from the API
import { Truck, getTruckById } from 'api/trucks';

/**
 * If your Truck model doesn't actually have lat/lng fields, you can:
 * 1) Remove the map code, or
 * 2) Default lat/lng to 0 (as shown below).
 */

// Tells GoogleMap which libraries to load. If you don't use 'places', you can remove.
const libraries: Array<'places'> = ['places'];

const TruckDetailPage: React.FC = () => {
  // 1) Retrieve the :id param from the route
  const { id } = useParams<{ id: string }>();

  // 2) Local state
  const [truck, setTruck] = useState<Truck | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3) Fetch the truck details when component mounts or when 'id' changes
  useEffect(() => {
    const fetchTruck = async () => {
      try {
        if (id) {
          // Convert id from string to number
          const truckData = await getTruckById(parseInt(id, 10));
          setTruck(truckData);
        }
      } catch (err) {
        console.error('Error fetching truck details:', err);
        setError('Failed to fetch truck details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTruck();
  }, [id]);

  // 4) Handle loading/error states
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  if (!truck) {
    return <p>No truck data available.</p>;
  }

  // 5) If your Truck model doesn't have lat/lng, just default them to 0
  //    or remove this map code entirely.
  const lat = truck.lat ?? 0;
  const lng = truck.lng ?? 0;

  return (
    <div>
      <h2>Truck Details</h2>
      <Row className="g-4">
        {/* Left column: basic truck info */}
        <Col lg={6}>
          <div className="border p-3 rounded">
            <h3>{truck.name}</h3>
            <p>
              <strong>Manufacturer:</strong> {truck.manufacturer}
            </p>
            <p>
              <strong>Year:</strong> {truck.year}
            </p>
            <p>
              <strong>VIN:</strong> {truck.vin}
            </p>
            <p>
              <strong>License Plate:</strong> {truck.license_plate}
            </p>
            <p>
              <strong>Current Mileage:</strong> {truck.starting_mileage}
            </p>
            <p>
              <strong>Color:</strong> {truck.color}
            </p>
            {/* Add more fields as needed (owner, carrier, etc.) */}
          </div>
        </Col>

        {/* Right column: Google Map (if lat/lng exist) */}
        <Col lg={6}>
          <div style={{ height: '400px', width: '100%' }}>
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
              libraries={libraries}
            >
              <GoogleMap
                center={{ lat, lng }}
                zoom={13}
                mapContainerStyle={{ width: '100%', height: '100%' }}
              >
                <Marker position={{ lat, lng }} />
              </GoogleMap>
            </LoadScript>
          </div>
        </Col>

        {/* Tabs Section */}
        <Col xs={12}>
          <Tab.Container defaultActiveKey="general">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="general">General Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="maintenance">Maintenance</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="inspections">Inspections</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notes">Notes</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="general">
                <p>
                  <strong>Leased To:</strong>{' '}
                  {truck.is_leased ? truck.leased_to || 'N/A' : 'Not leased'}
                </p>
                <p>
                  <strong>Owner Operated:</strong>{' '}
                  {truck.owner_operated ? 'Yes' : 'No'}
                </p>
                {/* Add any other "general" data about the truck */}
              </Tab.Pane>

              <Tab.Pane eventKey="maintenance">
                <p>
                  Here you could list or link to the truck's maintenance logs.
                </p>
              </Tab.Pane>

              <Tab.Pane eventKey="inspections">
                <p>
                  Here you could list or link to the truck's inspection records.
                </p>
              </Tab.Pane>

              <Tab.Pane eventKey="notes">
                <p>Here you could display notes or additional truck info.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
};

export default TruckDetailPage;
