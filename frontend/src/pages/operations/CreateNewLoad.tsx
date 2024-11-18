import React, { useState, useRef, useEffect } from 'react';
import {
  Col,
  Row,
  Tab,
  Alert,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import WizardSideNav from 'components/wizard/WizardSideNav';
import WizardFormProvider from 'providers/WizardFormProvider';
import TrailerSpecifications from 'components/forms/tmsforms/NewLoadForm/TrailerSpecifications';
import ShipmentDetails from 'components/forms/tmsforms/NewLoadForm/ShipmentDetails';
import PickupDropoffDetails from 'components/forms/tmsforms/NewLoadForm/PickupDropoffDetails';
import AdditionalInformation from 'components/forms/tmsforms/NewLoadForm/AdditionalInformation';
import NewCustomerModal from 'components/modals/NewCustomerModal';
import useWizardForm from 'hooks/useWizardForm';
import { LoadFormData } from 'types/LoadFormData';
import { getCustomers } from '../../services/customerService';
import { Customer } from '../../types/Customer';
import { createLoad } from 'api/loads';
import {
  faTruck,
  faInfoCircle,
  faBox,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const wizardNavItems = [
  { step: 1, label: 'Customer Info', completed: false, icon: faInfoCircle },
  {
    step: 2,
    label: 'Pickup & Dropoff',
    completed: false,
    icon: faMapMarkerAlt
  },
  { step: 3, label: 'Trailer Specs', completed: false, icon: faTruck },
  { step: 4, label: 'Shipment Details', completed: false, icon: faBox }
];

const CreateNewLoad: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const goToStep = (step: number) => setSelectedStep(step);

  const formRefs = useRef<(HTMLFormElement | null)[]>([]);
  const form = useWizardForm<LoadFormData>({
    totalStep: wizardNavItems.length
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'primary'
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Customer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setFilteredResults(
        customers.filter(customer =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, customers]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    form.setFormData({
      ...form.formData,
      customerId: customer.id
    } as LoadFormData);
    setSearchQuery('');
    setFilteredResults([]);
  };

  const handleNext = () =>
    setSelectedStep(prev => Math.min(prev + 1, wizardNavItems.length));

  const handlePrevious = () => setSelectedStep(prev => Math.max(prev - 1, 1));

  const handleFinalSubmit = async (data: LoadFormData) => {
    try {
      await createLoad(data);
      setAlert({
        show: true,
        message: 'Load data saved successfully',
        variant: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to save load data',
        variant: 'danger'
      });
    }
  };

  const handleShowNewCustomerModal = () => setShowNewCustomerModal(true);
  const handleCloseNewCustomerModal = () => setShowNewCustomerModal(false);

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

      <WizardFormProvider
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        goToStep={goToStep}
        formRefs={formRefs}
        totalStep={wizardNavItems.length}
        formData={form.formData}
        setFormData={form.setFormData as React.Dispatch<unknown>}
        validation={form.validation}
        startOver={() => setSelectedStep(1)}
        getCanNextPage={true}
        getCanPreviousPage={selectedStep > 1}
        openDeniedModal={false}
        setOpenDeniedModal={() => {}}
        setValue={(values: Partial<LoadFormData>) =>
          form.setFormData({ ...form.formData, ...values })
        }
        onChange={e => form.onChange(e)}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFinalSubmit(form.formData);
        }}
      >
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <WizardSideNav
              navItems={wizardNavItems}
              setTabEventKey={goToStep}
            />
          </Col>
          <Col xl={8}>
            <Tab.Content>
              {selectedStep === 1 && (
                <Tab.Pane eventKey={1}>
                  <h5>Customer Information</h5>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search for customer"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                    {filteredResults.length === 0 && searchQuery && (
                      <Button
                        variant="link"
                        onClick={handleShowNewCustomerModal}
                      >
                        Add New Customer
                      </Button>
                    )}
                  </InputGroup>
                  {filteredResults.length > 0 && (
                    <ul className="list-group">
                      {filteredResults.map(customer => (
                        <li
                          key={customer.id}
                          className="list-group-item"
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          {customer.name} - {customer.email}
                        </li>
                      ))}
                    </ul>
                  )}
                  {filteredResults.length === 0 &&
                    !selectedCustomer &&
                    searchQuery.trim() !== '' && (
                      <div>No customers match your search.</div>
                    )}
                  {selectedCustomer && (
                    <div className="mt-3">
                      <h6>Selected Customer</h6>
                      <p>
                        <strong>Name:</strong> {selectedCustomer.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedCustomer.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedCustomer.phone}
                      </p>
                    </div>
                  )}
                  <div className="mt-4">
                    <h5>Booking Details</h5>
                    <AdditionalInformation
                      formData={form.formData}
                      onChange={form.onChange}
                      validation={form.validation || false}
                    />
                  </div>
                </Tab.Pane>
              )}
              {selectedStep === 2 && (
                <PickupDropoffDetails
                  formData={{
                    shippers: form.formData.shippers || [],
                    receivers: form.formData.receivers || []
                  }}
                  onChange={form.onChange}
                  validation={form.validation || false}
                />
              )}
              {selectedStep === 3 && (
                <TrailerSpecifications
                  formData={{
                    trailerType: form.formData.trailerType,
                    loadType: form.formData.loadType,
                    feetRequired: form.formData.feetRequired
                  }}
                  onChange={form.onChange}
                  validation={form.validation || false}
                />
              )}
              {selectedStep === 4 && <ShipmentDetails {...form} />}
            </Tab.Content>

            <div className="d-flex justify-content-between mt-4">
              {selectedStep > 1 && (
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <Button
                variant="primary"
                onClick={
                  selectedStep === 4
                    ? e => {
                        e.preventDefault();
                        handleFinalSubmit(form.formData);
                      }
                    : handleNext
                }
              >
                {selectedStep === 4 ? 'Save' : 'Next'}
              </Button>
            </div>
          </Col>
        </Row>
      </WizardFormProvider>

      <NewCustomerModal
        show={showNewCustomerModal}
        onHide={handleCloseNewCustomerModal}
      />

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default CreateNewLoad;
