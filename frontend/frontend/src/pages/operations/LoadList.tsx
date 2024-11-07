import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const LoadList = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Load List</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Load Name</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Load A</td>
                <td>Available</td>
                <td>Details about Load A</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadList;
