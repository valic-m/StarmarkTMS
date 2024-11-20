// File: src/components/forms/tmsforms/NewCustomerForm/CreditLimitForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { CustomerFormData } from 'types/Customer';

interface CreditLimitFormProps {
  formData: CustomerFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
}

const CreditLimitForm: React.FC<CreditLimitFormProps> = ({
  formData,
  handleChange,
  setFormData
}) => {
  // Handle mutually exclusive checkboxes for Active Status and Do Not Use
  const handleMutuallyExclusiveCheckbox = (fieldName: string) => {
    if (fieldName === 'is_active') {
      setFormData(prev => ({
        ...prev,
        is_active: !prev.is_active,
        do_not_use: false // Ensure "Do Not Use" is deselected
      }));
    } else if (fieldName === 'do_not_use') {
      setFormData(prev => ({
        ...prev,
        do_not_use: !prev.do_not_use,
        is_active: false // Ensure "Active Status" is deselected
      }));
    }
  };

  return (
    <>
      {/* Financial Details */}
      <h3>Financial Details</h3>
      <Form.Group controlId="credit_limit" className="mb-3">
        <Form.Label>Credit Limit</Form.Label>
        <Form.Control
          type="text"
          name="credit_limit"
          placeholder="Enter Credit Limit"
          value={formData.credit_limit}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="term_pay" className="mb-3">
        <Form.Label>Payment Terms</Form.Label>
        <Form.Select
          name="term_pay"
          value={formData.term_pay || 'Net 30'} // Default to "Net 30"
          onChange={handleChange}
        >
          {/* Quickpay option */}
          <option value="Quickpay">Quickpay</option>

          {/* Dynamically generate Net terms from Net 5 to Net 30 */}
          {Array.from({ length: 26 }, (_, i) => i + 5).map(days => (
            <option key={days} value={`Net ${days}`}>
              Net {days}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="tax_id" className="mb-3">
        <Form.Label>Tax ID</Form.Label>
        <Form.Control
          type="text"
          name="tax_id"
          placeholder="Enter Tax ID"
          value={formData.tax_id}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Flags and Statuses */}
      <h3>Flags and Statuses</h3>
      <Form.Group controlId="is_active" className="mb-3">
        <Form.Check
          type="checkbox"
          name="is_active"
          label="Active Status"
          checked={formData.is_active}
          onChange={() => handleMutuallyExclusiveCheckbox('is_active')}
        />
      </Form.Group>

      <Form.Group controlId="do_not_use" className="mb-3">
        <Form.Check
          type="checkbox"
          name="do_not_use"
          label="Do Not Use"
          checked={formData.do_not_use}
          onChange={() => handleMutuallyExclusiveCheckbox('do_not_use')}
        />
      </Form.Group>

      <Form.Group controlId="factoring" className="mb-3">
        <Form.Check
          type="checkbox"
          name="factoring"
          label="Factoring"
          checked={formData.factoring}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
};

export default CreditLimitForm;
