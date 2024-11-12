// File: src/components/forms/tmsforms/NewCustomerForm/NewCustomerForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import GeneralInfoForm from './GeneralInfoForm';
import ContactInfoForm from './ContactInfoForm';
import CreditLimitForm from './CreditLimitForm';
import AccountsPayableForm from './AccountsPayableForm';
import AgentInfoForm from './AgentInfoForm';
import Preview from './Preview';
import { CustomerFormData } from 'types/Customer';

interface NewCustomerFormProps {
  currentStep: number;
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  onNext: () => void;
  onPrev: () => void;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  currentStep,
  formData,
  setFormData,
  onNext,
  onPrev
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralInfoForm formData={formData} handleChange={handleChange} />
        );
      case 2:
        return (
          <ContactInfoForm formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <CreditLimitForm formData={formData} handleChange={handleChange} />
        );
      case 4:
        return (
          <AccountsPayableForm
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 5:
        return (
          <AgentInfoForm formData={formData} handleChange={handleChange} />
        );
      case 6:
        return <Preview formData={formData} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <Form>
      {renderStepContent()}
      <div className="mt-3 d-flex justify-content-between">
        {currentStep > 1 && (
          <button type="button" onClick={onPrev} className="btn btn-secondary">
            Previous
          </button>
        )}
        <button type="button" onClick={onNext} className="btn btn-primary">
          {currentStep === 6 ? 'Save' : 'Next'}
        </button>
      </div>
    </Form>
  );
};

export default NewCustomerForm;
