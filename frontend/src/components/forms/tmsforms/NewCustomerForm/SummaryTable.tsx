// File: src/components/forms/tmsforms/NewCustomerForm/SummaryTable.tsx

import React from 'react';

interface PropertyDetails {
  property: string;
  value: string | number | boolean | null | undefined;
}

interface SummaryTableProps {
  tableData: PropertyDetails[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ tableData }) => (
  <table className="table">
    <tbody>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <strong>{item.property}</strong>
          </td>
          <td>{item.value ?? 'N/A'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SummaryTable;
