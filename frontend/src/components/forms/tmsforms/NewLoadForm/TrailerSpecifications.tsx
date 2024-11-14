// File: src/components/forms/tmsforms/TrailerSpecifications.tsx

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

interface TrailerSpecificationsProps {
  formData: {
    trailerType?: string;
    loadType?: string;
    feetRequired?: number;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validation?: boolean;
}

const TrailerSpecifications: React.FC<TrailerSpecificationsProps> = ({
  formData,
  onChange,
  validation = false
}) => (
  <div>
    <h5>Trailer Specifications</h5>
    <Row>
      <Col md={4}>
        <Form.Group controlId="trailerType">
          <Form.Label>Trailer Type</Form.Label>
          <Form.Control
            as="select"
            name="trailerType"
            value={formData.trailerType || ''}
            onChange={onChange}
            required={validation}
          >
            <option value="">Select Trailer Type</option>
            <option value="Dry Van">Dry Van</option>
            <option value="Van or Reefer">Van or Reefer</option>
            <option value="Reefer">Reefer</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="loadType">
          <Form.Label>Load Type</Form.Label>
          <Form.Control
            as="select"
            name="loadType"
            value={formData.loadType || ''}
            onChange={onChange}
            required={validation}
          >
            <option value="">Select Load Type</option>
            <option value="Full Load">Full Load</option>
            <option value="LTL">LTL</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="feetRequired">
          <Form.Label>Feet Required</Form.Label>
          <Form.Control
            type="number"
            name="feetRequired"
            value={formData.feetRequired || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default TrailerSpecifications;
