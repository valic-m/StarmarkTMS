// File: src/components/forms/tmsforms/ShipmentDetails.tsx

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface ShipmentDetailsProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  formData,
  onChange,
  validation
}) => (
  <div>
    <h5>Shipment Details</h5>
    <Row>
      <Col md={4}>
        <Form.Group controlId="palletCount">
          <Form.Label>Pallet Count</Form.Label>
          <Form.Control
            type="number"
            name="palletCount"
            value={formData.palletCount || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="weight">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={formData.weight || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="commodity">
          <Form.Label>Commodity</Form.Label>
          <Form.Control
            type="text"
            name="commodity"
            value={formData.commodity || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default ShipmentDetails;
