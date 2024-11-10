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
    form.setFormData({});
  }, [form]);

  const handleNext = () => {
    if (tabEventKey < form.totalStep) {
      setTabEventKey(prev => prev + 1);
    }
  };

  const handleStepChange = (step: number) => {
    setTabEventKey(step);
  };

  const handleFinalSubmit = () => {
    console.log('Customer data submitted:', form.formData);
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
                      <Preview formData={form.formData} />
                    ) : (
                      <NewCustomerForm
                        currentStep={item.step}
                        totalSteps={form.totalStep}
                      />
                    )}
                  </WizardForm>
                </Tab.Pane>
              ))}
            </Tab.Content>
            <div className="mt-6">
              <WizardFormFooter
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
