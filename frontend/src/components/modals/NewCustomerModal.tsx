import React, { useState } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import NewCustomerForm from 'components/forms/tmsforms/NewCustomerForm';

interface NewCustomerModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ show, onHide }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Adjust as needed

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewCustomerForm
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrevious}
          totalSteps={totalSteps}
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
