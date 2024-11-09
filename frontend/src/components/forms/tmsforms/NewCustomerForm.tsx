import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

interface NewCustomerFormProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  totalSteps: number;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  currentStep,
  onNext,
  onPrev,
  totalSteps,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mc_number: '',
    scac: '',
    address_street: '',
    address_number: '',
    city: '',
    state: '',
    zip_code: '',
    term_pay: 'Net 30',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (currentStep === totalSteps) {
      // Handle final submission logic if needed
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
          </>
        );
      case 2:
        return (
          <>
            <Form.Group controlId="contact_name" className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="contact_name"
                placeholder="Enter Contact Name"
                value={formData.contact_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone_number" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="cell_number" className="mb-3">
              <Form.Label>Cell Number</Form.Label>
              <Form.Control
                type="text"
                name="cell_number"
                placeholder="Enter Cell Number"
                value={formData.cell_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="website" className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                placeholder="Enter Website"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <Form.Group controlId="agent_name" className="mb-3">
              <Form.Label>Agent Name</Form.Label>
              <Form.Control
                type="text"
                name="agent_name"
                placeholder="Enter Agent Name"
                value={formData.agent_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="agent_phone" className="mb-3">
              <Form.Label>Agent Phone</Form.Label>
              <Form.Control
                type="text"
                name="agent_phone"
                placeholder="Enter Agent Phone"
                value={formData.agent_phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="agent_email" className="mb-3">
              <Form.Label>Agent Email</Form.Label>
              <Form.Control
                type="email"
                name="agent_email"
                placeholder="Enter Agent Email"
                value={formData.agent_email}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {renderStepContent()}
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={onPrev} disabled={currentStep === 1}>
          Previous
        </Button>
        {currentStep < totalSteps ? (
          <Button variant="primary" onClick={onNext}>
            Next
          </Button>
        ) : (
          <Button variant="success" type="submit">
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default NewCustomerForm;
