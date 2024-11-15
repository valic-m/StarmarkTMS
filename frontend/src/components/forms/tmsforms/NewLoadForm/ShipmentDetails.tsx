import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface ShipmentDetailsProps {
  formData: {
    palletCount?: number;
    weight?: number;
    commodity?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  formData,
  onChange,
  validation = false
}) => (
  <div>
    <h5>Shipment Details</h5>
    <Row>
      {/* Pallet Count Field */}
      <Col md={4}>
        <Form.Group controlId="palletCount">
          <Form.Label>Pallet Count</Form.Label>
          <Form.Control
            type="number"
            name="palletCount"
            value={
              formData.palletCount !== undefined
                ? formData.palletCount.toString()
                : ''
            }
            onChange={onChange}
            min={0}
            placeholder="Enter number of pallets"
            required={validation}
          />
        </Form.Group>
      </Col>

      {/* Weight Field */}
      <Col md={4}>
        <Form.Group controlId="weight">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={
              formData.weight !== undefined ? formData.weight.toString() : ''
            }
            onChange={onChange}
            min={0}
            placeholder="Enter weight"
            required={validation}
          />
        </Form.Group>
      </Col>

      {/* Commodity Field */}
      <Col md={4}>
        <Form.Group controlId="commodity">
          <Form.Label>Commodity</Form.Label>
          <Form.Control
            type="text"
            name="commodity"
            value={formData.commodity || ''}
            onChange={onChange}
            placeholder="Enter commodity"
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default ShipmentDetails;
