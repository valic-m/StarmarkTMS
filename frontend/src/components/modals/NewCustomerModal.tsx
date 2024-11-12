// File: src/components/modals/NewCustomerModal.tsx

import React, { useState } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm/NewCustomerForm';
import { CustomerFormData } from 'types/Customer';

interface NewCustomerModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  show,
  onHide
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    mc_number: '',
    scac: '',
    address_street: '',
    address_number: '',
    city: '',
    state: '',
    zip_code: '',
    contact_name: '',
    phone_number: '',
    cell_number: '',
    email: '',
    website: '',
    credit_limit: '',
    is_active: false,
    accounts_payable_contact: '',
    accounts_payable_phone: '',
    accounts_payable_email: '',
    accounts_payable_address: '',
    accounts_payable_city: '',
    accounts_payable_state: '',
    accounts_payable_zip: '',
    agent_name: '',
    agent_phone: '',
    agent_email: '',
    factoring: false,
    do_not_use: false,
    notes: '',
    tax_id: '',
    term_pay: ''
  });

  const handleFinalSubmit = () => {
    console.log('Final submit action triggered with data:', formData);
    onHide();
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else handleFinalSubmit();
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewCustomerForm
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrev={handlePrevious}
        />
      </Modal.Body>
      <Modal.Footer>
        <ProgressBar
          now={(currentStep / totalSteps) * 100}
          style={{ width: '100%' }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default NewCustomerModal;
