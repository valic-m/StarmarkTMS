import React from 'react';
import { Table } from 'react-bootstrap';

interface TMSCustomerOrdersTableProps {
  orders: any[];
}

const TMSCustomerOrdersTable: React.FC<TMSCustomerOrdersTableProps> = ({
  orders
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No orders available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TMSCustomerOrdersTable;
