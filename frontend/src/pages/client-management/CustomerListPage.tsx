import React, { useEffect, useState, ChangeEvent } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomerDetailsModal from 'components/modals/CustomerDetailsModal';
import { getCustomers } from '../../services/customerService';
import { Link } from 'react-router-dom';
import { Customer } from '../../types/Customer';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import SearchBox from 'components/common/SearchBox';
import Button from 'components/base/Button';

const tabItems: FilterTabItem[] = [
  { label: 'All', value: 'all', count: 100 },
  { label: 'New', value: 'new', count: 20 },
  { label: 'VIP', value: 'vip', count: 5 }
];

const filterMenus: FilterMenu[] = [
  {
    label: 'Country',
    items: [{ label: 'USA' }, { label: 'UK' }, { label: 'Australia' }]
  },
  { label: 'VIP Status', items: [{ label: 'Yes' }, { label: 'No' }] }
];

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    getCustomers()
      .then((data: Customer[]) => {
        setCustomers(data);
        setFilteredCustomers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('An error occurred while fetching customer data');
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCustomers(
      customers.filter(
        customer =>
          customer.name.toLowerCase().includes(term) ||
          (customer.email?.toLowerCase().includes(term) ?? false) ||
          (customer.contact_name?.toLowerCase().includes(term) ?? false)
      )
    );
  };

  const handleShowDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  const paginate = (items: Customer[], page: number, size: number) => {
    const startIndex = (page - 1) * size;
    return items.slice(startIndex, startIndex + size);
  };

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const currentCustomers = paginate(filteredCustomers, currentPage, pageSize);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Customers', url: '/customers' }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Customer List</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <div className="d-flex flex-wrap gap-3 mb-4">
          <SearchBox
            placeholder="Search customers"
            onChange={handleSearchInputChange}
          />
          <FilterButtonGroup menus={filterMenus} />
          <div className="ms-auto">
            <Button variant="link" className="text-body me-4 px-0">
              <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
              Export
            </Button>
            <Link
              to="/client-management/customers/add"
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add Customer
            </Link>
          </div>
        </div>
        <Table
          striped
          bordered
          hover
          style={{
            fontSize: '0.9rem', // Slightly smaller font
            tableLayout: 'fixed' // Prevent columns from stretching too wide
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '0.4rem' }}>Name</th>
              <th style={{ padding: '0.4rem' }}>Contact Name</th>
              <th style={{ padding: '0.4rem' }}>Email</th>
              <th style={{ padding: '0.4rem' }}>Phone</th>
              <th style={{ padding: '0.4rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(customer => (
              <tr key={customer.id}>
                <td style={{ padding: '0.4rem' }}>{customer.name}</td>
                <td style={{ padding: '0.4rem' }}>{customer.contact_name}</td>
                <td style={{ padding: '0.4rem' }}>{customer.email || 'N/A'}</td>
                <td style={{ padding: '0.4rem' }}>{customer.phone}</td>
                <td style={{ padding: '0.4rem', whiteSpace: 'nowrap' }}>
                  <Button
                    variant="info"
                    size="sm" // Makes the button smaller
                    onClick={() => handleShowDetails(customer)}
                  >
                    View Details
                  </Button>
                  <Link
                    to={`/crm/customer/${customer.id}`}
                    className="btn btn-primary btn-sm ms-2"
                  >
                    Go to CRM
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          customer={{
            ...selectedCustomer,
            email: selectedCustomer.email ?? '',
            phone: selectedCustomer.phone ?? ''
          }}
        />
      )}
    </div>
  );
};

export default CustomerListPage;
