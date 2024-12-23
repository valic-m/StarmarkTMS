import React from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Location } from 'types/Location';

interface LocationFormProps {
  formData: Partial<Location>; // Accept Partial<Location>
  setFormData: React.Dispatch<React.SetStateAction<Partial<Location>>>;
}

const LocationForm: React.FC<LocationFormProps> = ({
  formData,
  setFormData
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3>Location Details</h3>

      {/* Company Name */}
      <FloatingLabel label="Company Name" className="mb-3">
        <Form.Control
          type="text"
          name="company_name"
          placeholder="Enter company name"
          value={formData.company_name || ''}
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

      {/* Contact Person */}
      <FloatingLabel label="Contact Person" className="mb-3">
        <Form.Control
          type="text"
          name="contact_person"
          placeholder="Enter contact person"
          value={formData.contact_person || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Phone Number */}
      <FloatingLabel label="Phone Number" className="mb-3">
        <Form.Control
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Email */}
      <FloatingLabel label="Email" className="mb-3">
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email || ''}
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

      {/* Shipping Hours */}
      <FloatingLabel label="Shipping Hours" className="mb-3">
        <Form.Control
          type="text"
          name="shipping_hours"
          placeholder="Enter shipping hours"
          value={formData.shipping_hours || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Load Time */}
      <FloatingLabel label="Load Time" className="mb-3">
        <Form.Control
          type="text"
          name="load_time"
          placeholder="Enter load time"
          value={formData.load_time || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Shipping Manager Details */}
      <FloatingLabel label="Shipping Manager Name" className="mb-3">
        <Form.Control
          type="text"
          name="shipping_manager_name"
          placeholder="Enter shipping manager name"
          value={formData.shipping_manager_name || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel label="Shipping Manager Phone" className="mb-3">
        <Form.Control
          type="text"
          name="shipping_manager_phone"
          placeholder="Enter shipping manager phone"
          value={formData.shipping_manager_phone || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel label="Shipping Manager Email" className="mb-3">
        <Form.Control
          type="email"
          name="shipping_manager_email"
          placeholder="Enter shipping manager email"
          value={formData.shipping_manager_email || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* Miscellaneous */}
      <FloatingLabel label="Rating" className="mb-3">
        <Form.Control
          type="number"
          name="rating"
          placeholder="Enter rating"
          value={formData.rating?.toString() || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel label="Comments" className="mb-3">
        <Form.Control
          as="textarea"
          name="comments"
          placeholder="Add comments"
          value={formData.comments || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel label="Directions" className="mb-3">
        <Form.Control
          as="textarea"
          name="directions"
          placeholder="Add directions"
          value={formData.directions || ''}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Form.Check
        type="checkbox"
        label="Do Not Load"
        name="do_not_load"
        checked={formData.do_not_load || false}
        onChange={e =>
          setFormData(prev => ({
            ...prev,
            do_not_load: e.target.checked
          }))
        }
      />
    </div>
  );
};

export default LocationForm;
