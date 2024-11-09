// File: C:/Users/valic/Documents/TMS/frontend/src/pages/client-management/CustomerListPage.tsx

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomerDetailsModal from 'components/modals/CustomerDetailsModal';
import { getCustomers } from '../../services/customerService';
import { Link } from 'react-router-dom';
import { Customer } from '../../types/Customer'; // Ensure the path is correct and matches the main type definition

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCustomers()
      .then((data: Customer[]) => {
        if (data) {
          setCustomers(data);
        } else {
          setError('Failed to load customer data');
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError('An error occurred while fetching customer data');
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleShowDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.contact_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowDetails(customer)}
                >
                  View Details
                </Button>
                <Link
                  to={`/crm/customer/${customer.id}`}
                  className="btn btn-primary ms-2"
                >
                  Go to CRM
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerListPage;
