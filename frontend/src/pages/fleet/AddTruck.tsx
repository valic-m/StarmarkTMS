// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\AddTruck.tsx

import React, { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import PageBreadcrumb from 'components/common/PageBreadcrumb';

/** We'll import sub-form sections from forms/... */
// If your project is configured so that `src/` is the base for absolute imports:
import BasicDetailsForm from 'components/forms/tmsforms/trucks/BasicDetailsForm';
import LeasingForm from 'components/forms/tmsforms/trucks/LeasingForm';
import InsuranceForm from 'components/forms/tmsforms/trucks/InsuranceForm';
import EquipmentForm from 'components/forms/tmsforms/trucks/EquipmentForm';
import IntegrationForm from 'components/forms/tmsforms/trucks/IntegrationForm';
import OutOfServiceForm from 'components/forms/tmsforms/trucks/OutOfServiceForm';
import VinDecodeResults from 'components/forms/tmsforms/trucks/VinDecodeResults';

/** The interface describing truck form data (including VIN decode fields) */
export interface TruckFormData {
  // Basic fields
  name: string;
  license_plate: string;
  manufacturer: string;
  year: number;
  vin: string;
  starting_mileage: number;
  color: string;

  // Ownership
  owner_id?: number;
  carrier_id?: number;
  is_leased: boolean;
  leased_to: string;
  sub_leased: boolean;
  owner_operated: boolean;

  // Insurance
  annual_insurance_cost?: number;
  insurance_renewal_date?: string;
  annual_plate_cost?: number;

  // Equipment
  dashcam_installed: boolean;
  apu_installed: boolean;
  fuel_card: string;

  // Integration
  integration_id?: string;

  // Out of service
  is_out_of_service: boolean;
  out_of_service_reason: string;

  // VIN decode fields (shortened for brevity; imagine them all here)
  decoded_make?: string;
  decoded_model?: string;
  decoded_model_year?: string;
}

const AddTruck: React.FC = () => {
  /** ----------------
   * 1) State
   * ----------------*/
  const [formData, setFormData] = useState<TruckFormData>({
    name: '',
    license_plate: '',
    manufacturer: '',
    year: 2020,
    vin: '',
    starting_mileage: 0,
    color: '',
    owner_id: undefined,
    carrier_id: undefined,
    is_leased: false,
    leased_to: '',
    sub_leased: false,
    owner_operated: true,
    annual_insurance_cost: undefined,
    insurance_renewal_date: '',
    annual_plate_cost: undefined,
    dashcam_installed: false,
    apu_installed: false,
    fuel_card: '',
    integration_id: '',
    is_out_of_service: false,
    out_of_service_reason: '',

    // VIN decoding
    decoded_make: '',
    decoded_model: '',
    decoded_model_year: ''
  });

  const [decodeResult, setDecodeResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  /** ----------------
   * 2) Handlers
   * ----------------*/

  // A universal change handler for input/select/textarea
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = e => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Minimal decode function
  const handleDecodeVIN = async () => {
    if (!formData.vin) return;

    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${formData.vin}?format=json`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch VIN data');
      }
      const data = await res.json();
      setDecodeResult(data.Results);

      // Example partial mapping:
      const decodeMap: Record<string, keyof TruckFormData> = {
        Make: 'decoded_make',
        Model: 'decoded_model',
        'Model Year': 'decoded_model_year'
      };

      const newFields: Partial<TruckFormData> = {};
      data.Results.forEach((item: any) => {
        const variable = item.Variable;
        const val = item.Value || '';
        if (decodeMap[variable]) {
          newFields[decodeMap[variable]] = val;
        }
      });

      // If we have a decoded_make, set manufacturer
      if (newFields.decoded_make) {
        newFields.manufacturer = newFields.decoded_make;
      }
      // If we have a decoded_model_year, parse it as number => year
      if (newFields.decoded_model_year) {
        const parsed = parseInt(newFields.decoded_model_year, 10);
        if (!isNaN(parsed)) {
          newFields.year = parsed;
        }
      }

      setFormData(prev => ({ ...prev, ...newFields }));
      setError(null);
    } catch (err: any) {
      setDecodeResult(null);
      setError(err.message);
    }
  };

  // Submit truck data to the backend
  const handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      // Because your backend/trucks/urls.py has `router.register(r'')`,
      // and tms_project/urls.py mounts it at path('api/trucks/'),
      // the final creation route is: POST /api/trucks/
      // (with a trailing slash).

      const response = await fetch('http://localhost:8000/api/trucks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          year: Number(formData.year),
          starting_mileage: Number(formData.starting_mileage)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create truck');
      }

      const created = await response.json();
      setMessage(`Truck created successfully (ID: ${created.id})`);

      // Reset
      setFormData({
        name: '',
        license_plate: '',
        manufacturer: '',
        year: 2020,
        vin: '',
        starting_mileage: 0,
        color: '',
        owner_id: undefined,
        carrier_id: undefined,
        is_leased: false,
        leased_to: '',
        sub_leased: false,
        owner_operated: true,
        annual_insurance_cost: undefined,
        insurance_renewal_date: '',
        annual_plate_cost: undefined,
        dashcam_installed: false,
        apu_installed: false,
        fuel_card: '',
        integration_id: '',
        is_out_of_service: false,
        out_of_service_reason: '',
        decoded_make: '',
        decoded_model: '',
        decoded_model_year: ''
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  /** ----------------
   * 3) Render
   * ----------------*/
  return (
    <div className="mb-9">
      <PageBreadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Fleet', url: '/fleet' },
          { label: 'Add Truck' }
        ]}
      />
      <h2 className="fs-5 mb-4 mb-xl-5">Add New Truck</h2>

      <Row>
        <Col xl={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          {/* The "Form" wrapper is here so we can handle submit at top-level */}
          <form onSubmit={handleSubmit}>
            {/* 1) Basic Details */}
            <BasicDetailsForm
              formData={formData}
              onChange={handleChange}
              onDecodeVIN={handleDecodeVIN}
              decodeResult={decodeResult}
            />

            {/* 2) Leasing Info */}
            <LeasingForm formData={formData} onChange={handleChange} />

            {/* 3) Insurance Info */}
            <InsuranceForm formData={formData} onChange={handleChange} />

            {/* 4) Equipment Info */}
            <EquipmentForm formData={formData} onChange={handleChange} />

            {/* 5) Integration */}
            <IntegrationForm formData={formData} onChange={handleChange} />

            {/* 6) Out of Service */}
            <OutOfServiceForm formData={formData} onChange={handleChange} />

            {/* If you want to display VIN decode results in a separate box: */}
            <VinDecodeResults decodeResult={decodeResult} />

            {/* Submit button */}
            <button type="submit" className="btn btn-primary mt-3">
              Add Truck
            </button>
          </form>
        </Col>
        <Col xl={6}>{/* Optionally show a map or additional info here */}</Col>
      </Row>
    </div>
  );
};

export default AddTruck;
