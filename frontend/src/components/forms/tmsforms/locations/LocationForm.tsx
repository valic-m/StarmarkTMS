import React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Location } from 'types/Location';
import DatePicker from 'components/base/DatePicker'; // Import your custom DatePicker component

interface Category {
  id: number;
  name: string;
}

interface LocationFormProps {
  formData: Partial<Location>; // Accept Partial<Location>
  setFormData: React.Dispatch<React.SetStateAction<Partial<Location>>>;
  categories: Category[]; // List of categories for the multi-select
}

const LocationForm: React.FC<LocationFormProps> = ({
  formData,
  setFormData,
  categories
}) => {
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

    if (type === 'select-multiple' && target instanceof HTMLSelectElement) {
      const selectedOptions = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => parseInt(option.value));
      newValue = selectedOptions;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
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
          required
        />
      </FloatingLabel>

      {/* Address Line 1 */}
      <FloatingLabel label="Address Line 1" className="mb-3">
        <Form.Control
          type="text"
          name="address_line1"
          placeholder="Enter address line 1"
          value={formData.address_line1 || ''}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Address Line 2 */}
      <FloatingLabel label="Address Line 2" className="mb-3">
        <Form.Control
          type="text"
          name="address_line2"
          placeholder="Enter address line 2 (optional)"
          value={formData.address_line2 || ''}
          onChange={handleChange}
        />
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
            />
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
            />
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
            />
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
            />
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
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
        {/* Shipping Hours From */}
        <Col>
          <FloatingLabel label="" className="mb-3">
            <DatePicker
              render={(_, ref) => (
                <Form.Control
                  type="text"
                  placeholder="Enter shipping start time"
                  ref={ref}
                  name="shipping_hours_from"
                  id="shipping_hours_from"
                  value={formData.shipping_hours_from || ''}
                  onChange={handleChange}
                  required
                />
              )}
              hideIcon={true}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i'
              }}
            />
          </FloatingLabel>
        </Col>

        {/* Shipping Hours To */}
        <Col>
          <FloatingLabel label="" className="mb-3">
            <DatePicker
              render={(_, ref) => (
                <Form.Control
                  type="text"
                  placeholder="Enter shipping end time"
                  ref={ref}
                  name="shipping_hours_to"
                  id="shipping_hours_to"
                  value={formData.shipping_hours_to || ''}
                  onChange={handleChange}
                  required
                />
              )}
              hideIcon={true}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i'
              }}
            />
          </FloatingLabel>
        </Col>
      </Row>

      {/* Load Time */}
      <FloatingLabel label="Load Time" className="mb-3">
        <Form.Control
          type="text"
          name="load_time"
          placeholder="Enter load time (e.g., 00:30:00)"
          value={formData.load_time || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Do Not Load */}
      <Form.Check
        type="checkbox"
        label="Do Not Load"
        name="do_not_load"
        checked={formData.do_not_load || false}
        onChange={handleChange}
        className="mb-3"
      />

      {/* No Reefers */}
      <Form.Check
        type="checkbox"
        label="No Reefers"
        name="no_reefers"
        checked={formData.no_reefers || false}
        onChange={handleChange}
        className="mb-3"
      />

      {/* Charges Lumper */}
      <Form.Check
        type="checkbox"
        label="Charges Lumper"
        name="charges_lumper"
        checked={formData.charges_lumper || false}
        onChange={handleChange}
        className="mb-3"
      />

      {/* Lumper Fee */}
      <FloatingLabel label="Lumper Fee" className="mb-3">
        <Form.Control
          type="number"
          step="0.01"
          name="lumper_fee"
          placeholder="Enter lumper fee"
          value={formData.lumper_fee?.toString() || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Categories */}
      <FloatingLabel label="Categories" className="mb-3">
        <Form.Control
          as="select"
          multiple
          name="categories"
          value={(formData.categories || []).map(String)} // Convert number[] to string[]
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </FloatingLabel>

      {/* Comments */}
      <FloatingLabel label="Comments" className="mb-3">
        <Form.Control
          as="textarea"
          name="comments"
          placeholder="Add comments"
          value={formData.comments || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Directions */}
      <FloatingLabel label="Directions" className="mb-3">
        <Form.Control
          as="textarea"
          name="directions"
          placeholder="Add directions"
          value={formData.directions || ''}
          onChange={handleChange}
        />
      </FloatingLabel>
    </div>
  );
};

export default LocationForm;
