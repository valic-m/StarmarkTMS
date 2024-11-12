// File: NewCustomerForm.tsx

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import GeneralInfoForm from './GeneralInfoForm';
import ContactInfoForm from './ContactInfoForm';
import CreditLimitForm from './CreditLimitForm';
import AccountsPayableForm from './AccountsPayableForm';
import AgentInfoForm from './AgentInfoForm';
import Preview from './Preview';
import { CustomerFormData } from 'types/Customer'; // Import the CustomerFormData type

interface NewCustomerFormProps {
  currentStep: number;
  totalSteps: number;
  handleFinalSubmit: (formData: CustomerFormData) => void;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  currentStep,
  totalSteps,
  handleFinalSubmit,
}) => {
  // Initialize form data with all fields, including new fields for form submission
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
    factoring: false,          // Set to false as it's a boolean field
    do_not_use: false,         // Boolean field
    notes: '',                 // String field for notes
    tax_id: '',                // String field for tax ID
    term_pay: '',              // String field for payment terms
  });

  // Handle input change for updating form data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Render the appropriate form section based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GeneralInfoForm formData={formData} handleChange={handleChange} />;
      case 2:
        return <ContactInfoForm formData={formData} handleChange={handleChange} />;
      case 3:
        return <CreditLimitForm formData={formData} handleChange={handleChange} />;
      case 4:
        return <AccountsPayableForm formData={formData} handleChange={handleChange} />;
      case 5:
        return <AgentInfoForm formData={formData} handleChange={handleChange} />;
      case 6:
        return <Preview formData={formData} />; // Final step shows the preview
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
            onClick={() => handleFinalSubmit(formData)}
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
