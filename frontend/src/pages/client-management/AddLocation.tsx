// File Path: C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\client-management\AddLocation.tsx

import React, { useRef, useState } from 'react';
import { LoadScript, Autocomplete, Libraries } from '@react-google-maps/api'; // Import `Libraries` type
import { createLocation } from 'api/locations';
import PageBreadcrumb from 'components/common/PageBreadcrumb';

const libraries: Libraries = ['places']; // Use `Libraries` type for `libraries`

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: ''
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<any>(null);

  const handlePlaceChange = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place) {
      setFormData(prev => ({
        ...prev,
        address: place.formatted_address || ''
      }));
    }
  };

  const handleFormSubmit = async () => {
    try {
      await createLocation(formData);
      setSuccess('Location added successfully!');
      setFormData({ name: '', address: '', city: '', state: '' });
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
        <Autocomplete
          onLoad={ref => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceChange}
        >
          <input
            type="text"
            placeholder="Search for a location"
            className="form-control mb-3"
          />
        </Autocomplete>
      </LoadScript>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={e =>
              setFormData(prev => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={e =>
              setFormData(prev => ({ ...prev, state: e.target.value }))
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Location
        </button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddLocation;
