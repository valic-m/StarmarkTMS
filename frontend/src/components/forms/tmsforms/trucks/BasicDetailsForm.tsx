// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\BasicDetailsForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck'; // or a relative path if you haven’t configured baseUrl

interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  onDecodeVIN: () => void;
  decodeResult: any; // or more specific type if you prefer
}

const BasicDetailsForm: React.FC<Props> = ({
  formData,
  onChange,
  onDecodeVIN,
  decodeResult
}) => {
  return (
    <>
      <h5>Basic Truck Details</h5>
      <Form.Group className="mb-3" controlId="truckName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="licensePlate">
        <Form.Label>License Plate</Form.Label>
        <Form.Control
          type="text"
          name="license_plate"
          value={formData.license_plate}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="manufacturer">
        <Form.Label>Manufacturer</Form.Label>
        <Form.Control
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          name="year"
          value={formData.year}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="vin">
        <Form.Label>VIN</Form.Label>
        <Form.Control
          type="text"
          name="vin"
          value={formData.vin}
          onChange={onChange}
          onBlur={onDecodeVIN} // triggers decode
          required
        />
      </Form.Group>

      {decodeResult && (
        <p className="text-muted">
          VIN decoded with {decodeResult.length} fields (see full details
          below).
        </p>
      )}

      <Form.Group className="mb-3" controlId="startingMileage">
        <Form.Label>Starting Mileage</Form.Label>
        <Form.Control
          type="number"
          name="starting_mileage"
          value={formData.starting_mileage}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="color">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="text"
          name="color"
          value={formData.color}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};

export default BasicDetailsForm;
