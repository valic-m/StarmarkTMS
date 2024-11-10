import React from 'react';
import { Form } from 'react-bootstrap';

interface FormData {
  contact_name: string;
  phone_number: string;
  cell_number: string;
  email: string;
  website: string;
  // Add any other relevant fields
}

interface ContactInfoFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  formData,
  handleChange
}) => (
  <>
    <Form.Group controlId="contact_name" className="mb-3">
      <Form.Label>Contact Name</Form.Label>
      <Form.Control
        type="text"
        name="contact_name"
        placeholder="Enter Contact Name"
        value={formData.contact_name}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="phone_number" className="mb-3">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control
        type="text"
        name="phone_number"
        placeholder="Enter Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="email" className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
    </Form.Group>

    {/* Add other contact-related fields as needed */}
  </>
);

export default ContactInfoForm;
