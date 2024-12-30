// src/components/forms/tmsforms/locations/LocationForm.tsx

import React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Location, OperatingHour } from 'types/Location';
import ReactSelect from 'components/base/ReactSelect';
// ^ This is your custom wrapper (doesn't export ActionMeta/OnChangeValue).

interface Category {
  id: number;
  name: string;
}

// Define a local type for clarity
type CategoryOption = {
  value: number;
  label: string;
};

/**
 * Interface for form errors, including nested errors for operating_hours.
 */
interface FormErrors {
  name?: string[];
  address_line1?: string[];
  address_line2?: string[];
  city?: string[];
  state?: string[];
  zip_code?: string[];
  phone_number?: string[];
  email?: string[];
  shipping_hours_from?: string[];
  shipping_hours_to?: string[];
  load_time?: string[];
  directions?: string[];
  do_not_load?: string[];
  no_reefers?: string[];
  charges_lumper?: string[];
  lumper_fee?: string[];
  categories?: string[];
  comments?: string[];
  operating_hours?: { [index: number]: string[] };
  // Allow any other fields without TypeScript errors
  [key: string]: string[] | { [index: number]: string[] } | undefined;
}

interface LocationFormProps {
  formData: Partial<Location>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Location>>>;
  categories: Category[];
  errors: FormErrors;
}

