import React, { useEffect, useState } from 'react';
import WizardForm from 'components/wizard/WizardForm';
import useWizardForm from 'hooks/useWizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import { Col, Row, Tab } from 'react-bootstrap';
import classNames from 'classnames';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import WizardSideNav from 'components/wizard/WizardSideNav';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm';
import {
  faInfoCircle,
  faFileAlt,
  faCheckCircle,
  faUser,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons';

// Define wizard navigation items with icons for each step
const wizardNavItems = [
  { step: 1, label: 'General', completed: false, icon: faInfoCircle },
  { step: 2, label: 'Contact', completed: false, icon: faUser },
  { step: 3, label: 'Manage', completed: false, icon: faFileAlt },
  { step: 4, label: 'Payable', completed: false, icon: faMoneyBill },
  { step: 5, label: 'Agents', completed: false, icon: faCheckCircle }
];

const AddCustomer: React.FC = () => {
  const [tabEventKey, setTabEventKey] = useState(1);
  const form = useWizardForm({
    totalStep: wizardNavItems.length // Total number of steps in the form
  });

  useEffect(() => {
    form.setFormData({}); // Initialize form data if needed
  }, []);

  const handleNext = () => {
    if (tabEventKey < form.totalStep) {
      setTabEventKey(tabEventKey + 1);
    }
  };

  const handlePrevious = () => {
    if (tabEventKey > 1) {
      setTabEventKey(tabEventKey - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setTabEventKey(step);
  };

  return (
    <>
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
                <Tab.Pane eventKey={1}>
                  <WizardForm step={1}>
                    <NewCustomerForm
                      currentStep={1}
                      onNext={handleNext}
                      onPrev={handlePrevious}
                      totalSteps={form.totalStep}
                    />
                  </WizardForm>
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <WizardForm step={2}>
                    <NewCustomerForm
                      currentStep={2}
                      onNext={handleNext}
                      onPrev={handlePrevious}
                      totalSteps={form.totalStep}
                    />
                  </WizardForm>
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                  <WizardForm step={3}>
                    <NewCustomerForm
                      currentStep={3}
                      onNext={handleNext}
                      onPrev={handlePrevious}
                      totalSteps={form.totalStep}
                    />
                  </WizardForm>
                </Tab.Pane>
                <Tab.Pane eventKey={4}>
                  <WizardForm step={4}>
                    <NewCustomerForm
                      currentStep={4}
                      onNext={handleNext}
                      onPrev={handlePrevious}
                      totalSteps={form.totalStep}
                    />
                  </WizardForm>
                </Tab.Pane>
                <Tab.Pane eventKey={5}>
                  <WizardForm step={5}>
                    <NewCustomerForm
                      currentStep={5}
                      onNext={handleNext}
                      onPrev={handlePrevious}
                      totalSteps={form.totalStep}
                    />
                  </WizardForm>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </WizardFormProvider>
      </div>
    </>
  );
};

export default AddCustomer;
