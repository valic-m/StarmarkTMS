// File: C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\components\customers\CustomerList.tsx

import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../../api/customers'; // Adjust the path based on your file structure
import { Customer } from '../../types/Customer'; // Assuming you have a Customer type defined
import { Table, Spinner, Alert } from 'react-bootstrap';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch customers on component mount
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customers');
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Name</th>
            <th>MC Number</th>
            <th>City</th>
            <th>Phone Number</th>
            <th>Credit Limit</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.contact_name}</td>
              <td>{customer.mc_number}</td>
              <td>{customer.city}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.credit_limit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;
