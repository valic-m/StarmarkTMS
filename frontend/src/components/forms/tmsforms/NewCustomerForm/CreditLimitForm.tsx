import React from 'react';
import { Form } from 'react-bootstrap';

interface FormData {
  credit_limit: string;
  is_active: boolean;
  // Add any other relevant fields
}

interface CreditLimitFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const CreditLimitForm: React.FC<CreditLimitFormProps> = ({
  formData,
  handleChange
}) => (
  <>
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

    <Form.Group controlId="is_active" className="mb-3">
      <Form.Check
        type="checkbox"
        name="is_active"
        label="Active Status"
        checked={formData.is_active}
        onChange={handleChange}
      />
    </Form.Group>

    {/* Add other credit-related fields as needed */}
  </>
);

export default CreditLimitForm;
