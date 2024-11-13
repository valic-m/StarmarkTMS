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
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  currentStep,
  formData,
  setFormData
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

  return <Form>{renderStepContent()}</Form>;
};

export default NewCustomerForm;
