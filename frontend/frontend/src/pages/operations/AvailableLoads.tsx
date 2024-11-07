import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AvailableLoads = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Available Loads</h1>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Load A</Card.Title>
              <Card.Text>Status: Available</Card.Text>
              {/* Add more card details */}
            </Card.Body>
          </Card>
          {/* Add more cards as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default AvailableLoads;
