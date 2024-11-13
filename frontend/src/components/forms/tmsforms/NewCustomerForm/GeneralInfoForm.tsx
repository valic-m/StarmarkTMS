import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface FormData {
  name: string;
  mc_number: string;
  scac: string;
  address_street: string;
  address_number: string;
  city: string;
  state: string;
  zip_code: string;
}

interface GeneralInfoFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
  formData,
  handleChange
}) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="name">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Customer Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="mc_number">
          <Form.Label>MC Number</Form.Label>
          <Form.Control
            type="text"
            name="mc_number"
            placeholder="Enter MC Number"
            value={formData.mc_number}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="scac">
          <Form.Label>SCAC</Form.Label>
          <Form.Control
            type="text"
            name="scac"
            placeholder="Enter SCAC"
            value={formData.scac}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="address_street">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="address_street"
            placeholder="Enter Street Address"
            value={formData.address_street}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="address_number">
          <Form.Label>Address Number</Form.Label>
          <Form.Control
            type="text"
            name="address_number"
            placeholder="Enter Address Number"
            value={formData.address_number}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder="Enter State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="zip_code">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zip_code"
            placeholder="Enter Zip Code"
            value={formData.zip_code}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Col>
    </Row>
  </>
);

export default GeneralInfoForm;
