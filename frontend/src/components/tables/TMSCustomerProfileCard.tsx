import React from 'react';
import { Card } from 'react-bootstrap';
import { Customer } from '../../types/Customer';

interface TMSCustomerProfileCardProps {
  customer: Customer;
}

const TMSCustomerProfileCard: React.FC<TMSCustomerProfileCardProps> = ({
  customer
}) => {
  return (
    <Card>
      <Card.Body>
        <h3>{customer.name}</h3>
        <p>
          <strong>Email:</strong> {customer.email || 'N/A'}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone || 'N/A'}
        </p>
        <p>
          <strong>Address:</strong>
          <br />
          {customer.address_street} {customer.address_number}
          <br />
          {customer.city}, {customer.state} {customer.zip_code}
        </p>
        <p>
          <strong>Priority:</strong> {customer.priority || 'N/A'}
        </p>
      </Card.Body>
    </Card>
  );
};

export default TMSCustomerProfileCard;
