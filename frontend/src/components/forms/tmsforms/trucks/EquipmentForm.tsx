// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\EquipmentForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck';
interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

const EquipmentForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h5>Equipment & Features</h5>
      <Form.Group className="mb-3" controlId="dashcamInstalled">
        <Form.Check
          type="checkbox"
          label="Dashcam Installed"
          name="dashcam_installed"
          checked={formData.dashcam_installed}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="apuInstalled">
        <Form.Check
          type="checkbox"
          label="APU Installed"
          name="apu_installed"
          checked={formData.apu_installed}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fuelCard">
        <Form.Label>Fuel Card</Form.Label>
        <Form.Control
          type="text"
          name="fuel_card"
          value={formData.fuel_card}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};

export default EquipmentForm;
