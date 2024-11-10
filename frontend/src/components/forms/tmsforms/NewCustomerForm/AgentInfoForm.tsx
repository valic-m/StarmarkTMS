import React from 'react';
import { Form } from 'react-bootstrap';

interface FormData {
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  // Add any other relevant fields
}

interface AgentInfoFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const AgentInfoForm: React.FC<AgentInfoFormProps> = ({
  formData,
  handleChange
}) => (
  <>
    <Form.Group controlId="agent_name" className="mb-3">
      <Form.Label>Agent Name</Form.Label>
      <Form.Control
        type="text"
        name="agent_name"
        placeholder="Enter Agent Name"
        value={formData.agent_name}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="agent_phone" className="mb-3">
      <Form.Label>Agent Phone</Form.Label>
      <Form.Control
        type="text"
        name="agent_phone"
        placeholder="Enter Agent Phone"
        value={formData.agent_phone}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="agent_email" className="mb-3">
      <Form.Label>Agent Email</Form.Label>
      <Form.Control
        type="email"
        name="agent_email"
        placeholder="Enter Agent Email"
        value={formData.agent_email}
        onChange={handleChange}
      />
    </Form.Group>

    {/* Add more agent-related fields as needed */}
  </>
);

export default AgentInfoForm;