const LocationForm: React.FC<LocationFormProps> = ({
  formData,
  setFormData,
  categories,
  errors
}) => {
  // Handle basic changes for standard inputs (e.g. text, checkbox).
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    let newValue: any = value;
    if (type === 'checkbox' && target instanceof HTMLInputElement) {
      newValue = target.checked;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  // For operating_hours array, handle changes to open_time/close_time
  const handleOperatingHoursChange = (
    index: number,
    field: 'open_time' | 'close_time',
    value: string
  ) => {
    const updated = [...(formData.operating_hours || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, operating_hours: updated }));
  };

  // Convert categories => options for ReactSelect
  const categoryOptions: CategoryOption[] = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  // Derive the currently selected category options
  const selectedCategoryOptions: CategoryOption[] = categoryOptions.filter(
    opt => formData.categories?.includes(opt.value)
  );

  // Handle multi-select changes
  const handleCategoriesSelect = (newValue: any) => {
    // If it's an array, map to numeric IDs; otherwise, empty array.
    if (Array.isArray(newValue)) {
      const ids = newValue.map((opt: CategoryOption) => opt.value);
      setFormData(prev => ({
        ...prev,
        categories: ids
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: []
      }));
    }
  };

  return (
    <div>
      <h3>Location Details</h3>

      {/* Company Name */}
      <FloatingLabel label="Company Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter company name"
          value={formData.name || ''}
          onChange={handleChange}
          isInvalid={!!errors.name}
          required
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.name)
              ? errors.name.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* Address Line 1 */}
      <FloatingLabel label="Address Line 1" className="mb-3">
        <Form.Control
          type="text"
          name="address_line1"
          placeholder="Enter address line 1"
          value={formData.address_line1 || ''}
          onChange={handleChange}
          isInvalid={!!errors.address_line1}
          required
        />
        {errors.address_line1 && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.address_line1)
              ? errors.address_line1.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* Address Line 2 */}
      <FloatingLabel
        label="Address Line 2 (e.g., Suite/Unit #)"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="address_line2"
          placeholder="Enter address line 2 (optional)"
          value={formData.address_line2 || ''}
          onChange={handleChange}
          isInvalid={!!errors.address_line2}
        />
        {errors.address_line2 && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.address_line2)
              ? errors.address_line2.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      <Row>
        {/* City */}
        <Col>
          <FloatingLabel label="City" className="mb-3">
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={formData.city || ''}
              onChange={handleChange}
              isInvalid={!!errors.city}
            />
            {errors.city && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.city)
                  ? errors.city.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
        {/* State */}
        <Col>
          <FloatingLabel label="State" className="mb-3">
            <Form.Control
              type="text"
              name="state"
              placeholder="State"
              value={formData.state || ''}
              onChange={handleChange}
              isInvalid={!!errors.state}
            />
            {errors.state && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.state)
                  ? errors.state.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
        {/* Zip Code */}
        <Col>
          <FloatingLabel label="Zip Code" className="mb-3">
            <Form.Control
              type="text"
              name="zip_code"
              placeholder="Zip Code"
              value={formData.zip_code || ''}
              onChange={handleChange}
              isInvalid={!!errors.zip_code}
            />
            {errors.zip_code && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.zip_code)
                  ? errors.zip_code.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
        {/* Phone Number */}
        <Col>
          <FloatingLabel label="Contact Phone" className="mb-3">
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Enter phone number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              isInvalid={!!errors.phone_number}
            />
            {errors.phone_number && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.phone_number)
                  ? errors.phone_number.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
        {/* Email */}
        <Col>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email || ''}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.email)
                  ? errors.email.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
      </Row>

      {/* Shipping Hours (From/To) -> using type="time" */}
      <Row>
        <Col>
          <FloatingLabel label="Shipping Hours From" className="mb-3">
            <Form.Control
              type="time"
              name="shipping_hours_from"
              placeholder="Start Time"
              value={formData.shipping_hours_from || ''}
              onChange={handleChange}
              isInvalid={!!errors.shipping_hours_from}
            />
            {errors.shipping_hours_from && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.shipping_hours_from)
                  ? errors.shipping_hours_from.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="Shipping Hours To" className="mb-3">
            <Form.Control
              type="time"
              name="shipping_hours_to"
              placeholder="End Time"
              value={formData.shipping_hours_to || ''}
              onChange={handleChange}
              isInvalid={!!errors.shipping_hours_to}
            />
            {errors.shipping_hours_to && (
              <Form.Control.Feedback type="invalid">
                {Array.isArray(errors.shipping_hours_to)
                  ? errors.shipping_hours_to.join(', ')
                  : 'Invalid input.'}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel label="Load Time (e.g. 00:30:00)" className="mb-3">
        <Form.Control
          type="text"
          name="load_time"
          placeholder="Load time"
          value={formData.load_time || ''}
          onChange={handleChange}
          isInvalid={!!errors.load_time}
        />
        {errors.load_time && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.load_time)
              ? errors.load_time.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* Flags */}
      <Form.Check
        type="checkbox"
        label="Do Not Load"
        name="do_not_load"
        checked={formData.do_not_load || false}
        onChange={handleChange}
        className="mb-3"
        isInvalid={!!errors.do_not_load}
      />
      {errors.do_not_load && (
        <div className="invalid-feedback d-block">
          {Array.isArray(errors.do_not_load)
            ? errors.do_not_load.join(', ')
            : 'Invalid input.'}
        </div>
      )}
      <Form.Check
        type="checkbox"
        label="No Reefers"
        name="no_reefers"
        checked={formData.no_reefers || false}
        onChange={handleChange}
        className="mb-3"
        isInvalid={!!errors.no_reefers}
      />
      {errors.no_reefers && (
        <div className="invalid-feedback d-block">
          {Array.isArray(errors.no_reefers)
            ? errors.no_reefers.join(', ')
            : 'Invalid input.'}
        </div>
      )}
      <Form.Check
        type="checkbox"
        label="Charges Lumper"
        name="charges_lumper"
        checked={formData.charges_lumper || false}
        onChange={handleChange}
        className="mb-3"
        isInvalid={!!errors.charges_lumper}
      />
      {errors.charges_lumper && (
        <div className="invalid-feedback d-block">
          {Array.isArray(errors.charges_lumper)
            ? errors.charges_lumper.join(', ')
            : 'Invalid input.'}
        </div>
      )}

      <FloatingLabel label="Lumper Fee" className="mb-3">
        <Form.Control
          type="number"
          step="0.01"
          name="lumper_fee"
          placeholder="Enter lumper fee"
          value={formData.lumper_fee?.toString() || ''}
          onChange={handleChange}
          isInvalid={!!errors.lumper_fee}
        />
        {errors.lumper_fee && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.lumper_fee)
              ? errors.lumper_fee.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* ReactSelect for Categories (multi) */}
      <div className="mb-3">
        <label className="form-label">Categories</label>
        <ReactSelect
          isMulti
          placeholder="Select categories"
          options={categoryOptions}
          value={selectedCategoryOptions}
          onChange={handleCategoriesSelect}
          classNames={{
            control: () => 'py-3',
            valueContainer: () => 'lh-1'
          }}
        />
        {errors.categories && (
          <div className="invalid-feedback d-block">
            {Array.isArray(errors.categories)
              ? errors.categories.join(', ')
              : 'Invalid input.'}
          </div>
        )}
      </div>

      {/* Comments */}
      <FloatingLabel label="Comments" className="mb-3">
        <Form.Control
          as="textarea"
          name="comments"
          placeholder="Add comments"
          value={formData.comments || ''}
          onChange={handleChange}
          isInvalid={!!errors.comments}
        />
        {errors.comments && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.comments)
              ? errors.comments.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* Directions */}
      <FloatingLabel label="Directions" className="mb-3">
        <Form.Control
          as="textarea"
          name="directions"
          placeholder="Add directions"
          value={formData.directions || ''}
          onChange={handleChange}
          isInvalid={!!errors.directions}
        />
        {errors.directions && (
          <Form.Control.Feedback type="invalid">
            {Array.isArray(errors.directions)
              ? errors.directions.join(', ')
              : 'Invalid input.'}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      {/* Operating Hours */}
      <h4 className="mt-4">Operating Hours</h4>
      {formData.operating_hours?.map((oh: OperatingHour, index: number) => (
        <div key={oh.day} className="mb-2">
          <strong>{oh.day}</strong>
          <Row className="mt-1">
            <Col>
              <Form.Control
                type="time"
                value={oh.open_time || ''}
                onChange={e =>
                  handleOperatingHoursChange(index, 'open_time', e.target.value)
                }
                isInvalid={
                  errors.operating_hours &&
                  errors.operating_hours[index] &&
                  errors.operating_hours[index].some(err =>
                    err.includes('open_time')
                  )
                }
              />
              {errors.operating_hours &&
                errors.operating_hours[index] &&
                errors.operating_hours[index].some(err =>
                  err.includes('open_time')
                ) && (
                  <Form.Control.Feedback type="invalid">
                    {(errors.operating_hours[index] as string[])
                      .filter(err => err.includes('open_time'))
                      .join(', ')}
                  </Form.Control.Feedback>
                )}
            </Col>
            <Col>
              <Form.Control
                type="time"
                value={oh.close_time || ''}
                onChange={e =>
                  handleOperatingHoursChange(
                    index,
                    'close_time',
                    e.target.value
                  )
                }
                isInvalid={
                  errors.operating_hours &&
                  errors.operating_hours[index] &&
                  errors.operating_hours[index].some(err =>
                    err.includes('close_time')
                  )
                }
              />
              {errors.operating_hours &&
                errors.operating_hours[index] &&
                errors.operating_hours[index].some(err =>
                  err.includes('close_time')
                ) && (
                  <Form.Control.Feedback type="invalid">
                    {(errors.operating_hours[index] as string[])
                      .filter(err => err.includes('close_time'))
                      .join(', ')}
                  </Form.Control.Feedback>
                )}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default LocationForm;
