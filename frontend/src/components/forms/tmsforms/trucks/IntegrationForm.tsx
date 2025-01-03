// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\IntegrationForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck';
interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

const IntegrationForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h5>Integration</h5>
      <Form.Group className="mb-3" controlId="integrationId">
        <Form.Label>Integration ID</Form.Label>
        <Form.Control
          type="text"
          name="integration_id"
          value={formData.integration_id || ''}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};

export default IntegrationForm;
