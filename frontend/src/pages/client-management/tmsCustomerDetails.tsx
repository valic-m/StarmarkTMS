import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import TMSCustomerProfileCard from 'components/tables/TMSCustomerProfileCard';
import TMSCustomerOrdersTable from 'components/tables/TMSCustomerOrdersTable';
import TMSCustomerRatingsTable from 'components/tables/TMSCustomerRatingsTable';
import { Customer } from '../../types/Customer';
import { getCustomerDetails } from '../../services/customerService';

const TmsCustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching details for customer ID:', id); // Debug log

    if (id) {
      getCustomerDetails(Number(id))
        .then(data => {
          console.log('Customer details fetched:', data); // Debug log
          setCustomer(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching customer details:', err);
          setError('Failed to fetch customer details. Please try again later.');
          setLoading(false);
        });
    } else {
      console.warn('No customer ID provided in the route parameter'); // Debug warning
      setError('Invalid customer ID. Please check the URL.');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p>{error}</p>;
  if (!customer) return <p>No customer details available.</p>;

  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Customers', url: '/client-management/customers' },
          {
            label: customer.name,
            url: `/client-management/customers/${customer.id}`
          }
        ]}
      />
      <Row className="g-5">
        <Col xs={12} xxl={4}>
          <TMSCustomerProfileCard customer={customer} />
        </Col>
        <Col xs={12} xxl={8}>
          <div>
            <h3>Orders</h3>
            <TMSCustomerOrdersTable orders={customer.orders || []} />
          </div>
          <div>
            <h3>Ratings & Reviews</h3>
            <TMSCustomerRatingsTable ratings={customer.ratings || []} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TmsCustomerDetails;
