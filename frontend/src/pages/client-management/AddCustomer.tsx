// File: src/pages/client-management/AddCustomer.tsx

import React, { useEffect, useState } from 'react';
import { Col, Row, Tab } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import WizardSideNav from 'components/wizard/WizardSideNav';
import WizardForm from 'components/wizard/WizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import WizardFormFooter from 'components/wizard/WizardFormFooter';
import useWizardForm from 'hooks/useWizardForm';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm/NewCustomerForm';
import Preview from 'components/forms/tmsforms/NewCustomerForm/Preview';
import {
  faInfoCircle,
  faFileAlt,
  faCheckCircle,
  faUser,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
import { CustomerFormData } from 'types/Customer'; // Ensure type is correctly imported

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
  const form = useWizardForm({
    totalStep: wizardNavItems.length
  });

  useEffect(() => {
    console.log('Current form data:', form.formData);
  }, [form.formData]);

  const handleNext = () => {
    if (tabEventKey < form.totalStep) {
      setTabEventKey(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (tabEventKey > 1) {
      setTabEventKey(prev => prev - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setTabEventKey(step);
  };

  const handleFinalSubmit = async () => {
    try {
      console.log('Submitting form data:', form.formData);
      const response = await fetch('/api/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Customer data saved successfully:', result);
        alert('Customer data saved successfully');
      } else {
        const errorData = await response.json();
        console.error('Error saving customer data:', errorData);
        alert('Error saving customer data. Check console for details.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred.');
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
                setTabEventKey={handleStepChange}
              />
            </div>
          </Col>
          <Col xl={8} className="flex-1">
            <Tab.Content>
              {wizardNavItems.map(item => (
                <Tab.Pane eventKey={item.step} key={item.step}>
                  <WizardForm step={item.step}>
                    {item.step === 6 ? (
                      <Preview formData={form.formData as CustomerFormData} />
                    ) : (
                      <NewCustomerForm
                        currentStep={item.step}
                        formData={form.formData as CustomerFormData}
                        setFormData={form.setFormData}
                        onNext={handleNext}
                        onPrev={handlePrevious}
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
      </WizardFormProvider>
    </div>
  );
};

export default AddCustomer;
