import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface ShipperReceiverFormProps {
  formData: { [key: string]: string };
  setFormData: (data: { [key: string]: string }) => void;
}

const ShipperReceiverForm: React.FC<ShipperReceiverFormProps> = ({
  formData,
  setFormData
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="company_name">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          name="company_name"
          value={formData.company_name || ''}
          onChange={handleChange}
          placeholder="Enter company name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact_person">
        <Form.Label>Contact Person</Form.Label>
        <Form.Control
          type="text"
          name="contact_person"
          value={formData.contact_person || ''}
          onChange={handleChange}
          placeholder="Enter contact person"
          required
        />
      </Form.Group>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          rows={3}
          placeholder="Enter address"
          required
        />
      </Form.Group>
    </Form>
  );
};

export default ShipperReceiverForm;
