// File: src/components/forms/tmsforms/PickupDropoffDetails.tsx

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface PickupDropoffDetailsProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
}

const PickupDropoffDetails: React.FC<PickupDropoffDetailsProps> = ({
  formData,
  onChange,
  validation
}) => (
  <div>
    <h5>Pickup & Dropoff Details</h5>
    <Row>
      <Col md={6}>
        <Form.Group controlId="pickupLocation">
          <Form.Label>Pickup Location</Form.Label>
          <Form.Control
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="dropoffLocation">
          <Form.Label>Dropoff Location</Form.Label>
          <Form.Control
            type="text"
            name="dropoffLocation"
            value={formData.dropoffLocation || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default PickupDropoffDetails;
