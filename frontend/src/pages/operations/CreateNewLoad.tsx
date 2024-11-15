import React, { useState, useRef } from 'react';
import {
  Col,
  Row,
  Tab,
  Alert,
  InputGroup,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import WizardSideNav from 'components/wizard/WizardSideNav';
import WizardFormProvider from 'providers/WizardFormProvider';
import WizardFormFooter from 'components/wizard/WizardFormFooter';
import LoadInformation from 'components/forms/tmsforms/NewLoadForm/LoadInformation';
import TrailerSpecifications from 'components/forms/tmsforms/NewLoadForm/TrailerSpecifications';
import ShipmentDetails from 'components/forms/tmsforms/NewLoadForm/ShipmentDetails';
import PickupDropoffDetails from 'components/forms/tmsforms/NewLoadForm/PickupDropoffDetails';
import AdditionalInformation from 'components/forms/tmsforms/NewLoadForm/AdditionalInformation';
import NewCustomerModal from 'components/modals/NewCustomerModal';
import useWizardForm from 'hooks/useWizardForm';
import { LoadFormData } from 'types/LoadFormData';
import { createLoad } from 'api/loads';
import axios from 'axios';
import {
  faTruck,
  faInfoCircle,
  faBox,
  faMapMarkerAlt,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

const wizardNavItems = [
  { step: 1, label: 'Customer Info', completed: false, icon: faInfoCircle },
  { step: 2, label: 'Pickup & Dropoff', completed: false, icon: faMapMarkerAlt },
  { step: 3, label: 'Trailer Specs', completed: false, icon: faTruck },
  { step: 4, label: 'Shipment Details', completed: false, icon: faBox },
  { step: 5, label: 'Additional Info', completed: false, icon: faFileAlt },
];

const CreateNewLoad: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const goToStep = (step: number) => setSelectedStep(step);

  const formRefs = useRef<(HTMLFormElement | null)[]>([]);
  const form = useWizardForm<LoadFormData>({ totalStep: wizardNavItems.length });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'primary',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  const handleCustomerSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      try {
        const response = await axios.get(`/api/customers/search?query=${query}`);
        setSearchResults(response.data.length ? response.data : []);
      } catch (error) {
        console.error('Error searching customers:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectCustomer = async (customer: any) => {
    setSelectedCustomer(customer);
    form.setFormData({ ...form.formData, customerId: customer.id });

    // Fetch agents for the selected customer
    setLoadingAgents(true);
    try {
      const response = await axios.get(`/api/customers/${customer.id}/agents`);
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setAgents([]);
    } finally {
      setLoadingAgents(false);
    }
  };

  const handleAgentSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgent(e.target.value);
    form.setFormData({ ...form.formData, agentId: e.target.value });
  };

  const handleShowNewCustomerModal = () => setShowNewCustomerModal(true);
  const handleCloseNewCustomerModal = () => setShowNewCustomerModal(false);

  const handleNext = () =>
    setSelectedStep((prev) => Math.min(prev + 1, wizardNavItems.length));
  const handleFinalSubmit = async () => {
    try {
      await createLoad(form.formData);
      setAlert({
        show: true,
        message: 'Load data saved successfully',
        variant: 'success',
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to save load data',
        variant: 'danger',
      });
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Operations' },
          { label: 'Create New Load' },
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
                  {/* Customer Section */}
                  <h5>Customer Information</h5>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search for customer"
                      value={searchQuery}
                      onChange={handleCustomerSearch}
                    />
                    <Button variant="link" onClick={handleShowNewCustomerModal}>
                      Add New Customer
                    </Button>
                  </InputGroup>
                  {searchResults.length ? (
                    <ul className="list-group">
                      {searchResults.map((customer: any) => (
                        <li
                          key={customer.id}
                          className="list-group-item"
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          {customer.name} - {customer.email}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No customer found. Add a new customer if necessary.</div>
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

                      {/* Agent Selection */}
                      <Form.Group>
                        <Form.Label>Select Agent</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedAgent}
                          onChange={handleAgentSelection}
                          disabled={loadingAgents}
                        >
                          <option value="">Select an Agent</option>
                          {agents.map((agent: any) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name}
                            </option>
                          ))}
                        </Form.Control>
                        {loadingAgents && <Spinner animation="border" />}
                      </Form.Group>
                    </div>
                  )}

                  {/* Additional Information Section */}
                  <h5 className="mt-4">Additional Information</h5>
                  <AdditionalInformation
                    formData={form.formData}
                    onChange={form.onChange}
                    validation={form.validation || false}
                  />
                </Tab.Pane>
              )}

              {/* Other Steps */}
              {selectedStep === 2 && (
                <Tab.Pane eventKey={2}>
                  <PickupDropoffDetails
                    formData={form.formData}
                    onChange={form.onChange}
                    validation={form.validation || false}
                  />
                </Tab.Pane>
              )}
              {selectedStep === 3 && (
                <Tab.Pane eventKey={3}>
                  <TrailerSpecifications
                    formData={form.formData}
                    onChange={form.onChange}
                    validation={form.validation || false}
                  />
                </Tab.Pane>
              )}
              {selectedStep === 4 && (
                <Tab.Pane eventKey={4}>
                  <ShipmentDetails
                    formData={form.formData}
                    onChange={form.onChange}
                    validation={form.validation || false}
                  />
                </Tab.Pane>
              )}
              {selectedStep === 5 && (
                <Tab.Pane eventKey={5}>
                  <AdditionalInformation
                    formData={form.formData}
                    onChange={form.onChange}
                    validation={form.validation || false}
                  />
                </Tab.Pane>
              )}
            </Tab.Content>

            <WizardFormFooter
              nextBtnLabel={selectedStep === 5 ? 'Save' : 'Next'}
              handleSubmit={selectedStep === 5 ? handleFinalSubmit : handleNext}
            />
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
