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
  // Add any other relevant fields
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

    {/* Add more fields as needed */}
  </>
);

export default GeneralInfoForm;
