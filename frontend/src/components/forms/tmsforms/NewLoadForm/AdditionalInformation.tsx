import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { LoadFormData } from 'types/LoadFormData';

interface AdditionalInformationProps {
  formData: LoadFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  formData,
  onChange,
  validation = false
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        target: { name: e.target.name, value: file }
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="additional-information">
      <Row>
        <Col md={6}>
          <Form.Group controlId="rate">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="number"
              name="rate"
              value={formData.rate?.toString() || ''}
              onChange={onChange}
              placeholder="Enter rate"
              required={validation}
              min={0}
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
              placeholder="Enter name of the person"
              required={validation}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Form.Group controlId="attachment">
            <Form.Label>Attachment</Form.Label>
            <Form.Control
              type="file"
              name="attachment"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInformation;
