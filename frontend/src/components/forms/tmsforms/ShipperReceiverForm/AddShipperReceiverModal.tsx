import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createShipperReceiver } from 'api/shippersReceivers';

interface AddShipperReceiverModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

interface FormData {
  [key: string]: string;

  company_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  address: string;
}

const AddShipperReceiverModal: React.FC<AddShipperReceiverModalProps> = ({
  show,
  onHide,
  onSuccess
}) => {
  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    contact_person: '',
    phone_number: '',
    email: '',
    address: ''
  });

  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    variant: string;
  }>({
    show: false,
    message: '',
    variant: 'primary'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredFields: (keyof FormData)[] = [
      'company_name',
      'contact_person',
      'phone_number',
      'email',
      'address'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setAlert({
        show: true,
        message: `Please complete the required fields: ${missingFields.join(
          ', '
        )}`,
        variant: 'warning'
      });
      return;
    }

    try {
      await createShipperReceiver(formData);
      setAlert({
        show: true,
        message: 'Shipper/Receiver added successfully!',
        variant: 'success'
      });
      onSuccess();
      onHide();
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to add shipper/receiver. Please try again.',
        variant: 'danger'
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add Shipper/Receiver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.show && (
          <Alert
            variant={alert.variant}
            dismissible
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="company_name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              value={formData.company_name}
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
              value={formData.contact_person}
              onChange={handleChange}
              placeholder="Enter contact person"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter address"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddShipperReceiverModal;
