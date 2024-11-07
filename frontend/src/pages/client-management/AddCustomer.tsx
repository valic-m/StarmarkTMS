import React, { useEffect, useState } from 'react';
import WizardForm from 'components/wizard/WizardForm';
import useWizardForm from 'hooks/useWizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import { Col, Row, Tab } from 'react-bootstrap';
import WizardFormFooter from 'components/wizard/WizardFormFooter';
import classNames from 'classnames';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import WizardSideNav from 'components/wizard/WizardSideNav';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm';
import { faInfoCircle, faFileAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Define wizard navigation items locally with icons of type IconDefinition
const wizardNavItems = [
  { step: 1, label: 'Basic Information', completed: false, icon: faInfoCircle },
  { step: 2, label: 'Additional Details', completed: false, icon: faFileAlt },
  { step: 3, label: 'Review & Submit', completed: false, icon: faCheckCircle }
];

const AddCustomer = () => {
  const [tabEventKey, setTabEventKey] = useState(1);
  const form = useWizardForm({
    totalStep: 3 // Adjust the number of steps as needed
  });

  useEffect(() => {
    form.setFormData({}); // Initialize form data if needed
  }, []);

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
                  setTabEventKey={setTabEventKey}
                />
              </div>
            </Col>
            <Col xl={8} className="flex-1">
              <Row>
                <Col xxl={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey={1}>
                      <WizardForm step={1}>
                        <NewCustomerForm />
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={2}>
                      <WizardForm step={2}>
                        <div>Step 2 Content Here</div>
                      </WizardForm>
                    </Tab.Pane>
                    <Tab.Pane eventKey={3}>
                      <WizardForm step={3}>
                        <div>Step 3 Content Here</div>
                      </WizardForm>
                    </Tab.Pane>
                  </Tab.Content>
                  <div className="mt-6">
                    <WizardFormFooter
                      hidePrevBtn={tabEventKey === 1}
                      className={classNames({ 'd-none': !form.getCanNextPage })}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </WizardFormProvider>
      </div>
    </>
  );
};

export default AddCustomer;
