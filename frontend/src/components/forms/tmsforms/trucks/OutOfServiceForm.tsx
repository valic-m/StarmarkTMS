// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\OutOfServiceForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck';
interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

const OutOfServiceForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h5>Out of Service Status</h5>
      <Form.Group className="mb-3" controlId="isOutOfService">
        <Form.Check
          type="checkbox"
          label="Out of Service"
          name="is_out_of_service"
          checked={formData.is_out_of_service}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="outOfServiceReason">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="out_of_service_reason"
          value={formData.out_of_service_reason}
          onChange={onChange}
          disabled={!formData.is_out_of_service}
        />
      </Form.Group>
    </>
  );
};

export default OutOfServiceForm;
