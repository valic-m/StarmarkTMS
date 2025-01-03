// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\LeasingForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck';
interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

const LeasingForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h5>Leasing Details</h5>
      <Form.Group className="mb-3" controlId="isLeased">
        <Form.Check
          type="checkbox"
          label="Is Leased"
          name="is_leased"
          checked={formData.is_leased}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="leasedTo">
        <Form.Label>Leased To</Form.Label>
        <Form.Control
          type="text"
          name="leased_to"
          value={formData.leased_to}
          onChange={onChange}
          disabled={!formData.is_leased}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="subLeased">
        <Form.Check
          type="checkbox"
          label="Sub-Leased"
          name="sub_leased"
          checked={formData.sub_leased}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="ownerOperated">
        <Form.Check
          type="checkbox"
          label="Owner Operated"
          name="owner_operated"
          checked={formData.owner_operated}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};

export default LeasingForm;
