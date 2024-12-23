import React from 'react';

interface Shipment {
  id: string;
  date: string;
  status: string;
}

const ShipmentsTable: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Shipment ID</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {shipments.map(shipment => (
        <tr key={shipment.id}>
          <td>{shipment.id}</td>
          <td>{shipment.date}</td>
          <td>{shipment.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ShipmentsTable;
