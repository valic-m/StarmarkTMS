import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const NewCustomerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mc_number: '',
    scac: '',
    address_street: '',
    address_number: '',
    city: '',
    state: '',
    zip_code: '',
    term_pay: 'Net 30', // Default value
    tax_id: '',
    is_active: false,
    factoring: false,
    do_not_use: false,
    notes: '',
    contact_name: '',
    phone_number: '',
    cell_number: '',
    email: '',
    website: '',
    credit_limit: '',
    accounts_payable_contact: '',
    accounts_payable_phone: '',
    accounts_payable_email: '',
    accounts_payable_address: '',
    accounts_payable_city: '',
    accounts_payable_state: '',
    accounts_payable_zip: '',
    agent_name: '',
    agent_phone: '',
    agent_email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
const { name, value, type } = target;
const checked = type === 'checkbox' ? target.checked : undefined;

setFormData({
  ...formData,
  [name]: type === 'checkbox' ? checked : value,
});

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to submit the form data to the backend
  };

  return (
    <Form onSubmit={handleSubmit}>
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
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="tax_id">
            <Form.Label>Tax ID</Form.Label>
            <Form.Control
              type="text"
              name="tax_id"
              placeholder="Enter Tax ID"
              value={formData.tax_id}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="address_street">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              name="address_street"
              placeholder="Enter Street Address"
              value={formData.address_street}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="address_number">
            <Form.Label>Address Number</Form.Label>
            <Form.Control
              type="text"
              name="address_number"
              placeholder="Enter Address Number"
              value={formData.address_number}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="zip_code">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zip_code"
              placeholder="Enter Zip Code"
              value={formData.zip_code}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="term_pay" className="mb-3">
        <Form.Label>Payment Terms</Form.Label>
        <Form.Select
          name="term_pay"
          value={formData.term_pay}
          onChange={handleChange}
        >
          <option value="Net 30">Net 30</option>
          <option value="Net 15">Net 15</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="is_active" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Active"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="factoring" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Factoring"
          name="factoring"
          checked={formData.factoring}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="do_not_use" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Do Not Use"
          name="do_not_use"
          checked={formData.do_not_use}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="notes" className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          name="notes"
          placeholder="Enter notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Add more form fields as required... */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewCustomerForm;
