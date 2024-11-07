import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const DeliveredLoads = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Delivered Loads</h1>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Load C</Card.Title>
              <Card.Text>Status: Delivered</Card.Text>
              {/* Add more card details */}
            </Card.Body>
          </Card>
          {/* Add more cards as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveredLoads;
