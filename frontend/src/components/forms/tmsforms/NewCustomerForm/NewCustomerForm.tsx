import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import GeneralInfoForm from './GeneralInfoForm';
import ContactInfoForm from './ContactInfoForm';
import CreditLimitForm from './CreditLimitForm';
import AccountsPayableForm from './AccountsPayableForm';
import AgentInfoForm from './AgentInfoForm';
import Preview from './Preview';

interface CustomerFormData {
  name: string;
  mc_number: string;
  scac: string;
  address_street: string;
  address_number: string;
  city: string;
  state: string;
  zip_code: string;
  contact_name: string;
  phone_number: string;
  cell_number: string;
  email: string;
  website: string;
  credit_limit: string;
  is_active: boolean;
  accounts_payable_contact: string;
  accounts_payable_phone: string;
  accounts_payable_email: string;
  accounts_payable_address: string;
  accounts_payable_city: string;
  accounts_payable_state: string;
  accounts_payable_zip: string;
  agent_name: string;
  agent_phone: string;
  agent_email: string;
}

interface NewCustomerFormProps {
  currentStep: number;
  totalSteps: number;
  handleFinalSubmit: () => void;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  currentStep,
  totalSteps,
  handleFinalSubmit
}) => {
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
    agent_email: ''
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
        return (
          <Preview
            formData={
              formData as unknown as Record<
                string,
                string | number | boolean | undefined
              >
            }
          />
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <Form>
      {renderStepContent()}
      <div className="mt-3">
        {currentStep === totalSteps ? (
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="btn btn-primary"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setFormData(formData)}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </Form>
  );
};

export default NewCustomerForm;
