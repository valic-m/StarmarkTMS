// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\forms\InsuranceForm.tsx

import React from 'react';
import { Form } from 'react-bootstrap';
import { Truck } from 'types/truck';
interface Props {
  formData: Truck;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

const InsuranceForm: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h5>Insurance & Licensing</h5>
      <Form.Group className="mb-3" controlId="annualInsuranceCost">
        <Form.Label>Annual Insurance Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="annual_insurance_cost"
          value={formData.annual_insurance_cost || ''}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="insuranceRenewalDate">
        <Form.Label>Insurance Renewal Date</Form.Label>
        <Form.Control
          type="date"
          name="insurance_renewal_date"
          value={formData.insurance_renewal_date}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="annualPlateCost">
        <Form.Label>Annual Plate Cost</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="annual_plate_cost"
          value={formData.annual_plate_cost || ''}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};

export default InsuranceForm;
