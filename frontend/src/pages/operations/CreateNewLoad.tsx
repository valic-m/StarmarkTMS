import React, { useState } from 'react';
import { Col, Row, Tab, Button, Form, InputGroup } from 'react-bootstrap';
import WizardForm from 'components/wizard/WizardForm';
import useWizardForm from 'hooks/useWizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import WizardSideNav from 'components/wizard/WizardSideNav';
import CreateNewLoadForm from 'components/forms/tmsforms/CreateNewLoadForm';
import { wizardNav } from 'data/wizard/wizard'; // Ensure this import path and type are accurate
import NewCustomerModal from 'components/modals/NewCustomerModal';
import axios from 'axios';

// Define the expected structure of the customer data
interface Customer {
  name: string;
  email: string;
  // Add other relevant fields as needed
}

const CreateNewLoadPage: React.FC = () => {
  const form = useWizardForm({ totalStep: 3 });
  const [tabEventKey, setTabEventKey] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [showNewCustomerModal, setShowNewCustomerModal] =
    useState<boolean>(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      try {
        const response = await axios.get<Customer[]>(
          `/api/customers/search?query=${query}`
        );
        if (response.data.length > 0) {
          setSearchResults(response.data);
          setNoResults(false);
        } else {
          setSearchResults([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setSearchResults([]);
        setNoResults(true);
      }
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleShowModal = () => setShowNewCustomerModal(true);
  const handleCloseModal = () => setShowNewCustomerModal(false);

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Operations' },
          { label: 'Create New Load' }
        ]}
      />
      <h2 className="fs-5 mb-4 mb-xl-5">Create New Load</h2>

      {/* Customer Search Bar */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for a customer"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {noResults && (
          <InputGroup.Text>
            No customer found.{' '}
            <Button
              variant="link"
              className="p-0 ms-1"
              onClick={handleShowModal}
            >
              Add New Customer
            </Button>
          </InputGroup.Text>
        )}
      </InputGroup>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <ul className="list-group mb-3">
          {searchResults.map((customer, index) => (
            <li key={index} className="list-group-item">
              {customer.name} - {customer.email}
            </li>
          ))}
        </ul>
      )}

      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <div className="scrollbar mb-4">
              <WizardSideNav
                navItems={wizardNav}
                setTabEventKey={setTabEventKey}
              />
            </div>
          </Col>
          <Col xl={8} className="flex-1">
            <Tab.Content>
              <Tab.Pane eventKey={1}>
                <WizardForm step={1}>
                  <CreateNewLoadForm />
                </WizardForm>
              </Tab.Pane>
              {/* Additional Tab.Pane can be added here for other steps */}
            </Tab.Content>
            <div className="mt-6 d-flex justify-content-between">
              {tabEventKey > 1 && (
                <Button
                  variant="secondary"
                  onClick={() => setTabEventKey(tabEventKey - 1)}
                >
                  Back
                </Button>
              )}
              {tabEventKey < form.totalStep && (
                <Button
                  variant="primary"
                  onClick={() => setTabEventKey(tabEventKey + 1)}
                >
                  Next
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </WizardFormProvider>

      {/* New Customer Modal */}
      <NewCustomerModal show={showNewCustomerModal} onHide={handleCloseModal} />
    </div>
  );
};

export default CreateNewLoadPage;
