import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Alert } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import WizardSideNav from 'components/wizard/WizardSideNav';
import WizardForm from 'components/wizard/WizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import WizardFormFooter from 'components/wizard/WizardFormFooter';
import useWizardForm from 'hooks/useWizardForm';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm/NewCustomerForm';
import Preview from 'components/forms/tmsforms/NewCustomerForm/Preview';
import { CustomerFormData } from 'types/Customer';
import { createCustomer } from '../../api/customers';

import {
  faInfoCircle,
  faFileAlt,
  faCheckCircle,
  faUser,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons';

// Wizard navigation steps
const wizardNavItems = [
  { step: 1, label: 'General Info', completed: false, icon: faInfoCircle },
  { step: 2, label: 'Contact Info', completed: false, icon: faUser },
  { step: 3, label: 'Credit Limit Info', completed: false, icon: faFileAlt },
  {
    step: 4,
    label: 'Accounts Payable Info',
    completed: false,
    icon: faMoneyBill
  },
  { step: 5, label: 'Agent Info', completed: false, icon: faCheckCircle },
  { step: 6, label: 'Review Info', completed: false, icon: faCheckCircle }
];

const AddCustomer: React.FC = () => {
  const [tabEventKey, setTabEventKey] = useState<number>(1);
  const form = useWizardForm({ totalStep: wizardNavItems.length });

  // Alert state for showing validation or submission messages
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    variant: string;
  }>({
    show: false,
    message: '',
    variant: 'primary'
  });

  useEffect(() => {
    console.log('Current form data:', form.formData);
  }, [form.formData]);

  const handleNext = () => {
    // Example of front-end validation
    const requiredFields = ['name', 'phone_number', 'email'];
    const missingFields = requiredFields.filter(
      field =>
        !(form.formData as CustomerFormData)[field as keyof CustomerFormData]
    );

    if (missingFields.length > 0) {
      setAlert({
        show: true,
        message: `Please complete the required fields: ${missingFields.join(
          ', '
        )}`,
        variant: 'warning'
      });
      return;
    }

    setTabEventKey(prev => prev + 1); // Move to the next step if validation passes
  };

  const handleFinalSubmit = async () => {
    try {
      console.log('Submitting form data:', form.formData);
      const result = await createCustomer(form.formData as CustomerFormData);
      console.log('Customer created:', result);
      setAlert({
        show: true,
        message: 'Customer data saved successfully',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error saving customer data:', error);
      setAlert({
        show: true,
        message: 'Failed to save customer data',
        variant: 'danger'
      });
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb items={defaultBreadcrumbItems} />
      <h2 className="fs-5 mb-4 mb-xl-5">Add New Customer</h2>
      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <div className="scrollbar mb-4">
              <WizardSideNav
                navItems={wizardNavItems}
                setTabEventKey={setTabEventKey}
              />
            </div>
          </Col>
          <Col xl={8} className="flex-1">
            <Tab.Content>
              {wizardNavItems.map(item => (
                <Tab.Pane eventKey={item.step} key={item.step}>
                  <WizardForm step={item.step}>
                    {item.step === wizardNavItems.length ? (
                      <Preview formData={form.formData as CustomerFormData} />
                    ) : (
                      <NewCustomerForm
                        currentStep={item.step}
                        formData={form.formData as CustomerFormData}
                        setFormData={form.setFormData}
                      />
                    )}
                  </WizardForm>
                </Tab.Pane>
              ))}
            </Tab.Content>
            <div className="mt-6">
              <WizardFormFooter
                nextBtnLabel={tabEventKey === form.totalStep ? 'Save' : 'Next'}
                handleSubmit={
                  tabEventKey === form.totalStep
                    ? handleFinalSubmit
                    : handleNext
                }
              />
            </div>
          </Col>
        </Row>

        {/* Display Alert if it's set to show */}
        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
            className="mt-3"
          >
            {alert.message}
          </Alert>
        )}
      </WizardFormProvider>
    </div>
  );
};

// Simplified fallback placeholder for "Add Customer Page"
const AddCustomerPlaceholder: React.FC = () => {
  return <div>Add Customer Page</div>;
};

export { AddCustomer, AddCustomerPlaceholder };
export default AddCustomer;
