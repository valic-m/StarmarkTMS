import React from 'react';
import { Table } from 'react-bootstrap';

interface TMSCustomerRatingsTableProps {
  ratings: any[];
}

const TMSCustomerRatingsTable: React.FC<TMSCustomerRatingsTableProps> = ({
  ratings
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Rating ID</th>
          <th>Date</th>
          <th>Score</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <tr key={index}>
              <td>{rating.id}</td>
              <td>{rating.date}</td>
              <td>{rating.score}</td>
              <td>{rating.comment}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No ratings available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TMSCustomerRatingsTable;
