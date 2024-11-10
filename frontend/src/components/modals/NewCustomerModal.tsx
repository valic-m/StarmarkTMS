import React, { useState } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm/NewCustomerForm';

interface NewCustomerModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  show,
  onHide
}) => {
  const [currentStep] = useState<number>(1); // Removed setCurrentStep since it's unused
  const totalSteps = 3; // Adjust as needed

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewCustomerForm currentStep={currentStep} totalSteps={totalSteps} />
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
