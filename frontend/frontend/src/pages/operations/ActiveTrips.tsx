import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const ActiveTrips = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Active Trips</h1>
          <ListGroup>
            <ListGroup.Item>Trip 1: Load A in progress</ListGroup.Item>
            <ListGroup.Item>Trip 2: Load B in progress</ListGroup.Item>
            {/* Add more list items as needed */}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ActiveTrips;
