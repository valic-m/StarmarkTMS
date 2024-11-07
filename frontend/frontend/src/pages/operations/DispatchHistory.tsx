import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const DispatchHistory = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Dispatch History</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Dispatch Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Dispatch A</td>
                <td>Completed</td>
                <td>2023-10-01</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DispatchHistory;
