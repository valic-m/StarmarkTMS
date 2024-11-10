import React from 'react';
import { Form } from 'react-bootstrap';

interface FormData {
  accounts_payable_contact: string;
  accounts_payable_phone: string;
  accounts_payable_email: string;
  accounts_payable_address: string;
  accounts_payable_city: string;
  accounts_payable_state: string;
  accounts_payable_zip: string;
  // Add any other relevant fields
}

interface AccountsPayableFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const AccountsPayableForm: React.FC<AccountsPayableFormProps> = ({
  formData,
  handleChange
}) => (
  <>
    <Form.Group controlId="accounts_payable_contact" className="mb-3">
      <Form.Label>Accounts Payable Contact</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_contact"
        placeholder="Enter Accounts Payable Contact"
        value={formData.accounts_payable_contact}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_phone" className="mb-3">
      <Form.Label>Accounts Payable Phone</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_phone"
        placeholder="Enter Accounts Payable Phone"
        value={formData.accounts_payable_phone}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_email" className="mb-3">
      <Form.Label>Accounts Payable Email</Form.Label>
      <Form.Control
        type="email"
        name="accounts_payable_email"
        placeholder="Enter Accounts Payable Email"
        value={formData.accounts_payable_email}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_address" className="mb-3">
      <Form.Label>Accounts Payable Address</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_address"
        placeholder="Enter Accounts Payable Address"
        value={formData.accounts_payable_address}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_city" className="mb-3">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_city"
        placeholder="Enter City"
        value={formData.accounts_payable_city}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_state" className="mb-3">
      <Form.Label>State</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_state"
        placeholder="Enter State"
        value={formData.accounts_payable_state}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="accounts_payable_zip" className="mb-3">
      <Form.Label>Zip Code</Form.Label>
      <Form.Control
        type="text"
        name="accounts_payable_zip"
        placeholder="Enter Zip Code"
        value={formData.accounts_payable_zip}
        onChange={handleChange}
      />
    </Form.Group>
  </>
);

export default AccountsPayableForm;
