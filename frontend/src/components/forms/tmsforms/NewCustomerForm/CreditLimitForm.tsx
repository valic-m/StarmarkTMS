// File: src/components/forms/tmsforms/NewCustomerForm/CreditLimitForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { CustomerFormData } from 'types/Customer'; // Ensure this path is correct

interface CreditLimitFormProps {
  formData: CustomerFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const CreditLimitForm: React.FC<CreditLimitFormProps> = ({ formData, handleChange }) => (
  <>
    {/* Credit Limit Field */}
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

    {/* Active Status Checkbox */}
    <Form.Group controlId="is_active" className="mb-3">
      <Form.Check
        type="checkbox"
        name="is_active"
        label="Active Status"
        checked={formData.is_active}
        onChange={handleChange}
      />
    </Form.Group>

    {/* Add any additional fields here, if needed */}
  </>
);

export default CreditLimitForm;
