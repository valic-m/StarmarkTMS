// File: src/components/forms/tmsforms/NewLoadForm/LoadInformation.tsx

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { LoadFormData } from 'types/LoadFormData'; // Ensure this path is correct and LoadFormData is defined

interface LoadInformationProps {
  formData: LoadFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
}

const LoadInformation: React.FC<LoadInformationProps> = ({
  formData,
  onChange,
  validation
}) => (
  <div>
    <h5>Load Information</h5>
    <Row>
      <Col md={6}>
        <Form.Group controlId="customer">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            type="text"
            name="customer"
            value={formData.customer || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="referenceNumber">
          <Form.Label>Reference Number</Form.Label>
          <Form.Control
            type="text"
            name="referenceNumber"
            value={formData.referenceNumber || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default LoadInformation;
