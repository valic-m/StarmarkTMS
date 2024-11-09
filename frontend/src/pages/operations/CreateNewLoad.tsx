import React, { useState } from 'react';
import { Col, Row, Tab, Button } from 'react-bootstrap';
import WizardForm from 'components/wizard/WizardForm';
import useWizardForm from 'hooks/useWizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import WizardSideNav from 'components/wizard/WizardSideNav';
import CreateNewLoadForm from 'components/forms/tmsforms/CreateNewLoadForm';
import { wizardNav } from 'data/wizard/wizard'; // Ensure this import path and type are accurate

const CreateNewLoadPage: React.FC = () => {
  const form = useWizardForm({ totalStep: 3 });
  const [tabEventKey, setTabEventKey] = useState<number>(1); // Explicit typing for clarity

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
      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <div className="scrollbar mb-4">
              <WizardSideNav
                navItems={wizardNav} // Ensure this matches the expected type for navItems
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
              {/* Repeat Tab.Pane for additional steps as needed */}
              {/* <Tab.Pane eventKey={2}>
                <WizardForm step={2}>
                  <OtherComponent />
                </WizardForm>
              </Tab.Pane> */}
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
    </div>
  );
};

export default CreateNewLoadPage;
