// File: tmsCustomerDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import TMSCustomerProfileCard from 'components/tables/TMSCustomerProfileCard';
import TMSCustomerOrdersTable from 'components/tables/TMSCustomerOrdersTable';
import TMSCustomerRatingsTable from 'components/tables/TMSCustomerRatingsTable';
import { getCustomerDetailsBySlug } from '../../services/customerService';
import { Customer } from '../../types/Customer';

const TmsCustomerDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Use slug instead of ID
  console.log('Slug from URL:', slug);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      getCustomerDetailsBySlug(slug)
        .then(data => {
          setCustomer(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching customer details:', err);
          setError('Failed to fetch customer details. Please try again later.');
          setLoading(false);
        });
    } else {
      setError('Invalid customer slug. Please check the URL.');
      setLoading(false);
    }
  }, [slug]);

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
            url: `/client-management/customers/${customer.slug}`
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
