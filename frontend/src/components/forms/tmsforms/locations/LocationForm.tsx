import React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

interface LocationFormProps {
  formData: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      city: string;
      state: string;
      phone: string;
    }>
  >;
}

const LocationForm: React.FC<LocationFormProps> = ({
  formData,
  setFormData
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
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
      <Row>
        <Col>
          <FloatingLabel label="City" className="mb-3">
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="State" className="mb-3">
            <Form.Control
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel label="Phone" className="mb-3">
        <Form.Control
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </FloatingLabel>
    </div>
  );
};

export default LocationForm;
