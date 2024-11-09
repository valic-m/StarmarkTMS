import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CreateDispatch = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Create Dispatch</h1>
          <Form>
            <Form.Group controlId="dispatchName">
              <Form.Label>Dispatch Name</Form.Label>
              <Form.Control type="text" placeholder="Enter dispatch name" />
            </Form.Group>
            <Form.Group controlId="dispatchDetails" className="mt-3">
              <Form.Label>Dispatch Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDispatch;
