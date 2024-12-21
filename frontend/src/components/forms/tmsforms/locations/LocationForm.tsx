import React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

interface LocationFormProps {
  formData: { name: string; address: string; city: string; state: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      city: string;
      state: string;
    }>
  >;
}

const LocationForm: React.FC<LocationFormProps> = ({
  formData,
  setFormData
}) => {
  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name, value, type } = target;
    const isChecked =
      type === 'checkbox' ? (target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: isChecked !== undefined ? isChecked : value
    }));
  };

  return (
    <>
      <h3>Location Details</h3>
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter location name"
          value={formData.name}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel label="Address" className="mb-3">
        <Form.Control
          type="text"
          name="address"
          placeholder="Enter location address"
          value={formData.address}
          onChange={handleChange}
        />
      </FloatingLabel>
      <Row className="g-3">
        <Col md={6}>
          <FloatingLabel label="City">
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col md={6}>
          <FloatingLabel label="State (optional)">
            <Form.Control
              type="text"
              name="state"
              placeholder="State (optional)"
              value={formData.state}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
    </>
  );
};

export default LocationForm;
