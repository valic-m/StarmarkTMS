import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
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

const AddLocation: React.FC = () => {
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
    rating: 0,
    comments: '',
    directions: '',
    do_not_load: false,
    no_reefers: false,
    charges_lumper: false,
    lumper_fee: 0,
    categories: []
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 39.78373,
    lng: -100.445882
  });
  const [zoom, setZoom] = useState(4);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
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

  const getPlaceDetails = (
    placeId: string,
    fields: string[]
  ): Promise<google.maps.places.PlaceResult> => {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      service.getDetails({ placeId, fields }, (placeDetails, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          placeDetails
        ) {
          resolve(placeDetails);
        } else {
          reject(status);
        }
      });
    });
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const placeDetails = await getPlaceDetails(placeId, ['opening_hours']);
      console.log('Place Details (Opening Hours):', placeDetails.opening_hours);

      if (placeDetails.opening_hours?.periods) {
        const targetDay = 1; // Example: Monday (0 = Sunday, ..., 6 = Saturday)
        const periodsForDay = placeDetails.opening_hours.periods.filter(
          period => period.open.day === targetDay
        );

        if (periodsForDay.length === 0) {
          setFormData(prev => ({
            ...prev,
            shipping_hours_from: '',
            shipping_hours_to: ''
          }));
          console.warn(`The place is closed on day ${targetDay}.`);
          return;
        }

        const period = periodsForDay[0];
        const formatTime = (time: string): string =>
          time.length === 4 ? `${time.slice(0, 2)}:${time.slice(2)}` : '';

        setFormData(prev => ({
          ...prev,
          shipping_hours_from: formatTime(period.open.time),
          shipping_hours_to: period.close?.time
            ? formatTime(period.close.time)
            : ''
        }));
      } else {
        console.warn('No opening hours available for this place.');
      }
    } catch (err) {
      console.error('Error fetching place details:', err);
      setError('Failed to fetch place details');
    }
  };

  const handlePlaceSelected = async () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    console.log('Selected Place:', place);

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
        name: place.name || '',
        address_line1: fullAddress,
        address_line2: subpremise || '',
        city: city || '',
        state: state || '',
        zip_code: zipCode || '',
        phone_number: place.formatted_phone_number || ''
      }));

      if (place.place_id) {
        await fetchPlaceDetails(place.place_id);
      }

      if (place.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setZoom(25);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const locationData = {
        ...formData,
        lat: mapCenter.lat, // Include latitude
        lng: mapCenter.lng // Include longitude
      };
      await createLocation(formData as Location);
      setSuccess('Location added successfully!');
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
        rating: 0,
        comments: '',
        directions: '',
        do_not_load: false,
        no_reefers: false,
        charges_lumper: false,
        lumper_fee: 0,
        categories: []
      });
      setError(null);
    } catch (err: any) {
      console.error('Error adding location:', err);
      setError(err.response?.data?.detail || 'Failed to add location');
      setSuccess(null);
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
              />
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
