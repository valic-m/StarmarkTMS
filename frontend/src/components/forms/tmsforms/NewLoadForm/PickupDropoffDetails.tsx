import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';

interface ContactInfo {
  name: string;
  address: string;
  contact: string;
}

interface PickupDropoffDetailsProps {
  formData: {
    shippers?: ContactInfo[];
    receivers?: ContactInfo[];
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  validation?: boolean;
}

const PickupDropoffDetails: React.FC<PickupDropoffDetailsProps> = ({
  formData,
  onChange,
  validation = false
}) => {
  const [shippers, setShippers] = useState<ContactInfo[]>(
    formData.shippers || [{ name: '', address: '', contact: '' }]
  );
  const [receivers, setReceivers] = useState<ContactInfo[]>(
    formData.receivers || [{ name: '', address: '', contact: '' }]
  );

  const handleAddShipper = () =>
    setShippers([...shippers, { name: '', address: '', contact: '' }]);

  const handleAddReceiver = () =>
    setReceivers([...receivers, { name: '', address: '', contact: '' }]);

  const handleShipperChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedShippers = [...shippers];
    updatedShippers[index][name as keyof ContactInfo] = value;
    setShippers(updatedShippers);
    // Update the parent form data
    onChange({
      ...event,
      target: {
        ...event.target,
        name: 'shippers',
        value: updatedShippers
      }
    });
  };

  const handleReceiverChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedReceivers = [...receivers];
    updatedReceivers[index][name as keyof ContactInfo] = value;
    setReceivers(updatedReceivers);
    // Update the parent form data
    onChange({
      ...event,
      target: {
        ...event.target,
        name: 'receivers',
        value: updatedReceivers
      }
    });
  };

  return (
    <div>
      <h5>Pickup & Dropoff Details</h5>
      <Row>
        {/* Shippers Section */}
        <Col md={6}>
          <h6>Shippers</h6>
          {shippers.map((shipper, index) => (
            <Card key={index} className="p-3 mb-3">
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
            </Card>
          ))}
          <Button variant="outline-success" onClick={handleAddShipper}>
            Add Shipper
          </Button>
        </Col>

        {/* Receivers Section */}
        <Col md={6}>
          <h6>Receivers</h6>
          {receivers.map((receiver, index) => (
            <Card key={index} className="p-3 mb-3">
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
            </Card>
          ))}
          <Button variant="outline-success" onClick={handleAddReceiver}>
            Add Receiver
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PickupDropoffDetails;
