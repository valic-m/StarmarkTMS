import React, { useState } from 'react';
import { Col, Row, Tab, Button } from 'react-bootstrap';
import WizardForm from 'components/wizard/WizardForm';
import useWizardForm from 'hooks/useWizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import WizardSideNav from 'components/wizard/WizardSideNav';
import CreateNewLoadForm from 'components/forms/tmsforms/CreateNewLoadForm';
import { wizardNav } from 'data/wizard/wizard'; // Ensure to update with correct navigation data

const CreateNewLoadPage: React.FC = () => {
  const form = useWizardForm({ totalStep: 3 });
  const [tabEventKey, setTabEventKey] = useState(1);

  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' }, // Change 'url' or 'path' to the correct property defined in your type, if needed
          { label: 'Operations' },
          { label: 'Create New Load' },
        ]}
      />
      <h2 className="fs-5 mb-4 mb-xl-5">Create New Load</h2>
      <WizardFormProvider {...form}>
        <Row className="gx-0 gx-xl-5 theme-wizard">
          <Col xl={{ order: 1, span: 4 }}>
            <div className="scrollbar mb-4">
              <WizardSideNav
                navItems={wizardNav} // Ensure the correct navigation structure is used
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
              {/* Add more Tab.Pane components as necessary for additional steps */}
            </Tab.Content>
            <div className="mt-6 d-flex justify-content-between">
              {tabEventKey > 1 && (
                <Button variant="secondary" onClick={() => setTabEventKey(tabEventKey - 1)}>
                  Back
                </Button>
              )}
              {tabEventKey < form.totalStep && (
                <Button variant="primary" onClick={() => setTabEventKey(tabEventKey + 1)}>
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
