// File: src/components/forms/tmsforms/NewLoadForm/AdditionalInformation.tsx

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { LoadFormData } from 'types/LoadFormData';

interface FormDataType {
  rate?: number;
  bookedBy?: string;
  attachment?: File;
  [key: string]: any;
}

interface AdditionalInformationProps {
  formData: LoadFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  formData,
  onChange,
  validation
}) => (
  <div>
    <h5>Additional Information</h5>
    <Row>
      <Col md={6}>
        <Form.Group controlId="rate">
          <Form.Label>Rate</Form.Label>
          <Form.Control
            type="number"
            name="rate"
            value={formData.rate || ''} // Default to an empty string if undefined
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="bookedBy">
          <Form.Label>Booked By</Form.Label>
          <Form.Control
            type="text"
            name="bookedBy"
            value={formData.bookedBy || ''}
            onChange={onChange}
            required={validation}
          />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col md={12}>
        <Form.Group controlId="attachment">
          <Form.Label>Attachment</Form.Label>
          <Form.Control type="file" name="attachment" onChange={onChange} />
        </Form.Group>
      </Col>
    </Row>
  </div>
);

export default AdditionalInformation;
