import React, { useState } from 'react';
import { Col, Form, Row, Modal, Card } from 'react-bootstrap';
import Button from 'components/base/Button'; // Ensure this is the correct path
import { useWizardFormContext } from 'providers/WizardFormProvider';

interface ShipperReceiver {
  name: string;
  address: string;
  contact: string;
}

interface FormDataType {
  customer?: string;
  loadDescription?: string;
  loadWeight?: string;
  [key: string]: string | number | boolean | undefined; // Replace `any` with more specific types
}

const CreateNewLoadForm: React.FC = () => {
  const { formData, onChange, validation } =
    useWizardFormContext<FormDataType>();
  const [shippers, setShippers] = useState<ShipperReceiver[]>([
    { name: '', address: '', contact: '' }
  ]);
  const [receivers, setReceivers] = useState<ShipperReceiver[]>([
    { name: '', address: '', contact: '' }
  ]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const handleCustomerModal = () => setShowCustomerModal(!showCustomerModal);

  const handleAddShipper = () => {
    setShippers([...shippers, { name: '', address: '', contact: '' }]);
  };

  const handleAddReceiver = () => {
    setReceivers([...receivers, { name: '', address: '', contact: '' }]);
  };

  const handleRemoveShipper = (index: number) => {
    if (index > 0) {
      const updatedShippers = shippers.filter((_, i) => i !== index);
      setShippers(updatedShippers);
    }
  };

  const handleRemoveReceiver = (index: number) => {
    if (index > 0) {
      const updatedReceivers = receivers.filter((_, i) => i !== index);
      setReceivers(updatedReceivers);
    }
  };

  const handleShipperChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedShippers = [...shippers];
    const { name, value } = event.target;
    updatedShippers[index][name as keyof ShipperReceiver] = value;
    setShippers(updatedShippers);
    onChange(event);
  };

  const handleReceiverChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedReceivers = [...receivers];
    const { name, value } = event.target;
    updatedReceivers[index][name as keyof ShipperReceiver] = value;
    setReceivers(updatedReceivers);
    onChange(event);
  };

  return (
    <>
      {/* Customer Search/Add Section */}
      <Form.Group controlId="customer" className="mb-3">
        <Form.Label>Customer</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="customer"
              placeholder="Search for customer"
              value={formData?.customer || ''}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              required={validation}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-success"
              size="sm"
              onClick={handleCustomerModal}
            >
              Add New
            </Button>
          </Col>
        </Row>
      </Form.Group>

      {/* Modal for Adding a New Customer */}
      <Modal show={showCustomerModal} onHide={handleCustomerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newCustomerName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                required
              />
            </Form.Group>
            <Form.Group controlId="newCustomerContact" className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact details"
                required
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Save Customer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Shipper and Receiver Details */}
      <Row className="gx-3">
        <Col md={6}>
          <h5>Shippers</h5>
          {shippers.map((shipper, index) => (
            <Card key={index} className="mb-3 border p-3">
              <h6>{`Shipper #${index + 1}`}</h6>
              <Form.Group controlId={`shipperName-${index}`} className="mb-2">
                <Form.Label>Shipper Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Shipper Name"
                  value={shipper.name}
                  onChange={e => handleShipperChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              <Form.Group
                controlId={`shipperAddress-${index}`}
                className="mb-2"
              >
                <Form.Label>Shipper Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter Shipper Address"
                  value={shipper.address}
                  onChange={e => handleShipperChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              <Form.Group
                controlId={`shipperContact-${index}`}
                className="mb-2"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  placeholder="Enter Contact Number"
                  value={shipper.contact}
                  onChange={e => handleShipperChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              {index > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={() => handleRemoveShipper(index)}
                >
                  Remove Shipper
                </Button>
              )}
            </Card>
          ))}
          <Button
            variant="outline-success"
            className="w-100 mb-3"
            size="sm"
            onClick={handleAddShipper}
          >
            Add Shipper
          </Button>
        </Col>

        <Col md={6}>
          <h5>Receivers</h5>
          {receivers.map((receiver, index) => (
            <Card key={index} className="mb-3 border p-3">
              <h6>{`Receiver #${index + 1}`}</h6>
              <Form.Group controlId={`receiverName-${index}`} className="mb-2">
                <Form.Label>Receiver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Receiver Name"
                  value={receiver.name}
                  onChange={e => handleReceiverChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              <Form.Group
                controlId={`receiverAddress-${index}`}
                className="mb-2"
              >
                <Form.Label>Receiver Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter Receiver Address"
                  value={receiver.address}
                  onChange={e => handleReceiverChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              <Form.Group
                controlId={`receiverContact-${index}`}
                className="mb-2"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  placeholder="Enter Contact Number"
                  value={receiver.contact}
                  onChange={e => handleReceiverChange(index, e)}
                  required={validation}
                />
              </Form.Group>
              {index > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={() => handleRemoveReceiver(index)}
                >
                  Remove Receiver
                </Button>
              )}
            </Card>
          ))}
          <Button
            variant="outline-success"
            className="w-100 mb-3"
            size="sm"
            onClick={handleAddReceiver}
          >
            Add Receiver
          </Button>
        </Col>
      </Row>

      {/* Additional Load Details */}
      <Form.Group controlId="loadDescription" className="mb-3">
        <Form.Label>Load Description</Form.Label>
        <Form.Control
          as="textarea"
          name="loadDescription"
          placeholder="Enter Load Description"
          value={formData?.loadDescription || ''}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          rows={3}
          required={validation}
        />
      </Form.Group>
      <Form.Group controlId="loadWeight" className="mb-3">
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          name="loadWeight"
          placeholder="Enter Weight"
          value={formData?.loadWeight || ''}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          required={validation}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit">
        Create Load
      </Button>
    </>
  );
};

export default CreateNewLoadForm;
