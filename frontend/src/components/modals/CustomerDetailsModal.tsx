import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
}

interface CustomerDetailsModalProps {
  show: boolean;
  onHide: () => void;
  customer: Customer;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  show,
  onHide,
  customer
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Name:</strong> {customer.name}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone}
        </p>
        {/* Add more fields as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;
