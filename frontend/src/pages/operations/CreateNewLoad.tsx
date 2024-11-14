// File: src/pages/operations/CreateNewLoad.tsx

import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Alert } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import WizardSideNav from 'components/wizard/WizardSideNav';
import WizardForm from 'components/wizard/WizardForm';
import WizardFormProvider from 'providers/WizardFormProvider';
import WizardFormFooter from 'components/wizard/WizardFormFooter';
import useWizardForm from 'hooks/useWizardForm';
import LoadInformation from 'components/forms/tmsforms/NewLoadForm/LoadInformation';
import TrailerSpecifications from 'components/forms/tmsforms/NewLoadForm/TrailerSpecifications';
import ShipmentDetails from 'components/forms/tmsforms/NewLoadForm/ShipmentDetails';
import PickupDropoffDetails from 'components/forms/tmsforms/NewLoadForm/PickupDropoffDetails';
import AdditionalInformation from 'components/forms/tmsforms/NewLoadForm/AdditionalInformation';
import { FormDataType } from 'types/FormDataType';
import { createLoad } from 'api/loads';

import {
  faTruck,
  faInfoCircle,
  faBox,
  faMapMarkerAlt,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';

const wizardNavItems = [
  { step: 1, label: 'Load Info', completed: false, icon: faInfoCircle },
  { step: 2, label: 'Trailer Specs', completed: false, icon: faTruck },
  { step: 3, label: 'Shipment Details', completed: false, icon: faBox },
  {
    step: 4,
    label: 'Pickup & Dropoff',
    completed: false,
    icon: faMapMarkerAlt
  },
  { step: 5, label: 'Additional Info', completed: false, icon: faFileAlt }
];

const CreateNewLoad: React.FC = () => {
  const [tabEventKey, setTabEventKey] = useState<number>(1);
  const form = useWizardForm({ totalStep: wizardNavItems.length });

  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    variant: string;
  }>({ show: false, message: '', variant: 'primary' });

  useEffect(() => {
    console.log('Current form data:', form.formData);
  }, [form.formData]);

  const handleNext = () => {
    const requiredFields = ['customer', 'referenceNumber', 'rate'];
    const missingFields = requiredFields.filter(
      field => !(form.formData as FormDataType)[field as keyof FormDataType]
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

    setTabEventKey(prev => prev + 1);
  };

  const handleFinalSubmit = async () => {
    try {
      console.log('Submitting load data:', form.formData);
      const result = await createLoad(form.formData as FormDataType);
      console.log('Load created:', result);
      setAlert({
        show: true,
        message: 'Load data saved successfully',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error saving load data:', error);
      setAlert({
        show: true,
        message: 'Failed to save load data',
        variant: 'danger'
      });
    }
  };

  return (
    <div className="mb-9">
      <PageBreadcrumb items={defaultBreadcrumbItems} />
      <h2 className="fs-5 mb-4 mb-xl-5">Create New Load</h2>
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
                    {item.step === 1 && (
                      <LoadInformation
                        formData={form.formData as FormDataType}
                        onChange={form.onChange}
                        validation={form.validation || false}
                      />
                    )}
                    {item.step === 2 && (
                      <TrailerSpecifications
                        formData={form.formData as FormDataType}
                        onChange={form.onChange}
                        validation={form.validation || false}
                      />
                    )}
                    {item.step === 3 && (
                      <ShipmentDetails
                        formData={form.formData as FormDataType}
                        onChange={form.onChange}
                        validation={form.validation || false}
                      />
                    )}
                    {item.step === 4 && (
                      <PickupDropoffDetails
                        formData={form.formData as FormDataType}
                        onChange={form.onChange}
                        validation={form.validation || false}
                      />
                    )}
                    {item.step === 5 && (
                      <AdditionalInformation
                        formData={form.formData as FormDataType}
                        onChange={form.onChange}
                        validation={form.validation || false}
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

export default CreateNewLoad;
