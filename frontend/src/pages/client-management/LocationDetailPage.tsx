import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Nav, Alert } from 'react-bootstrap';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { Location } from 'types/Location';
import { getLocationById } from 'api/locations';

const libraries: Array<'places'> = ['places'];

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (id) {
          const locationData = await getLocationById(parseInt(id));
          setLocation(locationData);
        }
      } catch (err) {
        setError('Failed to fetch location details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Location Details</h2>
      {location ? (
        <Row className="g-4">
          {/* Left column with details */}
          <Col lg={6}>
            <div className="border p-3 rounded">
              <h3>{location.name}</h3>
              <p>
                <strong>Address:</strong>{' '}
                {`${location.address_line1}${
                  location.address_line2 ? `, ${location.address_line2}` : ''
                }, ${location.city}, ${location.state}, ${location.zip_code}`}
              </p>
              <p>
                <strong>Rating:</strong> {location.rating || 'N/A'}
              </p>
            </div>
          </Col>

          {/* Right column with Google Map */}
          <Col lg={6}>
            <div style={{ height: '400px', width: '100%' }}>
              <LoadScript
                googleMapsApiKey={
                  process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
                }
                libraries={libraries}
              >
                <GoogleMap
                  center={{
                    lat: location.lat ?? 0,
                    lng: location.lng ?? 0
                  }}
                  zoom={17}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                >
                  <Marker
                    position={{
                      lat: location.lat ?? 0,
                      lng: location.lng ?? 0
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          </Col>

          {/* Tabs Section */}
          <Col xs={12}>
            <Tab.Container defaultActiveKey="shippments">
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="shippments">Shippments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="contacts">Contacts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="notes">Notes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="other-info">Other Info</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="shippments">
                  <p>Here are the shipments details...</p>
                </Tab.Pane>
                <Tab.Pane eventKey="contacts">
                  <p>Here are the contact details...</p>
                </Tab.Pane>
                <Tab.Pane eventKey="notes">
                  <p>Here are the notes...</p>
                </Tab.Pane>
                <Tab.Pane eventKey="other-info">
                  <p>Here is the other information...</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
};

export default LocationDetailPage;
